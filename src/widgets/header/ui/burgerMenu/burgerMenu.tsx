import BurgerMenuIcon from "@/shared/assets/icons/menu-burger.svg?react";
import "./burgerMenu.css";

export const BurgerMenu = () => {
  return (
    <button className="burgerMenuButton" type="button">
      <BurgerMenuIcon className="burgerMenuIcon"/>
    </button>
  );
};
