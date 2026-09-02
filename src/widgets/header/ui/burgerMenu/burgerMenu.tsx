import BurgerMenuIcon from "@/shared/assets/icons/menu-burger.svg?react";
import styles from "./burgerMenu.module.css";

export const BurgerMenu = () => {
  return (
    <button className={ styles.burgerMenuButton }>
      <BurgerMenuIcon className={ styles.burgerMenuIcon }/>
    </button>
  );
};
