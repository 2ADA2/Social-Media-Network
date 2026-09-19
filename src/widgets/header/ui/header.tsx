import "./header.css";
import SidekickLogo from "@/shared/assets/icons/sidekick-logo.svg?react";
import { useState } from "react";
import { BurgerMenu } from "@/widgets/header/ui/burgerMenu/burgerMenu.tsx";
import { AuthButtons } from "@/widgets/header/ui/authButtons/authButtons.tsx";
import { NavBar } from "@/widgets/navbar";
import { UserNav } from "@/entities/UserNav";

export interface HeaderProps {
  hiddenNav?: boolean;
}

export const Header = ({ hiddenNav = false }: HeaderProps) => {
    const [auth] = useState<boolean>(true); // useAuth hook ( useContext ) in future
    const [isNavBar, setIsNavBar] = useState(false);

    const setNavBar = () => {
      setIsNavBar(!isNavBar);
    };

    const hideNav = () => {
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

          { isNavBar && <NavBar setNavBar={ () => setNavBar() }/> }
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
      </header>
    );
  }
;
