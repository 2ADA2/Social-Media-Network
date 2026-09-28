import BurgerMenuIcon from "@/shared/assets/icons/menu-burger.svg?react";
import "./burger-menu.css";

interface BurgerMenuProps {
  onClick?: () => void;
}

export const BurgerMenu = ({ onClick }: BurgerMenuProps) => {
  return (
    <button className="burgerMenuButton" type="button" onClick={ onClick }>
      <BurgerMenuIcon className="burgerMenuIcon"/>
    </button>
  );
};
