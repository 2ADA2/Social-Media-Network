import "./auth-buttons.css";
import { Link } from "react-router-dom";
import { ROUTES } from "@/shared/config/routes.ts";

export const AuthButtons = () => {
  return (
    <nav className="header-auth-nav">
      <Link to={ ROUTES.SIGNIN }>Sign in</Link>
      <Link to={ ROUTES.SIGNUP }>Sign up</Link>
    </nav>
  );
};
