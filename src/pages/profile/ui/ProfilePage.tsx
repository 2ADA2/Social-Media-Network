import "./ProfilePage.css";
import { Tabs } from "@/shared/ui/Tabs";
import { useState } from "react";
import { ProfileInfo } from "@/pages/profile/ui/ProfileInfo/ProfileInfo.tsx";
import { Statistics } from "@/pages/profile/ui/Statistics/Statistics.tsx";
import { useLocation } from "react-router-dom";

const TABS = [
  { id: 'info', label: 'Profile Info' },
  { id: 'stats', label: 'Statistics' },
];

export const ProfilePage = () => {
  const location = useLocation();

  const [activeTab, setActiveTab] = useState(() => {
    const params = new URLSearchParams(location.search);
    return params.get('tab') === 'stats' ? 'stats' : 'info';
  });


  return (
    <div className='profile-page'>
      <h1 hidden>Edit profile</h1>

      <div className='tabs-container'>
        <Tabs tabs={ TABS } activeTab={ activeTab } onChange={ setActiveTab }/>
      </div>

      { activeTab === 'info' && <ProfileInfo/> }
      { activeTab === 'stats' && <Statistics/> }

    </div>
  );
};
