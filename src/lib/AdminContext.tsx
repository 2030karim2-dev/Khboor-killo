"use client";

import { createContext, useContext, useState, useCallback, useEffect, ReactNode } from "react";
import type { Product, Category } from "./types";
import type { OrderStatus } from "./orderTypes";
import type { AdminContextType, AdminOrder, AdminUser, ActivityLogEntry } from "./adminTypes";

export type { AdminOrder, AdminUser, AdminSettings, ActivityLogEntry, AdminStats, AdminContextType } from "./adminTypes";
import {
  STORAGE_KEYS, defaultOrders, defaultUsers, defaultSettings,
  loadFromStorage, saveToStorage, getDefaultProducts, getDefaultCategories,
} from "./adminData";

const AdminContext = createContext<AdminContextType | undefined>(undefined);

export function AdminProvider({ children }: { children: ReactNode }) {
  const [products, setProducts] = useState<Product[]>(() => loadFromStorage(STORAGE_KEYS.products, getDefaultProducts()));
  const [orders, setOrders] = useState<AdminOrder[]>(() => loadFromStorage(STORAGE_KEYS.orders, defaultOrders));
  const [users, setUsers] = useState<AdminUser[]>(() => loadFromStorage(STORAGE_KEYS.users, defaultUsers));
  const [categories, setCats] = useState<Category[]>(() => loadFromStorage(STORAGE_KEYS.categories, getDefaultCategories()));
  const [settings, setSettingsState] = useState(() => loadFromStorage(STORAGE_KEYS.settings, defaultSettings));
  const [activityLog, setActivityLog] = useState<ActivityLogEntry[]>(() => loadFromStorage(STORAGE_KEYS.activity, []));

  useEffect(() => { saveToStorage(STORAGE_KEYS.products, products); }, [products]);
  useEffect(() => { saveToStorage(STORAGE_KEYS.orders, orders); }, [orders]);
  useEffect(() => { saveToStorage(STORAGE_KEYS.users, users); }, [users]);
  useEffect(() => { saveToStorage(STORAGE_KEYS.categories, categories); }, [categories]);
  useEffect(() => { saveToStorage(STORAGE_KEYS.settings, settings); }, [settings]);
  useEffect(() => { saveToStorage(STORAGE_KEYS.activity, activityLog); }, [activityLog]);

  const addLog = useCallback((type: ActivityLogEntry["type"], action: string, details: string) => {
    setActivityLog((prev) => [{ id: crypto.randomUUID().slice(0, 8), action, details, user: "المسؤول", timestamp: new Date().toISOString(), type }, ...prev.slice(0, 99)]);
  }, []);

  const addProduct = useCallback((product: Omit<Product, "id">): string => {
    const id = `${product.categorySlug}-${Date.now()}`;
    setProducts((prev) => [{ ...product, id }, ...prev]);
    addLog("product", "إضافة منتج", `تم إضافة "${product.name}"`);
    return id;
  }, [addLog]);

  const updateProduct = useCallback((id: string, data: Partial<Product>) => {
    setProducts((prev) => prev.map((p) => (p.id === id ? { ...p, ...data } : p)));
    addLog("product", "تعديل منتج", `تم تعديل المنتج ${id}`);
  }, [addLog]);

  const deleteProduct = useCallback((id: string) => {
    const p = products.find((x) => x.id === id);
    setProducts((prev) => prev.filter((x) => x.id !== id));
    addLog("product", "حذف منتج", `تم حذف "${p?.name || id}"`);
  }, [products, addLog]);

  const updateOrderStatus = useCallback((id: string, status: OrderStatus) => {
    setOrders((prev) => prev.map((o) => (o.id === id ? { ...o, status } : o)));
    addLog("order", "تحديث حالة طلب", `تم تحديث ${id} إلى ${status}`);
  }, [addLog]);

  const getOrder = useCallback((id: string) => orders.find((o) => o.id === id), [orders]);

  const updateUserRole = useCallback((id: string, role: AdminUser["role"]) => {
    setUsers((prev) => prev.map((u) => (u.id === id ? { ...u, role } : u)));
    addLog("user", "تغيير دور", `تم تغيير دور ${id} إلى ${role}`);
  }, [addLog]);

  const updateUserStatus = useCallback((id: string, status: AdminUser["status"]) => {
    setUsers((prev) => prev.map((u) => (u.id === id ? { ...u, status } : u)));
    addLog("user", "تغيير حالة", `تم تغيير حالة ${id} إلى ${status}`);
  }, [addLog]);

  const addCategory = useCallback((cat: Omit<Category, "slug" | "productCount">) => {
    const slug = cat.name.toLowerCase().replace(/\s+/g, "-");
    setCats((prev) => [...prev, { ...cat, slug, productCount: 0 }]);
    addLog("category", "إضافة قسم", `تم إضافة "${cat.name}"`);
  }, [addLog]);

  const updateCategory = useCallback((slug: string, data: Partial<Category>) => {
    setCats((prev) => prev.map((c) => (c.slug === slug ? { ...c, ...data } : c)));
    addLog("category", "تعديل قسم", slug);
  }, [addLog]);

  const deleteCategory = useCallback((slug: string) => {
    setCats((prev) => prev.filter((c) => c.slug !== slug));
    addLog("category", "حذف قسم", slug);
  }, [addLog]);

  const updateSettings = useCallback((data: Partial<typeof settings>) => {
    setSettingsState((prev: typeof settings) => ({ ...prev, ...data }));
    addLog("settings", "تحديث الإعدادات", "");
  }, [addLog]);

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
      settings, updateSettings, activityLog, getStats,
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
