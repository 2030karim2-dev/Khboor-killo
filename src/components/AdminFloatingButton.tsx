"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

export default function AdminFloatingButton() {
  const pathname = usePathname();
  const { isAuthenticated } = useAuth();

  if (pathname.startsWith("/admin") || !isAuthenticated) return null;

  return (
    <Link
      href="/admin"
      className="fixed bottom-20 md:bottom-6 left-4 z-40 w-12 h-12 rounded-full bg-slate-900 dark:bg-sky-600 text-white flex items-center justify-center shadow-xl hover:scale-110 transition-transform group"
      aria-label="لوحة التحكم"
    >
      <LayoutDashboard size={20} />
      <span className="absolute left-14 bg-slate-900 text-white text-xs px-3 py-1.5 rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
        لوحة التحكم
      </span>
    </Link>
  );
}
