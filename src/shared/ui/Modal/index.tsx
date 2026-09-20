import "./modal.css";
import React from "react";
import CrossIcon from "@/shared/assets/icons/cross.svg?react";

export interface ModalProps {
  children: React.ReactNode;
  isOpen: boolean;
  onClose: () => void;
  className?: string;
}

export const Modal = ({ children, isOpen, onClose, className = '' }: ModalProps) => {
  if (!isOpen) {
    return <></>;
  }

  return (
    <>
      <div className='modal-background'></div>
      <div className={ 'modal-window ' + className }>
        <button className='modal-close' onClick={ onClose }>
          <CrossIcon/>
        </button>

        { children }
      </div>
    </>
  );
};
