"use client";

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";

const milestones = [
  {
    year: "۱۳۸۵",
    title: "ریشه در خاک گیلان",
    description:
      "داستان چای املش با یک رویا آغاز شد — یک باغ کوچک در دل جنگل‌های مه‌آلود گیلان و عشق به طعم اصیل چای شمال.",
  },
  {
    year: "۱۳۹۰",
    title: "رشد و توسعه",
    description:
      "با گسترش باغ‌ها، همراهی چایکاران محلی باتجربه و سرمایه‌گذاری روی کیفیت، اولین تن محصول ممتاز را تولید کردیم.",
  },
  {
    year: "۱۳۹۵",
    title: "ورود به بازار",
    description:
      "اولین بسته‌های رسمی چای املش با استقبال گرم خانواده‌های ایرانی روبرو شد. شهرت ما از دهان به دهان گشت.",
  },
  {
    year: "امروز",
    title: "میراث ماندگار",
    description:
      "هر روز هزاران خانواده ایرانی صبحشان را با فنجانی از چای اصیل گیلانی ما شروع می‌کنند. این افتخار ماست.",
  },
];

export default function StorySection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      id="about"
      className="py-24 md:py-36 relative overflow-hidden"
      style={{ background: "#F7F6F2" }}
      ref={ref}
    >
      <div
        className="absolute -left-56 top-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{ background: "rgba(26,47,35,0.025)" }}
      />

      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="flex items-center gap-3 mb-4 justify-center"
        >
          <div className="w-8 h-[0.5px]" style={{ background: "#B47B59" }} />
          <span
            className="text-xs tracking-widest font-medium"
            style={{ color: "#B47B59" }}
          >
            داستان ما
          </span>
          <div className="w-8 h-[0.5px]" style={{ background: "#B47B59" }} />
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.1 }}
          className="text-3xl md:text-5xl font-bold text-center mb-4"
          style={{ color: "#1A2F23", lineHeight: 1.5 }}
        >
          از قلب کوه‌های گیلان
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.2 }}
          className="text-center text-base mb-16 max-w-2xl mx-auto"
          style={{ color: "rgba(26,47,35,0.55)", lineHeight: 2 }}
        >
          چای املش داستان عشق به طبیعت، احترام به سنت و تعهد به کیفیت است. از
          زمانی که اولین برگ چای را در ارتفاعات گیلان چیدیم تا امروز، هیچ‌گاه از
          اصول خود عقب‌نشینی نکردیم.
        </motion.p>

        <div className="grid md:grid-cols-2 gap-14 md:gap-20 items-start">
          {/* Timeline */}
          <div className="relative space-y-0">
            <motion.div
              initial={{ scaleY: 0 }}
              animate={inView ? { scaleY: 1 } : {}}
              transition={{ duration: 1.3, delay: 0.4, ease: "easeOut" }}
              className="absolute right-5 top-5 bottom-5 w-px origin-top"
              style={{
                background:
                  "linear-gradient(to bottom, #B47B59, rgba(180,123,89,0.08))",
              }}
            />

            {milestones.map((m, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: 30 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.5 + i * 0.15 }}
                className="flex gap-6 pb-10"
              >
                <div className="relative flex-shrink-0 w-10 flex justify-center pt-1">
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center z-10 shadow-md"
                    style={{ background: i === 0 ? "#B47B59" : "#1A2F23" }}
                  >
                    <div className="w-3 h-3 rounded-full bg-white opacity-80" />
                  </div>
                </div>
                <div className="pt-1 pb-2">
                  <span
                    className="text-xs font-bold tracking-widest mb-1 block"
                    style={{ color: "#B47B59" }}
                  >
                    {m.year}
                  </span>
                  <h4
                    className="text-lg font-bold mb-2"
                    style={{ color: "#1A2F23" }}
                  >
                    {m.title}
                  </h4>
                  <p
                    className="text-sm leading-relaxed"
                    style={{ color: "rgba(26,47,35,0.58)", lineHeight: 1.95 }}
                  >
                    {m.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Stats + image */}
          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.3 }}
              className="grid grid-cols-2 gap-4"
            >
              {[
                { num: "۵۰۰۰+", label: "مشتری راضی" },
                { num: "۲۰+", label: "سال تجربه" },
                { num: "۶", label: "نوع محصول" },
                { num: "۳۱", label: "استان توزیع" },
              ].map((stat, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={inView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ delay: 0.45 + i * 0.08 }}
                  className="p-6 rounded-2xl text-center"
                  style={{
                    background: "white",
                    border: "1px solid rgba(26,47,35,0.06)",
                  }}
                >
                  <p
                    className="text-3xl font-black mb-1"
                    style={{ color: "#B47B59" }}
                  >
                    {stat.num}
                  </p>
                  <p
                    className="text-xs"
                    style={{ color: "rgba(26,47,35,0.48)" }}
                  >
                    {stat.label}
                  </p>
                </motion.div>
              ))}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.55 }}
              className="relative rounded-2xl overflow-hidden"
              style={{ height: "270px" }}
            >
              <img
                src="https://media.base44.com/images/public/6a252eebc05f7ea73ab7493a/9cb6961a2_generated_image.png"
                alt="باغ‌های چای گیلان"
                className="w-full h-full object-cover"
              />
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(to top, rgba(26,47,35,0.6), transparent 55%)",
                }}
              />
              <div className="absolute bottom-5 right-5">
                <p className="text-sm font-bold" style={{ color: "#F7F6F2" }}>
                  باغ‌های ارتفاعی گیلان
                </p>
                <p
                  className="text-xs mt-0.5"
                  style={{ color: "rgba(247,246,242,0.6)" }}
                >
                  منشأ بهترین چای ایران
                </p>
              </div>
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ delay: 0.65 }}
              className="text-sm leading-relaxed p-5 rounded-2xl"
              style={{
                color: "rgba(26,47,35,0.65)",
                lineHeight: 2,
                background: "rgba(180,123,89,0.07)",
                borderRight: "3px solid #B47B59",
              }}
            >
              «ما باور داریم که یک فنجان چای خوب، بیشتر از یک نوشیدنی است —
              لحظه‌ای از آرامش، حضور و اتصال به طبیعت است.»
            </motion.p>
          </div>
        </div>
      </div>
    </section>
  );
}
