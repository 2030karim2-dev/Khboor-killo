import type { AdminOrder } from "../types/admin";
import { defaultOrders } from "../data/adminData";

export const SHARED_ORDERS_KEY = "khuboor_shared_orders";

export function loadSharedOrders(): AdminOrder[] {
  if (typeof window === "undefined") return defaultOrders;
  try {
    const stored = localStorage.getItem(SHARED_ORDERS_KEY);
    if (stored) {
      const orders = JSON.parse(stored);
      if (Array.isArray(orders) && orders.length > 0) return orders;
    }
  } catch { /* empty */ }
  return defaultOrders;
}

export function saveSharedOrders(orders: AdminOrder[]) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(SHARED_ORDERS_KEY, JSON.stringify(orders));
  } catch { /* storage full or unavailable */ }
}

export function addToSharedOrders(order: AdminOrder) {
  const orders = loadSharedOrders();
  saveSharedOrders([order, ...orders]);
}
