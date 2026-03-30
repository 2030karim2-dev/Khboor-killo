"use client";

import { Share2 } from "lucide-react";
import { useToast } from "@/lib/ToastContext";

export default function ShareButton({
  title,
  text,
}: {
  title: string;
  text: string;
}) {
  const { success, info } = useToast();

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({ title, text, url: window.location.href });
      } catch {
        // User cancelled
      }
    } else {
      await navigator.clipboard.writeText(window.location.href);
      success("تم نسخ الرابط!");
    }
  };

  return (
    <button
      onClick={handleShare}
      className="p-3 rounded-xl border-2 border-slate-200 hover:border-sky-300 transition-colors"
      aria-label="مشاركة المنتج"
    >
      <Share2 size={20} aria-hidden="true" />
    </button>
  );
}
