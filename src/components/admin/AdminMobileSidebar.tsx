"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard, Package, ShoppingCart, Users, Tags, Settings, X, ChevronRight,
} from "lucide-react";

const navItems = [
  { href: "/admin", icon: LayoutDashboard, label: "لوحة التحكم", exact: true },
  { href: "/admin/orders", icon: ShoppingCart, label: "الطلبات", badge: 12 },
  { href: "/admin/products", icon: Package, label: "المنتجات" },
  { href: "/admin/users", icon: Users, label: "المستخدمين" },
  { href: "/admin/categories", icon: Tags, label: "الأقسام" },
  { href: "/admin/settings", icon: Settings, label: "الإعدادات" },
];

export default function AdminMobileSidebar({ onClose }: { onClose: () => void }) {
  const pathname = usePathname();
  const isActive = (href: string, exact?: boolean) =>
    exact ? pathname === href : pathname.startsWith(href);

  return (
    <>
      <div className="fixed inset-0 bg-black/40 z-40 lg:hidden" onClick={onClose} />
      <div className="fixed inset-y-0 right-0 w-72 bg-white dark:bg-slate-800 z-50 lg:hidden overflow-y-auto animate-slide-in-right shadow-2xl">
        <div className="p-4 border-b border-slate-200 dark:border-slate-700 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-lg gradient-primary flex items-center justify-center text-white font-bold">خ</div>
            <span className="font-bold text-slate-800 dark:text-white">لوحة التحكم</span>
          </div>
          <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700">
            <X size={20} />
          </button>
        </div>
        <nav className="p-3 space-y-1">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={onClose}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors ${
                isActive(item.href, item.exact)
                  ? "bg-sky-50 dark:bg-sky-900/30 text-sky-600 font-medium"
                  : "text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-700"
              }`}
            >
              <item.icon size={18} />
              <span className="flex-1">{item.label}</span>
              {item.badge && (
                <span className="bg-red-500 text-white text-[10px] px-1.5 py-0.5 rounded-full">{item.badge}</span>
              )}
            </Link>
          ))}
        </nav>
      </div>
    </>
  );
}
