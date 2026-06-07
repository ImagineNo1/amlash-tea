import React from "react";
import { motion } from "framer-motion";

export default function ProductCard({ product, index, inView }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="group cursor-pointer"
    >
      <div className="relative rounded-2xl overflow-hidden mb-4 bg-secondary aspect-square">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end"
          style={{
            background:
              "linear-gradient(to top, rgba(26,47,35,0.8), transparent 60%)",
          }}
        >
          <div className="p-5 w-full">
            <p className="text-xs mb-1" style={{ color: "#B47B59" }}>
              {product.type}
            </p>
            <p
              className="text-sm"
              style={{ color: "rgba(247,246,242,0.8)", lineHeight: 1.7 }}
            >
              {product.description}
            </p>
          </div>
        </div>

        {/* Badge */}
        {product.badge && (
          <div
            className="absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-medium"
            style={{ background: "#B47B59", color: "#F7F6F2" }}
          >
            {product.badge}
          </div>
        )}
      </div>

      <h4
        className="text-base font-bold mb-1 transition-colors duration-300 group-hover:text-accent"
        style={{ color: "#1A2F23" }}
      >
        {product.name}
      </h4>
      <p className="text-xs" style={{ color: "rgba(26,47,35,0.5)" }}>
        {product.type}
      </p>
    </motion.div>
  );
}
