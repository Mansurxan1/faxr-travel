"use client";

import { useState, useEffect } from "react";
import {
  FaPhoneAlt,
  FaInstagram,
  FaTelegram,
  FaPlane,
  FaHotel,
  FaUtensils,
  FaCar,
  FaMapMarkerAlt,
  FaStar,
  FaGlobeAmericas,
  FaQuoteLeft,
  FaAward,
  FaHandshake,
  FaClock,
  FaBuilding,
} from "react-icons/fa";
import { motion, useAnimation } from "framer-motion";

const CompanyInfo = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const controls = useAnimation();

  const testimonials = [
    {
      text: "Ajoyib xizmat! Dubaiga qilgan sayohatimiz unutilmas bo'ldi.",
      author: "Aziza K.",
      role: "Mijoz",
    },
    {
      text: "Professional jamoa va har bir detalga e'tibor. Juda tavsiya qilaman!",
      author: "Rustam M.",
      role: "Biznes Sayohatchi",
    },
    {
      text: "FAXR TRAVEL bilan Turkiyaga sayohat qilish orzu edi, endi esa ajoyib xotira!",
      author: "Dilnoza S.",
      role: "Oilaviy Sayohatchi",
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        staggerChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  const achievements = [
    { icon: FaBuilding, text: "Rasmiy MCHJ", value: "100%" },
    { icon: FaHandshake, text: "Mamnun mijozlar", value: "1000+" },
    { icon: FaGlobeAmericas, text: "Sayohat yo'nalishlari", value: "50+" },
    { icon: FaClock, text: "24/7 xizmat", value: "24/7" },
  ];

  const tourPackageIncludes = [
    { icon: FaPlane, text: "Aviabiletlar" },
    { icon: FaHotel, text: "Mehmonxona xizmatlari" },
    { icon: FaUtensils, text: "Ovqatlanish - konsepsiyaga muvofiq" },
    { icon: FaCar, text: "Kutib olish va kuzatib qo'yish xizmati" },
    { icon: FaStar, text: "Professional gidlar" },
    { icon: FaPhoneAlt, text: "24/7 qo'llab-quvvatlash" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-900 via-green-800 to-emerald-900">
      <section className="relative py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-[url('/pattern.svg')] opacity-5"></div>
        <motion.div
          className="max-w-6xl mx-auto relative z-10"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div className="text-center mb-16" variants={itemVariants}>
            <motion.div
              className="flex justify-center items-center mb-8"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="w-32 h-32 p-1 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full">
                <div className="w-full h-full border-4 border-white rounded-full overflow-hidden">
                  <img
                    src="/2.jpg"
                    alt="FAXR TRAVEL"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              <h2 className="text-4xl ml-5 md:text-5xl font-bold text-white mb-4">
                FAXR TRAVEL
              </h2>
            </motion.div>
            <p className="text-green-100 text-xl font-semibold mb-2">
              Mas'uliyati Cheklangan Jamiyat
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16"
            variants={itemVariants}
          >
            {achievements.map((achievement, index) => (
              <div
                key={index}
                className="bg-white/10 backdrop-blur-lg rounded-xl border border-white/20 p-6 text-center text-white shadow-lg"
              >
                <achievement.icon className="w-8 h-8 mx-auto mb-4 text-green-400" />
                <h3 className="text-2xl font-bold mb-2">{achievement.value}</h3>
                <p className="text-green-100 text-sm">{achievement.text}</p>
              </div>
            ))}
          </motion.div>

          <motion.div
            className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 md:p-12 mb-16 border border-white/20 shadow-xl"
            variants={itemVariants}
          >
            <h2 className="text-3xl font-bold text-white mb-6 text-center">
              Biz haqimizda
            </h2>
            <p className="text-green-100 text-lg leading-relaxed text-justify">
              FAXR TRAVEL MCHJ – O'zbekistonning yetakchi sayohat
              agentliklaridan biri sifatida, biz mijozlarimizga faqat eng sara
              xizmatlarni taqdim etamiz. Bizning professional jamoamiz har bir
              sayohatingizni mukammal tashkil etish uchun barcha tafsilotlarga
              alohida e'tibor qaratadi. Biz mijozlarimizga nafaqat sayohat,
              balki unutilmas tajriba va yorqin taassurotlar taqdim
              etamiz.Premium sayohat hamrohingiz sizga nafaqat qulay va
              zamonaviy safar tajribasini taqdim etadi, balki har bir tafsilotga
              e'tibor qaratilgan xizmatlar orqali sizning vaqt va
              qulayligingizni qadrlaydi. Quyidagi xususiyatlar bilan farqlanadi:
              Maxsus xizmatlar: Shaxsiy sayohat rejalashtirish, maxsus
              transferlar, va mehmonxonalar bilan toʻliq integratsiyalashgan
              xizmatlar. Qoʻshimcha qulayliklar: VIP kutish xonalari, tezkor
              hujjat nazorati, va individual yoʻl-yoʻriqlar. Eksklyuziv
              chegirmalar: Premium sheriklar va xizmat ko‘rsatuvchilar bilan
              maxsus chegirmalar va bonus dasturlari. 24/7 yordam: Har qanday
              favqulodda vaziyatda yoki savollaringiz bo‘lganda, malakali
              yordamchi jamoamiz siz bilan doimo aloqada bo‘ladi. Yuqori
              darajadagi tajriba: Sayohat davomida eng so‘nggi texnologiyalar va
              shaxsiylashtirilgan xizmatlar orqali unutilmas tajriba yaratiladi.
              Premium sayohat hamrohingiz bilan nafaqat manzilingizga erishasiz,
              balki har bir sayohatingiz unutilmas va qulay kechishi uchun
              barcha zarur sharoitlar yaratiladi. Agar qo‘shimcha ma’lumot yoki
              maslahat kerak bo‘lsa, biz har doim sizga yordam berishga
              tayyormiz!
            </p>
          </motion.div>

          <motion.div className="mb-16" variants={itemVariants}>
            <h2 className="text-3xl font-bold text-white mb-8 text-center">
              Tur paket tarkibi
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
              {tourPackageIncludes.map((service, index) => (
                <motion.div
                  key={index}
                  className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 text-center border border-white/20 shadow-lg"
                  whileHover={{
                    scale: 1.05,
                    backgroundColor: "rgba(255,255,255,0.2)",
                  }}
                >
                  <service.icon className="w-10 h-10 mx-auto mb-4 text-green-400" />
                  <p className="text-white font-medium">{service.text}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 md:p-12 mb-16 border border-white/20 shadow-xl"
            variants={itemVariants}
          >
            <h2 className="text-3xl font-bold text-white mb-8 text-center">
              Biz bilan bog'laning
            </h2>
            <div className="space-y-6">
              <div className="flex flex-col items-center gap-6">
                <motion.a
                  href="tel:+998953120202"
                  className="inline-flex items-center gap-3 bg-green-500 hover:bg-green-600 text-white px-8 py-4 rounded-full text-lg font-semibold shadow-lg transition duration-300"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <FaPhoneAlt className="animate-bounce" />
                  +998 95 312 02 02
                </motion.a>

                <div className="text-center space-y-2">
                  <div className="flex items-center justify-center gap-2 text-green-100">
                    <FaMapMarkerAlt className="text-green-400 flex-shrink-0" />
                    <p>
                      Тошкент шаҳар, Яккасарой тумани Yakkasaroy MFY,
                      Bog'ibo'ston ko'chasi, 147-uy
                    </p>
                  </div>
                </div>

                <div className="flex gap-6 text-3xl">
                  <motion.a
                    href="https://instagram.com/faxr.travel"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-green-400 hover:text-green-300 transition"
                    whileHover={{ scale: 1.2, rotate: 15 }}
                  >
                    <FaInstagram />
                    <span className="text-base">@faxr.travel</span>
                  </motion.a>
                  <motion.a
                    href="https://t.me/faxrtravel"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-green-400 hover:text-green-300 transition"
                    whileHover={{ scale: 1.2, rotate: -15 }}
                  >
                    <FaTelegram />
                    <span className="text-base">@faxrtravel</span>
                  </motion.a>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div variants={itemVariants}>
            <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 md:p-12 text-center border border-white/20 shadow-xl">
              <FaQuoteLeft className="w-8 h-8 mx-auto mb-6 text-green-400" />
              <motion.div
                key={currentTestimonial}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-4"
              >
                <p className="text-white text-lg md:text-xl italic">
                  {testimonials[currentTestimonial].text}
                </p>
                <div>
                  <p className="text-green-400 font-semibold">
                    {testimonials[currentTestimonial].author}
                  </p>
                  <p className="text-green-200 text-sm">
                    {testimonials[currentTestimonial].role}
                  </p>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      </section>
    </div>
  );
};

export default CompanyInfo;
