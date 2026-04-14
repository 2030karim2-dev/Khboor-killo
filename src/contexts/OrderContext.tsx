"use client";

import {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
  useMemo,
  type ReactNode,
} from "react";
import { Order, OrderStatus } from "../types/order";
import { addToSharedOrders, loadSharedOrders } from "../lib/sharedOrders";
import type { AdminOrder } from "../types/admin";

export type { Order, OrderStatus } from "../types/order";
export { statusLabels } from "../types/order";

interface OrderContextType {
  orders: Order[];
  addOrder: (order: Omit<Order, "id" | "createdAt" | "status">) => string;
  getOrder: (id: string) => Order | undefined;
  updateOrderStatus: (id: string, status: OrderStatus) => void;
  syncFromAdmin: () => void;
}

const OrderContext = createContext<OrderContextType | undefined>(undefined);

const STORAGE_KEY = "khuboor_orders";

export function OrderProvider({ children }: { children: ReactNode }) {
  const [orders, setOrders] = useState<Order[]>(() => {
    if (typeof window === "undefined") return [];
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) return parsed;
      }
    } catch {
      localStorage.removeItem(STORAGE_KEY);
    }
    return [];
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(orders));
  }, [orders]);

  const syncFromAdmin = useCallback(() => {
    const adminOrders = loadSharedOrders();
    const userOrderIds = new Set(orders.map(o => o.id));
    const newFromAdmin = adminOrders
      .filter(o => !userOrderIds.has(o.id))
      .map((adminOrder): Order => ({
        id: adminOrder.id,
        items: adminOrder.items.map(item => ({
          product: {
            id: item.productId,
            name: item.name,
            description: "",
            price: item.price,
            image: item.image,
            category: "",
            categorySlug: "",
            rating: 0,
            reviews: 0,
            inStock: true,
          },
          quantity: item.quantity,
        })),
        totalPrice: adminOrder.totalPrice || adminOrder.total,
        shippingCost: adminOrder.shippingCost,
        status: adminOrder.status,
        shipping: {
          firstName: adminOrder.customer.split(" ")[0] || "",
          lastName: adminOrder.customer.split(" ").slice(1).join(" ") || "",
          phone: adminOrder.phone,
          city: adminOrder.city,
          address: adminOrder.address,
        },
        paymentMethod: adminOrder.paymentMethod,
        createdAt: adminOrder.createdAt || adminOrder.date,
      }));
    if (newFromAdmin.length > 0) {
      setOrders(prev => [...newFromAdmin, ...prev]);
    }
  }, [orders]);

  const addOrder = useCallback((order: Omit<Order, "id" | "createdAt" | "status">): string => {
    const id = `KH${Date.now().toString().slice(-8)}`;
    const newOrder: Order = {
      ...order,
      id,
      status: "confirmed",
      createdAt: new Date().toISOString(),
    };
    setOrders((prev) => [newOrder, ...prev]);

    addToSharedOrders({
      id,
      customer: `${order.shipping.firstName} ${order.shipping.lastName}`.trim(),
      phone: order.shipping.phone,
      city: order.shipping.city,
      address: order.shipping.address,
      items: order.items.map(item => ({
        productId: item.product.id,
        name: item.product.name,
        price: item.product.price,
        quantity: item.quantity,
        image: item.product.image,
      })),
      total: order.totalPrice,
      totalPrice: order.totalPrice,
      shippingCost: order.shippingCost,
      paymentMethod: order.paymentMethod,
      status: "confirmed",
      date: new Date().toISOString().split("T")[0],
      createdAt: new Date().toISOString(),
    });

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

  const value = useMemo(
    () => ({ orders, addOrder, getOrder, updateOrderStatus, syncFromAdmin }),
    [orders, addOrder, getOrder, updateOrderStatus, syncFromAdmin]
  );

  return (
    <OrderContext.Provider value={value}>
      {children}
    </OrderContext.Provider>
  );
}

export function useOrders() {
  const context = useContext(OrderContext);
  if (!context) throw new Error("useOrders must be used within an OrderProvider");
  return context;
}
