import "./header.css";
import SidekickLogo from "@/shared/assets/icons/sidekick-logo.svg?react";
import { useState } from "react";
import { BurgerMenu } from "@/widgets/header/ui/burgerMenu/burgerMenu.tsx";
import { AuthButtons } from "@/widgets/header/ui/authButtons/authButtons.tsx";
import { NavBar } from "@/widgets/navbar";
import { UserNav } from "@/entities/UserNav";
import { useAuth } from "@/features/auth";
import { ROUTES } from "@/shared/config/routes.ts";
import { Link } from "react-router-dom";

export interface HeaderProps {
  hiddenNav?: boolean;
}

export const Header = ({ hiddenNav = false }: HeaderProps) => {
    const auth = useAuth();
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
        <Link to={ROUTES.HOME} className="headerLogo">
          <SidekickLogo/>
          <span>sidekick</span>
        </Link>

        { hideNav() }
      </header>
    );
  }
;
