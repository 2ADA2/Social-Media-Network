import "./main-header.css";
import SidekickLogo from "@/shared/assets/icons/sidekick-logo.svg?react";
import { useState } from "react";
import { BurgerMenu } from "@/app/layouts/main-layout/main-header/burger-menu";
import { AuthButtons } from "@/app/layouts/main-layout/main-header/auth-buttons";
import { useAuth } from "@/entities/user/model/use-auth.tsx";
import { ROUTES } from "@/shared/config/routes.ts";
import { Link } from "react-router-dom";
import { NavBar } from "@/app/layouts/main-layout/main-header/navbar";
import { UserNav } from "@/app/layouts/main-layout/main-header/user-nav";


export interface HeaderProps {
  hiddenNav?: boolean;
}

export const MainHeader = ({ hiddenNav = false }: HeaderProps) => {
    const { isAuth } = useAuth();
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
            { isAuth ? <UserNav/> : <AuthButtons/> }
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
