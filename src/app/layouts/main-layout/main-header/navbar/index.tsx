import './navbar.css';
import SidekickLogo from '@/shared/assets/icons/sidekick-logo.svg?react';
import { ROUTES } from '@/shared/config/routes.ts';
import { Link } from 'react-router-dom';
import { Avatar } from '@/shared/ui/avatar';
import { useTranslation } from 'react-i18next';
import { useBlockScroll } from '@/shared/lib/hooks/use-block-scroll.ts';
import { useAuth } from '@/features/auth/use-auth.tsx';
import { useUser } from '@/entities/user/model/use-user.tsx';
import { useFocusTrap } from '@/shared/lib/hooks/use-focus-trap.ts';
import { useRef } from 'react';

interface NavBarProps {
  setNavBar: () => void;
}

export const NavBar = ({ setNavBar }: NavBarProps) => {
  const navRef = useRef(null);
  const { t } = useTranslation('common');
  const { isAuth } = useAuth();
  const { user } = useUser();
  useBlockScroll();
  useFocusTrap(navRef, true);

  return (
    <>
      <div className="nav-background" onClick={() => setNavBar()}></div>
      <nav
        className="navbar"
        onClick={() => setNavBar()}
        tabIndex={-1}
        ref={navRef}
      >
        <div className="nav-header">
          <button className="nav-close">
            <SidekickLogo />
            <span>sidekick</span>
          </button>
          {isAuth && <Avatar src={user!.avatar} size={24} />}
        </div>

        <div className="nav-container">
          {!isAuth ? (
            <>
              <Link to={ROUTES.SIGNIN}>{t('nav.signIn')}</Link>
              <Link to={ROUTES.SIGNUP}>{t('nav.signUp')}</Link>
            </>
          ) : (
            <>
              <Link to={ROUTES.PROFILE}>{t('nav.profile')}</Link>
              <Link to={ROUTES.STATISTICS}>{t('nav.statistics')}</Link>
            </>
          )}
        </div>
      </nav>
    </>
  );
};
