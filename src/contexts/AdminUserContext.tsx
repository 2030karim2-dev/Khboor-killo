"use client";

import { createContext, useContext, useState, useCallback, useEffect, useMemo, type ReactNode } from "react";
import type { AdminUser } from "@/types/admin";
import { STORAGE_KEYS, loadFromStorage, saveToStorage, defaultUsers } from "@/data/adminData";
import { useAdminActivity } from "./AdminActivityContext";

export type { AdminUser };

interface AdminUserContextType {
  users: AdminUser[];
  addUser: (userData: Omit<AdminUser, "id" | "orders" | "totalSpent" | "joined">) => AdminUser;
  updateUserRole: (id: string, role: AdminUser["role"]) => void;
  updateUserStatus: (id: string, status: AdminUser["status"]) => void;
  updateUserStats: (id: string, ordersDelta: number, spentDelta: number) => void;
  getUserById: (id: string) => AdminUser | undefined;
}

const AdminUserContext = createContext<AdminUserContextType | undefined>(undefined);

export function AdminUserProvider({ children }: { children: ReactNode }) {
  const [users, setUsers] = useState<AdminUser[]>(() => loadFromStorage(STORAGE_KEYS.users, defaultUsers));
  const { addLog } = useAdminActivity();

  useEffect(() => {
    saveToStorage(STORAGE_KEYS.users, users);
  }, [users]);

  const addUser = useCallback((userData: Omit<AdminUser, "id" | "orders" | "totalSpent" | "joined">): AdminUser => {
    const newUser: AdminUser = {
      ...userData,
      id: crypto.randomUUID().slice(0, 8),
      orders: 0,
      totalSpent: 0,
      joined: new Date().toISOString().split("T")[0],
    };
    setUsers((prev) => [newUser, ...prev]);
    addLog("user", "إضافة مستخدم", "تم إضافة " + userData.name);
    return newUser;
  }, [addLog]);

  const updateUserRole = useCallback((id: string, role: AdminUser["role"]) => {
    setUsers((prev) => prev.map((u) => (u.id === id ? { ...u, role } : u)));
    addLog("user", "تغيير دور", "تم تغيير دور " + id + " إلى " + role);
  }, [addLog]);

  const updateUserStatus = useCallback((id: string, status: AdminUser["status"]) => {
    setUsers((prev) => prev.map((u) => (u.id === id ? { ...u, status } : u)));
    addLog("user", "تغيير حالة", "تم تغيير حالة " + id + " إلى " + status);
  }, [addLog]);

  const updateUserStats = useCallback((id: string, ordersDelta: number, spentDelta: number) => {
    setUsers((prev) => prev.map((u) =>
      u.id === id ? { ...u, orders: u.orders + ordersDelta, totalSpent: u.totalSpent + spentDelta } : u
    ));
  }, []);

  const getUserById = useCallback((id: string) => {
    return users.find((u) => u.id === id);
  }, [users]);

  const value = useMemo(
    () => ({
      users: users,
      addUser: addUser,
      updateUserRole: updateUserRole,
      updateUserStatus: updateUserStatus,
      updateUserStats: updateUserStats,
      getUserById: getUserById,
    }),
    [users, addUser, updateUserRole, updateUserStatus, updateUserStats, getUserById]
  );

  return (
    <AdminUserContext.Provider value={value}>
      {children}
    </AdminUserContext.Provider>
  );
}

export function useAdminUsers() {
  const context = useContext(AdminUserContext);
  if (!context) {
    throw new Error("useAdminUsers must be used within an AdminUserProvider");
  }
  return context;
}
