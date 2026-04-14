import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  Users,
  Tags,
  Settings,
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
  { href: "/admin/orders", icon: ShoppingCart, label: "الطلبات" },
  { href: "/admin/products", icon: Package, label: "المنتجات" },
  { href: "/admin/users", icon: Users, label: "المستخدمين" },
  { href: "/admin/categories", icon: Tags, label: "الأقسام" },
  { href: "/admin/settings", icon: Settings, label: "الإعدادات" },
];

export const orderStatusColors: Record<string, string> = {
  pending: "bg-amber-50 text-amber-600 dark:bg-amber-900/20",
  confirmed: "bg-blue-50 text-blue-600 dark:bg-blue-900/20",
  processing: "bg-indigo-50 text-indigo-600 dark:bg-indigo-900/20",
  shipped: "bg-purple-50 text-purple-600 dark:bg-purple-900/20",
  delivered: "bg-emerald-50 text-emerald-600 dark:bg-emerald-900/20",
  cancelled: "bg-red-50 text-red-600 dark:bg-red-900/20",
};

export const orderStatusLabels: Record<string, string> = {
  pending: "في الانتظار",
  confirmed: "مؤكد",
  processing: "جاري التجهيز",
  shipped: "تم الشحن",
  delivered: "تم التوصيل",
  cancelled: "ملغي",
};

export const userRoleLabels: Record<string, string> = {
  buyer: "مشتري",
  seller: "بائع",
  admin: "مسؤول",
};

export const userStatusLabels: Record<string, string> = {
  active: "نشط",
  pending: "معلق",
  banned: "محظور",
};
