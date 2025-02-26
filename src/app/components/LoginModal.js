"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { useTranslation } from "react-i18next";

const LoginModal = ({ isOpen, onClose, onLoginSuccess }) => {
  const { t } = useTranslation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [isRegisterMode, setIsRegisterMode] = useState(false);

  // Kirish funksiyasi
  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/auth/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        }
      );

      const data = await response.json();
      if (response.ok) {
        console.log(
          "Foydalanuvchi kirdi, Bearer Token:",
          `Bearer ${data.token}`
        ); 
        onLoginSuccess(data.user);
        localStorage.setItem("user", JSON.stringify(data.user));
        localStorage.setItem("token", data.token); 
        onClose();
      } else {
        setError(data.message || "Kirish amalga oshmadi");
      }
    } catch (error) {
      setError("Kirishda xatolik yuz berdi.");
      console.error("Kirish xatosi:", error);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/auth/register`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        }
      );

      const data = await response.json();
      if (response.ok) {
        console.log(
          "Ro‘yxatdan o‘tgan foydalanuvchi, Bearer Token:",
          `Bearer ${data.token}`
        ); 
        alert("Ro'yxatdan o'tish muvaffaqiyatli!");
        onLoginSuccess(data.user);
        localStorage.setItem("user", JSON.stringify(data.user));
        localStorage.setItem("token", data.token);
        onClose();
      } else if (response.status === 409) {
        setError("Siz avval ro'yxatdan o'tgansiz!");
      } else {
        setError(data.message || "Ro'yxatdan o'tish amalga oshmadi");
      }
    } catch (error) {
      setError("Ro'yxatdan o'tishda xatolik yuz berdi.");
      console.error("Registratsiya xatosi:", error);
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
      >
        <motion.div
          initial={{ scale: 0.9, y: 20 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0.9, y: 20 }}
          className="bg-white rounded-xl p-6 w-full max-w-md shadow-2xl relative"
        >
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-600 hover:text-gray-800"
          >
            <X className="w-6 h-6" />
          </button>

          <h3 className="text-2xl font-bold text-gray-800 mb-4 text-center">
            {isRegisterMode ? t("register") : t("login")}
          </h3>

          <form
            onSubmit={isRegisterMode ? handleRegister : handleLogin}
            className="space-y-4"
          >
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="example@email.com"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Parol
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="Parol"
                required
              />
            </div>
            {error && (
              <p className="text-red-500 text-sm text-center">{error}</p>
            )}
            <button
              type="submit"
              className="w-full bg-[#22C55E] text-white font-medium py-2 rounded-md hover:bg-green-600 transition duration-200"
            >
              {isRegisterMode ? "Ro‘yxatdan o‘tish" : "Kirish"}
            </button>
            <p className="text-center text-sm text-gray-600">
              {isRegisterMode
                ? "Ro‘yxatdan o‘tganmisiz?"
                : "Ro‘yxatdan o‘tmaganmisiz?"}{" "}
              <button
                type="button"
                onClick={() => setIsRegisterMode(!isRegisterMode)}
                className="text-green-500 hover:underline"
              >
                {isRegisterMode ? "Kirish" : "Ro‘yxatdan o‘tish"}
              </button>
            </p>
          </form>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default LoginModal;
