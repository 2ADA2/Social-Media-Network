import { type InputHTMLAttributes, type ReactNode } from "react";
import "./Input.css";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  icon?: ReactNode;
}

export const Input = ({ icon, label, ...props }: InputProps) => {
  return (
    <label className="input-label">
      <div>
        {icon && <div className="input-icon">{icon}</div>}
        <span>{label}</span>
      </div>

      <input {...props} />
    </label>
  );
};
