"use client";

import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import "../i18n/i18n";
import { useTranslation } from "react-i18next";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({ children }) {
  const { i18n } = useTranslation();

  return (
    <html lang={i18n.language}>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
