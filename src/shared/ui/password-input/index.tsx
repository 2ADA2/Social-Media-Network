import React, { type InputHTMLAttributes, type ReactNode, useState } from "react";
import InfoIcon from "@/shared/assets/icons/info-filled.svg?react";
import EyeIcon from "@/shared/assets/icons/eye.svg?react";
import EyeCrossedIcon from "@/shared/assets/icons/eye-crossed.svg?react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  icon?: ReactNode;
  info?: string;
}

export const PasswordInput = ({ icon, label, info, ...props }: InputProps) => {
  const [isShow, setIsShow] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const changeShow = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIsShow(!isShow);
  };

  const handleMouseDown = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
  };

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  return (
    <label className="input-label">
      <div>
        { icon && <div className="input-icon">{ icon }</div> }
        <span>{ label }</span>
      </div>

      <div className='password-container'>
        <input
          { ...props }
          type={ isShow ? "text" : "password" }
          onFocus={ handleFocus }
          onBlur={ handleBlur }
        />

        <div className="password-eye">
          { isFocused && <button onClick={ changeShow } onMouseDown={ handleMouseDown }>
            { isShow ? <EyeIcon/> : <EyeCrossedIcon/> }
          </button>
          }
        </div>
      </div>

      { info && <div className='info'>
          <InfoIcon className='ignore'/>
          <small>{ info }</small>
      </div>
      }
    </label>
  );
};
