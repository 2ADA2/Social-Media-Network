import { createPortal } from "react-dom";
import "./notifications.css";
import { Notification } from "@/shared/ui/notification";
import { useNotifications } from "@/app/providers/notifications-context/useNotifications.ts";

const NOTIFICATIONS_LIMIT = 5;

export const Notifications = () => {
  const { notifications } = useNotifications();

  return createPortal(
    <div className='notifications-container'>
      { notifications.slice(0, NOTIFICATIONS_LIMIT).map((e) => (
        <Notification { ...e } key={ e.id }/>
      )) }
    </div>,
    document.body);
};
