import './modal.css';
import React, { useRef } from 'react';
import CrossIcon from '@/shared/assets/icons/cross.svg?react';
import { createPortal } from 'react-dom';
import { useFocusTrap } from '@/shared/lib/hooks/use-focus-trap.ts';
import { useBlockScroll } from '@/shared/lib/hooks/use-block-scroll.ts';

export interface ModalProps {
  children: React.ReactNode;
  isOpen: boolean;
  onClose: () => void;
  className?: string;
}

export const Modal = ({
  children,
  isOpen,
  onClose,
  className = '',
}: ModalProps) => {
  const modalRef = useRef<HTMLDivElement>(null);
  useFocusTrap(modalRef, isOpen);
  useBlockScroll(isOpen);

  if (!isOpen) {
    return null;
  }

  return createPortal(
    <>
      <div className="modal-background"></div>
      <div className={'modal-window ' + className} tabIndex={-1} ref={modalRef}>
        <button className="modal-close" onClick={onClose}>
          <CrossIcon />
        </button>

        {children}
      </div>
    </>,
    document.body,
  );
};
