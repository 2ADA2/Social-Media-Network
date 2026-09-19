import { Tabs } from "@/shared/tabs";
import { useState } from "react";
import "./profile.css";

const TABS = [
  { id: 'info', label: 'Profile Info' },
  { id: 'stats', label: 'Statistics' },
];

export const ProfilePage = () => {
  const [activeTab, setActiveTab] = useState('info');
  // const [showMessage, setShowMessage] = useState(true);

  return (
    <div className="profile-page">
      <div className="tabs-container">
        <Tabs tabs={ TABS } activeTab={ activeTab } onChange={ setActiveTab }/>
      </div>

      <div className="profile-grid">
        { /* There will be Button and Input custom components */ }
        <div className="profile-column">
          <section>
            <h2>Preferences</h2>
            <button>theme switcher</button>
          </section>
          <section>
            <h2>Actions</h2>
            <button>logout</button>
          </section>
        </div>

        <div className='profile-column'>
          <section>
            <h1>Edit profile</h1>

            <div className='profile-row profile-avatar'>
            </div>
          </section>
        </div>

      </div>
    </div>
  );
};
