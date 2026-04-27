"use client";

import { createContext, useContext, useState, useCallback, useEffect, useMemo, type ReactNode } from "react";
import type { AdminOrder } from "@/types/admin";
import type { OrderStatus } from "@/types/order";
import { STORAGE_KEYS, loadFromStorage, saveToStorage, defaultOrders } from "@/data/adminData";
import { useAdminActivity } from "./AdminActivityContext";

interface AdminOrderContextType {
  orders: AdminOrder[];
  updateOrderStatus: (id: string, status: OrderStatus) => void;
  getOrder: (id: string) => AdminOrder | undefined;
  getOrdersByStatus: (status: OrderStatus) => AdminOrder[];
  getRecentOrders: (limit?: number) => AdminOrder[];
}

const AdminOrderContext = createContext<AdminOrderContextType | undefined>(undefined);

export function AdminOrderProvider({ children }: { children: ReactNode }) {
  const [orders, setOrders] = useState<AdminOrder[]>(() => loadFromStorage(STORAGE_KEYS.orders, defaultOrders));
  const { addLog } = useAdminActivity();

  useEffect(() => {
    saveToStorage(STORAGE_KEYS.orders, orders);
  }, [orders]);

  const updateOrderStatus = useCallback((id: string, status: OrderStatus) => {
    setOrders((prev) => prev.map((o) => (o.id === id ? { ...o, status: status, updatedAt: new Date().toISOString() } : o)));
    addLog("order", "تحديث حالة طلب", "تم تحديث " + id + " إلى " + status);
  }, [addLog]);

  const getOrder = useCallback((id: string) => {
    return orders.find((o) => o.id === id);
  }, [orders]);

  const getOrdersByStatus = useCallback((status: OrderStatus) => {
    return orders.filter((o) => o.status === status);
  }, [orders]);

  const getRecentOrders = useCallback((limit: number = 10) => {
    return [...orders].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()).slice(0, limit);
  }, [orders]);

  const value = useMemo(
    () => ({
      orders: orders,
      updateOrderStatus: updateOrderStatus,
      getOrder: getOrder,
      getOrdersByStatus: getOrdersByStatus,
      getRecentOrders: getRecentOrders,
    }),
    [orders, updateOrderStatus, getOrder, getOrdersByStatus, getRecentOrders]
  );

  return (
    <AdminOrderContext.Provider value={value}>
      {children}
    </AdminOrderContext.Provider>
  );
}

export function useAdminOrders() {
  const context = useContext(AdminOrderContext);
  if (!context) {
    throw new Error("useAdminOrders must be used within an AdminOrderProvider");
  }
  return context;
}
