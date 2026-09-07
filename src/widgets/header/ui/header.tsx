import "./header.css";
import SidekickLogo from "@/shared/assets/icons/sidekick-logo.svg?react";
import { type ReactNode, useState } from "react";
import { BurgerMenu } from "@/widgets/header/ui/burgerMenu/burgerMenu.tsx";
import { AuthButtons } from "@/widgets/header/ui/authButtons/authButtons.tsx";

export interface HeaderProps {
  hiddenNav?: boolean;
}

export const Header = ({ hiddenNav = false }: HeaderProps) => {
  const [auth] = useState<boolean>(true); // useAuth hook ( useContext ) in future

  const renderNav: () => ReactNode | null = () => {
    if (hiddenNav) {
      return null;
    }

    return auth ? <BurgerMenu/> : <AuthButtons/>;
  };

  return (
    <header className="header">
      <div className="headerLogo">
        <SidekickLogo/>
        <span>sidekick</span>
      </div>
      { renderNav() }
    </header>
  );
};
