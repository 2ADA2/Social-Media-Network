import './modal.css';
import React, { useRef } from 'react';
import CrossIcon from '@/shared/assets/icons/cross.svg?react';
import { createPortal } from 'react-dom';
import { useTransition, animated } from '@react-spring/web';
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

  const transitions = useTransition(isOpen, {
    from: { opacity: 0, transform: 'scale(0.95) translateY(100px)' },
    enter: { opacity: 1, transform: 'scale(1) translateY(0)' },
    leave: { opacity: 0, transform: 'scale(0.95) translateY(100px)' },
    config: { tension: 300, friction: 25 },
  });

  return createPortal(
    <>
      {transitions((style, item) =>
        item ? (
          <animated.div
            className="modal-overlay"
            style={{ opacity: style.opacity }}
          >
            <animated.div
              className={'modal-window ' + className}
              style={style}
              tabIndex={-1}
              ref={modalRef}
            >
              <button className="modal-close" onClick={onClose}>
                <CrossIcon />
              </button>

              {children}
            </animated.div>
          </animated.div>
        ) : null,
      )}
    </>,
    document.body,
  );
};
