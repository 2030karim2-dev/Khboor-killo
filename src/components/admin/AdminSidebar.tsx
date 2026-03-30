"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  Users,
  Tags,
  Settings,
  ChevronRight,
} from "lucide-react";

const navItems = [
  { href: "/admin", icon: LayoutDashboard, label: "لوحة التحكم", exact: true },
  { href: "/admin/orders", icon: ShoppingCart, label: "الطلبات", badge: 12 },
  { href: "/admin/products", icon: Package, label: "المنتجات" },
  { href: "/admin/users", icon: Users, label: "المستخدمين" },
  { href: "/admin/categories", icon: Tags, label: "الأقسام" },
  { href: "/admin/settings", icon: Settings, label: "الإعدادات" },
];

export default function AdminSidebar() {
  const pathname = usePathname();

  const isActive = (href: string, exact?: boolean) =>
    exact ? pathname === href : pathname.startsWith(href);

  return (
    <aside className="hidden lg:flex flex-col w-64 bg-white dark:bg-slate-800 border-l border-slate-200 dark:border-slate-700">
      <div className="p-4 border-b border-slate-200 dark:border-slate-700">
        <Link href="/admin" className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-lg gradient-primary flex items-center justify-center text-white font-bold">
            خ
          </div>
          <div>
            <h1 className="text-sm font-bold text-slate-800 dark:text-white">لوحة التحكم</h1>
            <p className="text-[10px] text-slate-400">خبور</p>
          </div>
        </Link>
      </div>

      <nav className="flex-1 p-3 space-y-1">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors ${
              isActive(item.href, item.exact)
                ? "bg-sky-50 dark:bg-sky-900/30 text-sky-600 font-medium"
                : "text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-700"
            }`}
          >
            <item.icon size={18} />
            <span className="flex-1">{item.label}</span>
            {item.badge && (
              <span className="bg-red-500 text-white text-[10px] px-1.5 py-0.5 rounded-full font-bold">
                {item.badge}
              </span>
            )}
            {isActive(item.href, item.exact) && (
              <ChevronRight size={14} className="text-sky-400" />
            )}
          </Link>
        ))}
      </nav>

      <div className="p-3 border-t border-slate-200 dark:border-slate-700">
        <Link
          href="/"
          className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
        >
          <ChevronRight size={16} />
          <span>العودة للموقع</span>
        </Link>
      </div>
    </aside>
  );
}
