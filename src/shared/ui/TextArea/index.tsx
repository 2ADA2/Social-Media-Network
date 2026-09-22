import { type InputHTMLAttributes, type ReactNode } from "react";
import InfoIcon from "@/shared/assets/icons/info-filled.svg?react";
import "./textarea.css";

interface InputProps extends InputHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  icon?: ReactNode;
  value: string;
  info?: string;
  hasError?: boolean;
  errorMessage?: string;
}

const FILLED_LIMIT = 50;

export const TextArea = ({ icon, label, info, hasError, value, errorMessage, ...props }: InputProps) => {
  const isFilled = value.length > FILLED_LIMIT;

  const showInfo = () => {
    if (hasError) {
      return (
        <div className='info error-info'>
          <InfoIcon className='ignore'/>
          <small>{ errorMessage }</small>
        </div>
      );
    }

    if (info) {
      return (
        <div className='info'>
          <InfoIcon className='ignore'/>
          <small>{ info }</small>
        </div>
      );
    }

    return <></>;
  };

  return (
    <label className={ `textarea-label ${ hasError ? 'error' : '' } ${ isFilled ? 'filled' : '' }` }>
      <div>
        { icon && <div className="textarea-icon">{ icon }</div> }
        <span>{ label }</span>
      </div>

      <textarea { ...props } />

      { showInfo() }
    </label>
  );
};
