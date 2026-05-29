"use client";

import type { AdminOrder } from "@/types/admin";

const SHARED_STORAGE_KEY = "khuboor_shared_orders";

export function loadSharedOrders(): AdminOrder[] {
  if (typeof window === "undefined") return [];
  try {
    const stored = localStorage.getItem(SHARED_STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored);
      if (Array.isArray(parsed)) return parsed;
    }
  } catch {
    localStorage.removeItem(SHARED_STORAGE_KEY);
  }
  return [];
}

export function addToSharedOrders(order: AdminOrder) {
  if (typeof window === "undefined") return;
  try {
    const existing = loadSharedOrders();
    const updated = [order, ...existing.filter(o => o.id !== order.id)];
    localStorage.setItem(SHARED_STORAGE_KEY, JSON.stringify(updated.slice(0, 200)));
  } catch {
    // ignore
  }
}