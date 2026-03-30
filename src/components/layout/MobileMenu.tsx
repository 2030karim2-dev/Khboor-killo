"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { User, LogOut, Heart } from "lucide-react";
import { categories } from "@/lib";

export default function MobileMenu({
  onClose,
  isAuthenticated,
  userName,
  onLogout,
}: {
  onClose: () => void;
  isAuthenticated: boolean;
  userName?: string;
  onLogout: () => void;
}) {
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleEscape);

    const menu = menuRef.current;
    if (menu) {
      const focusable = menu.querySelectorAll<HTMLElement>(
        'a, button, input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      if (focusable.length > 0) focusable[0].focus();

      const handleTab = (e: KeyboardEvent) => {
        if (e.key !== "Tab" || focusable.length === 0) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      };
      menu.addEventListener("keydown", handleTab);
      return () => {
        document.removeEventListener("keydown", handleEscape);
        menu.removeEventListener("keydown", handleTab);
      };
    }

    return () => document.removeEventListener("keydown", handleEscape);
  }, [onClose]);

  return (
    <div
      ref={menuRef}
      role="dialog"
      aria-modal="true"
      aria-label="القائمة الرئيسية"
      className="p-4 space-y-2"
    >
      <nav aria-label="التنقل">
        <Link
          href="/"
          onClick={onClose}
          className="block px-4 py-3 rounded-xl hover:bg-sky-50 transition-colors font-medium"
        >
          الرئيسية
        </Link>
        {categories.map((cat) => (
          <Link
            key={cat.slug}
            href={`/category/${cat.slug}`}
            onClick={onClose}
            className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-sky-50 transition-colors"
          >
            <span className="text-xl" aria-hidden="true">{cat.icon}</span>
            <span>{cat.name}</span>
          </Link>
        ))}
      </nav>
      <hr className="my-2" />
      {isAuthenticated ? (
        <>
          <Link
            href="/account"
            onClick={onClose}
            className="flex items-center gap-2 px-4 py-3 rounded-xl hover:bg-sky-50 transition-colors"
          >
            <User size={18} aria-hidden="true" />
            <span>{userName}</span>
          </Link>
          <Link
            href="/wishlist"
            onClick={onClose}
            className="flex items-center gap-2 px-4 py-3 rounded-xl hover:bg-sky-50 transition-colors"
          >
            <Heart size={18} aria-hidden="true" />
            <span>المفضلة</span>
          </Link>
          <button
            onClick={() => { onLogout(); onClose(); }}
            className="w-full flex items-center gap-2 px-4 py-3 rounded-xl hover:bg-red-50 text-red-600 transition-colors text-right"
          >
            <LogOut size={18} aria-hidden="true" />
            <span>تسجيل الخروج</span>
          </button>
        </>
      ) : (
        <Link
          href="/login"
          onClick={onClose}
          className="flex items-center gap-2 px-4 py-3 rounded-xl hover:bg-sky-50 transition-colors"
        >
          <User size={18} aria-hidden="true" />
          <span>تسجيل الدخول</span>
        </Link>
      )}
      <Link
        href="/sell"
        onClick={onClose}
        className="block px-4 py-3 rounded-xl bg-orange-500 text-white text-center font-medium"
      >
        بيع منتج
      </Link>
    </div>
  );
}
