import "./NavBar.css";
import { useState } from "react";
import SidekickLogo from "@/shared/assets/icons/sidekick-logo.svg?react";

interface NavBarProps {
  setNavBar: () => void;
}

export const NavBar = ({ setNavBar }: NavBarProps) => {
  const [auth] = useState<boolean>(true); // use Auth

  return (
    <>
      <div className='nav-background' onClick={ () => setNavBar() }></div>
      <nav className='navbar' onClick={ () => setNavBar() }>
        <div className="nav-header-logo">
          <SidekickLogo/>
          <span>sidekick</span>
        </div>

        { !auth ? (
          <>
            <a href='/sign-in'>Sign in</a>
            <a href='/sign-in'>Sign up</a>
          </>
        ) : (
          <>
            <a href='/sign-in'>Profile</a>
            <a href='/sign-in'>Statistics</a>
          </>
        ) }
      </nav>
    </>
  );
};
