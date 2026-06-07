"use client";

const TOAST_EVENT = "amlash-tea-toast";

export function toast({ title, description } = {}) {
  if (typeof window === "undefined") return;
  window.dispatchEvent(
    new CustomEvent(TOAST_EVENT, {
      detail: {
        id: (typeof crypto !== "undefined" && crypto.randomUUID ? crypto.randomUUID() : String(Date.now())),
        title,
        description,
      },
    }),
  );
}

export function useToast() {
  return { toast };
}

export { TOAST_EVENT };
