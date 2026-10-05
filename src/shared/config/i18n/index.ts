import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import enCommon from './locales/en/common.json';
import enAuth from './locales/en/auth.json';
import enNotFound from './locales/en/not-found.json';

import ruCommon from './locales/ru/common.json';
import ruAuth from './locales/ru/auth.json';
import ruNotFound from './locales/ru/not-found.json';

i18n
  .use(initReactI18next)
  .init({
    fallbackLng: 'ru',
    supportedLngs: ['en', 'ru'],
    defaultNS: 'common',
    resources: {
      en: {
        common: enCommon,
        auth: enAuth,
        'not-found': enNotFound,
      },
      ru: {
        common: ruCommon,
        auth: ruAuth,
        'not-found': ruNotFound,
      },
    },
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage'],
      lookupLocalStorage: 'i18nextLng',
    },
    interpolation: { escapeValue: false },
  });

i18n.on('languageChanged', (lng) => {
  document.documentElement.lang = lng;
});

export default i18n;
