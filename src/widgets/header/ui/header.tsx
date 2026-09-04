import "./header.css";
import SidekickLogo from "@/shared/assets/icons/sidekick-logo.svg?react";
import { useState } from "react";
import { BurgerMenu } from "@/widgets/header/ui/burgerMenu/burgerMenu.tsx";
import { AuthButtons } from "@/widgets/header/ui/authButtons/authButtons.tsx";

export const Header = () => {
  const [auth] = useState<boolean>(true); // useAuth hook ( useContext ) in future

  return (
    <header className="header">
      <div className="headerLogo">
        <SidekickLogo/>
        <span>sidekick</span>
      </div>

      { auth ? <BurgerMenu/> : <AuthButtons/> }
    </header>
  );
};
