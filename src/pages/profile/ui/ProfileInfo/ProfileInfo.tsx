import { ThemeSwitcher } from "@/features/ui/ThemeSwitcher";
import { Button } from "@/shared/ui/Button";
import { EditProfile } from "@/widgets/editProfile";
import "./ProfileInfo.css";

export const ProfileInfo = () => {
  const logout = () => {
    console.log("Logout");
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
