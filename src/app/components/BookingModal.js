"use client";

import { useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { X } from "lucide-react";
import useUserStore from "@s/store/userStore";
import { useTranslation } from "react-i18next";

const SuccessModal = ({ isOpen, onClose, message }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-xl p-6 max-w-sm w-full mx-4 shadow-2xl border border-gray-100">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-green-600">Success</h3>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
        <p className="text-gray-700 text-center mb-6">{message}</p>
        <button
          onClick={onClose}
          className="w-full py-2 rounded-md font-semibold text-white bg-green-500 hover:bg-green-600 transition duration-200 shadow-md"
        >
          OK
        </button>
      </div>
    </div>
  );
};

const BookingModal = ({ isOpen, onClose, tourId, actionType }) => {
  const user = useUserStore((state) => state.user);
  const token = useUserStore((state) => state.token);
  const { t } = useTranslation();

  const [formData, setFormData] = useState({
    name: user?.name || "",
    phoneNumber: user?.phone ? user.phone.replace("+998", "") : "",
    passengers: 1,
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successModalOpen, setSuccessModalOpen] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "phoneNumber") {
      const numericValue = value.replace(/\D/g, "");
      setFormData((prev) => ({ ...prev, [name]: numericValue }));
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
      setError("Phone number must be 9 digits after the country code");
      setLoading(false);
      return;
    }

    if (!token) {
      setError("User token not found, please log in again");
      setLoading(false);
      return;
    }

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
            "Content-Type": "application/json",
          },
        }
      );

      setSuccessMessage(
        `${actionType === "purchase" ? "Purchased" : "Booked"}: ${
          response.data.message || "Success!"
        }`
      );
      setSuccessModalOpen(true);
      setTimeout(() => {
        setSuccessModalOpen(false);
        onClose();
      }, 1500);
    } catch (err) {
      setError(
        err.response?.data?.message || "An error occurred, please try again"
      );
      console.error("Booking error:", err.response?.data || err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
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
          className="bg-white mt-24 rounded-2xl p-8 max-w-md w-full mx-4 relative shadow-lg"
        >
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-600 hover:text-gray-800"
          >
            <X className="h-6 w-6" />
          </button>
          <h3 className="text-2xl font-bold text-green-600 mb-6 text-center">
            {actionType === "purchase" ? t("purchase") : t("book")}
          </h3>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-gray-700 font-medium mb-1">
                {t("name")}
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600 text-black"
                placeholder={t("namePlaceholder")}
                required
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-1">
                {t("phones")}
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
                {t("passengers")}
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
            {error && (
              <p className="text-red-500 text-sm text-center">{error}</p>
            )}
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
                ? "Submitting..."
                : actionType === "purchase"
                ? t("purchase")
                : t("book")}
            </motion.button>
          </form>
        </motion.div>
      </motion.div>

      <SuccessModal
        isOpen={successModalOpen}
        onClose={() => {
          setSuccessModalOpen(false);
          onClose();
        }}
        message={successMessage}
      />
    </>
  );
};

export default BookingModal;
