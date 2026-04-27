"use client";

import { createContext, useContext, useState, useCallback, useEffect, useMemo, type ReactNode } from "react";
import type { AdminSettings } from "@/types/admin";
import { STORAGE_KEYS, loadFromStorage, saveToStorage, defaultSettings } from "@/data/adminData";
import { useAdminActivity } from "./AdminActivityContext";

interface AdminSettingsContextType {
  settings: AdminSettings;
  updateSettings: (data: Partial<AdminSettings>) => void;
}

const AdminSettingsContext = createContext<AdminSettingsContextType | undefined>(undefined);

export function AdminSettingsProvider({ children }: { children: ReactNode }) {
  const [settings, setSettingsState] = useState<AdminSettings>(() => loadFromStorage(STORAGE_KEYS.settings, defaultSettings));
  const { addLog } = useAdminActivity();

  useEffect(() => {
    saveToStorage(STORAGE_KEYS.settings, settings);
  }, [settings]);

  const updateSettings = useCallback((data: Partial<AdminSettings>) => {
    setSettingsState((prev) => ({ ...prev, ...data }));
    var keys = Object.keys(data).join(", ");
    addLog("settings", "تحديث الإعدادات", keys);
  }, [addLog]);

  const value = useMemo(
    () => ({
      settings: settings,
      updateSettings: updateSettings,
    }),
    [settings, updateSettings]
  );

  return (
    <AdminSettingsContext.Provider value={value}>
      {children}
    </AdminSettingsContext.Provider>
  );
}

export function useAdminSettings() {
  const context = useContext(AdminSettingsContext);
  if (!context) {
    throw new Error("useAdminSettings must be used within an AdminSettingsProvider");
  }
  return context;
}
