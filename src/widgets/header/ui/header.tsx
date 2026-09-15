import "./header.css";
import SidekickLogo from "@/shared/assets/icons/sidekick-logo.svg?react";
import { useState } from "react";
import { BurgerMenu } from "@/widgets/header/ui/burgerMenu/burgerMenu.tsx";
import { AuthButtons } from "@/widgets/header/ui/authButtons/authButtons.tsx";
import { NavBar } from "@/widgets/navbar/ui/NavBar.tsx";

export const Header = () => {
    const [auth] = useState<boolean>(true); // useAuth hook ( useContext ) in future
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

        { auth ? <BurgerMenu onClick={ setNavBar }/> : <AuthButtons/> }
        { isNavBar && <NavBar setNavBar={ () => setNavBar() }/> }
      </header>
    );
  }
;
