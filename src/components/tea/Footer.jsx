"use client";

import React from "react";

export default function Footer() {
  return (
    <footer style={{ background: "#1A2F23" }} className="py-8">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Copper thread */}
        <div className="copper-thread mb-8" />

        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm" style={{ color: "rgba(247,246,242,0.4)" }}>
            © تمامی حقوق برای چای املش محفوظ است.
          </p>

          <div className="flex items-center gap-2">
            <span className="text-lg font-bold" style={{ color: "#F7F6F2" }}>
              چای
            </span>
            <span className="text-lg font-bold" style={{ color: "#B47B59" }}>
              املش
            </span>
          </div>

          <p className="text-xs" style={{ color: "rgba(247,246,242,0.3)" }}>
            عطر اصالت، طعم آرامش
          </p>
        </div>
      </div>
    </footer>
  );
}
