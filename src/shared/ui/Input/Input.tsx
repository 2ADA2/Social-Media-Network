import React, { forwardRef, type InputHTMLAttributes } from "react";
import "./Input.css";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  icon?: React.ReactNode;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(({ icon, label, ...props }, ref) => {
  return (
    <label className='input-label'>
      <div>
        { icon && <div className="input-icon">{ icon }</div> }
        <span>{ label }</span>
      </div>

      <input ref={ ref } { ...props }/>
    </label>
  );
});
