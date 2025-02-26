"use client";

import { useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { X } from "lucide-react";

// Cookie dan token olish funksiyasi
const getCookie = (name) => {
  const cookies = document.cookie.split("; ");
  const tokenCookie = cookies.find((row) => row.startsWith(`${name}=`));
  return tokenCookie ? tokenCookie.split("=")[1] : null;
};

const BookingModal = ({ isOpen, onClose, tourId, actionType }) => {
  const userData = JSON.parse(localStorage.getItem("user") || "{}");
  const token = getCookie("token"); // Cookie dan tokenni olish

  const [formData, setFormData] = useState({
    name: userData.name || "",
    email: userData.email || "",
    phoneNumber: userData.phone ? userData.phone.replace("+998", "") : "",
    passengers: 1,
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "phoneNumber") {
      const numericValue = value.replace(/\D/g, "");
      if (numericValue.length <= 9) {
        setFormData((prev) => ({ ...prev, [name]: numericValue }));
      }
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const fullPhone = `+998${formData.phoneNumber}`;

    if (formData.phoneNumber.length !== 9) {
      setError("Telefon raqami 9 ta raqamdan iborat bo‘lishi kerak");
      setLoading(false);
      return;
    }

    if (!formData.email.includes("@") || !formData.email.includes(".")) {
      setError("To‘g‘ri elektron pochta kiriting");
      setLoading(false);
      return;
    }

    if (!token) {
      setError("Foydalanuvchi tokeni topilmadi, qayta kirish talab qilinadi");
      setLoading(false);
      return;
    }

    console.log("API uchun Bearer Token:", `Bearer ${token}`);

    const payload = {
      tour: tourId,
      passengers: parseInt(formData.passengers, 10),
      customer: {
        name: formData.name,
        phone: fullPhone,
      },
    };

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/bookings`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("API javobi:", response.data);
      alert(
        `${actionType === "purchase" ? "Sotib olindi" : "Bron qilindi"}: ${
          response.data.message || "Muvaffaqiyatli!"
        }`
      );
      onClose();
    } catch (err) {
      setError("Xatolik yuz berdi, qaytadan urinib ko'ring");
      console.error("Bronlash xatosi:", err.response?.data || err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50"
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-white rounded-2xl p-8 max-w-md w-full mx-4 relative shadow-lg"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-600 hover:text-gray-800"
        >
          <X className="h-6 w-6" />
        </button>
        <h3 className="text-2xl font-bold text-green-600 mb-6 text-center">
          {actionType === "purchase" ? "Sotib olish" : "Bron qilish"}
        </h3>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-gray-700 font-medium mb-1">Ism</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600 text-black"
              placeholder="Ismingizni kiriting"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Elektron pochta
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600 text-black"
              placeholder="example@email.com"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Telefon raqam
            </label>
            <div className="flex items-center border rounded-lg focus-within:ring-2 focus-within:ring-green-600">
              <span className="p-3 text-gray-700 bg-gray-100 border-r">
                +998
              </span>
              <input
                type="tel"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                className="w-full p-3 rounded-r-lg focus:outline-none text-black"
                placeholder="901234567"
                maxLength="9"
                required
              />
            </div>
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Nechta odam
            </label>
            <input
              type="number"
              name="passengers"
              value={formData.passengers}
              onChange={handleChange}
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600 text-black"
              min="1"
              required
            />
          </div>
          {error && <p className="text-red-500 text-sm text-center">{error}</p>}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            disabled={loading}
            className={`w-full py-3 rounded-xl font-medium ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-green-600 text-white"
            }`}
          >
            {loading
              ? "Yuborilmoqda..."
              : actionType === "purchase"
              ? "Sotib olish"
              : "Bron qilish"}
          </motion.button>
        </form>
      </motion.div>
    </motion.div>
  );
};

export default BookingModal;
