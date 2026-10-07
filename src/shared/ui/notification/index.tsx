import "./notification.css";
import CrossIcon from "@/shared/assets/icons/cross.svg?react";
import { useEffect } from "react";

export interface NotificationProps {
  message: string;
  type?: "success" | "error";
  onClose: () => void;
  id: number,
}

const TIMEOUT = 5000;

export const Notification = ({ message, type = "success", onClose }: NotificationProps) => {
  useEffect(() => {
    const timeout = setTimeout(() => {
      onClose();
    }, TIMEOUT);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <div className={ 'notification notification-' + type }>
      <p>{ message }</p>
      <button onClick={onClose} className='notification-close'>
        <CrossIcon/>
      </button>
    </div>
  );
};
