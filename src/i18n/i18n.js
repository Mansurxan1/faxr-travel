import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
  uz: {
    translation: {
      home: "Bosh sahifa",
      about: "Biz haqimizda",
      services: "Xizmatlar",
      contact: "Aloqa",
      trips: "Sayohatlar",
      day: "kun",
      all: "Batafsil",
    },
  },
  ru: {
    translation: {
      home: "Главная",
      about: "О нас",
      services: "Услуги",
      contact: "Контакты",
      trips: "Путешествия",
      day: "день",
      all: "Узнать больше",
    },
  },
  en: {
    translation: {
      home: "Home",
      about: "About",
      services: "Services",
      contact: "Contact",
      trips: "Trips",
      day: "day",
      all: "Learn more",
    },
  },
};

const defaultLang =
  typeof window !== "undefined" ? localStorage.getItem("lang") || "uz" : "uz";

i18n.use(initReactI18next).init({
  resources,
  lng: defaultLang,
  fallbackLng: "uz",
  interpolation: { escapeValue: false },
});

export default i18n;
