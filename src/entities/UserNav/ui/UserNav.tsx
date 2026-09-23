import "./UserNav.css";
import { useUser } from "@/features/auth";
import { Index } from "@/shared/ui/avatar";
import { ROUTES } from "@/shared/config/routes.ts";
import { Link } from "react-router-dom";

export const UserNav = () => {
  const user = useUser();

  return (
    <Link to={ROUTES.PROFILE} className="user-nav">
      <Index src={ user.avatar } alt={ `${ user.name } avatar` } size={ 24 }/>
      <span>{ user.name } { user.surname }</span>
    </Link>
  );
};
