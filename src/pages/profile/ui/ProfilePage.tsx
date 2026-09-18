import "./ProfilePage.css";
import { Tabs } from "@/shared/ui/Tabs";
import { useState } from "react";
import { ThemeSwitcher } from "@/features/ui/ThemeSwitcher";
import { Button } from "@/shared/ui/Button";
import { EditProfile } from "@/widgets/editProfile";

const TABS = [
  { id: 'info', label: 'Profile Info' },
  { id: 'stats', label: 'Statistics' },
];

export const ProfilePage = () => {
  const [activeTab, setActiveTab] = useState('info');

  const logout = () => {
    console.log("Logout");
  };

  return (
    <div className='profile-page'>
      <h1 hidden>Edit profile</h1>

      <div className='tabs-container'>
        <Tabs tabs={ TABS } activeTab={ activeTab } onChange={ setActiveTab }/>
      </div>

      <div className='profile-column'>
        <section>
          <h2>Preferences</h2>
          <div className='switcher-container'>
            <ThemeSwitcher/> Dark theme
          </div>
        </section>
        <section>
          <h2>Actions</h2>
          <Button onClick={ logout }>Logout</Button>
        </section>
      </div>

      <div className='profile-column'>
        <EditProfile/>
      </div>
    </div>
  );
};
