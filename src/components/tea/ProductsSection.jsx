"use client";

import React, { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

const products = [
  {
    name: "چای سیاه ممتاز (سرگل)",
    type: "چای سیاه درجه یک",
    image:
      "https://media.base44.com/images/public/6a252eebc05f7ea73ab7493a/83eb07455_generated_d1f24797.png",
    badge: "پرفروش",
    color: "#B47B59",
    features: ["عطر بسیار قوی", "رنگ قرمز طلایی", "دم‌کشی سریع"],
    description:
      "بهترین و ظریف‌ترین برگ‌های دست‌چین شده از نوک جوانه‌های چای. طعمی غنی، عطری ماندگار و رنگ زیبای قرمز طلایی در هر استکان.",
    weight: "بسته‌بندی ۱۰۰ و ۵۰۰ گرمی",
    origin: "ارتفاعات شمالی گیلان",
  },
  {
    name: "چای عطری",
    type: "چای معطر",
    image:
      "https://media.base44.com/images/public/6a252eebc05f7ea73ab7493a/158d12719_generated_3ea17b22.png",
    badge: null,
    color: "#1A2F23",
    features: ["رایحه طبیعی", "ترکیب گیاهی", "تجربه متفاوت"],
    description:
      "ترکیبی منحصربه‌فرد از بهترین چای سیاه گیلان با رایحه‌های طبیعی. برای کسانی که می‌خواهند تجربه‌ای متفاوت و دل‌نشین داشته باشند.",
    weight: "بسته‌بندی ۱۰۰ و ۲۵۰ گرمی",
    origin: "گیلان با افزودنی‌های طبیعی",
  },
  {
    name: "چای قلم",
    type: "چای درجه یک",
    image:
      "https://media.base44.com/images/public/6a252eebc05f7ea73ab7493a/d0c943f5e_generated_ef717b39.png",
    badge: "محبوب",
    color: "#B47B59",
    features: ["طعم متعادل", "برگ‌های بلند", "مناسب هر روز"],
    description:
      "چای قلم با برگ‌های بلند و پیچیده شده، ظاهری زیبا و طعمی ملایم دارد. ایده‌آل برای مصرف روزانه خانواده‌هایی که سلیقه‌ای متعادل دارند.",
    weight: "بسته‌بندی ۲۰۰ و ۵۰۰ گرمی",
    origin: "باغ‌های مرکزی گیلان",
  },
  {
    name: "چای شکسته (BOP)",
    type: "چای BOP",
    image:
      "https://media.base44.com/images/public/6a252eebc05f7ea73ab7493a/37fbc11ee_generated_dd320981.png",
    badge: null,
    color: "#1A2F23",
    features: ["دم‌کشی فوری", "رنگ قوی", "اقتصادی"],
    description:
      "چای شکسته درشت با دم‌کشی سریع و رنگ قرمز عمیق. مناسب برای مصرف روزانه، مهمانی‌ها و هر مناسبتی که نیاز به آماده‌سازی سریع دارید.",
    weight: "بسته‌بندی ۵۰۰ گرم و ۱ کیلو",
    origin: "گیلان",
  },
  {
    name: "بسته هدیه ویژه",
    type: "بسته‌بندی لوکس",
    image:
      "https://media.base44.com/images/public/6a252eebc05f7ea73ab7493a/8d0d58594_generated_8890b6a5.png",
    badge: "جدید",
    color: "#B47B59",
    features: ["بسته‌بندی شیک", "ترکیب محصولات", "مناسب هدیه"],
    description:
      "ترکیبی از بهترین انواع چای در یک جعبه هدیه لوکس. ایده‌آل برای هدیه دادن به مدیران، دوستان و خانواده در مناسبت‌های خاص.",
    weight: "ست ۳ عددی ۱۰۰ گرمی",
    origin: "ترکیب بهترین محصولات",
  },
  {
    name: "چای سیاه ممتاز عمده",
    type: "بسته‌بندی صادراتی",
    image:
      "https://media.base44.com/images/public/6a252eebc05f7ea73ab7493a/03b1c0d94_generated_41168812.png",
    badge: "عمده",
    color: "#1A2F23",
    features: ["بسته‌بندی کیلویی", "مناسب فروشگاه‌ها", "قیمت خاص"],
    description:
      "همان کیفیت چای ممتاز در بسته‌بندی اقتصادی کیلویی برای فروشگاه‌ها، رستوران‌ها و مصارف عمده. با خرید بالاتر از ۱۰ کیلو تخفیف ویژه دریافت کنید.",
    weight: "بسته‌بندی ۱، ۲ و ۵ کیلویی",
    origin: "ارتفاعات گیلان",
  },
];

function ProductModal({ product, onClose }) {
  if (!product) return null;
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: "rgba(26,47,35,0.88)" }}
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, y: 30 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 30 }}
        transition={{ duration: 0.3 }}
        className="relative bg-white rounded-3xl max-w-xl w-full overflow-hidden shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative h-52">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover"
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(to top, rgba(26,47,35,0.5), transparent 50%)",
            }}
          />
          {product.badge && (
            <span
              className="absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-bold"
              style={{ background: "#B47B59", color: "#F7F6F2" }}
            >
              {product.badge}
            </span>
          )}
          <button
            className="absolute top-4 left-4 w-9 h-9 rounded-full flex items-center justify-center"
            style={{ background: "rgba(26,47,35,0.7)" }}
            onClick={onClose}
          >
            <X size={15} style={{ color: "#F7F6F2" }} />
          </button>
        </div>

        <div className="p-7">
          <span className="text-xs font-medium" style={{ color: "#B47B59" }}>
            {product.type}
          </span>
          <h3
            className="text-xl font-bold mt-1 mb-3"
            style={{ color: "#1A2F23" }}
          >
            {product.name}
          </h3>
          <p
            className="text-sm leading-relaxed mb-5"
            style={{ color: "rgba(26,47,35,0.65)", lineHeight: 1.95 }}
          >
            {product.description}
          </p>

          <div className="flex flex-wrap gap-2 mb-5">
            {product.features.map((f, i) => (
              <span
                key={i}
                className="px-3 py-1.5 rounded-full text-xs font-medium"
                style={{ background: "rgba(180,123,89,0.1)", color: "#B47B59" }}
              >
                {f}
              </span>
            ))}
          </div>

          <div className="grid grid-cols-2 gap-3 mb-6 text-sm">
            <div
              className="p-3 rounded-xl"
              style={{ background: "rgba(26,47,35,0.04)" }}
            >
              <p
                className="text-xs mb-1"
                style={{ color: "rgba(26,47,35,0.4)" }}
              >
                وزن
              </p>
              <p className="font-medium" style={{ color: "#1A2F23" }}>
                {product.weight}
              </p>
            </div>
            <div
              className="p-3 rounded-xl"
              style={{ background: "rgba(26,47,35,0.04)" }}
            >
              <p
                className="text-xs mb-1"
                style={{ color: "rgba(26,47,35,0.4)" }}
              >
                منشأ
              </p>
              <p className="font-medium" style={{ color: "#1A2F23" }}>
                {product.origin}
              </p>
            </div>
          </div>

          <button
            onClick={() => {
              onClose();
              setTimeout(() => {
                const el = document.querySelector("#order");
                if (el) el.scrollIntoView({ behavior: "smooth" });
              }, 300);
            }}
            className="w-full py-3.5 rounded-2xl text-sm font-bold transition-all duration-300 hover:scale-[1.02]"
            style={{ background: "#B47B59", color: "#F7F6F2" }}
          >
            ثبت سفارش
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function ProductsSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [selected, setSelected] = useState(null);

  return (
    <section
      id="products"
      className="py-24 md:py-36"
      style={{ background: "#F7F6F2" }}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12" ref={ref}>
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
            محصولات ما
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
          انواع چای املش
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.2 }}
          className="text-center text-base mb-14 max-w-lg mx-auto"
          style={{ color: "rgba(26,47,35,0.55)", lineHeight: 1.9 }}
        >
          روی هر محصول کلیک کنید تا مشخصات کامل و ویژگی‌های آن را ببینید
        </motion.p>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-5 md:gap-8">
          {products.map((product, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.55, delay: i * 0.09 }}
              className="group cursor-pointer"
              onClick={() => setSelected(product)}
            >
              {/* Image */}
              <div className="relative rounded-2xl overflow-hidden mb-4 aspect-square bg-secondary">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-400 flex items-center justify-center"
                  style={{ background: "rgba(26,47,35,0.5)" }}
                >
                  <span
                    className="px-4 py-2 rounded-full text-xs font-bold"
                    style={{ background: "#B47B59", color: "#F7F6F2" }}
                  >
                    مشاهده جزئیات
                  </span>
                </div>
                {product.badge && (
                  <span
                    className="absolute top-3 right-3 px-2.5 py-1 rounded-full text-xs font-bold"
                    style={{ background: "#B47B59", color: "#F7F6F2" }}
                  >
                    {product.badge}
                  </span>
                )}
              </div>

              {/* Info */}
              <p
                className="text-xs mb-1 font-medium"
                style={{ color: "#B47B59" }}
              >
                {product.type}
              </p>
              <h4
                className="text-sm md:text-base font-bold mb-2 transition-colors duration-300 group-hover:text-[#B47B59]"
                style={{ color: "#1A2F23" }}
              >
                {product.name}
              </h4>
              <div className="flex flex-wrap gap-1.5">
                {product.features.map((f, fi) => (
                  <span
                    key={fi}
                    className="text-xs px-2 py-0.5 rounded-full"
                    style={{
                      background: "rgba(26,47,35,0.06)",
                      color: "rgba(26,47,35,0.55)",
                    }}
                  >
                    {f}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selected && (
          <ProductModal product={selected} onClose={() => setSelected(null)} />
        )}
      </AnimatePresence>
    </section>
  );
}
