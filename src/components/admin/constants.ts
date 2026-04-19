import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  Users,
  Tags,
  Settings,
  BarChart3,
  type LucideIcon,
} from "lucide-react";

export interface AdminNavItem {
  href: string;
  icon: LucideIcon;
  label: string;
  exact?: boolean;
  badge?: number;
}

export const adminNavItems: AdminNavItem[] = [
  { href: "/admin", icon: LayoutDashboard, label: "لوحة التحكم", exact: true },
  { href: "/admin/reports", icon: BarChart3, label: "التقارير" },
  { href: "/admin/orders", icon: ShoppingCart, label: "الطلبات" },
  { href: "/admin/products", icon: Package, label: "المنتجات" },
  { href: "/admin/users", icon: Users, label: "المستخدمين" },
  { href: "/admin/categories", icon: Tags, label: "الأقسام" },
  { href: "/admin/settings", icon: Settings, label: "الإعدادات" },
];

export type OrderStatus = "pending" | "confirmed" | "processing" | "shipped" | "delivered" | "cancelled";

export const orderStatusColors: Record<OrderStatus, string> = {
  pending: "bg-amber-50 text-amber-600 dark:bg-amber-900/20 dark:text-amber-400",
  confirmed: "bg-sky-50 text-sky-600 dark:bg-sky-900/20 dark:text-sky-400",
  processing: "bg-purple-50 text-purple-600 dark:bg-purple-900/20 dark:text-purple-400",
  shipped: "bg-indigo-50 text-indigo-600 dark:bg-indigo-900/20 dark:text-indigo-400",
  delivered: "bg-emerald-50 text-emerald-600 dark:bg-emerald-900/20 dark:text-emerald-400",
  cancelled: "bg-red-50 text-red-600 dark:bg-red-900/20 dark:text-red-400",
};

export const orderStatusLabels: Record<OrderStatus, string> = {
  pending: "في الانتظار",
  confirmed: "مؤكد",
  processing: "جاري التجهيز",
  shipped: "تم الشحن",
  delivered: "تم التوصيل",
  cancelled: "ملغي",
};

export const validStatusTransitions: Record<OrderStatus, OrderStatus[]> = {
  pending: ["confirmed", "cancelled"],
  confirmed: ["processing", "cancelled"],
  processing: ["shipped", "cancelled"],
  shipped: ["delivered"],
  delivered: [],
  cancelled: [],
};

export const userRoleLabels: Record<string, string> = {
  buyer: "مشتري",
  seller: "بائع",
  admin: "مسؤول",
};

export const userRoleColors: Record<string, string> = {
  admin: "bg-red-50 text-red-600 dark:bg-red-900/20",
  seller: "bg-purple-50 text-purple-600 dark:bg-purple-900/20",
  buyer: "bg-sky-50 text-sky-600 dark:bg-sky-900/20",
};

export const userStatusLabels: Record<string, string> = {
  active: "نشط",
  pending: "معلق",
  banned: "محظور",
};

export const userStatusColors: Record<string, string> = {
  active: "bg-emerald-50 text-emerald-600 dark:bg-emerald-900/20",
  pending: "bg-amber-50 text-amber-600 dark:bg-amber-900/20",
  banned: "bg-red-50 text-red-600 dark:bg-red-900/20",
};
