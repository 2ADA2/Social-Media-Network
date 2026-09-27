import { type InputHTMLAttributes, type ReactNode } from "react";
import "./textarea.css";
import { ShowInputInfo } from "@/shared/ui/show-input-info/show-input-info.tsx";

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

  return (
    <label className={ `textarea-label ${ hasError ? 'error' : '' } ${ isFilled ? 'filled' : '' }` }>
      <div>
        { icon && <div className="textarea-icon">{ icon }</div> }
        <span>{ label }</span>
      </div>

      <textarea { ...props } />

      <ShowInputInfo error={ errorMessage } info={ info }/>
    </label>
  );
};
