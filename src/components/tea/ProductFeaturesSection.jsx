"use client";

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Wind, Droplets, Sun, Award, Leaf, Heart, PackageCheck } from "lucide-react";
import { useContent } from "./ContentContext";

const iconMap = { Wind, Droplets, Sun, Award, Leaf, Heart, PackageCheck };


export default function ProductFeaturesSection() {
  const { productFeatures } = useContent();
  const features = productFeatures.features || [];
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      className="py-24 md:py-36"
      style={{ background: "#F7F6F2" }}
      ref={ref}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12">
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
            {productFeatures.eyebrow}
          </span>
          <div className="w-8 h-[0.5px]" style={{ background: "#B47B59" }} />
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="text-3xl md:text-5xl font-bold text-center mb-4"
          style={{ color: "#1A2F23", lineHeight: 1.5 }}
        >
          {productFeatures.title}
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-center text-base mb-16 max-w-xl mx-auto"
          style={{ color: "rgba(26,47,35,0.55)", lineHeight: 1.9 }}
        >
          {productFeatures.subtitle}
        </motion.p>

        {/* Features grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {features.map((feature, i) => {
            const Icon = iconMap[feature.icon] || Leaf;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="group p-7 rounded-2xl transition-all duration-500 hover:shadow-xl hover:-translate-y-1"
                style={{
                  background: "white",
                  border: "1px solid rgba(26,47,35,0.06)",
                }}
              >
                {/* Icon + stat row */}
                <div className="flex items-start justify-between mb-5">
                  <div
                    className="w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-500 group-hover:scale-110"
                    style={{ background: "rgba(180,123,89,0.1)" }}
                  >
                    <Icon size={26} style={{ color: "#B47B59" }} />
                  </div>
                  <div className="text-right">
                    <p
                      className="text-2xl font-black"
                      style={{ color: "#B47B59" }}
                    >
                      {feature.stat}
                    </p>
                    <p
                      className="text-xs mt-0.5"
                      style={{ color: "rgba(26,47,35,0.45)" }}
                    >
                      {feature.statLabel}
                    </p>
                  </div>
                </div>

                <h3
                  className="text-lg font-bold mb-3 transition-colors duration-300 group-hover:text-[#B47B59]"
                  style={{ color: "#1A2F23" }}
                >
                  {feature.title}
                </h3>
                <p
                  className="text-sm leading-relaxed"
                  style={{ color: "rgba(26,47,35,0.6)", lineHeight: 1.9 }}
                >
                  {feature.description}
                </p>

                {/* Bottom copper line */}
                <div
                  className="mt-6 h-[1px] transition-all duration-500 group-hover:opacity-100 opacity-0"
                  style={{
                    background: "linear-gradient(90deg, #B47B59, transparent)",
                  }}
                />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
