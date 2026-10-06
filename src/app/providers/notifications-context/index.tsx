import { type PropsWithChildren, useState } from "react";
import type { NotificationProps } from "@/shared/ui/notification";
import { NotificationsContext } from "./context";
import { Notifications } from "@/widgets/notifications";

export interface AddNotificationProps {
  message: string;
  type?: "success" | "error";
}

export const NotificationsProvider = (props: PropsWithChildren) => {
  const [notifications, setNotifications] = useState<NotificationProps[]>([]);

  const deleteNotification = (notification: NotificationProps) => {
    setNotifications(prev => prev.filter((e) => e !== notification));
  };

  const addNotification = (newNotification: AddNotificationProps) => {
    const notification: NotificationProps = {
      ...newNotification,
      onClose: () => deleteNotification(notification),
    };

    setNotifications((prev) => [...prev, notification]);
  };

  return (
    <NotificationsContext.Provider value={ { notifications, addNotification } }>
      <Notifications/>
      { props.children }
    </NotificationsContext.Provider>
  );
};
