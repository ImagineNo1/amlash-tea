import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";

export default function QuoteSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="relative py-24 md:py-36 overflow-hidden" ref={ref}>
      {/* Background */}
      <div className="absolute inset-0">
        <img
          src="https://media.base44.com/images/public/6a252eebc05f7ea73ab7493a/3af9ff6cd_generated_638df664.png"
          alt="Amlash tea terraces in morning mist"
          className="w-full h-full object-cover"
        />
        <div
          className="absolute inset-0"
          style={{ background: "rgba(26,47,35,0.75)" }}
        />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-6 md:px-12 text-center">
        <motion.h3
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-3xl md:text-5xl font-bold mb-6"
          style={{ color: "#B47B59", lineHeight: 1.5 }}
        >
          هر فنجان، یک لحظه آرامش
        </motion.h3>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-base md:text-lg max-w-2xl mx-auto"
          style={{ color: "rgba(247,246,242,0.75)", lineHeight: 2 }}
        >
          چای فقط یک نوشیدنی نیست، بخشی از گفت‌وگوها، مهمانی‌ها، صبحانه‌ها و
          لحظه‌های آرام زندگی ماست.
        </motion.p>

        {/* Decorative elements */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={inView ? { scaleX: 1 } : {}}
          transition={{ duration: 1, delay: 0.5 }}
          className="w-24 h-[0.5px] mx-auto mt-10"
          style={{ background: "#B47B59" }}
        />
      </div>
    </section>
  );
}
