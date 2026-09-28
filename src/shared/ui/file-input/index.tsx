import React, { type ChangeEvent, type InputHTMLAttributes, useRef } from "react";
import "./file-input.css";
import DownloadIcon from "@/shared/assets/icons/download-file.svg?react";

export interface FileInputProps extends InputHTMLAttributes<HTMLInputElement> {
  fileName?: string;
}

export const FileInput = ({ onChange, fileName = '', ...props }: FileInputProps) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleDrop = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();

    const files = e?.dataTransfer?.files;
    if (!files || files.length === 0) {
      return;
    }

    const fakeEvent = {
      target: { files },
    } as ChangeEvent<HTMLInputElement>;

    onChange?.(fakeEvent);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLLabelElement>) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      inputRef?.current?.click();
    }
  };

  return (
    <label
      className='file-input-label'
      onDragOver={ (e) => e.preventDefault() }
      onDrop={ handleDrop }
      tabIndex={ 0 }
      onKeyDown={ handleKeyDown }
    >
      <input type={ "file" } { ...props } onChange={ onChange } ref={ inputRef }/>
      <div className='file-input-container'>
        <div>
          <DownloadIcon/>
        </div>
        <div>{ fileName ? <span>{ fileName }</span> :
          <div className='file-input-caption'>
            <div className='input-title'>Select a file <span>or drag and drop here</span></div>
            <div>JPG, PNG,<span> PDF, </span> file size no more than 10MB</div>
          </div>
        }</div>
      </div>
    </label>
  );
};
