import BurgerMenuIcon from '@/shared/assets/icons/menu-burger.svg?react';
import './burger-menu.css';
import { useTranslation } from 'react-i18next';

interface BurgerMenuProps {
  onClick?: () => void;
}

export const BurgerMenu = ({ onClick }: BurgerMenuProps) => {
  const { t } = useTranslation('main');
  return (
    <button
      aria-label={t('nav.menu')}
      className="burgerMenuButton"
      type="button"
      onClick={onClick}
    >
      <BurgerMenuIcon
        className="burgerMenuIcon"
        data-testid="burger-menu-icon"
      />
    </button>
  );
};
