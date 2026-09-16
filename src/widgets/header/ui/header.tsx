import "./header.css";
import SidekickLogo from "@/shared/assets/icons/sidekick-logo.svg?react";
import { useState } from "react";
import { BurgerMenu } from "@/widgets/header/ui/burgerMenu/burgerMenu.tsx";
import { AuthButtons } from "@/widgets/header/ui/authButtons/authButtons.tsx";
import { NavBar } from "@/widgets/navbar";
import { UserNav } from "@/entities/UserNav";

export const Header = () => {
    const [auth] = useState<boolean>(false); // useAuth hook ( useContext ) in future
    const [isNavBar, setIsNavBar] = useState(false);

    const setNavBar = () => {
      setIsNavBar(!isNavBar);
    };

    return (
      <header className="header">
        <div className="headerLogo">
          <SidekickLogo/>
          <span>sidekick</span>
        </div>


        <div className='mobile-nav'>
          <BurgerMenu onClick={ setNavBar }/>
        </div>

        <div className='desktop-nav'>
          {auth ? <UserNav/>: <AuthButtons/>}
        </div>


        { isNavBar && <NavBar setNavBar={ () => setNavBar() }/> }
      </header>
    );
  }
;
