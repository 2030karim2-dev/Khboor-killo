"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  ChevronRight,
  ChevronDown,
  LayoutDashboard,
  Package,
  ShoppingCart,
  Users,
  Tags,
  Settings,
  TrendingUp,
  TrendingDown,
  DollarSign,
  UserPlus,
  X,
} from "lucide-react";
import { useAdmin } from "@/contexts/AdminContext";
import { adminNavItems, type AdminNavItem } from "./constants";

interface AdminSection {
  id: string;
  title: string;
  icon: typeof LayoutDashboard;
  items: AdminNavItem[];
  badge?: number;
  defaultOpen?: boolean;
}

const adminSections: AdminSection[] = [
  {
    id: "main",
    title: "الرئيسية",
    icon: LayoutDashboard,
    items: [adminNavItems[0]],
    defaultOpen: true,
  },
  {
    id: "management",
    title: "الإدارة",
    icon: Package,
    items: [adminNavItems[1], adminNavItems[2], adminNavItems[3]],
  },
  {
    id: "catalog",
    title: "الكتالوج",
    icon: Tags,
    items: [adminNavItems[4]],
  },
  {
    id: "system",
    title: "النظام",
    icon: Settings,
    items: [adminNavItems[5]],
  },
];

export default function AdminSidebar() {
  const pathname = usePathname();
  const { orders, products, users } = useAdmin();
  const [collapsedSections, setCollapsedSections] = useState<Record<string, boolean>>({});

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

  const toggleSection = (sectionId: string) => {
    setCollapsedSections((prev) => ({ ...prev, [sectionId]: !prev[sectionId] }));
  };

  return (
    <aside className="hidden lg:flex flex-col w-64 bg-white dark:bg-slate-800 border-e border-slate-200 dark:border-slate-700">
      {/* Header */}
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

      {/* Quick Stats */}
      <div className="p-3 border-b border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50">
        <div className="grid grid-cols-2 gap-2">
          <div className="p-2 rounded-lg bg-white dark:bg-slate-700">
            <div className="flex items-center gap-1 text-[10px] text-slate-500">
              <TrendingUp size={10} className="text-emerald-500" />
              <span>اليوم</span>
            </div>
            <p className="text-lg font-bold text-slate-800 dark:text-white">{todayOrdersCount}</p>
          </div>
          <div className="p-2 rounded-lg bg-white dark:bg-slate-700">
            <div className="flex items-center gap-1 text-[10px] text-slate-500">
              <ShoppingCart size={10} className="text-amber-500" />
              <span>معلق</span>
            </div>
            <p className="text-lg font-bold text-slate-800 dark:text-white">{pendingOrdersCount}</p>
          </div>
          <div className="p-2 rounded-lg bg-white dark:bg-slate-700">
            <div className="flex items-center gap-1 text-[10px] text-slate-500">
              <DollarSign size={10} className="text-sky-500" />
              <span>الإيرادات</span>
            </div>
            <p className="text-lg font-bold text-slate-800 dark:text-white">{(totalRevenue / 1000).toFixed(1)}k</p>
          </div>
          <div className="p-2 rounded-lg bg-white dark:bg-slate-700">
            <div className="flex items-center gap-1 text-[10px] text-slate-500">
              <UserPlus size={10} className="text-purple-500" />
              <span>جديد</span>
            </div>
            <p className="text-lg font-bold text-slate-800 dark:text-white">{newUsersCount}</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-3 space-y-1 overflow-y-auto" aria-label="التنقل في لوحة التحكم">
        {adminSections.map((section) => {
          const isCollapsed = collapsedSections[section.id];
          const hasActiveItem = section.items.some((item) => isActive(item.href, item.exact));
          
          return (
            <div key={section.id}>
              <button
                onClick={() => toggleSection(section.id)}
                className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-medium transition-colors ${
                  hasActiveItem
                    ? "text-sky-600 dark:text-sky-400 bg-sky-50 dark:bg-sky-900/20"
                    : "text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300"
                }`}
              >
                <section.icon size={14} />
                <span className="flex-1 text-right">{section.title}</span>
                {section.items.length > 1 && (
                  <ChevronDown
                    size={12}
                    className={`transition-transform ${isCollapsed ? "-rotate-90" : ""}`}
                  />
                )}
              </button>
              
              {!isCollapsed && (
                <div className="mr-2 space-y-1 border-s border-slate-100 dark:border-slate-700 pr-2">
                  {section.items.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors ${
                        isActive(item.href, item.exact)
                          ? "bg-sky-50 dark:bg-sky-900/30 text-sky-600 font-medium"
                          : "text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-700"
                      }`}
                    >
                      <item.icon size={16} />
                      <span className="flex-1">{item.label}</span>
                      {item.href === "/admin/orders" && pendingOrdersCount > 0 && (
                        <span className="bg-red-500 text-white text-[10px] px-1.5 py-0.5 rounded-full font-bold">
                          {pendingOrdersCount}
                        </span>
                      )}
                      {isActive(item.href, item.exact) && (
                        <ChevronRight size={14} className="text-sky-400" />
                      )}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="p-3 border-t border-slate-200 dark:border-slate-700">
        <Link
          href="/"
          className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
        >
          <ChevronRight size={16} className="rotate-180" />
          <span>العودة للموقع</span>
        </Link>
      </div>
    </aside>
  );
}