import "./navbar.css";
import SidekickLogo from "@/shared/assets/icons/sidekick-logo.svg?react";
import { ROUTES } from "@/shared/config/routes.ts";
import { Link } from "react-router-dom";
import { Avatar } from "@/shared/ui/avatar";
import { useEffect } from "react";
import { useBlockScroll } from "@/shared/lib/hooks/block-scroll/useBlockScroll.tsx";
import { useAuth } from "@/entities/user/model/use-auth.tsx";
import { useUser } from "@/entities/user/model/use-user.tsx";

interface NavBarProps {
  setNavBar: () => void;
}

export const NavBar = ({ setNavBar }: NavBarProps) => {
  const isAuth = useAuth();
  const user = useUser();
  const { blockScroll, unblockScroll } = useBlockScroll();

  useEffect(() => {
    blockScroll();

    return () => unblockScroll();
  }, [blockScroll, unblockScroll]);


  return (
    <>
      <div className='nav-background' onClick={ () => setNavBar() }></div>
      <nav className='navbar' onClick={ () => setNavBar() }>
        <div className="nav-header">
          <div>
            <SidekickLogo/>
            <span>sidekick</span>
          </div>
          { isAuth && <Avatar src={ user.avatar } size={ 24 }/> }
        </div>

        <div className='nav-container'>
          { !isAuth ? (
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
