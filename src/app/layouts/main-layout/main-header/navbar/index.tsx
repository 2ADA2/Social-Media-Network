import './navbar.css';
import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useTransition, animated } from '@react-spring/web';
import SidekickLogo from '@/shared/assets/icons/sidekick-logo.svg?react';
import { ROUTES } from '@/shared/config/routes.ts';
import { Avatar } from '@/shared/ui/avatar';
import { useBlockScroll } from '@/shared/lib/hooks/use-block-scroll.ts';
import { useAuth } from '@/features/auth/use-auth.tsx';
import { useUser } from '@/entities/user/model/use-user.tsx';
import { useFocusTrap } from '@/shared/lib/hooks/use-focus-trap.ts';

interface NavBarProps {
  setNavBar: () => void;
  isOpen: boolean;
}

export const NavBar = ({ setNavBar, isOpen }: NavBarProps) => {
  const navRef = useRef<HTMLElement>(null);
  const { t } = useTranslation('common');
  const { isAuth } = useAuth();
  const { user } = useUser();
  useBlockScroll(isOpen);
  useFocusTrap(navRef, isOpen);

  const transitions = useTransition(isOpen, {
    from: { opacity: 0, transform: 'translateX(100%)' },
    enter: { opacity: 1, transform: 'translateX(0)' },
    config: { tension: 300, friction: 30 },
  });

  return transitions((style, item) =>
    item ? (
      <div className="nav-wrapper">
        <div className="nav-background" onClick={setNavBar} />
        <animated.nav
          className="navbar"
          style={{ transform: style.transform }}
          tabIndex={-1}
          ref={navRef}
        >
          <div className="nav-header">
            <button className="nav-close" onClick={setNavBar}>
              <SidekickLogo />
              <span>sidekick</span>
            </button>
            {isAuth && <Avatar src={user!.avatar} size={24} />}
          </div>

          <div className="nav-container" onClick={setNavBar}>
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
        </animated.nav>
      </div>
    ) : null,
  );
};
