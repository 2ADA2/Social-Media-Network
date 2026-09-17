import "./header.css";
import SidekickLogo from "@/shared/assets/icons/sidekick-logo.svg?react";
import { type ReactNode, useState } from "react";
import { BurgerMenu } from "@/widgets/header/ui/burgerMenu/burgerMenu.tsx";
import { AuthButtons } from "@/widgets/header/ui/authButtons/authButtons.tsx";
import { NavBar } from "@/widgets/navbar";
import { UserNav } from "@/entities/UserNav";
import { useAuth } from "@/features/auth";

export interface HeaderProps {
  hiddenNav?: boolean;
}

export const Header = ({ hiddenNav = false }: HeaderProps) => {
  const auth = useAuth();
  const [isNavBar, setIsNavBar] = useState(false);

  const setNavBar = () => {
    setIsNavBar(!isNavBar);
  };

  const hideNav = (): ReactNode => {
    if (hiddenNav) {
      return <div></div>;
    }

    return (
      <>
        <div className='mobile-nav'>
          <BurgerMenu onClick={ setNavBar }/>
        </div>

        <div className='desktop-nav'>
          { auth ? <UserNav/> : <AuthButtons/> }
        </div>
      </>
    );
  };

  return (
    <header className="header">
      <div className="headerLogo">
        <SidekickLogo/>
        <span>sidekick</span>
      </div>

      { hideNav() }

      { isNavBar && <NavBar setNavBar={ () => setNavBar() }/> }
    </header>
  );
};
