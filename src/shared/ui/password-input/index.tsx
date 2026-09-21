import { type InputHTMLAttributes, type ReactNode, useState } from "react";
import InfoIcon from "@/shared/assets/icons/info-filled.svg?react";
import EyeIcon from "@/shared/assets/icons/eye.svg?react";
import EyeCrossedIcon from "@/shared/assets/icons/eye-crossed.svg?react";
import "./password-input.css";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  icon?: ReactNode;
  info?: string;
}

export const PasswordInput = ({ icon, label, info, ...props }: InputProps) => {
  const [isShow, setIsShow] = useState(false);

  const changeShow = () => setIsShow(!isShow);

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
        />

        <div className="password-eye">
          <button type='button' onClick={ changeShow }>
            { isShow ? <EyeIcon/> : <EyeCrossedIcon/> }
          </button>
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
