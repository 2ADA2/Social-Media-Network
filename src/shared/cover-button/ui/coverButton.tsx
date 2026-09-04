import React from "react";
import "./coverButton.css";

interface CoverButtonProps {
  children: React.ReactNode,
  onClick: () => void,
}

export const CoverButton = ({ children, onClick }: CoverButtonProps) => {
  return (
    <button className="cover-button" onClick = { onClick }>
      { children }
    </button>
  );
};
