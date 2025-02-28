"use client";

import React from "react";
import useHomeStore from "@s/store/homeStore";
import { useTranslation } from "react-i18next";

const TourDetails = ({ id, onClose }) => {
  const { slides } = useHomeStore();
  const { t, i18n } = useTranslation();
  const lang = i18n.language || "uz"; // Consistent with Banner
  const slide = slides.find((s) => s.id === id);

  if (!slide) {
    return (
      <div className="container mx-auto py-12 px-6 bg-gray-100">
        <p className="text-center text-gray-800">{t("not_found")}</p>
      </div>
    );
  }

  // Centralized function to get language-specific text, like Banner
  const getSlideText = () => {
    return {
      title:
        lang === "uz"
          ? slide.textUz
          : lang === "ru"
          ? slide.textRu
          : slide.textEng,
      desc:
        lang === "uz"
          ? slide.descUz
          : lang === "ru"
          ? slide.descRu
          : slide.descEng,
      visa:
        lang === "uz"
          ? slide.visaUz
          : lang === "ru"
          ? slide.visaRu
          : slide.visaEng,
      hotels: slide.hotels.map((hotel) => ({
        name:
          lang === "uz"
            ? hotel.nameUz
            : lang === "ru"
            ? hotel.nameRu
            : hotel.nameEng,
        price: hotel.price,
      })),
      priceIncludes: slide.priceIncludes[lang] || slide.priceIncludes.uz,
      additionalPayments:
        slide.additionalPayments[lang] || slide.additionalPayments.uz,
    };
  };

  const { title, desc, visa, hotels, priceIncludes, additionalPayments } =
    getSlideText();

  const handleBuyNow = () => {
    console.log(`Buying tour with ID: ${id}`);
  };

  return (
    <section className="min-h-screen mt-[100px] bg-gradient-to-br from-green-100 via-white to-green-50 p-10">
      <div className="max-w-5xl mx-auto">
        <div className="relative w-full h-[60vh] rounded-2xl overflow-hidden shadow-2xl transform transition-all hover:shadow-3xl">
          <img
            src={slide.image}
            alt={title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-green-900/70 to-transparent flex items-end p-6">
            <h2 className="text-4xl md:text-5xl font-extrabold text-white drop-shadow-lg">
              {title}
            </h2>
          </div>
        </div>

        <p className="text-gray-700 text-lg md:text-xl mt-8 mb-10 leading-relaxed max-w-3xl mx-auto text-center">
          {desc}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
          <div className="bg-white/80 backdrop-blur-md p-6 rounded-xl shadow-lg border border-green-200">
            <p className="text-2xl font-semibold text-green-800 mb-2">
              {t("price")}:{" "}
              <span className="text-green-600">
                {slide.price} {t("sum")}
              </span>
            </p>
            <p className="text-lg text-gray-600">
              {t("duration")}: {slide.day} {t("day")}
            </p>
          </div>
          <div className="bg-white/80 backdrop-blur-md p-6 rounded-xl shadow-lg border border-green-200">
            <h3 className="text-xl font-semibold text-green-800 mb-2">
              {t("visa")}
            </h3>
            <p className="text-gray-600">{visa}</p>
          </div>
        </div>

        <div className="bg-white/80 backdrop-blur-md p-6 rounded-xl shadow-lg border border-green-200 mb-10">
          <h3 className="text-xl font-semibold text-green-800 mb-4">
            {t("hotels")}
          </h3>
          <ul className="list-none pl-0 text-gray-600">
            {hotels.map((hotel, index) => (
              <li key={index} className="mb-3 flex items-center">
                <span className="w-2 h-2 bg-green-600 rounded-full mr-3"></span>
                {hotel.name} -{" "}
                <span className="text-green-600 font-medium">
                  {hotel.price} $
                </span>
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-white/80 backdrop-blur-md p-6 rounded-xl shadow-lg border border-green-200 mb-10">
          <h3 className="text-xl font-semibold text-green-800 mb-4">
            {t("price_includes")}
          </h3>
          <ul className="list-none pl-0 text-gray-600">
            {priceIncludes.map((item, index) => (
              <li key={index} className="mb-3 flex items-center">
                <span className="w-2 h-2 bg-green-600 rounded-full mr-3"></span>
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-white/80 backdrop-blur-md p-6 rounded-xl shadow-lg border border-green-200 mb-10">
          <h3 className="text-xl font-semibold text-green-800 mb-4">
            {t("additional_payments")}
          </h3>
          <ul className="list-none pl-0 text-gray-600">
            {additionalPayments.map((item, index) => (
              <li key={index} className="mb-3 flex items-center">
                <span className="w-2 h-2 bg-green-600 rounded-full mr-3"></span>
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div className="flex flex-col sm:flex-row gap-6 mt-12 max-w-2xl mx-auto">
          <button
            onClick={onClose}
            className="w-full bg-white text-green-700 border-2 border-green-700 py-4 rounded-xl hover:bg-green-50 hover:shadow-lg transition-all duration-300 font-semibold text-lg shadow-md"
          >
            {t("back")}
          </button>
          <button
            onClick={handleBuyNow}
            className="w-full bg-gradient-to-r from-green-600 to-green-800 text-white py-4 rounded-xl hover:from-green-700 hover:to-green-900 hover:shadow-lg transition-all duration-300 font-semibold text-lg shadow-md"
          >
            {t("purchase")}
          </button>
        </div>
      </div>
    </section>
  );
};

export default TourDetails;
