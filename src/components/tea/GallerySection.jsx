"use client";

import React, { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { X, ZoomIn } from "lucide-react";
import { useContent } from "./ContentContext";


export default function GallerySection() {
  const { gallery } = useContent();
  const images = (gallery.images || []).map((item, index) => typeof item === "string" ? { src: item, alt: gallery.title, caption: gallery.title, cols: index === 0 ? "md:col-span-2 md:row-span-2" : index === 5 ? "md:col-span-2 md:row-span-1" : "md:col-span-1 md:row-span-1" } : item);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [selected, setSelected] = useState(null);

  return (
    <section
      id="gallery"
      className="py-24 md:py-36"
      style={{ background: "#F7F6F2" }}
      ref={ref}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12">
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
            {gallery.eyebrow}
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
          {gallery.title}
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.2 }}
          className="text-center text-base mb-14 max-w-lg mx-auto"
          style={{ color: "rgba(26,47,35,0.55)", lineHeight: 1.9 }}
        >
          {gallery.subtitle || "تصاویر منتخب برند چای املش"}
        </motion.p>

        {/* Mosaic grid */}
        <div
          className="grid grid-cols-2 md:grid-cols-4 md:grid-rows-3 gap-3 md:gap-4"
          style={{ minHeight: "560px" }}
        >
          {images.map((img, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.96 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.55, delay: i * 0.07 }}
              className={`relative overflow-hidden rounded-2xl cursor-pointer group ${img.cols}`}
              style={{ minHeight: "180px" }}
              onClick={() => setSelected(img)}
            >
              <img
                src={img.src}
                alt={img.alt}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-400 flex flex-col items-center justify-center gap-2"
                style={{ background: "rgba(26,47,35,0.55)" }}
              >
                <ZoomIn size={26} style={{ color: "#F7F6F2" }} />
                <p
                  className="text-sm font-medium px-4 text-center"
                  style={{ color: "#F7F6F2" }}
                >
                  {img.caption}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-16"
            style={{ background: "rgba(26,47,35,0.94)" }}
            onClick={() => setSelected(null)}
          >
            <motion.div
              initial={{ scale: 0.88, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.88, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="relative max-w-4xl w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={selected.src}
                alt={selected.alt}
                className="w-full max-h-[78vh] object-contain rounded-2xl"
              />
              <p
                className="text-center mt-4 text-sm"
                style={{ color: "rgba(247,246,242,0.6)" }}
              >
                {selected.caption}
              </p>
              <button
                className="absolute -top-4 -left-4 w-10 h-10 rounded-full flex items-center justify-center"
                style={{ background: "#B47B59" }}
                onClick={() => setSelected(null)}
              >
                <X size={16} style={{ color: "#F7F6F2" }} />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
