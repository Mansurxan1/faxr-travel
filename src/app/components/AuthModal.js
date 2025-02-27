"use client";

import { motion } from "framer-motion";
import { X } from "lucide-react";

const AuthModal = ({ isOpen, onClose, onOpenProfileModal }) => {
  if (!isOpen) return null;

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
        className="bg-white rounded-2xl p-8 max-w-md w-full mx-4 relative"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-600 hover:text-gray-800"
        >
          <X className="h-6 w-6" />
        </button>
        <h3 className="text-2xl font-bold text-green-600 mb-6 text-center">
          Login Required
        </h3>
        <p className="text-gray-600 mb-6 text-center">
          Please log in or register to purchase or book a tour.
        </p>
        <div className="grid grid-cols-2 gap-4">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onOpenProfileModal("login")}
            className="bg-green-600 text-white py-3 rounded-xl font-medium"
          >
            Login
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onOpenProfileModal("register")}
            className="bg-gray-200 text-green-600 py-3 rounded-xl font-medium"
          >
            Register
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default AuthModal;
