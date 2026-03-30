"use client";

import { useState, useCallback, useEffect } from "react";
import { Address } from "./types";
import { useToast } from "./ToastContext";

const STORAGE_KEY = "khuboor_addresses";

function loadAddresses(): Address[] {
  if (typeof window === "undefined") return [];
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) return JSON.parse(stored);
  } catch { /* empty */ }
  return [];
}

export function useAddresses() {
  const [addresses, setAddresses] = useState<Address[]>(loadAddresses);
  const { success, warning } = useToast();

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(addresses));
  }, [addresses]);

  const addAddress = useCallback((addr: Omit<Address, "id" | "isDefault">) => {
    const newAddr: Address = { ...addr, id: crypto.randomUUID().slice(0, 8), isDefault: addresses.length === 0 };
    setAddresses((prev) => [...prev, newAddr]);
    success("تمت إضافة العنوان بنجاح");
  }, [addresses.length, success]);

  const updateAddress = useCallback((id: string, addr: Omit<Address, "id" | "isDefault">) => {
    setAddresses((prev) => prev.map((a) => (a.id === id ? { ...addr, id, isDefault: a.isDefault } : a)));
    success("تم تحديث العنوان بنجاح");
  }, [success]);

  const deleteAddress = useCallback((id: string) => {
    setAddresses((prev) => prev.filter((a) => a.id !== id));
    warning("تم حذف العنوان");
  }, [warning]);

  const setDefault = useCallback((id: string) => {
    setAddresses((prev) => prev.map((a) => ({ ...a, isDefault: a.id === id })));
    success("تم تعيين العنوان الافتراضي");
  }, [success]);

  return { addresses, addAddress, updateAddress, deleteAddress, setDefault };
}
