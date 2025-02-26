"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { format } from "date-fns";
import { motion, AnimatePresence } from "framer-motion";
import {
  CalendarIcon,
  PlaneIcon,
  UtensilsIcon,
  MapPinIcon,
  StarIcon,
} from "lucide-react";
import AuthModal from "../AuthModal";
import BookingModal from "../BookingModal";

export default function PremiumTour({ onOpenLoginModal }) {
  const [tours, setTours] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [selectedTourId, setSelectedTourId] = useState(null);
  const [actionType, setActionType] = useState(null);

  useEffect(() => {
    const fetchTours = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/api/tours`
        );
        setTours(response.data.data || []);
      } catch (err) {
        setError("Ma'lumotlarni yuklashda xatolik yuz berdi");
        console.error("Xatolik:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchTours();
  }, []);

  const isLoggedIn = () => {
    return !!localStorage.getItem("user") && !!localStorage.getItem("token");
  };

  const handlePurchase = (tourId) => {
    if (isLoggedIn()) {
      setSelectedTourId(tourId);
      setActionType("purchase");
      setIsBookingModalOpen(true);
    } else {
      setIsAuthModalOpen(true);
    }
  };

  const handleBooking = (tourId) => {
    if (isLoggedIn()) {
      setSelectedTourId(tourId);
      setActionType("book");
      setIsBookingModalOpen(true);
    } else {
      setIsAuthModalOpen(true);
    }
  };

  const closeAuthModal = () => {
    setIsAuthModalOpen(false);
  };

  const closeBookingModal = () => {
    setIsBookingModalOpen(false);
    setSelectedTourId(null);
    setActionType(null);
  };

  const openProfileModal = (mode) => {
    alert(`${mode} funksiyasi qo'shilishi kerak`);
    setIsAuthModalOpen(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen text-white flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{
            duration: 1,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
          className="rounded-full h-20 w-20 border-t-4 border-white/80 shadow-lg"
        />
      </div>
    );
  }

  if (error) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="min-h-screen bg-gradient-to-br from-[#22C55E] via-green-600 to-teal-800 text-white flex items-center justify-center"
      >
        <div className="bg-white/10 backdrop-blur-lg p-10 rounded-2xl shadow-2xl border border-white/20">
          <p className="text-3xl font-semibold tracking-tight">{error}</p>
        </div>
      </motion.div>
    );
  }

  return (
    <div
      id="trips"
      className="min-h-screen bg-gradient-to-br text-white md:px-16"
    >
      <motion.h2
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="text-4xl md:text-6xl font-extrabold text-center mb-8 tracking-tight drop-shadow-lg"
      >
        Sayohat Turlari
      </motion.h2>

      <AnimatePresence>
        <div className="grid grid-cols-1 mb-10 custom:grid-cols-2 lg:grid-cols-3 gap-12">
          {tours.length > 0 ? (
            tours.map((tour) => (
              <motion.div
                key={tour._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="group rounded-3xl overflow-hidden bg-white/5 backdrop-blur-xl border border-white/20 hover:bg-white/10 transition-all duration-500 shadow-xl hover:shadow-2xl flex flex-col"
              >
                <div className="relative overflow-hidden">
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.7 }}
                    className="h-[250px]"
                  >
                    <img
                      src={tour.image || "/2.jpg"}
                      alt={tour.name || "Sayohat turi"}
                      width={100}
                      height={100}
                      className="object-cover w-full h-full"
                    />
                  </motion.div>
                  <motion.span
                    whileHover={{ scale: 1.05 }}
                    className="absolute top-4 right-4 px-4 py-2 rounded-full text-sm font-semibold bg-white/90 text-[#22C55E] shadow-md"
                  >
                    {tour.destinations[0]?.city || "Noma'lum"}
                  </motion.span>
                </div>

                <div className="p-6 flex-grow">
                  <h3 className="text-xl md:text-2xl font-bold mb-4 tracking-tight drop-shadow-md">
                    {tour.name || "Noma'lum sayohat"}
                  </h3>
                  <div className="flex items-center gap-3 text-lg md:text-2xl mb-6">
                    <span className="font-bold text-yellow-300">
                      {tour.price?.amount || "0"} {tour.price?.currency || ""}
                    </span>
                    {tour.price?.perPerson && (
                      <span className="text-sm opacity-75"></span>
                    )}
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <CalendarIcon className="h-5 w-5 text-yellow-300" />
                      <span className="text-sm">
                        {tour.startDate
                          ? format(new Date(tour.startDate), "dd MMMM yyyy")
                          : "Noma'lum"}{" "}
                        • {tour.duration || "0"} kun
                      </span>
                    </div>

                    <div className="flex items-center gap-3">
                      <PlaneIcon className="h-5 w-5 text-yellow-300" />
                      <span className="text-sm">
                        {tour.destinations?.length > 0
                          ? tour.destinations.map((d) => d.city).join(" → ")
                          : "Noma'lum"}
                      </span>
                    </div>

                    <div className="flex items-center gap-3">
                      <UtensilsIcon className="h-5 w-5 text-yellow-300" />
                      <span className="text-sm">
                        {tour.included?.length > 0
                          ? tour.included.slice(0, 2).join(", ")
                          : "Noma'lum"}
                      </span>
                    </div>

                    <div className="pt-4 border-t border-white/20">
                      {tour.hotels?.length > 0 ? (
                        tour.hotels.map((hotel) => (
                          <div
                            key={hotel._id}
                            className="flex items-center justify-between text-sm mb-2"
                          >
                            <span className="flex items-center gap-2">
                              <MapPinIcon className="h-4 w-4 text-yellow-300" />
                              {hotel.name || "Noma'lum"}
                            </span>
                            <span className="flex items-center">
                              {Array.from({ length: hotel.stars || 0 }).map(
                                (_, index) => (
                                  <StarIcon
                                    key={index}
                                    className="h-4 w-4 text-yellow-300 fill-current"
                                  />
                                )
                              )}
                            </span>
                          </div>
                        ))
                      ) : (
                        <p className="text-sm">Mehmonxonalar mavjud emas</p>
                      )}
                    </div>
                  </div>
                </div>

                <div className="p-4 mt-auto">
                  <div className="grid grid-cols-2 gap-4">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handlePurchase(tour._id)}
                      className="bg-white text-green-600 font-medium text-sm md:text-lg py-2 px-2 sm:px-1 md:px-1 rounded-2xl shadow-lg"
                    >
                      Sotib olish
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleBooking(tour._id)}
                      className="bg-green-400 text-white font-medium text-sm md:text-lg py-2 px-2 sm:px-1 md:px-1 rounded-2xl shadow-lg"
                    >
                      Bron qilish
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            ))
          ) : (
            <p className="text-center col-span-full text-xl">
              Hozircha sayohat turlari mavjud emas
            </p>
          )}
        </div>
      </AnimatePresence>

      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={closeAuthModal}
        onOpenProfileModal={openProfileModal}
      />

      <BookingModal
        isOpen={isBookingModalOpen}
        onClose={closeBookingModal}
        tourId={selectedTourId}
        actionType={actionType}
      />
    </div>
  );
}
