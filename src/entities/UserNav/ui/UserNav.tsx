import "./UserNav.css";
import { useUser } from "@/features/auth";

export const UserNav = () => {
  const user = useUser();

  return (
    <a className="user-nav">
      <img src={ user.avatar } alt={ `${ user.name } avatar` }/>
      <span>{user.name} {user.surname}</span>
    </a>
  );
};
