import './notification.css';
import CrossIcon from '@/shared/assets/icons/cross.svg?react';
import { useEffect, useRef } from 'react';

export interface NotificationProps {
  message: string;
  type?: 'success' | 'error';
  onClose: () => void;
  id: number,
}

const TIMEOUT = 5000;

export const Notification = ({
  message,
  type = 'success',
  onClose,
}: NotificationProps) => {
  const onCloseRef = useRef(onClose);

  useEffect(() => {
    const timeout = setTimeout(() => {
      onCloseRef.current();
    }, TIMEOUT);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <div className={'notification notification-' + type}>
      <p>{message}</p>
      <button onClick={onClose} className="notification-close">
        <CrossIcon />
      </button>
    </div>
  );
};
