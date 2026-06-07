"use client";

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";

export default function AboutSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      id="about"
      className="py-24 md:py-36"
      style={{ background: "#F7F6F2" }}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12" ref={ref}>
        {/* Section label */}
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
            درباره ما
          </span>
          <div className="w-8 h-[0.5px]" style={{ background: "#B47B59" }} />
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="text-3xl md:text-5xl font-bold text-center mb-16"
          style={{ color: "#1A2F23", lineHeight: 1.5 }}
        >
          درباره چای املش
        </motion.h2>

        <div className="grid md:grid-cols-2 gap-12 md:gap-20 items-center">
          {/* Text */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="order-2 md:order-1"
          >
            <p
              className="text-base md:text-lg leading-loose mb-6"
              style={{ color: "#1A2F23", lineHeight: 1.9 }}
            >
              چای املش بر پایه کیفیت، اعتماد و حفظ طبیعت‌اصل چای ایرانی شکل
              گرفته است. هدف ما ارائه چای خوش‌عطر، سالم و دل‌نشین برای مصرف
              روزانه خانواده‌هاست.
            </p>
            <p
              className="text-base md:text-lg leading-loose mb-8"
              style={{ color: "rgba(26,47,35,0.7)", lineHeight: 1.9 }}
            >
              ما از بهترین باغ‌های چای در ارتفاعات سرسبز املش، برگ‌های تازه و
              دست‌چین شده را با روش‌های سنتی فرآوری می‌کنیم تا بهترین طعم و عطر
              را در هر فنجان به شما تقدیم کنیم.
            </p>
            <button
              onClick={() => {
                const el = document.querySelector("#products");
                if (el) el.scrollIntoView({ behavior: "smooth" });
              }}
              className="group flex items-center gap-3 text-sm font-semibold transition-all duration-300"
              style={{ color: "#B47B59" }}
            >
              <span>بیشتر بدانید</span>
              <span
                className="inline-block w-8 h-[0.5px] transition-all duration-300 group-hover:w-14"
                style={{ background: "#B47B59" }}
              />
            </button>
          </motion.div>

          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="order-1 md:order-2 relative"
          >
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <img
                src="https://media.base44.com/images/public/6a252eebc05f7ea73ab7493a/f979adbb7_generated_e0e486d6.png"
                alt="A glass of freshly brewed tea"
                className="w-full h-80 md:h-[440px] object-cover"
              />
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(to top, rgba(26,47,35,0.2), transparent 50%)",
                }}
              />
            </div>
            {/* Decorative border */}
            <div
              className="absolute -bottom-4 -left-4 w-full h-full rounded-2xl border-2"
              style={{ borderColor: "rgba(180,123,89,0.2)", zIndex: -1 }}
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
