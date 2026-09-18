import React, { forwardRef, type TextareaHTMLAttributes } from "react";
import InfoIcon from "@/shared/assets/icons/info-filled.svg?react";
import "./TextArea.css";

interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  icon?: React.ReactNode;
  children?: React.ReactNode;
}

export const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(({ icon, label, children, ...props }, ref) => {
  return (
    <label className='textarea-label'>
      <div>
        { icon && <div className="textarea-icon">{ icon }</div> }
        <span>{ label }</span>
      </div>

      <textarea ref={ ref } { ...props }>
        { children }
      </textarea>

      <div className='ta-info'>
        <InfoIcon className='ignore'/>
        <small>Max 200 chars</small>
      </div>
    </label>
  );
});
