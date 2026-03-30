"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { User, Heart, LogOut, LayoutDashboard } from "lucide-react";
import { useAuth } from "@/lib/AuthContext";

export default function UserMenuDropdown() {
  const { user, logout } = useAuth();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="hidden sm:block relative" ref={ref}>
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-1.5 p-2 rounded-xl hover:bg-slate-100 transition-colors text-slate-700"
        aria-expanded={open}
        aria-haspopup="true"
        aria-label="قائمة المستخدم"
      >
        <User size={22} aria-hidden="true" />
        <span className="text-sm max-w-[80px] truncate">{user?.firstName}</span>
      </button>
      {open && (
        <div className="absolute top-full left-0 mt-1 bg-white rounded-xl shadow-xl border border-slate-200 py-2 min-w-[180px] animate-fade-in z-50">
          <Link href="/account" onClick={() => setOpen(false)} className="flex items-center gap-2 px-4 py-2.5 hover:bg-sky-50 text-sm">
            <User size={16} aria-hidden="true" /> حسابي
          </Link>
          <Link href="/wishlist" onClick={() => setOpen(false)} className="flex items-center gap-2 px-4 py-2.5 hover:bg-sky-50 text-sm">
            <Heart size={16} aria-hidden="true" /> المفضلة
          </Link>
          <Link href="/admin" onClick={() => setOpen(false)} className="flex items-center gap-2 px-4 py-2.5 hover:bg-sky-50 text-sm">
            <LayoutDashboard size={16} aria-hidden="true" /> لوحة التحكم
          </Link>
          <hr className="my-1" />
          <button onClick={() => { logout(); setOpen(false); }} className="w-full flex items-center gap-2 px-4 py-2.5 hover:bg-red-50 text-sm text-red-600 text-right">
            <LogOut size={16} aria-hidden="true" /> تسجيل الخروج
          </button>
        </div>
      )}
    </div>
  );
}
