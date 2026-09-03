import React from "react";
import "./coverButton.css";

interface CoverButtonProps {
  children: React.ReactNode,
  click?: () => void;
}

export const CoverButton = ({ children, click }: CoverButtonProps) => {
  return (
    <button className="cover-button" onClick={ click }>
      { children }
    </button>
  );
};
