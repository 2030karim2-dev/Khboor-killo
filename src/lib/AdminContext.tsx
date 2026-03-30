"use client";

import { createContext, useContext, useState, useCallback, useEffect, ReactNode } from "react";
import { products as defaultProducts, categories as defaultCategories } from "@/lib";
import type { Product, Category } from "@/lib/types";
import type { OrderStatus } from "@/lib/orderTypes";

export interface AdminOrder {
  id: string;
  customer: string;
  phone: string;
  city: string;
  address: string;
  items: { productId: string; name: string; price: number; quantity: number; image: string }[];
  total: number;
  shippingCost: number;
  paymentMethod: "card" | "cash";
  status: OrderStatus;
  date: string;
  notes?: string;
}

export interface AdminUser {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: "buyer" | "seller" | "admin";
  orders: number;
  totalSpent: number;
  status: "active" | "pending" | "banned";
  joined: string;
}

export interface AdminSettings {
  siteName: string;
  siteDescription: string;
  supportEmail: string;
  freeShippingThreshold: number;
  shippingCost: number;
  returnDays: number;
  emailNotifications: boolean;
  smsNotifications: boolean;
  autoConfirmOrders: boolean;
  minPasswordLength: number;
  twoFactorAuth: boolean;
}

export interface ActivityLogEntry {
  id: string;
  action: string;
  details: string;
  user: string;
  timestamp: string;
  type: "order" | "product" | "user" | "category" | "settings";
}

interface AdminContextType {
  // Products
  products: Product[];
  addProduct: (product: Omit<Product, "id">) => string;
  updateProduct: (id: string, data: Partial<Product>) => void;
  deleteProduct: (id: string) => void;

  // Orders
  orders: AdminOrder[];
  updateOrderStatus: (id: string, status: OrderStatus) => void;
  getOrder: (id: string) => AdminOrder | undefined;

  // Users
  users: AdminUser[];
  updateUserRole: (id: string, role: AdminUser["role"]) => void;
  updateUserStatus: (id: string, status: AdminUser["status"]) => void;

  // Categories
  categories: Category[];
  addCategory: (cat: Omit<Category, "slug" | "productCount">) => void;
  updateCategory: (slug: string, data: Partial<Category>) => void;
  deleteCategory: (slug: string) => void;

  // Settings
  settings: AdminSettings;
  updateSettings: (data: Partial<AdminSettings>) => void;

  // Activity Log
  activityLog: ActivityLogEntry[];

  // Stats
  getStats: () => {
    totalSales: number;
    totalOrders: number;
    totalProducts: number;
    totalUsers: number;
    pendingOrders: number;
    lowStockProducts: number;
  };
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

const STORAGE_KEYS = {
  products: "khuboor_admin_products",
  orders: "khuboor_admin_orders",
  users: "khuboor_admin_users",
  categories: "khuboor_admin_categories",
  settings: "khuboor_admin_settings",
  activity: "khuboor_admin_activity",
};

function loadFromStorage<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const stored = localStorage.getItem(key);
    if (stored) return JSON.parse(stored);
  } catch { /* empty */ }
  return fallback;
}

function saveToStorage<T>(key: string, data: T) {
  localStorage.setItem(key, JSON.stringify(data));
}

// Default data
const defaultOrders: AdminOrder[] = [
  { id: "KH12345678", customer: "أحمد محمد", phone: "0501234567", city: "الرياض", address: "حي النخيل", items: [{ productId: "car-1", name: "تويوتا كامري 2024", price: 125000, quantity: 1, image: "" }], total: 125000, shippingCost: 0, paymentMethod: "card", status: "delivered", date: "2025-01-15" },
  { id: "KH12345677", customer: "فاطمة علي", phone: "0509876543", city: "جدة", address: "حي الصفا", items: [{ productId: "part-3", name: "بطارية سيارة 100 أمبير", price: 380, quantity: 1, image: "" }], total: 380, shippingCost: 25, paymentMethod: "cash", status: "shipped", date: "2025-01-15" },
  { id: "KH12345676", customer: "عبدالله سعيد", phone: "0551234567", city: "الدمام", address: "حي الفيصلية", items: [{ productId: "cloth-1", name: "ثوب رجالي فاخر", price: 180, quantity: 5, image: "" }], total: 900, shippingCost: 0, paymentMethod: "card", status: "confirmed", date: "2025-01-14" },
  { id: "KH12345675", customer: "مريم حسن", phone: "0561234567", city: "الرياض", address: "حي العليا", items: [{ productId: "acc-1", name: "ساعة ذكية احترافية", price: 599, quantity: 1, image: "" }], total: 599, shippingCost: 25, paymentMethod: "cash", status: "cancelled", date: "2025-01-14" },
  { id: "KH12345674", customer: "خالد عمر", phone: "0571234567", city: "مكة", address: "حي العزيزية", items: [{ productId: "build-4", name: "دهان داخلي أبيض", price: 120, quantity: 3, image: "" }], total: 360, shippingCost: 25, paymentMethod: "card", status: "processing", date: "2025-01-13" },
  { id: "KH12345673", customer: "سارة أحمد", phone: "0581234567", city: "الرياض", address: "حي الملز", items: [{ productId: "acc-4", name: "حقيبة ظهر لابتوب", price: 189, quantity: 1, image: "" }], total: 189, shippingCost: 25, paymentMethod: "cash", status: "pending", date: "2025-01-13" },
];

const defaultUsers: AdminUser[] = [
  { id: "1", name: "أحمد محمد", email: "ahmed@email.com", phone: "0501234567", role: "buyer", orders: 12, totalSpent: 15430, status: "active", joined: "2025-06-15" },
  { id: "2", name: "فاطمة علي", email: "fatima@email.com", phone: "0509876543", role: "buyer", orders: 5, totalSpent: 3200, status: "active", joined: "2025-07-20" },
  { id: "3", name: "عبدالله سعيد", email: "abdullah@email.com", phone: "0551234567", role: "seller", orders: 0, totalSpent: 0, status: "active", joined: "2025-08-01" },
  { id: "4", name: "مريم حسن", email: "mariam@email.com", phone: "0561234567", role: "buyer", orders: 8, totalSpent: 7890, status: "pending", joined: "2025-08-15" },
  { id: "5", name: "خالد عمر", email: "khaled@email.com", phone: "0571234567", role: "seller", orders: 0, totalSpent: 0, status: "active", joined: "2025-09-10" },
];

const defaultSettings: AdminSettings = {
  siteName: "خبور",
  siteDescription: "منصة البيع والشراء الإلكترونية الرائدة",
  supportEmail: "support@khuboor.com",
  freeShippingThreshold: 200,
  shippingCost: 25,
  returnDays: 14,
  emailNotifications: true,
  smsNotifications: false,
  autoConfirmOrders: false,
  minPasswordLength: 8,
  twoFactorAuth: false,
};

export function AdminProvider({ children }: { children: ReactNode }) {
  const [products, setProducts] = useState<Product[]>(() => loadFromStorage(STORAGE_KEYS.products, [...defaultProducts]));
  const [orders, setOrders] = useState<AdminOrder[]>(() => loadFromStorage(STORAGE_KEYS.orders, defaultOrders));
  const [users, setUsers] = useState<AdminUser[]>(() => loadFromStorage(STORAGE_KEYS.users, defaultUsers));
  const [categories, setCats] = useState<Category[]>(() => loadFromStorage(STORAGE_KEYS.categories, [...defaultCategories]));
  const [settings, setSettingsState] = useState<AdminSettings>(() => loadFromStorage(STORAGE_KEYS.settings, defaultSettings));
  const [activityLog, setActivityLog] = useState<ActivityLogEntry[]>(() => loadFromStorage(STORAGE_KEYS.activity, []));

  // Persist
  useEffect(() => { saveToStorage(STORAGE_KEYS.products, products); }, [products]);
  useEffect(() => { saveToStorage(STORAGE_KEYS.orders, orders); }, [orders]);
  useEffect(() => { saveToStorage(STORAGE_KEYS.users, users); }, [users]);
  useEffect(() => { saveToStorage(STORAGE_KEYS.categories, categories); }, [categories]);
  useEffect(() => { saveToStorage(STORAGE_KEYS.settings, settings); }, [settings]);
  useEffect(() => { saveToStorage(STORAGE_KEYS.activity, activityLog); }, [activityLog]);

  const addLog = useCallback((type: ActivityLogEntry["type"], action: string, details: string) => {
    const entry: ActivityLogEntry = {
      id: crypto.randomUUID().slice(0, 8),
      action,
      details,
      user: "المسؤول",
      timestamp: new Date().toISOString(),
      type,
    };
    setActivityLog((prev) => [entry, ...prev.slice(0, 99)]);
  }, []);

  // Products CRUD
  const addProduct = useCallback((product: Omit<Product, "id">): string => {
    const id = `${product.categorySlug}-${Date.now()}`;
    const newProduct: Product = { ...product, id };
    setProducts((prev) => [newProduct, ...prev]);
    addLog("product", "إضافة منتج", `تم إضافة "${product.name}"`);
    return id;
  }, [addLog]);

  const updateProduct = useCallback((id: string, data: Partial<Product>) => {
    setProducts((prev) => prev.map((p) => (p.id === id ? { ...p, ...data } : p)));
    addLog("product", "تعديل منتج", `تم تعديل المنتج ${id}`);
  }, [addLog]);

  const deleteProduct = useCallback((id: string) => {
    const product = products.find((p) => p.id === id);
    setProducts((prev) => prev.filter((p) => p.id !== id));
    addLog("product", "حذف منتج", `تم حذف "${product?.name || id}"`);
  }, [products, addLog]);

  // Orders CRUD
  const updateOrderStatus = useCallback((id: string, status: OrderStatus) => {
    setOrders((prev) => prev.map((o) => (o.id === id ? { ...o, status } : o)));
    addLog("order", "تحديث حالة طلب", `تم تحديث حالة الطلب ${id} إلى ${status}`);
  }, [addLog]);

  const getOrder = useCallback((id: string) => orders.find((o) => o.id === id), [orders]);

  // Users CRUD
  const updateUserRole = useCallback((id: string, role: AdminUser["role"]) => {
    setUsers((prev) => prev.map((u) => (u.id === id ? { ...u, role } : u)));
    addLog("user", "تغيير دور مستخدم", `تم تغيير دور المستخدم ${id} إلى ${role}`);
  }, [addLog]);

  const updateUserStatus = useCallback((id: string, status: AdminUser["status"]) => {
    setUsers((prev) => prev.map((u) => (u.id === id ? { ...u, status } : u)));
    addLog("user", "تغيير حالة مستخدم", `تم تغيير حالة المستخدم ${id} إلى ${status}`);
  }, [addLog]);

  // Categories CRUD
  const addCategory = useCallback((cat: Omit<Category, "slug" | "productCount">) => {
    const slug = cat.name.toLowerCase().replace(/\s+/g, "-");
    const newCat: Category = { ...cat, slug, productCount: 0 };
    setCats((prev) => [...prev, newCat]);
    addLog("category", "إضافة قسم", `تم إضافة قسم "${cat.name}"`);
  }, [addLog]);

  const updateCategory = useCallback((slug: string, data: Partial<Category>) => {
    setCats((prev) => prev.map((c) => (c.slug === slug ? { ...c, ...data } : c)));
    addLog("category", "تعديل قسم", `تم تعديل القسم ${slug}`);
  }, [addLog]);

  const deleteCategory = useCallback((slug: string) => {
    setCats((prev) => prev.filter((c) => c.slug !== slug));
    addLog("category", "حذف قسم", `تم حذف القسم ${slug}`);
  }, [addLog]);

  // Settings
  const updateSettings = useCallback((data: Partial<AdminSettings>) => {
    setSettingsState((prev) => ({ ...prev, ...data }));
    addLog("settings", "تحديث الإعدادات", "تم تحديث إعدادات الموقع");
  }, [addLog]);

  // Stats
  const getStats = useCallback(() => ({
    totalSales: orders.filter((o) => o.status === "delivered").reduce((s, o) => s + o.total, 0),
    totalOrders: orders.length,
    totalProducts: products.length,
    totalUsers: users.length,
    pendingOrders: orders.filter((o) => o.status === "pending" || o.status === "confirmed").length,
    lowStockProducts: products.filter((p) => !p.inStock).length,
  }), [orders, products, users]);

  return (
    <AdminContext.Provider value={{
      products, addProduct, updateProduct, deleteProduct,
      orders, updateOrderStatus, getOrder,
      users, updateUserRole, updateUserStatus,
      categories, addCategory, updateCategory, deleteCategory,
      settings, updateSettings,
      activityLog,
      getStats,
    }}>
      {children}
    </AdminContext.Provider>
  );
}

export function useAdmin() {
  const context = useContext(AdminContext);
  if (!context) throw new Error("useAdmin must be used within an AdminProvider");
  return context;
}
