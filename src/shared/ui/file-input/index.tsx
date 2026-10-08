import React, { type ChangeEvent, type InputHTMLAttributes, useRef } from "react";
import "./file-input.css";
import DownloadIcon from "@/shared/assets/icons/download-file.svg?react";
import CrossIcon from "@/shared/assets/icons/cross.svg?react";

export interface FileInputProps extends InputHTMLAttributes<HTMLInputElement> {
  fileName?: string;
  hasPDF?: boolean;
  maxSize?: number;
}

export const FileInput = ({ onChange, fileName = '', hasPDF = true, maxSize = 10, ...props }: FileInputProps) => {
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

  const handleClear = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();

    if (inputRef.current) {
      inputRef.current.value = '';
    }

    const fakeEvent = {
      target: { files: null, value: '' },
    } as unknown as ChangeEvent<HTMLInputElement>;

    onChange?.(fakeEvent);
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
        { fileName &&
            <button className='close-button' onClick={ handleClear }>
                <CrossIcon/>
            </button>
        }
        <div>
          <DownloadIcon/>
        </div>
        <div>{ fileName ? <span>{ fileName }</span> :
          <div className='file-input-caption'>
            <div className='input-title'>Select a file <span>or drag and drop here</span></div>
            <div>JPG, PNG,{ hasPDF && <span> PDF, </span> } file size no more than { maxSize }MB</div>
          </div>
        }</div>
      </div>
    </label>
  );
};
