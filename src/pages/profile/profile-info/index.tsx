import { ThemeSwitcher } from "@/features/theme-switcher";
import { Button } from "@/shared/ui/button";
import { EditProfile } from "./edit-profile";
import "./profile-info.css";
import { useContext } from "react";
import { UserContext } from "@/entities/user";

export const ProfileInfo = () => {
  const context = useContext(UserContext);
  const logout = () => {
    localStorage.removeItem("token");
    context?.setIsAuth(false);
  };

  return (
    <div className='profile-grid'>
      <div className='profile-column profile-info'>
        <section>
          <h2>Preferences</h2>
          <div className='switcher-container'>
            <ThemeSwitcher/> Dark theme
          </div>
        </section>
        <section>
          <h2>Actions</h2>
          <Button className='logout-button' onClick={ logout }>Logout</Button>
        </section>
      </div>

      <div className='profile-edit-section'>
        <EditProfile/>
      </div>
    </div>
  );
};
