import { createContext } from "react";
import type { NotificationProps } from "@/shared/ui/notification";
import type { AddNotificationProps } from "@/app/providers/notifications-context/index.tsx";

interface NotificationsContextInterface {
  notifications: NotificationProps[];
  addNotification: (notification: AddNotificationProps) => void;
}

export const NotificationsContext = createContext<NotificationsContextInterface | null>(null);
