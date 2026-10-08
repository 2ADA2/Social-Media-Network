import { useTranslation } from 'react-i18next';
import { Toggle } from '@/shared/ui/toggle';
import "./language-switcher.css";

export const LanguageSwitcher = () => {
  const { i18n } = useTranslation();
  const isEn = i18n.language === 'en';

  return (
    <div className='language-switcher'>
      RU
      <Toggle
        checked={ isEn }
        onChange={ () => i18n.changeLanguage(isEn ? 'ru' : 'en') }
      />
      EN
    </div>
  );
};
