"use client";

import { useTranslation } from "react-i18next";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronDown } from "lucide-react";

const Navbar = () => {
  const { t, i18n } = useTranslation();
  const [lang, setLang] = useState("uz");
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

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
    localStorage.setItem("lang", lng);
    setLang(lng);
    setIsDropdownOpen(false);
  };

  return (
    <nav
      className={`fixed top-0 left-0 overflow-hidden shadow-md border-b-2 rounded-b-2xl border-black/20 right-0 z-[999] transition-all duration-300 ${
        isScrolled ? "bg-[#22C55E]" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto p-2 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <Link href="/" className="flex-shrink-0 flex items-center">
            <Image
              src="/1.png"
              alt="FAXR TRAVEL Logo"
              width={200}
              height={100}
              className="rounded-full transition-all duration-300"
            />
          </Link>

          <div className="hidden md:block">
            <ul className="flex space-x-8">
              {["about", "services", "trips", "contact"].map((item) => (
                <li key={item}>
                  <button
                    onClick={() =>
                      document
                        .getElementById(item)
                        ?.scrollIntoView({ behavior: "smooth" })
                    }
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

          <div className="relative">
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="flex items-center bg-white text-green-500 text-sm rounded-md border border-green-500 px-4 py-2 cursor-pointer transition duration-150 ease-in-out hover:bg-green-50"
            >
              {lang.toUpperCase()} <ChevronDown className="w-4 h-4 ml-2" />
            </button>

            {isDropdownOpen && (
              <ul className="absolute left-0 mt-1 w-full bg-white border border-green-500 rounded-lg shadow-md z-10">
                {["uz", "ru", "en"].map((lng) => (
                  <li
                    key={lng}
                    onClick={() => changeLanguage(lng)}
                    className="p-2 text-green-600 rounded-lg hover:bg-green-500 hover:text-white cursor-pointer"
                  >
                    {lng.toUpperCase()}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
