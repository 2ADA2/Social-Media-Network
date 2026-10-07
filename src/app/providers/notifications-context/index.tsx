import { type PropsWithChildren, useCallback, useState } from 'react';
import { type AddNotificationProps, NotificationsContext } from './context';
import { Notifications } from '@/widgets/notifications';

export interface NotificationItem extends AddNotificationProps {
  id: string;
}

export const NotificationsProvider = ({ children }: PropsWithChildren) => {
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);

  const deleteNotification = useCallback((id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  }, []);

  const addNotification = useCallback((data: AddNotificationProps) => {
    const id = crypto.randomUUID();
    setNotifications((prev) => [...prev, { ...data, id }]);
  }, []);

  return (
    <NotificationsContext.Provider value={{ notifications, addNotification }}>
      <Notifications onDelete={deleteNotification} />
      {children}
    </NotificationsContext.Provider>
  );
};
