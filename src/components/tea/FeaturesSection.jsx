"use client";

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Leaf, Sparkles, ShoppingBag } from "lucide-react";

const features = [
  {
    icon: Leaf,
    title: "چای ایرانی اصیل",
    description: "برگچین‌شده از باغ‌های سرسبز شمال ایران",
  },
  {
    icon: Sparkles,
    title: "عطر و طعم طبیعی",
    description: "بدون پیچیدگی، ساده، سالم و خوش‌نوش",
  },
  {
    icon: ShoppingBag,
    title: "آماده توسعه فروشگاهی",
    description: "در آینده امکان خرید آنلاین محصولات فراهم می‌شود",
  },
];

export default function FeaturesSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      id="features"
      className="py-20 md:py-28 relative overflow-hidden"
      style={{ background: "#1A2F23" }}
      ref={ref}
    >
      {/* Decorative gradient */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          background:
            "radial-gradient(ellipse at 30% 50%, rgba(180,123,89,0.4), transparent 70%)",
        }}
      />

      <div className="relative z-10 max-w-6xl mx-auto px-6 md:px-12">
        <div className="grid md:grid-cols-3 gap-8 md:gap-12">
          {features.map((feature, i) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.7, delay: i * 0.15 }}
                className="text-center group"
              >
                <div
                  className="w-16 h-16 mx-auto mb-6 rounded-2xl flex items-center justify-center transition-all duration-500 group-hover:scale-110"
                  style={{ background: "rgba(180,123,89,0.15)" }}
                >
                  <Icon size={28} style={{ color: "#B47B59" }} />
                </div>
                <h3
                  className="text-xl font-bold mb-3"
                  style={{ color: "#F7F6F2" }}
                >
                  {feature.title}
                </h3>
                <p
                  className="text-sm leading-relaxed"
                  style={{ color: "rgba(247,246,242,0.6)", lineHeight: 1.8 }}
                >
                  {feature.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
