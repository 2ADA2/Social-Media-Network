import { createContext } from "react";
import type { NotificationProps } from "@/shared/ui/notification";

interface NotificationsContextInterface {
  notifications: NotificationProps[];
  addNotification: (notification: NotificationProps) => void;
}

export const NotificationsContext = createContext<NotificationsContextInterface | null>(null);
