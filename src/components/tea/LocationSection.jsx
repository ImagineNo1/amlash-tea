"use client";

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { MapPin, Phone, Clock, Mail, Navigation } from "lucide-react";

const branches = [
  {
    name: "دفتر مرکزی — املش",
    address: "گیلان، شهرستان رودسر، بخش اشکور، شهرک صنعتی املش",
    phone: "۰۱۳-۱۲۳۴۵۶۷۸",
    hours: "شنبه تا چهارشنبه: ۸ صبح تا ۵ عصر",
    email: "info@amlash-tea.ir",
    color: "#B47B59",
    main: true,
  },
  {
    name: "دفتر توزیع — رشت",
    address: "گیلان، رشت، خیابان لاکانی، پلاک ۴۷",
    phone: "۰۱۳-۳۳۴۵۶۷۸۹",
    hours: "شنبه تا پنج‌شنبه: ۸ صبح تا ۶ عصر",
    email: "rasht@amlash-tea.ir",
    color: "#1A2F23",
    main: false,
  },
  {
    name: "نمایندگی — تهران",
    address: "تهران، بازار چای و قند، راسته شمالی، پلاک ۱۱۲",
    phone: "۰۲۱-۵۵۱۲۳۴۵۶",
    hours: "شنبه تا پنج‌شنبه: ۹ صبح تا ۵ عصر",
    email: "tehran@amlash-tea.ir",
    color: "#1A2F23",
    main: false,
  },
];

export default function LocationSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      id="location"
      className="py-24 md:py-36"
      style={{ background: "#1A2F23" }}
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
            مکان ما
          </span>
          <div className="w-8 h-[0.5px]" style={{ background: "#B47B59" }} />
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="text-3xl md:text-5xl font-bold text-center mb-4"
          style={{ color: "#F7F6F2", lineHeight: 1.5 }}
        >
          شعبه‌های ما
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-center text-base mb-14 max-w-lg mx-auto"
          style={{ color: "rgba(247,246,242,0.5)", lineHeight: 1.9 }}
        >
          در سراسر ایران در دسترس شما هستیم
        </motion.p>

        <div className="grid lg:grid-cols-5 gap-8 items-start">
          {/* Branch cards */}
          <div className="lg:col-span-2 space-y-4">
            {branches.map((branch, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: 30 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.3 + i * 0.12 }}
                className="p-6 rounded-2xl transition-all duration-300 hover:scale-[1.01]"
                style={{
                  background: branch.main
                    ? "rgba(180,123,89,0.15)"
                    : "rgba(247,246,242,0.04)",
                  border: `1px solid ${branch.main ? "rgba(180,123,89,0.35)" : "rgba(247,246,242,0.08)"}`,
                }}
              >
                {branch.main && (
                  <span
                    className="text-xs px-3 py-1 rounded-full font-medium mb-3 inline-block"
                    style={{ background: "#B47B59", color: "#F7F6F2" }}
                  >
                    دفتر اصلی
                  </span>
                )}
                <h3
                  className="text-base font-bold mb-4"
                  style={{ color: "#F7F6F2" }}
                >
                  {branch.name}
                </h3>

                <div className="space-y-3">
                  <InfoRow icon={MapPin} text={branch.address} />
                  <InfoRow icon={Phone} text={branch.phone} dir="ltr" />
                  <InfoRow icon={Clock} text={branch.hours} />
                  <InfoRow icon={Mail} text={branch.email} dir="ltr" />
                </div>

                <a
                  href={`https://maps.google.com/?q=${encodeURIComponent(branch.address)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-5 flex items-center gap-2 text-xs font-medium transition-opacity hover:opacity-70"
                  style={{ color: "#B47B59" }}
                >
                  <Navigation size={13} />
                  مسیریابی
                </a>
              </motion.div>
            ))}
          </div>

          {/* Map embed */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="lg:col-span-3 rounded-2xl overflow-hidden"
            style={{
              height: "480px",
              border: "1px solid rgba(247,246,242,0.08)",
            }}
          >
            {/* Decorative map placeholder with OpenStreetMap iframe */}
            <iframe
              title="موقعیت چای املش"
              src="https://www.openstreetmap.org/export/embed.html?bbox=49.5%2C36.9%2C50.5%2C37.5&layer=mapnik&marker=37.18%2C50.09"
              className="w-full h-full border-0"
              loading="lazy"
            />
          </motion.div>
        </div>

        {/* Bottom contact strip */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-4"
        >
          {[
            { icon: Phone, label: "خط مستقیم", value: "۰۱۳-۱۲۳۴۵۶۷۸" },
            {
              icon: Mail,
              label: "ایمیل پشتیبانی",
              value: "info@amlash-tea.ir",
            },
            {
              icon: Clock,
              label: "ساعات پاسخگویی",
              value: "شنبه تا پنج‌شنبه، ۸ تا ۱۷",
            },
          ].map((item, i) => {
            const Icon = item.icon;
            return (
              <div
                key={i}
                className="flex items-center gap-4 p-5 rounded-xl"
                style={{
                  background: "rgba(247,246,242,0.04)",
                  border: "1px solid rgba(247,246,242,0.07)",
                }}
              >
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ background: "rgba(180,123,89,0.15)" }}
                >
                  <Icon size={18} style={{ color: "#B47B59" }} />
                </div>
                <div>
                  <p
                    className="text-xs mb-0.5"
                    style={{ color: "rgba(247,246,242,0.35)" }}
                  >
                    {item.label}
                  </p>
                  <p
                    className="text-sm font-medium"
                    style={{ color: "#F7F6F2" }}
                  >
                    {item.value}
                  </p>
                </div>
              </div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}

function InfoRow({ icon: Icon, text, dir }) {
  return (
    <div className="flex items-start gap-2.5">
      <Icon
        size={14}
        className="mt-0.5 flex-shrink-0"
        style={{ color: "#B47B59" }}
      />
      <span
        className="text-sm leading-relaxed"
        dir={dir}
        style={{ color: "rgba(247,246,242,0.6)" }}
      >
        {text}
      </span>
    </div>
  );
}
