import { type InputHTMLAttributes, type ReactNode } from "react";
import "./textarea.css";

interface InputProps extends InputHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  icon?: ReactNode;
}

export const TextArea = ({ icon, label, ...props }: InputProps) => {
  return (
    <label className="textarea-label">
      <div>
        {icon && <div className="textarea-icon">{icon}</div>}
        <span>{label}</span>
      </div>

      <textarea {...props} />
    </label>
  );
};
