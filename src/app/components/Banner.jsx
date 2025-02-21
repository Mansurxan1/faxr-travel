"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import useHomeStore from "@s/store/homeStore";
import { useTranslation } from "react-i18next";

const Banner = () => {
  const slides = useHomeStore((state) => state.slides);
  const { t, i18n } = useTranslation();

  return (
    <div className="relative w-full h-[600px] md:h-[700px] lg:h-screen">
      <Swiper
        modules={[Pagination, Autoplay]}
        pagination={{
          clickable: true,
          bulletActiveClass: "swiper-pagination-bullet-active",
        }}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        loop={true}
        className="w-full h-full"
      >
        {slides.map((slide) => (
          <SwiperSlide
            key={slide.id}
            className="relative flex items-center justify-start text-white"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-black/30 to-black/10 z-10" />
            <img
              src={slide.image || "/placeholder.svg"}
              alt={slide.textEng}
              className="absolute top-0 left-0 w-full h-full object-cover"
              loading="lazy"
            />
            <div className="relative z-20 px-6 md:px-12 lg:px-24 pt-40 md:pt-72 lg:pt-40 max-w-4xl">
              <h2 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight mb-6">
                {i18n.language === "uz"
                  ? slide.textUz
                  : i18n.language === "ru"
                  ? slide.textRu
                  : slide.textEng}
              </h2>
              <p className="text-xl md:text-2xl font-light mb-8 opacity-90">
                {i18n.language === "uz"
                  ? slide.descUz
                  : i18n.language === "ru"
                  ? slide.descRu
                  : slide.descEng}
              </p>
              {slide.price && (
                <div className="inline-flex items-center gap-2 bg-green-600 backdrop-blur-sm px-6 py-3 rounded-full">
                  <span className="text-xl font-semibold">{slide.price} $</span>
                </div>
              )}
              <div className="absolute">{t("all")}</div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <style jsx global>{`
        .swiper-paginetion {
          color: #fff;
        }
        .swiper-pagination-bullet {
          color: white !important;
          width: 10px !important;
          height: 10px !important;
          transition: all 0.3s ease;
        }

        .swiper-pagination-bullet-active {
          background-color: #22c55e !important; /* green-500 */
          width: 14px !important;
          height: 14px !important;
        }
      `}</style>
    </div>
  );
};

export default Banner;
