import "./NavBar.css";
import SidekickLogo from "@/shared/assets/icons/sidekick-logo.svg?react";
import { useAuth } from "@/features/auth";
import { ROUTES } from "@/shared/config/routes.ts";

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
            <a href={ ROUTES.SIGNIN }>Sign in</a>
            <a href={ ROUTES.SIGNUP }>Sign up</a>
          </>
        ) : (
          <>
            <a href={ ROUTES.PROFILE }>Profile</a>
            <a href={ ROUTES.STATISTICS }>Statistics</a>
          </>
        ) }
      </nav>
    </>
  );
};
