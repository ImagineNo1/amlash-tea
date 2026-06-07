"use client";

import { useEffect, useState } from "react";
import { TOAST_EVENT } from "@/components/ui/use-toast";

export function Toaster() {
  const [toasts, setToasts] = useState([]);

  useEffect(() => {
    const handleToast = (event) => {
      const nextToast = event.detail;
      setToasts((current) => [nextToast, ...current].slice(0, 3));
      window.setTimeout(() => {
        setToasts((current) => current.filter((item) => item.id !== nextToast.id));
      }, 4200);
    };

    window.addEventListener(TOAST_EVENT, handleToast);
    return () => window.removeEventListener(TOAST_EVENT, handleToast);
  }, []);

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-6 right-6 z-[100] flex w-[calc(100%-3rem)] max-w-sm flex-col gap-3" dir="rtl">
      {toasts.map((item) => (
        <div
          key={item.id}
          className="rounded-2xl border border-accent/25 bg-background/95 p-4 text-right shadow-2xl backdrop-blur"
          style={{ boxShadow: "0 18px 50px rgba(26,47,35,0.18)" }}
        >
          {item.title ? <p className="font-semibold text-foreground">{item.title}</p> : null}
          {item.description ? <p className="mt-1 text-sm leading-6 text-foreground/70">{item.description}</p> : null}
        </div>
      ))}
    </div>
  );
}
