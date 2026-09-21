import { type InputHTMLAttributes, type ReactNode } from "react";
import InfoIcon from "@/shared/assets/icons/info-filled.svg?react";
import "./textarea.css";

interface InputProps extends InputHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  icon?: ReactNode;
  info?: string;
}

export const TextArea = ({ icon, label, info, ...props }: InputProps) => {


  return (
    <label className="textarea-label">
      <div>
        { icon && <div className="textarea-icon">{ icon }</div> }
        <span>{ label }</span>
      </div>

      <textarea { ...props } />

      { info &&
          <div className='info'>
              <InfoIcon className='ignore'/>
              <small>{ info }</small>
          </div>
      }
    </label>
  );
};
