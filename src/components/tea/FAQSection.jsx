import React, { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";

const faqs = [
  {
    category: "خرید",
    q: "چطور می‌توانم سفارش بدهم؟",
    a: "می‌توانید از طریق فرم سفارش عمده در همین صفحه، یا با تماس مستقیم با ما از طریق شماره تلفن ۰۱۳-۱۲۳۴۵۶۷۸ سفارش خود را ثبت کنید. کارشناسان ما در کوتاه‌ترین زمان پاسخگو هستند.",
  },
  {
    category: "خرید",
    q: "حداقل مقدار سفارش عمده چقدر است؟",
    a: "حداقل سفارش عمده ۱۰ کیلوگرم است. برای سفارش‌های بالای ۵۰ کیلوگرم، تخفیف ویژه و شرایط پرداخت اقساطی در نظر گرفته می‌شود.",
  },
  {
    category: "ارسال",
    q: "هزینه ارسال به چه صورت است؟",
    a: "برای سفارش‌های بالای ۵ کیلوگرم ارسال رایگان است. سفارش‌های کمتر از ۵ کیلو با هزینه پست پیشتاز یا تیپاکس ارسال می‌شوند. زمان تحویل معمولاً ۳ تا ۵ روز کاری است.",
  },
  {
    category: "ارسال",
    q: "آیا به خارج از ایران هم ارسال می‌کنید؟",
    a: "بله، برای سفارش‌های بین‌المللی لطفاً مستقیم با ما تماس بگیرید تا بر اساس کشور مقصد، بهترین روش ارسال و قیمت‌گذاری انجام شود.",
  },
  {
    category: "کیفیت",
    q: "چای‌های شما چگونه فرآوری می‌شوند؟",
    a: "برگ‌های چای به صورت دستی از باغ‌های ارتفاعی گیلان برداشت شده و با روش‌های سنتی و بدون افزودنی مصنوعی فرآوری می‌شوند. کل فرآیند تحت نظارت کارشناسان مجرب انجام می‌گیرد.",
  },
  {
    category: "کیفیت",
    q: "آیا چای‌های شما گواهینامه کیفیت دارند؟",
    a: "بله، محصولات چای املش دارای تأییدیه استاندارد ملی ایران هستند و به طور منظم توسط آزمایشگاه‌های معتبر آزمایش می‌شوند تا اطمینان از خلوص و کیفیت محصول حاصل شود.",
  },
  {
    category: "کیفیت",
    q: "تفاوت انواع چای‌های شما چیست؟",
    a: "چای ممتاز (سرگل) از نوک ظریف‌ترین برگ‌ها تهیه می‌شود، چای قلم از برگ‌های میانی و دارای طعمی متعادل است، و چای شکسته (BOP) دم‌کشی سریع‌تر و رنگ قوی‌تری دارد. هر کدام برای سلیقه‌ای متفاوت مناسب‌اند.",
  },
  {
    category: "پرداخت",
    q: "روش‌های پرداخت چیست؟",
    a: "پرداخت از طریق کارت بانکی (درگاه آنلاین)، واریز بانکی، و برای سفارش‌های عمده امکان پرداخت اقساطی نیز وجود دارد. همه تراکنش‌ها کاملاً امن هستند.",
  },
];

const categories = ["همه", "خرید", "ارسال", "کیفیت", "پرداخت"];

export default function FAQSection() {
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
            سوالات متداول
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
          پاسخ سوالات شما
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-center text-base mb-10 max-w-lg mx-auto"
          style={{ color: "rgba(26,47,35,0.55)", lineHeight: 1.9 }}
        >
          رایج‌ترین سوالات درباره خرید، ارسال و کیفیت محصولات
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
