import "./notification.css";

export interface NotificationProps {
  message: string;
  title: string;
  type?: "success" | "error";
}

export const Notification = ({ title, message, type = "success" }: NotificationProps) => {
  return (
    <div className={ 'notification notification-' + type }>
      <h3>{ title }</h3>
      <p>{ message }</p>
    </div>
  );
};
