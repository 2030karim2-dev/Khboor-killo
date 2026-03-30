"use client";

import { X, CheckCircle, AlertCircle, AlertTriangle, Info } from "lucide-react";
import { useToast } from "@/lib/ToastContext";

const icons = {
  success: CheckCircle,
  error: AlertCircle,
  warning: AlertTriangle,
  info: Info,
};

const styles = {
  success: "bg-emerald-50 border-emerald-200 text-emerald-800",
  error: "bg-red-50 border-red-200 text-red-800",
  warning: "bg-amber-50 border-amber-200 text-amber-800",
  info: "bg-sky-50 border-sky-200 text-sky-800",
};

const iconStyles = {
  success: "text-emerald-500",
  error: "text-red-500",
  warning: "text-amber-500",
  info: "text-sky-500",
};

export default function ToastContainer() {
  const { toasts, removeToast } = useToast();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-4 left-4 z-[100] flex flex-col gap-2 max-w-sm w-full" role="alert" aria-live="polite">
      {toasts.map((toast) => {
        const Icon = icons[toast.type];
        return (
          <div
            key={toast.id}
            className={`flex items-center gap-3 p-4 rounded-xl border shadow-lg animate-slide-up ${styles[toast.type]}`}
          >
            <Icon size={20} className={iconStyles[toast.type]} />
            <p className="flex-1 text-sm font-medium">{toast.message}</p>
            <button
              onClick={() => removeToast(toast.id)}
              className="shrink-0 opacity-60 hover:opacity-100 transition-opacity"
              aria-label="إغلاق"
            >
              <X size={16} />
            </button>
          </div>
        );
      })}
    </div>
  );
}
