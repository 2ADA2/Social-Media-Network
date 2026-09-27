import { type InputHTMLAttributes, type ReactNode } from "react";
import CheckIcon from "@/shared/assets/icons/check.svg?react";
import CrossIcon from "@/shared/assets/icons/cross.svg?react";
import "./input.css";
import { ShowInputInfo } from "@/shared/ui/show-input-info/show-input-info.tsx";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  icon?: ReactNode;
  info?: string;

  custom?: boolean;
  error?: string;
}

export const Input = ({ icon, label, info, custom, error, ...props }: InputProps) => {
  const isOk = custom && !error && props.value;

  return (
    <label className={ `input-label ${ error ? "error" : "" }` }>
      <div>
        { icon && <div className="input-icon">{ icon }</div> }
        <span>{ label }</span>
        <div className="input-status">
          { isOk && <CheckIcon/> }
          { error && <CrossIcon/> }
        </div>
      </div>

      <input { ...props } />

      { error || isOk &&
        (<ShowInputInfo error={ error } info={ info || "" }/>)
      }
    </label>
  );
};
