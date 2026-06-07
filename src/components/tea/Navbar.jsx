"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useContent } from "./ContentContext";


export default function Navbar() {
  const { site } = useContent();
  const navLinks = site.navLinks || [];
  const [visible, setVisible] = useState(false);
  const [lastScroll, setLastScroll] = useState(0);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const current = window.scrollY;
      if (current < 100) {
        setVisible(false);
      } else if (current < lastScroll) {
        setVisible(true);
      } else {
        setVisible(false);
        setMobileOpen(false);
      }
      setLastScroll(current);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScroll]);

  const scrollTo = (href) => {
    setMobileOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.nav
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -100, opacity: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-background/70 border-b border-border/30 shadow-sm"
        >
          <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
            <h1
              className="text-xl font-bold cursor-pointer"
              style={{ color: "#1A2F23" }}
              onClick={() => scrollTo("#hero")}
            >
              {site.brandName?.replace(site.logoAccent || "", "")} <span style={{ color: "#B47B59" }}>{site.logoAccent}</span>
            </h1>

            {/* Desktop */}
            <div className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <button
                  key={link.href}
                  onClick={() => scrollTo(link.href)}
                  className="text-sm font-medium text-foreground/70 hover:text-accent transition-colors duration-300"
                >
                  {link.label}
                </button>
              ))}
              <button
                onClick={() => scrollTo("#products")}
                className="px-5 py-2 rounded-full text-sm font-medium transition-all duration-300"
                style={{ background: "#B47B59", color: "#F7F6F2" }}
              >
                مشاهده محصولات
              </button>
            </div>

            {/* Mobile toggle */}
            <button
              className="md:hidden p-2"
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>

          {/* Mobile menu */}
          <AnimatePresence>
            {mobileOpen && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="md:hidden overflow-hidden border-t border-border/20"
              >
                <div className="px-6 py-4 flex flex-col gap-3">
                  {navLinks.map((link) => (
                    <button
                      key={link.href}
                      onClick={() => scrollTo(link.href)}
                      className="text-right py-2 text-sm font-medium text-foreground/70 hover:text-accent transition-colors"
                    >
                      {link.label}
                    </button>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.nav>
      )}
    </AnimatePresence>
  );
}
