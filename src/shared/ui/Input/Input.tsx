import { type InputHTMLAttributes, type ReactNode, type Ref } from "react";
import "./Input.css";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  icon?: ReactNode;
  ref?: Ref<HTMLInputElement>;
}

export const Input = ({ icon, label, ref, ...props }: InputProps) => {
  return (
    <label className="input-label">
      <div>
        {icon && <div className="input-icon">{icon}</div>}
        <span>{label}</span>
      </div>

      <input ref={ref} {...props} />
    </label>
  );
};