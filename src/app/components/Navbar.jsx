"use client";

import { useTranslation } from "react-i18next";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

const Navbar = () => {
  const { t, i18n } = useTranslation();
  const [lang, setLang] = useState("uz"); // Default til
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedLang = localStorage.getItem("lang") || "uz";
      i18n.changeLanguage(storedLang);
      setLang(storedLang);
    }
  }, [i18n]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    if (typeof window !== "undefined") {
      localStorage.setItem("lang", lng);
    }
    setLang(lng);
  };

  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav
      className={`fixed top-0 left-0 shadow-md border-b-2 rounded-b-2xl border-black/20 right-0 z-[999] transition-all duration-300 ${
        isScrolled ? "bg-green-500" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <Link href={"/"} className="flex-shrink-0 flex items-center">
            <Image
              src="/2.jpg"
              alt="FAXR TRAVEL Logo"
              width={50}
              height={50}
              className="rounded-full border-2 shadow-xl"
            />
          </Link>
          <div className="hidden md:block">
            <ul className="flex space-x-8">
              {["about", "services", "trips", "contact"].map((item) => (
                <li key={item}>
                  <button
                    onClick={() => scrollToSection(item)}
                    className={`px-3 py-2 rounded-md text-sm font-medium transition duration-150 ease-in-out ${
                      isScrolled
                        ? "text-white hover:text-black"
                        : "text-white hover:text-black"
                    }`}
                  >
                    {t(item)}
                  </button>
                </li>
              ))}
            </ul>
          </div>
          <div className="flex items-center space-x-4">
            <select
              value={lang}
              onChange={(e) => changeLanguage(e.target.value)}
              className="bg-white text-green-500 text-sm rounded-md border border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 block p-2.5 cursor-pointer transition duration-150 ease-in-out hover:bg-green-50"
            >
              <option className="bg-white text-black" value="uz">
                UZ
              </option>
              <option className="bg-white text-black" value="ru">
                RU
              </option>
              <option className="bg-white text-black" value="en">
                EN
              </option>
            </select>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
