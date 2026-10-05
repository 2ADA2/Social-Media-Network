import "./navbar.css";
import SidekickLogo from "@/shared/assets/icons/sidekick-logo.svg?react";
import { ROUTES } from "@/shared/config/routes.ts";
import { Link } from "react-router-dom";
import { Avatar } from "@/shared/ui/avatar";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useBlockScroll } from "@/shared/lib/hooks/block-scroll/use-block-scroll.tsx";
import { useAuth } from "@/features/auth/use-auth.tsx";
import { useUser } from "@/entities/user/model/use-user.tsx";

interface NavBarProps {
  setNavBar: () => void;
}

export const NavBar = ({ setNavBar }: NavBarProps) => {
  const { t } = useTranslation('common');
  const { isAuth } = useAuth();
  const { user } = useUser();
  const { blockScroll, unblockScroll } = useBlockScroll();

  useEffect(() => {
    blockScroll();

    return () => unblockScroll();
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
          { isAuth && <Avatar src={ user!.avatar } size={ 24 }/> }
        </div>

        <div className='nav-container'>
          { !isAuth ? (
            <>
              <Link to={ ROUTES.SIGNIN }>{ t('nav.signIn') }</Link>
              <Link to={ ROUTES.SIGNUP }>{ t('nav.signUp') }</Link>
            </>
          ) : (
            <>
              <Link to={ ROUTES.PROFILE }>{ t('nav.profile') }</Link>
              <Link to={ ROUTES.STATISTICS }>{ t('nav.statistics') }</Link>

            </>
          ) }
        </div>
      </nav>
    </>
  );
};
