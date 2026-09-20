import { ThemeSwitcher } from "@/features/ui/ThemeSwitcher";
import { Button } from "@/shared/ui/Button";
import { EditProfile } from "@/widgets/edit-profile";
import "./profile-info.css";
import { useContext } from "react";
import { UserContext } from "@/entities/user";

export const ProfileInfo = () => {
  const context = useContext(UserContext);
  const logout = () => {
    localStorage.removeItem("user");
    context?.setIsAuth(false);
  };

  return (
    <div className='profile-grid'>
      <div className='profile-column'>
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
