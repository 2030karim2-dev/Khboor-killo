"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Menu, Bell, Search, User, ChevronDown } from "lucide-react";
import AdminMobileSidebar from "./AdminMobileSidebar";
import { useAuth } from "@/contexts/AuthContext";
import { useNotifications } from "@/contexts/NotificationsContext";

export default function AdminHeader() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const ref = useRef<HTMLDivElement>(null);
  const { logout, user } = useAuth();
  const { notifications, unreadCount, markAllAsRead } = useNotifications();
  const router = useRouter();

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setUserMenuOpen(false);
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery("");
    }
  };

  return (
    <>
      <header className="h-14 bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 flex items-center justify-between px-4 md:px-6">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setMobileOpen(true)}
            className="lg:hidden p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700"
            aria-label="القائمة"
          >
            <Menu size={20} className="text-slate-600 dark:text-slate-300" />
          </button>
          <form onSubmit={handleSearch} className="relative hidden sm:block">
            <Search size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="بحث في المنتجات..."
              className="w-64 py-1.5 pr-9 pl-3 rounded-lg bg-slate-100 dark:bg-slate-700 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500 text-right"
            />
          </form>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => { markAllAsRead(); }}
            className="relative p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700"
            aria-label={`الإشعارات (${unreadCount})`}
          >
            <Bell size={20} className="text-slate-600 dark:text-slate-300" />
            {unreadCount > 0 && <span className="absolute top-0.5 right-0.5 w-2 h-2 rounded-full bg-red-500" />}
          </button>

          <div className="relative" ref={ref}>
            <button
              onClick={() => setUserMenuOpen(!userMenuOpen)}
              className="flex items-center gap-2 p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700"
              aria-label="قائمة المستخدم"
              aria-expanded={userMenuOpen}
            >
              <div className="w-7 h-7 rounded-full bg-sky-100 flex items-center justify-center">
                <User size={14} className="text-sky-600" />
              </div>
              <span className="text-sm text-slate-700 dark:text-slate-300 hidden sm:inline">{user ? `${user.firstName} ${user.lastName}` : "المسؤول"}</span>
              <ChevronDown size={14} className="text-slate-400" />
            </button>
            {userMenuOpen && (
              <div className="absolute top-full left-0 mt-1 bg-white dark:bg-slate-800 rounded-lg shadow-xl border border-slate-200 dark:border-slate-700 py-1 min-w-[160px] animate-fade-in z-50">
                <Link href="/admin/settings" onClick={() => setUserMenuOpen(false)} className="block px-4 py-2 text-sm hover:bg-slate-50 dark:hover:bg-slate-700">
                  الإعدادات
                </Link>
                <hr className="my-1 border-slate-100 dark:border-slate-700" />
                <button
                  onClick={() => { logout(); setUserMenuOpen(false); router.push("/"); }}
                  className="w-full text-right px-4 py-2 text-sm text-red-500 hover:bg-red-50"
                >
                  تسجيل الخروج
                </button>
              </div>
            )}
          </div>
        </div>
      </header>

      {mobileOpen && <AdminMobileSidebar onClose={() => setMobileOpen(false)} />}
    </>
  );
}
