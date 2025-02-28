"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "@/components/Navbar";
import Banner from "@/components/Banner";
import CompanyInfo from "@/components/ComponyInfo";
import Footer from "@/components/Footer";
import Image from "next/image";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [percentage, setPercentage] = useState(0);
  const [tours, setTours] = useState(null);

  useEffect(() => {
    const fetchTours = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/api/tours`
        );
        setTours(response.data.data);
        setPercentage(100);
        setTimeout(() => setIsLoading(false), 500);
      } catch (error) {
        console.error("Error fetching tours:", error);
        setPercentage(99);
      }
    };

    fetchTours();

    const interval = setInterval(() => {
      setPercentage((prev) => {
        if (prev >= 99) {
          clearInterval(interval);
          return prev;
        }
        return prev + 1;
      });
    }, 50);

    return () => clearInterval(interval);
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#22C55E] via-green-600 to-teal-800 flex items-center justify-center">
        <div className="text-center">
          <div className="relative w-56 h-56 mx-auto mb-6">
            <Image
              src="/1.png"
              alt="Loading Logo"
              fill
              className="object-cover animate-pulse"
            />
          </div>

          <div className="relative w-64 h-2 bg-white/20 rounded-full overflow-hidden">
            <div
              className="h-full bg-white transition-all duration-300 ease-out"
              style={{ width: `${percentage}%` }}
            />
          </div>
          <p className="mt-4 text-xl font-semibold text-white">{percentage}%</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <Banner tours={tours} />
      <CompanyInfo />
      <Footer />
    </>
  );
}
