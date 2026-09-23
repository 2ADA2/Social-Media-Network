import "./cover-button.css";
import type { ButtonProps } from "../button";

export const CoverButton = ({ children, onClick }: ButtonProps) => {
  return (
    <button className="cover-button" onClick={ onClick }>
    { children }
    </button>
);
};
