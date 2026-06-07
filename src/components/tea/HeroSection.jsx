"use client";

import React from "react";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";

export default function HeroSection() {
  const scrollToAbout = () => {
    const el = document.querySelector("#about");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToContact = () => {
    const el = document.querySelector("#contact");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToProducts = () => {
    const el = document.querySelector("#products");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center overflow-hidden"
    >
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src="https://media.base44.com/images/public/6a252eebc05f7ea73ab7493a/b1e553e91_generated_0b0fd9a1.png"
          alt="Tea plantation in Amlash"
          className="w-full h-full object-cover"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to left, rgba(26,47,35,0.85) 0%, rgba(26,47,35,0.6) 40%, rgba(26,47,35,0.3) 100%)",
          }}
        />
      </div>

      {/* Floating Leaves Decoration */}
      <motion.div
        animate={{ y: [0, -15, 0], rotate: [0, 5, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-20 left-10 w-16 h-16 opacity-20"
      >
        <svg viewBox="0 0 64 64" fill="none">
          <path
            d="M32 4 C16 16 8 32 16 48 C24 56 40 56 48 48 C56 32 48 16 32 4Z"
            fill="#B47B59"
          />
        </svg>
      </motion.div>

      <motion.div
        animate={{ y: [0, 10, 0], rotate: [0, -8, 0] }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2,
        }}
        className="absolute bottom-32 left-20 w-12 h-12 opacity-15"
      >
        <svg viewBox="0 0 64 64" fill="none">
          <path
            d="M32 4 C16 16 8 32 16 48 C24 56 40 56 48 48 C56 32 48 16 32 4Z"
            fill="#F7F6F2"
          />
        </svg>
      </motion.div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 w-full">
        <div className="max-w-2xl mr-0 ml-auto md:mr-0">
          {/* Subtitle */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex items-center gap-3 mb-6"
          >
            <div className="w-12 h-[0.5px]" style={{ background: "#B47B59" }} />
            <span
              className="text-sm tracking-widest font-light"
              style={{ color: "#B47B59" }}
            >
              عطر اصالت، طعم آرامش
            </span>
          </motion.div>

          {/* Main Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="text-4xl md:text-6xl lg:text-7xl font-black leading-tight mb-6"
            style={{ color: "#F7F6F2", lineHeight: 1.4 }}
          >
            طعم اصیل چای ایرانی
            <br />
            <span style={{ color: "#B47B59" }}>از قلب املش</span>
          </motion.h1>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="text-base md:text-lg leading-relaxed mb-10 max-w-lg"
            style={{ color: "rgba(247,246,242,0.8)", lineHeight: 1.9 }}
          >
            چای املش با تکیه بر اصالت، کیفیت و عطر طبیعی برگ‌های چای شمال ایران،
            تجربه‌ای گرم و آرامش‌بخش برای خانواده‌های ایرانی می‌سازد.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="flex flex-wrap gap-4"
          >
            <button
              onClick={scrollToProducts}
              className="px-8 py-3.5 rounded-full text-base font-semibold transition-all duration-500 hover:scale-105 hover:shadow-lg"
              style={{
                background: "#B47B59",
                color: "#F7F6F2",
                boxShadow: "0 4px 20px rgba(180,123,89,0.3)",
              }}
            >
              آشنایی با چای املش
            </button>
            <button
              onClick={scrollToContact}
              className="px-8 py-3.5 rounded-full text-base font-semibold transition-all duration-500 hover:scale-105 border"
              style={{
                borderColor: "rgba(247,246,242,0.4)",
                color: "#F7F6F2",
                background: "rgba(247,246,242,0.05)",
              }}
            >
              تماس با ما
            </button>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.button
        onClick={scrollToAbout}
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
      >
        <ChevronDown size={28} style={{ color: "#B47B59" }} />
      </motion.button>
    </section>
  );
}
