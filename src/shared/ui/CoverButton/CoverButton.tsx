import "./CoverButton.css";
import type { ButtonProps } from "@/shared/ui/Button/Button.tsx";

export const CoverButton = ({ children, onClick }: ButtonProps) => {
  return (
    <button className="cover-button" onClick={ onClick }>
      { children }
    </button>
  );
};
