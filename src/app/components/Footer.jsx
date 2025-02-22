"use client";

import Link from "next/link";
import Image from "next/image";
import { useTranslation } from "react-i18next";
import { FaInstagram, FaPhoneAlt, FaTelegram } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { motion } from "framer-motion";

export default function Footer() {
  const { t } = useTranslation();

  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 },
  };

  return (
    <footer className="bg-green-600 border-t border-green-500 shadow-2xl text-white">
      <div className="container mx-auto px-4 py-8 sm:py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-12">
          <motion.div
            className="space-y-4 sm:space-y-6 flex flex-col items-center sm:items-start"
            {...fadeInUp}
          >
            <Link
              href="/"
              className="block transition-opacity flex items-center hover:opacity-80"
            >
              <Image
                src="/logo.png"
                alt="Faxr Travel"
                width={80}
                height={64}
                className="w-auto h-12 sm:h-16"
                priority
              />
            </Link>
            <div className="flex items-start space-x-3">
              <FaLocationDot className="w-5 h-5 mt-1 flex-shrink-0 text-white" />
              <p className="text-sm leading-relaxed">{t("address")}</p>
            </div>
            <div className="flex items-center space-x-3">
              <FaPhoneAlt className="w-5 h-5 text-white" />
              <a
                href="tel:+998953120202"
                className="text-sm hover:underline transition-colors duration-300"
              >
                {t("phone")}
              </a>
            </div>
          </motion.div>

          <motion.div className="space-y-4 sm:space-y-6" {...fadeInUp}>
            <h3 className="font-semibold text-lg sm:text-xl text-white">
              {t("footer.navigation")}
            </h3>
            <nav className="flex flex-col space-y-2 sm:space-y-3">
              <Link
                href="/about"
                className="text-sm hover:text-green-200 transition-colors duration-300"
              >
                {t("footer.about")}
              </Link>
              <Link
                href="/tours"
                className="text-sm hover:text-green-200 transition-colors duration-300"
              >
                {t("footer.tours")}
              </Link>
              <Link
                href="/services"
                className="text-sm hover:text-green-200 transition-colors duration-300"
              >
                {t("footer.services")}
              </Link>
              <Link
                href="/contact"
                className="text-sm hover:text-green-200 transition-colors duration-300"
              >
                {t("footer.contact")}
              </Link>
            </nav>
          </motion.div>

          <motion.div className="space-y-4 sm:space-y-6" {...fadeInUp}>
            <h3 className="font-semibold text-lg sm:text-xl text-white">
              {t("footer.legal")}
            </h3>
            <nav className="flex flex-col space-y-2 sm:space-y-3">
              <Link
                href="/terms"
                className="text-sm hover:text-green-200 transition-colors duration-300"
              >
                {t("footer.terms")}
              </Link>
              <Link
                href="/privacy"
                className="text-sm hover:text-green-200 transition-colors duration-300"
              >
                {t("footer.privacy")}
              </Link>
              <Link
                href="/customer-agreement"
                className="text-sm hover:text-green-200 transition-colors duration-300"
              >
                {t("footer.agreement")}
              </Link>
            </nav>
          </motion.div>

          <motion.div
            className="space-y-4 sm:space-y-6 flex flex-col items-center sm:items-start"
            {...fadeInUp}
          >
            <h3 className="font-semibold text-lg sm:text-xl text-white">
              {t("social_media")}
            </h3>
            <div className="flex space-x-6">
              <a
                href="https://instagram.com/faxr.travel"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:opacity-80 transition-opacity duration-300"
              >
                <FaInstagram className="w-7 h-7 sm:w-8 sm:h-8 text-white" />
                <span className="sr-only">Instagram</span>
              </a>
              <a
                href="https://t.me/faxrtravel"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:opacity-80 transition-opacity duration-300"
              >
                <FaTelegram className="w-7 h-7 sm:w-8 sm:h-8 text-white" />
                <span className="sr-only">Telegram</span>
              </a>
            </div>
          </motion.div>
        </div>

        <motion.div
          className="mt-8 sm:mt-12 pt-6 sm:pt-8 text-center text-sm border-t border-green-500"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.6 }}
        >
          <p className="text-white">
            © {new Date().getFullYear()} Faxr-Travel.uz {t("footer.rights")}
          </p>
        </motion.div>
      </div>
    </footer>
  );
}
