import i18n from "i18next";
import enLng from "./locales/en/translation.json";
import uaLng from "./locales/uk/translation.json";
import { initReactI18next } from "react-i18next";
import LanguageDetector from 'i18next-browser-languagedetector';

const resources = {
  en: {
    translation: enLng,
  },
  ua: {
    translation: uaLng,
  },
};

i18n
.use(LanguageDetector)
.use(initReactI18next).init({
  resources,
  fallbackLng: "ua",

  //keySeparator: false,

  interpolation: {
    escapeValue: false, // react already safes from xss
  },
});

export default i18n;