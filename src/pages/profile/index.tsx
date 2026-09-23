import "./profile-page.css";
import { Tabs } from "../../shared/ui/tabs";
import { ProfileInfo } from "@/pages/profile/profile-info";
import { Statistics } from "./statistics";
import { useSearchParams } from "react-router-dom";

const TABS = [
  { id: 'info', label: 'Profile Info' },
  { id: 'stats', label: 'Statistics' },
];

export const ProfilePage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const activeTab = searchParams.get('tab') === 'stats' ? 'stats' : 'info';

  const handleTabChange = (tab: string) => {
    setSearchParams({ tab });
  };

  return (
    <div className='profile-page'>
      <h1 hidden>Edit profile</h1>

      <div className='tabs-container'>
        <Tabs tabs={ TABS } activeTab={ activeTab } onChange={ handleTabChange }/>
      </div>

      { activeTab === 'info' && <ProfileInfo/> }
      { activeTab === 'stats' && <Statistics/> }

    </div>
  );
};
