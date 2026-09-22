import "./NavBar.css";
import SidekickLogo from "@/shared/assets/icons/sidekick-logo.svg?react";
import { useAuth, useUser } from "@/features/auth";
import { ROUTES } from "@/shared/config/routes.ts";
import { Link } from "react-router-dom";
import { Avatar } from "@/shared/ui/Avatar/Avatar.tsx";
import { useEffect } from "react";
import { useBlockScroll } from "@/features/block-scroll/useBlockScroll.tsx";

interface NavBarProps {
  setNavBar: () => void;
}

export const NavBar = ({ setNavBar }: NavBarProps) => {
  const auth = useAuth();
  const user = useUser();
  const { blockScroll, unblockScroll } = useBlockScroll();

  useEffect(() => {
    blockScroll();

    return unblockScroll;
  }, []);


  return (
    <>
      <div className='nav-background' onClick={ () => setNavBar() }></div>
      <nav className='navbar' onClick={ () => setNavBar() }>
        <div className="nav-header">
          <div>
            <SidekickLogo/>
            <span>sidekick</span>
          </div>
          <Avatar src={ user.avatar } size={ 24 }/>
        </div>

        <div className='nav-container'>
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
        </div>
      </nav>
    </>
  );
};
