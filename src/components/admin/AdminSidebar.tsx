"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, ChevronRight } from "lucide-react";
import { useAdminOrders } from "@/contexts/AdminOrderContext";
import { useAdminProducts } from "@/contexts/AdminProductContext";
import { useAdminUsers } from "@/contexts/AdminUserContext";
import { adminNavItems, type AdminNavItem } from "./constants";
import SidebarStats from "./SidebarStats";
import SidebarSection from "./SidebarSection";

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
    icon: LayoutDashboard,
    items: [adminNavItems[1], adminNavItems[2], adminNavItems[3]],
  },
  {
    id: "catalog",
    title: "الكتالوج",
    icon: LayoutDashboard,
    items: [adminNavItems[4]],
  },
  {
    id: "system",
    title: "النظام",
    icon: LayoutDashboard,
    items: [adminNavItems[5]],
  },
];

export default function AdminSidebar() {
  const pathname = usePathname();
  const { orders } = useAdminOrders();
  const { products } = useAdminProducts();
  const { users } = useAdminUsers();
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
      <SidebarHeader />

      <SidebarStats
        todayOrders={todayOrdersCount}
        pendingOrders={pendingOrdersCount}
        revenue={totalRevenue}
        newUsers={newUsersCount}
      />

      <nav className="flex-1 p-3 space-y-1 overflow-y-auto" aria-label="التنقل في لوحة التحكم">
        {adminSections.map((section) => (
          <SidebarSection
            key={section.id}
            title={section.title}
            icon={section.icon}
            items={section.items}
            isCollapsed={!!collapsedSections[section.id]}
            hasActiveItem={section.items.some((item) => isActive(item.href, item.exact))}
            onToggle={() => toggleSection(section.id)}
            isActive={isActive}
            badges={{ "/admin/orders": pendingOrdersCount }}
          />
        ))}
      </nav>

      <SidebarFooter />
    </aside>
  );
}

function SidebarHeader() {
  return (
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
  );
}

function SidebarFooter() {
  return (
    <div className="p-3 border-t border-slate-200 dark:border-slate-700">
      <Link
        href="/"
        className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
      >
        <ChevronRight size={16} className="rotate-180" />
        <span>العودة للموقع</span>
      </Link>
    </div>
  );
}