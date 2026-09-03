import BurgerMenuIcon from "@/shared/assets/icons/menu-burger.svg?react";
import "./burgerMenu.css";

export const BurgerMenu = () => {
  return (
    <button className="burgerMenuButton">
      <BurgerMenuIcon className="burgerMenuIcon"/>
    </button>
  );
};
