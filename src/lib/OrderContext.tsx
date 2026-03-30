"use client";

import {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
  ReactNode,
} from "react";
import { CartItem } from "./types";

export type OrderStatus = "pending" | "confirmed" | "processing" | "shipped" | "delivered" | "cancelled";

export interface Order {
  id: string;
  items: CartItem[];
  totalPrice: number;
  shippingCost: number;
  status: OrderStatus;
  shipping: {
    firstName: string;
    lastName: string;
    phone: string;
    city: string;
    address: string;
  };
  paymentMethod: "card" | "cash";
  createdAt: string;
}

interface OrderContextType {
  orders: Order[];
  addOrder: (order: Omit<Order, "id" | "createdAt" | "status">) => string;
  getOrder: (id: string) => Order | undefined;
  updateOrderStatus: (id: string, status: OrderStatus) => void;
}

const OrderContext = createContext<OrderContextType | undefined>(undefined);

const STORAGE_KEY = "khuboor_orders";

const statusLabels: Record<OrderStatus, string> = {
  pending: "في الانتظار",
  confirmed: "تم التأكيد",
  processing: "قيد التجهيز",
  shipped: "قيد الشحن",
  delivered: "تم التوصيل",
  cancelled: "ملغي",
};

export { statusLabels };

export function OrderProvider({ children }: { children: ReactNode }) {
  const [orders, setOrders] = useState<Order[]>(() => {
    if (typeof window === "undefined") return [];
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) return parsed;
      } catch {
        localStorage.removeItem(STORAGE_KEY);
      }
    }
    return [];
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(orders));
  }, [orders]);

  const addOrder = useCallback((order: Omit<Order, "id" | "createdAt" | "status">): string => {
    const id = crypto.randomUUID().slice(0, 8).toUpperCase();
    const newOrder: Order = {
      ...order,
      id,
      status: "confirmed",
      createdAt: new Date().toISOString(),
    };
    setOrders((prev) => [newOrder, ...prev]);
    return id;
  }, []);

  const getOrder = useCallback(
    (id: string) => orders.find((o) => o.id === id),
    [orders]
  );

  const updateOrderStatus = useCallback((id: string, status: OrderStatus) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === id ? { ...o, status } : o))
    );
  }, []);

  return (
    <OrderContext.Provider value={{ orders, addOrder, getOrder, updateOrderStatus }}>
      {children}
    </OrderContext.Provider>
  );
}

export function useOrders() {
  const context = useContext(OrderContext);
  if (!context) throw new Error("useOrders must be used within an OrderProvider");
  return context;
}
