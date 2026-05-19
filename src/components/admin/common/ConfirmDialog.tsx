"use client";

import { useState, useEffect } from "react";
import { CheckCircle, AlertCircle, AlertTriangle, Info, X } from "lucide-react";

interface ConfirmDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  variant?: "default" | "danger" | "warning";
  icon?: React.ReactNode;
}

const icons = {
  default: <Info size={24} className="text-sky-500" />,
  danger: <AlertCircle size={24} className="text-red-500" />,
  warning: <AlertTriangle size={24} className="text-amber-500" />,
};

const buttonClasses = {
  default: "btn-primary",
  danger: "bg-red-500 hover:bg-red-600 text-white",
  warning: "bg-amber-500 hover:bg-amber-600 text-white",
};

export function ConfirmDialog({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmText = "تأكيد",
  cancelText = "إلغاء",
  variant = "default",
  icon,
}: ConfirmDialogProps) {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 animate-fade-in">
      <div className="bg-white dark:bg-slate-800 rounded-xl shadow-xl w-full max-w-md animate-slide-up">
        <div className="p-6">
          <div className="flex items-start gap-4">
            <div className="shrink-0">{icon || icons[variant]}</div>
            <div className="flex-1">
              <h3 className="text-lg font-bold text-slate-800 dark:text-white mb-2">{title}</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400">{message}</p>
            </div>
          </div>
        </div>
        <div className="flex gap-3 p-4 border-t border-slate-200 dark:border-slate-700 justify-end">
          <button
            onClick={onClose}
            className="btn-outline"
          >
            {cancelText}
          </button>
          <button
            onClick={() => {
              onConfirm();
              onClose();
            }}
            className={buttonClasses[variant]}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
}