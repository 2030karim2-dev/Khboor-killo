"use client";

import { createContext, useContext, useState, useCallback, useEffect, useMemo, type ReactNode } from "react";
import type { ActivityLogEntry } from "@/types/admin";
import { STORAGE_KEYS, loadFromStorage, saveToStorage } from "@/data/adminData";

export type { ActivityLogEntry };

interface AdminActivityContextType {
  activityLog: ActivityLogEntry[];
  addLog: (type: ActivityLogEntry["type"], action: string, details: string) => void;
  clearLogs: () => void;
}

const AdminActivityContext = createContext<AdminActivityContextType | undefined>(undefined);

export function AdminActivityProvider({ children }: { children: ReactNode }) {
  const [activityLog, setActivityLog] = useState<ActivityLogEntry[]>(() => loadFromStorage(STORAGE_KEYS.activity, []));

  useEffect(() => {
    saveToStorage(STORAGE_KEYS.activity, activityLog);
  }, [activityLog]);

  const addLog = useCallback((type: ActivityLogEntry["type"], action: string, details: string) => {
    const newLog: ActivityLogEntry = {
      id: crypto.randomUUID().slice(0, 8),
      type: type,
      action: action,
      details: details,
      user: "المسؤول",
      timestamp: new Date().toISOString(),
    };
    setActivityLog((prev) => [newLog, ...prev.slice(0, 99)]);
  }, []);

  const clearLogs = useCallback(() => {
    setActivityLog([]);
  }, []);

  const value = useMemo(
    () => ({
      activityLog: activityLog,
      addLog: addLog,
      clearLogs: clearLogs,
    }),
    [activityLog, addLog, clearLogs]
  );

  return (
    <AdminActivityContext.Provider value={value}>
      {children}
    </AdminActivityContext.Provider>
  );
}

export function useAdminActivity() {
  const context = useContext(AdminActivityContext);
  if (!context) {
    throw new Error("useAdminActivity must be used within an AdminActivityProvider");
  }
  return context;
}
