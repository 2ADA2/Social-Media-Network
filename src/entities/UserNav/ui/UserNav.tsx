import "./UserNav.css";
import { useUser } from "@/features/auth";
import { Avatar } from "@/shared/ui/Avatar/Avatar.tsx";

export const UserNav = () => {
  const user = useUser();

  return (
    <a className="user-nav">
      <Avatar src={ user.avatar } alt={ `${ user.name } avatar` } size={ 24 }/>
      <span>{ user.name } { user.surname }</span>
    </a>
  );
};
