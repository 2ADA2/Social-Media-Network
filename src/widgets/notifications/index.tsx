import { use } from "react";
import { createPortal } from "react-dom";
import "./notifications.css";
import { NotificationsContext } from "@/app/providers/notifications-context/context.ts";
import { Notification } from "@/shared/ui/notification";

export const Notifications = () => {
  const context = use(NotificationsContext);
  const notifications = context?.notifications || [];

  return createPortal(
    <div className='notifications-container'>
      { notifications.slice(0, 5).map((e, id) => (
        <Notification message={ e.message } title={ e.title } key={id}/>
      )) }
    </div>,
    document.body);
};
