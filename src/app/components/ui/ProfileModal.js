"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { X } from "lucide-react";

const ProfileModal = ({ user, onClose, onLogout }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [error, setError] = useState(null);

  // Parolni o'zgartirish funksiyasi (API misoli)
  const handlePasswordChange = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/auth/change-password`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: user.email,
            newPassword,
          }),
        }
      );

      const data = await response.json();
      if (response.ok) {
        alert("Parol muvaffaqiyatli o'zgartirildi!");
        setIsEditing(false);
        setNewPassword("");
      } else {
        setError(data.message || "Parolni o'zgartirishda xatolik yuz berdi");
      }
    } catch (error) {
      setError("Xatolik yuz berdi, qayta urinib ko'ring");
      console.error(error);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 w-full h-full"
    >
      <motion.div
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
        className="bg-white rounded-xl p-8 w-full max-w-lg shadow-2xl relative"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-600 hover:text-gray-800"
        >
          <X className="w-6 h-6" />
        </button>

        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          Profil
        </h1>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <p className="mt-1 w-full p-2 border border-gray-300 rounded-md bg-gray-100">
              {user.email || "Noma'lum"}
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Parol
            </label>
            {isEditing ? (
              <form onSubmit={handlePasswordChange} className="space-y-4">
                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="mt-1 w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="Yangi parol kiriting"
                  required
                />
                <div className="flex gap-2">
                  <button
                    type="submit"
                    className="flex-1 bg-[#22C55E] text-white font-medium py-2 rounded-md hover:bg-green-600 transition duration-200"
                  >
                    Saqlash
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsEditing(false)}
                    className="flex-1 bg-gray-500 text-white font-medium py-2 rounded-md hover:bg-gray-600 transition duration-200"
                  >
                    Bekor qilish
                  </button>
                </div>
                {error && <p className="text-red-500 text-sm">{error}</p>}
              </form>
            ) : (
              <div className="flex items-center justify-between mt-1">
                <p className="w-full p-2 border border-gray-300 rounded-md bg-gray-100">
                  ********
                </p>
                <button
                  onClick={() => setIsEditing(true)}
                  className="ml-2 text-green-500 hover:underline"
                >
                  O'zgartirish
                </button>
              </div>
            )}
          </div>

          <button
            onClick={onLogout}
            className="w-full bg-red-500 text-white font-medium py-2 rounded-md hover:bg-red-600 transition duration-200"
          >
            Chiqish
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ProfileModal;