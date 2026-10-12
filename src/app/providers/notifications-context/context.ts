import { createContext } from "react";
import type { NotificationProps } from "@/shared/ui/notification";

export interface AddNotificationProps {
  message: string;
  type?: "success" | "error";
}

interface NotificationsContextInterface {
  notifications: NotificationProps[];
  addNotification: (notification: AddNotificationProps) => void;
}

export const NotificationsContext = createContext<NotificationsContextInterface | null>(null);
