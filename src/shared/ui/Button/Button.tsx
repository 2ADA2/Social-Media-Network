import React from "react";

export interface ButtonProps {
  children: React.ReactNode,
  onClick?: () => void;
  className?: string;
}

export const Button = ({ onClick, children, className = "" }: ButtonProps) => {
  return (
    <button className={ `btn ${ className }` } onClick={ onClick }>{ children }</button>
  );
};
