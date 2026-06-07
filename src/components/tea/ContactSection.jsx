import React, { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Phone, Mail, MapPin } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

export default function ContactSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const { toast } = useToast();
  const [form, setForm] = useState({ name: "", phone: "", message: "" });

  const handleSubmit = (e) => {
    e.preventDefault();
    toast({
      title: "پیام شما ارسال شد",
      description: "به زودی با شما تماس خواهیم گرفت",
    });
    setForm({ name: "", phone: "", message: "" });
  };

  return (
    <section
      id="contact"
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
            تماس با ما
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
          با ما در ارتباط باشید
        </motion.h2>

        <div className="grid md:grid-cols-2 gap-12 md:gap-20">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-8"
          >
            <ContactItem icon={Phone} label="تلفن" value="013-12345678" />
            <ContactItem icon={Mail} label="ایمیل" value="info@amlash-tea.ir" />
            <ContactItem
              icon={MapPin}
              label="آدرس"
              value="گیلان، املش، شهرک صنعتی املش"
            />

            {/* Social / Instagram hint */}
            <div className="pt-4">
              <p className="text-sm" style={{ color: "rgba(26,47,35,0.5)" }}>
                ما را در اینستاگرام دنبال کنید
              </p>
              <p
                className="text-base font-semibold mt-1"
                style={{ color: "#B47B59" }}
              >
                @amlash_tea
              </p>
            </div>
          </motion.div>

          {/* Form */}
          <motion.form
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            onSubmit={handleSubmit}
            className="space-y-6"
          >
            <div>
              <label
                className="block text-sm font-medium mb-2"
                style={{ color: "#1A2F23" }}
              >
                نام و نام خانوادگی
              </label>
              <Input
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                placeholder="نام شما"
                className="bg-white/60 border-border/40 focus:border-accent h-12 text-right"
                required
              />
            </div>
            <div>
              <label
                className="block text-sm font-medium mb-2"
                style={{ color: "#1A2F23" }}
              >
                شماره تماس
              </label>
              <Input
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                placeholder="09121234567"
                className="bg-white/60 border-border/40 focus:border-accent h-12 text-right"
                dir="ltr"
                required
              />
            </div>
            <div>
              <label
                className="block text-sm font-medium mb-2"
                style={{ color: "#1A2F23" }}
              >
                پیام
              </label>
              <Textarea
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                placeholder="پیام خود را بنویسید..."
                className="bg-white/60 border-border/40 focus:border-accent min-h-[120px] text-right"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full py-3.5 rounded-xl text-base font-semibold transition-all duration-500 hover:shadow-lg hover:scale-[1.02]"
              style={{
                background: "#B47B59",
                color: "#F7F6F2",
                boxShadow: "0 4px 20px rgba(180,123,89,0.2)",
              }}
            >
              ارسال پیام
            </button>
          </motion.form>
        </div>
      </div>
    </section>
  );
}

function ContactItem({ icon: Icon, label, value }) {
  return (
    <div className="flex items-start gap-4">
      <div
        className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
        style={{ background: "rgba(180,123,89,0.1)" }}
      >
        <Icon size={20} style={{ color: "#B47B59" }} />
      </div>
      <div>
        <p className="text-xs mb-1" style={{ color: "rgba(26,47,35,0.5)" }}>
          {label}
        </p>
        <p className="text-base font-medium" style={{ color: "#1A2F23" }}>
          {value}
        </p>
      </div>
    </div>
  );
}
