import { createPortal } from 'react-dom';
import './notifications.css';
import { Notification } from '@/shared/ui/notification';
import { useNotifications } from '@/app/providers/notifications-context/useNotifications';

const NOTIFICATIONS_LIMIT = 5;

interface NotificationsProps {
  onDelete: (id: string) => void;
}

export const Notifications = ({ onDelete }: NotificationsProps) => {
  const { notifications } = useNotifications();

  return createPortal(
    <div className="notifications-container">
      {notifications.slice(0, NOTIFICATIONS_LIMIT).map((e) => (
        <Notification
          key={e.id}
          message={e.message}
          type={e.type}
          onClose={() => onDelete(e.id)}
        />
      ))}
    </div>,
    document.body,
  );
};
