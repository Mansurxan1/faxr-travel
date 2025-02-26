"use client";

import { useTranslation } from "react-i18next";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ChevronDown, Menu, User, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import ProfileModal from "./ui/ProfileModal";
import LoginModal from "./LoginModal";

const Navbar = () => {
  const { t, i18n } = useTranslation();
  const [lang, setLang] = useState("uz");
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedLang = localStorage.getItem("lang") || "uz";
      const storedUser = localStorage.getItem("user");
      i18n.changeLanguage(storedLang);
      setLang(storedLang);
      if (storedUser) setUser(JSON.parse(storedUser));
    }
  }, [i18n]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (
      (isMenuOpen || isLoginModalOpen || isProfileOpen) &&
      typeof window !== "undefined"
    ) {
      document.body.classList.add("overflow-hidden");
    } else if (typeof window !== "undefined") {
      document.body.classList.remove("overflow-hidden");
    }
    return () => {
      if (typeof window !== "undefined") {
        document.body.classList.remove("overflow-hidden");
      }
    };
  }, [isMenuOpen, isLoginModalOpen, isProfileOpen]);

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    localStorage.setItem("lang", lng);
    setLang(lng);
    if (isMenuOpen) setIsMenuOpen(false);
  };

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
    if (isLoginModalOpen || isProfileOpen) {
      setIsLoginModalOpen(false);
      setIsProfileOpen(false);
    }
  };

  const openLoginModal = () => {
    setIsLoginModalOpen(true);
    setIsProfileOpen(false);
    if (isMenuOpen) setIsMenuOpen(false);
    document.body.classList.add("overflow-hidden");
  };

  const closeLoginModal = () => {
    setIsLoginModalOpen(false);
    document.body.classList.remove("overflow-hidden");
  };

  const openProfileModal = () => {
    setIsProfileOpen(true);
    setIsLoginModalOpen(false);
    if (isMenuOpen) setIsMenuOpen(false);
    document.body.classList.add("overflow-hidden");
  };

  const closeProfileModal = () => {
    setIsProfileOpen(false);
    document.body.classList.remove("overflow-hidden");
  };

  const handleLoginSuccess = (userData) => {
    setUser(userData);
    closeLoginModal();
    openProfileModal();
  };

  const handleProfileClick = () => {
    if (user) {
      openProfileModal();
    } else {
      openLoginModal();
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setUser(null);
    closeProfileModal();
    router.push("/");
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-[999] shadow-md border-b-2 rounded-b-2xl border-black/20 transition-all duration-300 ${
        isScrolled ? "bg-[#22C55E]" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto p-2 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 md:h-20">
          <Link href="/" className="flex-shrink-0 flex items-center">
            <Image
              src="/1.png"
              alt="FAXR TRAVEL Logo"
              width={120}
              height={80}
              className="rounded-full transition-all duration-300 md:w-[200px] md:h-[170px]"
            />
          </Link>
          <div className="hidden lg:block">
            <ul className="flex space-x-8">
              {["about", "services", "trips", "contact"].map((item) => (
                <li key={item}>
                  <button
                    onClick={() =>
                      document
                        .getElementById(item)
                        ?.scrollIntoView({ behavior: "smooth" })
                    }
                    className={`relative px-4 py-2 rounded-full text-sm font-semibold transition-all duration-300 ease-in-out ${
                      isScrolled
                        ? "text-white hover:text-black hover:bg-white/20"
                        : "text-white hover:text-black hover:bg-white/10"
                    }`}
                  >
                    {t(item)}
                    <span className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-white transition-all duration-300 ease-in-out group-hover:w-full group-hover:left-0" />
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex items-center space-x-2 md:space-x-4">
            <div className="relative group">
              <button
                onClick={() => {
                  if (isMenuOpen) setIsMenuOpen(false);
                }}
                className="flex items-center bg-white text-green-500 text-sm rounded-md border border-green-500 px-2 md:px-4 py-1 md:py-2 transition duration-150 ease-in-out hover:bg-green-50"
              >
                {lang.toUpperCase()}
                <ChevronDown className="w-3 h-3 md:w-4 md:h-4 ml-1 md:ml-2" />
              </button>
              <ul className="absolute left-0 w-20 bg-white border border-green-500 rounded-lg shadow-md z-10 opacity-0 group-hover:opacity-100 group-hover:visible invisible transition-opacity duration-200">
                {["uz", "ru", "en"].map((lng) => (
                  <li
                    key={lng}
                    onClick={() => changeLanguage(lng)}
                    className="p-2 text-green-600 rounded-lg hover:bg-green-500 hover:text-white cursor-pointer text-center"
                  >
                    {lng.toUpperCase()}
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex items-center">
              <button
                onClick={handleProfileClick}
                className={`flex items-center gap-1 md:gap-2 px-2 md:px-3 py-1 md:py-2 rounded-md text-sm font-medium transition duration-150 ease-in-out ${
                  isScrolled
                    ? "text-white hover:text-black hover:bg-white/20"
                    : "text-white hover:text-black hover:bg-white/10"
                }`}
              >
                <User className="w-4 h-4 md:w-5 md:h-5" />
                <span className="hidden md:inline">
                  {user ? t("profile") : t("login")}
                </span>
              </button>
            </div>
            <div className="lg:hidden">
              <button
                onClick={toggleMenu}
                className="px-2 rounded-md text-white hover:bg-white/20 transition duration-150 ease-in-out"
              >
                {isMenuOpen ? (
                  <X className="w-6 h-6" />
                ) : (
                  <Menu className="w-6 h-6" />
                )}
              </button>

              {isMenuOpen && (
                <>
                  <div
                    className="fixed inset-0 bg-black/50 z-40"
                    onClick={toggleMenu}
                  />
                  <ul className="absolute right-4 top-16 w-48 bg-white border border-green-500 rounded-lg shadow-md z-50 transition-all">
                    {["about", "services", "trips", "contact"].map((item) => (
                      <li
                        key={item}
                        onClick={() => {
                          document
                            .getElementById(item)
                            ?.scrollIntoView({ behavior: "smooth" });
                          setIsMenuOpen(false);
                        }}
                        className="p-3 text-green-600 hover:bg-green-500 hover:text-white cursor-pointer transition-all duration-150 ease-in-out flex items-center space-x-2"
                      >
                        <span className="w-1.5 h-1.5 bg-green-500 rounded-full" />
                        <span>{t(item)}</span>
                      </li>
                    ))}
                  </ul>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={closeLoginModal}
        onLoginSuccess={handleLoginSuccess}
      />

      <AnimatePresence>
        {isProfileOpen && user && (
          <ProfileModal
            user={user}
            onClose={closeProfileModal}
            onLogout={handleLogout}
          />
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
