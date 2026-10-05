import "./profile-page.css";
import { useSearchParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Tabs } from "@/shared/ui/tabs";
import { ProfileInfo } from "@/pages/profile/profile-info";
import { Statistics } from "./statistics";

const ProfilePage = () => {
  const { t } = useTranslation('profile');
  const [searchParams, setSearchParams] = useSearchParams();
  const activeTab = searchParams.get('tab') === 'stats' ? 'stats' : 'info';

  const TABS = [
    { id: 'info', label: t('tabs.info') },
    { id: 'stats', label: t('tabs.stats') },
  ];

  const handleTabChange = (tab: string) => {
    setSearchParams({ tab });
  };

  return (
    <div className='profile-page'>
      <h1 hidden>{ t('title') }</h1>

      <div className='tabs-container'>
        <Tabs tabs={ TABS } activeTab={ activeTab } onChange={ handleTabChange }/>
      </div>

      { activeTab === 'info' && <ProfileInfo/> }
      { activeTab === 'stats' && <Statistics/> }

    </div>
  );
};

export default ProfilePage;
