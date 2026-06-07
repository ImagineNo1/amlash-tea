"use client";

import React, { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Star, ChevronRight, ChevronLeft, Quote } from "lucide-react";

const testimonials = [
  {
    name: "فاطمه رضایی",
    city: "تهران",
    rating: 5,
    text: "واقعاً تفاوت چای املش با چای‌های دیگه محسوسه. عطرش فوق‌العاده‌ست و رنگ دم‌کردنش بی‌نظیره. حالا هر روز صبح با چای املش روزم رو شروع می‌کنم.",
    avatar: "ف",
    avatarColor: "#B47B59",
  },
  {
    name: "محمد کریمی",
    city: "مشهد",
    rating: 5,
    text: "به عنوان کسی که ۲۰ ساله دنبال چای با کیفیت می‌گردم، چای ممتاز املش بهترین چیزیه که تا حالا نوشیدم. تلخی ملایم و عطر جذابش بی‌نظیره.",
    avatar: "م",
    avatarColor: "#1A2F23",
  },
  {
    name: "زهرا احمدی",
    city: "اصفهان",
    rating: 5,
    text: "بسته‌بندی خیلی شیک و مناسب هدیه دادنه. چند بسته برای مهمانی خریدم و همه مهمانا ازم پرسیدن این چای از کجاست! حتماً دوباره سفارش می‌دم.",
    avatar: "ز",
    avatarColor: "#B47B59",
  },
  {
    name: "علی موسوی",
    city: "رشت",
    rating: 5,
    text: "خودم اهل گیلانم و می‌دونم چای خوب چه طعمی داره. چای قلم املش دقیقاً همون طعم اصیل شمالیه. خوشحالم یه برند محلی اینقدر باکیفیته.",
    avatar: "ع",
    avatarColor: "#1A2F23",
  },
  {
    name: "مریم نجفی",
    city: "شیراز",
    rating: 5,
    text: "چای شکسته‌شون برای مهمانی عالیه. رنگ قرمز شفافی که داره و عطر دلپذیرش همه رو شگفت‌زده می‌کنه. قیمتش هم برای این کیفیت خیلی مناسبه.",
    avatar: "م",
    avatarColor: "#B47B59",
  },
];

function StarRating({ count }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: count }).map((_, i) => (
        <Star key={i} size={14} fill="#B47B59" style={{ color: "#B47B59" }} />
      ))}
    </div>
  );
}

export default function TestimonialsSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [active, setActive] = useState(0);

  const prev = () =>
    setActive((a) => (a === 0 ? testimonials.length - 1 : a - 1));
  const next = () =>
    setActive((a) => (a === testimonials.length - 1 ? 0 : a + 1));

  return (
    <section
      id="testimonials"
      className="py-24 md:py-36 relative overflow-hidden"
      style={{ background: "#1A2F23" }}
      ref={ref}
    >
      {/* Subtle bg decoration */}
      <div
        className="absolute top-0 right-0 w-96 h-96 rounded-full opacity-5 blur-3xl"
        style={{ background: "#B47B59" }}
      />
      <div
        className="absolute bottom-0 left-0 w-80 h-80 rounded-full opacity-5 blur-3xl"
        style={{ background: "#B47B59" }}
      />

      <div className="relative z-10 max-w-5xl mx-auto px-6 md:px-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-3 mb-4 justify-center"
        >
          <div className="w-8 h-[0.5px]" style={{ background: "#B47B59" }} />
          <span
            className="text-xs tracking-widest font-medium"
            style={{ color: "#B47B59" }}
          >
            رضایت مشتریان
          </span>
          <div className="w-8 h-[0.5px]" style={{ background: "#B47B59" }} />
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="text-3xl md:text-5xl font-bold text-center mb-16"
          style={{ color: "#F7F6F2", lineHeight: 1.5 }}
        >
          مشتریان ما چه می‌گویند؟
        </motion.h2>

        {/* Main featured testimonial */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative mb-10"
        >
          <div
            className="rounded-3xl p-8 md:p-12 relative overflow-hidden"
            style={{
              background: "rgba(247,246,242,0.04)",
              border: "1px solid rgba(247,246,242,0.08)",
            }}
          >
            {/* Big quote icon */}
            <Quote
              size={64}
              className="absolute top-6 left-6 opacity-10"
              style={{ color: "#B47B59" }}
            />

            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -30 }}
                transition={{ duration: 0.4 }}
                className="flex flex-col items-center text-center"
              >
                {/* Avatar */}
                <div
                  className="w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold mb-5"
                  style={{
                    background: testimonials[active].avatarColor,
                    color: "#F7F6F2",
                  }}
                >
                  {testimonials[active].avatar}
                </div>

                <StarRating count={testimonials[active].rating} />

                <p
                  className="text-base md:text-lg leading-relaxed mt-6 mb-6 max-w-2xl"
                  style={{ color: "rgba(247,246,242,0.8)", lineHeight: 2 }}
                >
                  "{testimonials[active].text}"
                </p>

                <p className="font-bold text-base" style={{ color: "#F7F6F2" }}>
                  {testimonials[active].name}
                </p>
                <p
                  className="text-sm mt-1"
                  style={{ color: "rgba(247,246,242,0.4)" }}
                >
                  {testimonials[active].city}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-center gap-6 mt-8">
            <button
              onClick={next}
              className="w-11 h-11 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
              style={{ background: "rgba(247,246,242,0.08)", color: "#F7F6F2" }}
            >
              <ChevronRight size={20} />
            </button>

            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActive(i)}
                  className="transition-all duration-300 rounded-full"
                  style={{
                    width: i === active ? "28px" : "8px",
                    height: "8px",
                    background:
                      i === active ? "#B47B59" : "rgba(247,246,242,0.25)",
                  }}
                />
              ))}
            </div>

            <button
              onClick={prev}
              className="w-11 h-11 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
              style={{ background: "rgba(247,246,242,0.08)", color: "#F7F6F2" }}
            >
              <ChevronLeft size={20} />
            </button>
          </div>
        </motion.div>

        {/* Mini cards row */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mt-4">
          {testimonials.map((t, i) => (
            <motion.button
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.4 + i * 0.07 }}
              onClick={() => setActive(i)}
              className="p-4 rounded-2xl text-right transition-all duration-300"
              style={{
                background:
                  i === active
                    ? "rgba(180,123,89,0.2)"
                    : "rgba(247,246,242,0.04)",
                border: `1px solid ${i === active ? "rgba(180,123,89,0.4)" : "rgba(247,246,242,0.08)"}`,
              }}
            >
              <div className="flex items-center gap-2 mb-2">
                <div
                  className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0"
                  style={{ background: t.avatarColor, color: "#F7F6F2" }}
                >
                  {t.avatar}
                </div>
                <span
                  className="text-xs font-medium truncate"
                  style={{ color: "#F7F6F2" }}
                >
                  {t.name}
                </span>
              </div>
              <p
                className="text-xs leading-relaxed line-clamp-2"
                style={{ color: "rgba(247,246,242,0.45)" }}
              >
                {t.text}
              </p>
            </motion.button>
          ))}
        </div>
      </div>
    </section>
  );
}
