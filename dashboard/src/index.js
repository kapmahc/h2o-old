import i18n from 'i18next';
import XHR from 'i18next-xhr-backend';
import LanguageDetector from 'i18next-browser-languagedetector';

import './main.css';
import main from './main'

const LOCALE = 'locale';

i18n
  .use(XHR)
  .use(LanguageDetector)
  .init({
    backend: {
      loadPath: "/api/locales/{{lng}}",
      crossDomain: true,
    },
    detection: {
      // order and from where user language should be detected
      order: ['querystring', 'cookie', 'localStorage', 'navigator', 'htmlTag'],
      // keys or params to lookup language from
      lookupQuerystring: LOCALE,
      lookupCookie: LOCALE,
      lookupLocalStorage: LOCALE,
      // cache user language on
      caches: ['localStorage', 'cookie'],
      // optional expire and domain for set cookie
      cookieMinutes: 1<<32-1,
      // optional htmlTag with lang attribute, the default is:
      htmlTag: document.documentElement
    },
  }, (err, er)=>{
    main('root')
  });

  i18n.on('languageChanged', function(lng) {
    // set the moment locale with the current language
    // moment.locale(lng);
  });

  export default i18n;
