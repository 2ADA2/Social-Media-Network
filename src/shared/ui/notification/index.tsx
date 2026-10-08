import './notification.css';
import CrossIcon from '@/shared/assets/icons/cross.svg?react';
import { useEffect, useRef, useState } from 'react';
import { useTransition, animated } from '@react-spring/web';

export interface NotificationProps {
  message: string;
  type?: 'success' | 'error';
  onClose: () => void;
  id: string;
}

const TIMEOUT = 5000;
const REMOVE_TIMEOUT = 400;

export const Notification = ({
  message,
  type = 'success',
  onClose,
}: NotificationProps) => {
  const onCloseRef = useRef(onClose);
  const [isVisible, setIsVisible] = useState(true);

  const transitions = useTransition(isVisible, {
    from: { opacity: 0, transform: 'translateY(50%)' },
    enter: { opacity: 1, transform: 'translateX(0)' },
    leave: { opacity: 0, transform: 'translateX(50%)' },
    config: { tension: 280, friction: 30 },
  });

  useEffect(() => {
    const hideTimeout = setTimeout(() => setIsVisible(false), TIMEOUT);
    const removeTimeout = setTimeout(
      () => onCloseRef.current(),
      TIMEOUT + REMOVE_TIMEOUT,
    );

    return () => {
      clearTimeout(hideTimeout);
      clearTimeout(removeTimeout);
    };
  }, []);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(() => onCloseRef.current(), REMOVE_TIMEOUT);
  };

  return transitions((style, item) =>
    item ? (
      <animated.div
        className={`notification notification-${type}`}
        style={style}
      >
        <p>{message}</p>
        <button onClick={handleClose} className="notification-close">
          <CrossIcon />
        </button>
      </animated.div>
    ) : null,
  );
};
