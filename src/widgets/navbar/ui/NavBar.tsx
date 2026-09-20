import "./NavBar.css";
import SidekickLogo from "@/shared/assets/icons/sidekick-logo.svg?react";
import { useAuth } from "@/features/auth";
import { ROUTES } from "@/shared/config/routes.ts";
import { Link } from "react-router-dom";

interface NavBarProps {
  setNavBar: () => void;
}

export const NavBar = ({ setNavBar }: NavBarProps) => {
  const auth = useAuth();

  return (
    <>
      <div className='nav-background' onClick={ () => setNavBar() }></div>
      <nav className='navbar' onClick={ () => setNavBar() }>
        <div className="nav-header-logo">
          <SidekickLogo/>
          <span>sidekick</span>
        </div>

        { !auth ? (
          <>
            <Link to={ ROUTES.SIGNIN }>Sign in</Link>
            <Link to={ ROUTES.SIGNUP }>Sign up</Link>
          </>
        ) : (
          <>
            <Link to={ ROUTES.PROFILE }>Profile</Link>
            <Link to={ ROUTES.STATISTICS }>Statistics</Link>

          </>
        ) }
      </nav>
    </>
  );
};
