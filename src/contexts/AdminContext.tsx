"use client";

import { createContext, useContext, type ReactNode } from "react";
import { AdminActivityContext } from "./AdminActivityContext";
import { AdminProductContext } from "./AdminProductContext";
import { AdminOrderContext } from "./AdminOrderContext";
import { AdminUserContext } from "./AdminUserContext";
import { AdminSettingsContext } from "./AdminSettingsContext";

const AdminContext = createContext<unknown>(undefined);

export { AdminContext };

export function AdminProvider({ children }: { children: ReactNode }) {
  return <>{children}</>;
}

export { useAdminActivity } from "./AdminActivityContext";
export { useAdminProducts } from "./AdminProductContext";
export { useAdminOrders } from "./AdminOrderContext";
export { useAdminUsers } from "./AdminUserContext";
export { useAdminSettings } from "./AdminSettingsContext";

export function useAdmin() {
  const activity = useContext(AdminActivityContext);
  const products = useContext(AdminProductContext);
  const orders = useContext(AdminOrderContext);
  const users = useContext(AdminUserContext);
  const settings = useContext(AdminSettingsContext);
  
  if (!activity || !products || !orders || !users || !settings) {
    throw new Error("useAdmin must be used within all Admin providers");
  }
  
  return {
    ...products,
    ...orders,
    ...users,
    ...settings,
    activityLog: activity.activityLog,
  };
}