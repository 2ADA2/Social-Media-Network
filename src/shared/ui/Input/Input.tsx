import { type InputHTMLAttributes, type ReactNode } from "react";
import InfoIcon from "@/shared/assets/icons/info-filled.svg?react";
import "./Input.css";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  icon?: ReactNode;
  isError?: boolean;
  error?: boolean;
  info?: string;
}

export const Input = ({ icon, label, info, isError, error, ...props }: InputProps) => {
  return (
    <label className="input-label">
      <div>
        { icon && <div className="input-icon">{ icon }</div> }
        <span>{ label }</span>
      </div>

      <input { ...props } />

      { info &&
          <div className='info'>
              <InfoIcon className='ignore'/>
              <small>{ info }</small>
          </div>
      }
    </label>
  );
};
