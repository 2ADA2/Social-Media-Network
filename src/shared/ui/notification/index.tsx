import './notification.css';
import CrossIcon from '@/shared/assets/icons/cross.svg?react';
import { useEffect, useRef } from 'react';
import { useTransition, animated } from '@react-spring/web';

export interface NotificationProps {
  message: string;
  type?: 'success' | 'error';
  onClose: () => void;
  id: string;
}

const TIMEOUT = 5000;

export const Notification = ({
  message,
  type = 'success',
  onClose,
}: NotificationProps) => {
  const onCloseRef = useRef(onClose);

  const transitions = useTransition(true, {
    from: { opacity: 0, transform: 'translateY(50%)' },
    enter: { opacity: 1, transform: 'translateX(0)' },
    config: { tension: 280, friction: 30 },
  });

  useEffect(() => {
    const timeout = setTimeout(() => {
      onCloseRef.current();
    }, TIMEOUT);
    return () => clearTimeout(timeout);
  }, []);

  return transitions((style, item) =>
    item ? (
      <animated.div
        className={`notification notification-${type}`}
        style={style}
      >
        <p>{message}</p>
        <button onClick={onClose} className="notification-close">
          <CrossIcon />
        </button>
      </animated.div>
    ) : null,
  );
};
