import React, { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { PackageCheck, Truck, HeadphonesIcon, ShieldCheck } from "lucide-react";

const orderTypes = [
  { value: "bulk", label: "سفارش عمده" },
  { value: "question", label: "سوال یا مشاوره" },
  { value: "reseller", label: "درخواست نمایندگی" },
  { value: "gift", label: "سفارش هدیه سازمانی" },
];

const teaTypes = [
  "چای سیاه ممتاز",
  "چای عطری",
  "چای قلم",
  "چای شکسته",
  "بسته هدیه",
  "ترکیب چند نوع",
];

const perks = [
  { icon: PackageCheck, text: "تضمین کیفیت" },
  { icon: Truck, text: "ارسال سراسری" },
  { icon: HeadphonesIcon, text: "پشتیبانی ۲۴ ساعته" },
  { icon: ShieldCheck, text: "اصالت محصول" },
];

export default function BulkOrderSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const { toast } = useToast();

  const [form, setForm] = useState({
    name: "",
    phone: "",
    company: "",
    type: "bulk",
    teaType: "",
    quantity: "",
    city: "",
    message: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    toast({
      title: "درخواست شما ثبت شد ✓",
      description: "کارشناسان ما در اسرع وقت با شما تماس خواهند گرفت.",
    });
    setForm({
      name: "",
      phone: "",
      company: "",
      type: "bulk",
      teaType: "",
      quantity: "",
      city: "",
      message: "",
    });
  };

  return (
    <section
      id="order"
      className="py-24 md:py-36 relative overflow-hidden"
      style={{ background: "#1A2F23" }}
      ref={ref}
    >
      {/* Bg decoration */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-1"
        style={{
          background:
            "linear-gradient(90deg, transparent, #B47B59, transparent)",
        }}
      />

      <div className="relative z-10 max-w-6xl mx-auto px-6 md:px-12">
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
            سفارش عمده و استعلام
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
          سفارش عمده یا سوال دارید؟
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-center text-base mb-14 max-w-lg mx-auto"
          style={{ color: "rgba(247,246,242,0.55)", lineHeight: 1.9 }}
        >
          برای سفارش عمده، نمایندگی یا هر سوالی فرم زیر را پر کنید. تیم ما در
          کمترین زمان پاسخ خواهد داد.
        </motion.p>

        {/* Perks bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-14"
        >
          {perks.map((perk, i) => {
            const Icon = perk.icon;
            return (
              <div
                key={i}
                className="flex items-center gap-3 p-4 rounded-xl"
                style={{
                  background: "rgba(247,246,242,0.05)",
                  border: "1px solid rgba(247,246,242,0.08)",
                }}
              >
                <Icon size={18} style={{ color: "#B47B59" }} />
                <span
                  className="text-sm font-medium"
                  style={{ color: "rgba(247,246,242,0.7)" }}
                >
                  {perk.text}
                </span>
              </div>
            );
          })}
        </motion.div>

        {/* Form Card */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.35 }}
          className="rounded-3xl p-8 md:p-12"
          style={{
            background: "rgba(247,246,242,0.04)",
            border: "1px solid rgba(247,246,242,0.08)",
          }}
        >
          {/* Type selector */}
          <div className="mb-8">
            <p
              className="text-sm font-medium mb-3"
              style={{ color: "rgba(247,246,242,0.6)" }}
            >
              نوع درخواست
            </p>
            <div className="flex flex-wrap gap-2">
              {orderTypes.map((t) => (
                <button
                  key={t.value}
                  type="button"
                  onClick={() => setForm({ ...form, type: t.value })}
                  className="px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300"
                  style={{
                    background:
                      form.type === t.value
                        ? "#B47B59"
                        : "rgba(247,246,242,0.07)",
                    color:
                      form.type === t.value
                        ? "#F7F6F2"
                        : "rgba(247,246,242,0.55)",
                    border: `1px solid ${form.type === t.value ? "#B47B59" : "rgba(247,246,242,0.12)"}`,
                  }}
                >
                  {t.label}
                </button>
              ))}
            </div>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <FormField
                label="نام و نام خانوادگی"
                placeholder="نام شما"
                value={form.name}
                onChange={(v) => setForm({ ...form, name: v })}
                required
              />
              <FormField
                label="شماره تماس"
                placeholder="09121234567"
                value={form.phone}
                onChange={(v) => setForm({ ...form, phone: v })}
                dir="ltr"
                required
              />
              <FormField
                label="نام شرکت / سازمان (اختیاری)"
                placeholder="نام شرکت"
                value={form.company}
                onChange={(v) => setForm({ ...form, company: v })}
              />
              <FormField
                label="شهر"
                placeholder="شهر محل تحویل"
                value={form.city}
                onChange={(v) => setForm({ ...form, city: v })}
              />
            </div>

            {/* Tea type & quantity (shown for bulk orders) */}
            {(form.type === "bulk" || form.type === "gift") && (
              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div>
                  <p
                    className="text-sm mb-2"
                    style={{ color: "rgba(247,246,242,0.6)" }}
                  >
                    نوع چای
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {teaTypes.map((t) => (
                      <button
                        key={t}
                        type="button"
                        onClick={() => setForm({ ...form, teaType: t })}
                        className="px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-300"
                        style={{
                          background:
                            form.teaType === t
                              ? "rgba(180,123,89,0.25)"
                              : "rgba(247,246,242,0.05)",
                          color:
                            form.teaType === t
                              ? "#B47B59"
                              : "rgba(247,246,242,0.45)",
                          border: `1px solid ${form.teaType === t ? "rgba(180,123,89,0.5)" : "rgba(247,246,242,0.1)"}`,
                        }}
                      >
                        {t}
                      </button>
                    ))}
                  </div>
                </div>
                <FormField
                  label="مقدار تقریبی (کیلوگرم)"
                  placeholder="مثال: ۵۰ کیلو"
                  value={form.quantity}
                  onChange={(v) => setForm({ ...form, quantity: v })}
                />
              </div>
            )}

            {/* Message */}
            <div className="mb-8">
              <p
                className="text-sm mb-2"
                style={{ color: "rgba(247,246,242,0.6)" }}
              >
                توضیحات بیشتر
              </p>
              <Textarea
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                placeholder="جزئیات سفارش یا سوال خود را بنویسید..."
                className="min-h-[120px] text-right bg-transparent border-white/10 text-white/80 placeholder:text-white/30 focus:border-[#B47B59] resize-none"
              />
            </div>

            <button
              type="submit"
              className="w-full md:w-auto px-14 py-4 rounded-2xl text-base font-bold transition-all duration-500 hover:shadow-lg hover:scale-[1.02] block md:mx-auto"
              style={{
                background: "#B47B59",
                color: "#F7F6F2",
                boxShadow: "0 4px 30px rgba(180,123,89,0.3)",
              }}
            >
              ارسال درخواست
            </button>
          </form>
        </motion.div>
      </div>
    </section>
  );
}

function FormField({ label, placeholder, value, onChange, dir, required }) {
  return (
    <div>
      <p className="text-sm mb-2" style={{ color: "rgba(247,246,242,0.6)" }}>
        {label}
      </p>
      <Input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        dir={dir}
        required={required}
        className="h-12 text-right bg-transparent border-white/10 text-white/80 placeholder:text-white/30 focus:border-[#B47B59]"
      />
    </div>
  );
}
