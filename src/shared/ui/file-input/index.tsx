import React, { type ChangeEvent, type InputHTMLAttributes } from "react";
import "./file-input.css";
import DownloadIcon from "@/shared/assets/icons/download-file.svg?react";

export interface FileInputProps extends InputHTMLAttributes<HTMLInputElement> {
  fileName?: string;
}

export const FileInput = ({ onChange, fileName = '', ...props }: FileInputProps) => {
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

  return (
    <label
      className='file-input-label'
      onDragOver={ (e) => e.preventDefault() }
      onDrop={ handleDrop }
    >
      <input type={ "file" } { ...props } onChange={ onChange }/>
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
