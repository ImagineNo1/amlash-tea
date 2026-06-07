"use client";

import React, { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";
import { useContent } from "./ContentContext";


export default function FAQSection() {
  const { faqs: faqsContent } = useContent();
  const faqs = faqsContent.items || [];
  const categories = faqsContent.categories || ["همه"];
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [open, setOpen] = useState(null);
  const [activeCat, setActiveCat] = useState("همه");

  const filtered =
    activeCat === "همه" ? faqs : faqs.filter((f) => f.category === activeCat);

  return (
    <section
      id="faq"
      className="py-24 md:py-36"
      style={{ background: "#F7F6F2" }}
      ref={ref}
    >
      <div className="max-w-4xl mx-auto px-6 md:px-12">
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
            {faqsContent.eyebrow}
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
          {faqsContent.title}
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-center text-base mb-10 max-w-lg mx-auto"
          style={{ color: "rgba(26,47,35,0.55)", lineHeight: 1.9 }}
        >
          {faqsContent.subtitle}
        </motion.p>

        {/* Category filter */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-wrap gap-2 justify-center mb-12"
        >
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                setActiveCat(cat);
                setOpen(null);
              }}
              className="px-5 py-2 rounded-full text-sm font-medium transition-all duration-300"
              style={{
                background: activeCat === cat ? "#1A2F23" : "white",
                color: activeCat === cat ? "#F7F6F2" : "rgba(26,47,35,0.6)",
                border: `1px solid ${activeCat === cat ? "#1A2F23" : "rgba(26,47,35,0.1)"}`,
              }}
            >
              {cat}
            </button>
          ))}
        </motion.div>

        {/* Accordion */}
        <div className="space-y-3">
          <AnimatePresence>
            {filtered.map((faq, i) => {
              const isOpen = open === `${activeCat}-${i}`;
              return (
                <motion.div
                  key={`${activeCat}-${i}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.35, delay: i * 0.05 }}
                  className="rounded-2xl overflow-hidden transition-all duration-300"
                  style={{
                    background: "white",
                    border: `1px solid ${isOpen ? "rgba(180,123,89,0.3)" : "rgba(26,47,35,0.06)"}`,
                    boxShadow: isOpen
                      ? "0 8px 30px rgba(180,123,89,0.08)"
                      : "none",
                  }}
                >
                  <button
                    className="w-full flex items-center justify-between gap-4 p-6 text-right"
                    onClick={() => setOpen(isOpen ? null : `${activeCat}-${i}`)}
                  >
                    <div className="flex items-center gap-3">
                      <span
                        className="text-xs px-2.5 py-1 rounded-full font-medium flex-shrink-0"
                        style={{
                          background: "rgba(180,123,89,0.1)",
                          color: "#B47B59",
                        }}
                      >
                        {faq.category}
                      </span>
                      <span
                        className="text-base font-semibold text-right"
                        style={{ color: "#1A2F23" }}
                      >
                        {faq.q}
                      </span>
                    </div>
                    <div
                      className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-300"
                      style={{
                        background: isOpen ? "#B47B59" : "rgba(26,47,35,0.06)",
                      }}
                    >
                      {isOpen ? (
                        <Minus size={14} style={{ color: "#F7F6F2" }} />
                      ) : (
                        <Plus size={14} style={{ color: "#1A2F23" }} />
                      )}
                    </div>
                  </button>

                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <p
                          className="px-6 pb-6 text-sm leading-relaxed"
                          style={{
                            color: "rgba(26,47,35,0.65)",
                            lineHeight: 2,
                          }}
                        >
                          {faq.a}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-12 text-center p-8 rounded-2xl"
          style={{
            background: "rgba(26,47,35,0.04)",
            border: "1px solid rgba(26,47,35,0.06)",
          }}
        >
          <p
            className="text-base font-medium mb-2"
            style={{ color: "#1A2F23" }}
          >
            سوال دیگری دارید؟
          </p>
          <p className="text-sm mb-5" style={{ color: "rgba(26,47,35,0.5)" }}>
            تیم پشتیبانی ما آماده پاسخگویی است
          </p>
          <button
            onClick={() => {
              const el = document.querySelector("#contact");
              if (el) el.scrollIntoView({ behavior: "smooth" });
            }}
            className="px-8 py-3 rounded-full text-sm font-semibold transition-all duration-300 hover:scale-105"
            style={{ background: "#B47B59", color: "#F7F6F2" }}
          >
            تماس با ما
          </button>
        </motion.div>
      </div>
    </section>
  );
}
