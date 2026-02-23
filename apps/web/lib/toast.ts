import { useToastStore } from "../store/useToastStore";

export type ToastType = "success" | "error" | "info";

export const toast = {
  success: (message: string) => useToastStore.getState().addToast(message, "success"),
  error: (message: string) => useToastStore.getState().addToast(message, "error"),
  info: (message: string) => useToastStore.getState().addToast(message, "info"),
};

export const TOAST_EVENT = "app:toast"; // Kept for legacy compatibility if needed
