import { type PropsWithChildren, useState } from "react";
import type { NotificationProps } from "@/shared/ui/notification";
import { NotificationsContext } from "./context";

export const NotificationsProvider = (props:PropsWithChildren) => {
  const [notifications, setNotifications] = useState<NotificationProps[]>([]);

  const addNotification = (notification: NotificationProps) => {
    setNotifications((prev) => [...prev, notification]);
    setTimeout(() => {
      setNotifications(prev => prev.filter((e) => e !== notification));
    }, 5000);
  };

  return (
    <NotificationsContext.Provider value={ { notifications, addNotification } }>
      {props.children}
    </NotificationsContext.Provider>
  );
};
