import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

import translationEN from "./locales/eng.json";
import translationUZ from "./locales/uz.json";
import translationRU from "./locales/ru.json";

const resources = {
  en: { translation: translationEN },
  uz: { translation: translationUZ },
  ru: { translation: translationRU },
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: "uz", // Agar til aniqlanmasa, "uz" standart bo‘ladi
    interpolation: { escapeValue: false },
    detection: {
      order: ["cookie", "localStorage", "navigator"],
      caches: ["cookie", "localStorage"],
    },
  });

export default i18n;
