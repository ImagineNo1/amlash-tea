"use client";

import React from "react";
import Navbar from "../components/tea/Navbar";
import HeroSection from "../components/tea/HeroSection";
import StorySection from "../components/tea/StorySection";
import ProductFeaturesSection from "../components/tea/ProductFeaturesSection";
import FeaturesSection from "../components/tea/FeaturesSection";
import ProductsSection from "../components/tea/ProductsSection";
import GallerySection from "../components/tea/GallerySection";
import QuoteSection from "../components/tea/QuoteSection";
import TestimonialsSection from "../components/tea/TestimonialsSection";
import FAQSection from "../components/tea/FAQSection";
import BulkOrderSection from "../components/tea/BulkOrderSection";
import ContactSection from "../components/tea/ContactSection";
import LocationSection from "../components/tea/LocationSection";
import Footer from "../components/tea/Footer";

export default function Home() {
  return (
    <div
      className="min-h-screen overflow-x-hidden"
      style={{ background: "#F7F6F2" }}
    >
      <Navbar />

      {/* ۱. هیرو */}
      <HeroSection />

      {/* ۲. داستان + درباره ما */}
      <div className="copper-thread" />
      <StorySection />

      {/* ۳. ویژگی‌های محصول */}
      <div className="copper-thread" />
      <ProductFeaturesSection />
      <FeaturesSection />

      {/* ۴. معرفی انواع چای (با مودال جزئیات) */}
      <div className="copper-thread" />
      <ProductsSection />

      {/* ۵. گالری عکس */}
      <div className="copper-thread" />
      <GallerySection />

      {/* ۶. نقل‌قول الهام‌بخش */}
      <QuoteSection />

      {/* ۷. رضایت مشتریان */}
      <TestimonialsSection />

      {/* ۸. سوالات متداول */}
      <div className="copper-thread" />
      <FAQSection />

      {/* ۹. سفارش عمده */}
      <BulkOrderSection />

      {/* ۱۰. تماس با ما */}
      <ContactSection />

      {/* ۱۱. نقشه و شعبه‌ها */}
      <LocationSection />

      <Footer />
    </div>
  );
}
