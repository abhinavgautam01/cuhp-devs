"use client";

import { useToastStore, ToastType } from "../store/useToastStore";

const STYLES_BY_TYPE: Record<ToastType, string> = {
  success: "border-emerald-500/40 bg-emerald-500/15 text-emerald-100",
  error: "border-red-500/40 bg-red-500/15 text-red-100",
  info: "border-blue-500/40 bg-blue-500/15 text-blue-100",
};

export function ToastProvider() {
  const toasts = useToastStore((state) => state.toasts);

  return (
    <div className="pointer-events-none fixed right-4 top-4 z-1000 flex w-full max-w-xs flex-col gap-2 sm:right-6 sm:top-6">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`rounded-lg border px-4 py-3 text-sm font-medium shadow-xl backdrop-blur ${STYLES_BY_TYPE[toast.type]}`}
        >
          {toast.message}
        </div>
      ))}
    </div>
  );
}
