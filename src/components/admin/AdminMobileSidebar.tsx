"use client";

import { useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  X,
  TrendingUp,
  ShoppingCart,
  DollarSign,
  UserPlus,
} from "lucide-react";
import { useAdmin } from "@/contexts/AdminContext";
import { adminNavItems } from "./constants";

export default function AdminMobileSidebar({ onClose }: { onClose: () => void }) {
  const pathname = usePathname();
  const { orders, users } = useAdmin();
  
  const pendingOrdersCount = orders.filter((o) => o.status === "pending" || o.status === "confirmed").length;
  const todayOrdersCount = orders.filter((o) => {
    const orderDate = new Date(o.createdAt).toDateString();
    return orderDate === new Date().toDateString();
  }).length;
  const totalRevenue = orders.reduce((sum, o) => sum + (o.totalPrice || o.total), 0);
  const newUsersCount = users.filter((u) => {
    const joinDate = new Date(u.joined).toDateString();
    return joinDate === new Date().toDateString();
  }).length;

  const isActive = (href: string, exact?: boolean) =>
    exact ? pathname === href : pathname.startsWith(href);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  return (
    <>
      {/* Backdrop with touch */}
      <div 
        className="fixed inset-0 bg-black/40 z-40 lg:hidden backdrop-blur-sm" 
        onClick={onClose}
        aria-hidden="true"
      />
      
      {/* Sidebar Panel */}
      <div 
        className="fixed inset-y-0 right-0 w-80 max-w-[85vw] bg-white dark:bg-slate-800 z-50 lg:hidden overflow-y-auto animate-slide-in-right shadow-2xl"
        role="dialog"
        aria-label="قائمة التنقل"
      >
        {/* Header */}
        <div className="p-4 border-b border-slate-200 dark:border-slate-700 flex items-center justify-between sticky top-0 bg-white dark:bg-slate-800 z-10">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-lg gradient-primary flex items-center justify-center text-white font-bold">خ</div>
            <span className="font-bold text-slate-800 dark:text-white">لوحة التحكم</span>
          </div>
          <button 
            onClick={onClose} 
            className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors touch-manipulation"
            aria-label="إغلاق القائمة"
          >
            <X size={20} />
          </button>
        </div>

        {/* Quick Stats - Mobile Optimized */}
        <div className="p-3 border-b border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50">
          <div className="grid grid-cols-2 gap-2">
            <div className="p-3 rounded-xl bg-white dark:bg-slate-700 shadow-sm">
              <div className="flex items-center gap-1.5 text-[10px] font-medium text-slate-500">
                <TrendingUp size={12} className="text-emerald-500" />
                <span>طلبات اليوم</span>
              </div>
              <p className="text-xl font-bold text-slate-800 dark:text-white">{todayOrdersCount}</p>
            </div>
            <div className="p-3 rounded-xl bg-white dark:bg-slate-700 shadow-sm">
              <div className="flex items-center gap-1.5 text-[10px] font-medium text-slate-500">
                <ShoppingCart size={12} className="text-amber-500" />
                <span>طلبات معلقة</span>
              </div>
              <p className="text-xl font-bold text-slate-800 dark:text-white">{pendingOrdersCount}</p>
            </div>
            <div className="p-3 rounded-xl bg-white dark:bg-slate-700 shadow-sm">
              <div className="flex items-center gap-1.5 text-[10px] font-medium text-slate-500">
                <DollarSign size={12} className="text-sky-500" />
                <span>الإيرادات</span>
              </div>
              <p className="text-xl font-bold text-slate-800 dark:text-white">{(totalRevenue / 1000).toFixed(1)}k</p>
            </div>
            <div className="p-3 rounded-xl bg-white dark:bg-slate-700 shadow-sm">
              <div className="flex items-center gap-1.5 text-[10px] font-medium text-slate-500">
                <UserPlus size={12} className="text-purple-500" />
                <span>مستخدمين جدد</span>
              </div>
              <p className="text-xl font-bold text-slate-800 dark:text-white">{newUsersCount}</p>
            </div>
          </div>
        </div>

        {/* Navigation - Touch Optimized */}
        <nav className="p-3 space-y-1" aria-label="التنقل في لوحة التحكم">
          {adminNavItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={onClose}
              className={`flex items-center gap-3 px-4 py-3.5 rounded-xl text-sm transition-all touch-manipulation ${
                isActive(item.href, item.exact)
                  ? "bg-gradient-to-r from-sky-50 to-transparent dark:from-sky-900/30 text-sky-600 dark:text-sky-400 font-medium shadow-sm"
                  : "text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-700"
              }`}
            >
              <item.icon size={20} />
              <span className="flex-1">{item.label}</span>
              {item.href === "/admin/orders" && pendingOrdersCount > 0 && (
                <span className="bg-red-500 text-white text-xs px-2 py-0.5 rounded-full font-bold min-w-[24px] text-center">
                  {pendingOrdersCount}
                </span>
              )}
            </Link>
          ))}
        </nav>

        {/* Footer */}
        <div className="p-3 border-t border-slate-200 dark:border-slate-700 sticky bottom-0 bg-white dark:bg-slate-800">
          <Link
            href="/"
            onClick={onClose}
            className="flex items-center justify-center gap-2 w-full py-3 rounded-xl text-sm text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors touch-manipulation"
          >
            <span>العودة للموقع</span>
          </Link>
        </div>
      </div>
    </>
  );
}