import "./ProfilePage.css";
import { Tabs } from "@/shared/ui/Tabs";
import { useState } from "react";

const TABS = [
  { id: 'info', label: 'Profile Info' },
  { id: 'stats', label: 'Statistics' },
];

export const ProfilePage = () => {
  const [activeTab, setActiveTab] = useState('info');
  const [showMessage, setShowMessage] = useState(true);

  return (
    <div className='profile-page'>
      <div className='tabs-container'>
        <Tabs tabs={ TABS } activeTab={ activeTab } onChange={ setActiveTab }/>
      </div>
    </div>
  );
};
