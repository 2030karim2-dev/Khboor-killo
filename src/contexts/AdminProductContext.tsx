"use client";

import { createContext, useContext, useState, useCallback, useEffect, useMemo, type ReactNode } from "react";
import type { Product, Category } from "@/types/product";
import { STORAGE_KEYS, loadFromStorage, saveToStorage, getDefaultProducts, getDefaultCategories } from "@/data/adminData";
import { useAdminActivity } from "./AdminActivityContext";

export type { Product, Category };

interface AdminProductContextType {
  products: Product[];
  categories: Category[];
  addProduct: (product: Omit<Product, "id">) => string;
  updateProduct: (id: string, data: Partial<Product>) => void;
  deleteProduct: (id: string) => void;
  addCategory: (cat: Omit<Category, "slug" | "productCount" | "subcategories">) => void;
  updateCategory: (slug: string, data: Partial<Category>) => void;
  deleteCategory: (slug: string) => void;
  getProductsByCategory: (categorySlug: string) => Product[];
}

const AdminProductContext = createContext<AdminProductContextType | undefined>(undefined);

export function AdminProductProvider({ children }: { children: ReactNode }) {
  const [products, setProducts] = useState<Product[]>(() => loadFromStorage(STORAGE_KEYS.products, getDefaultProducts()));
  const [categories, setCats] = useState<Category[]>(() => loadFromStorage(STORAGE_KEYS.categories, getDefaultCategories()));
  const { addLog } = useAdminActivity();

  useEffect(() => {
    saveToStorage(STORAGE_KEYS.products, products);
  }, [products]);

  useEffect(() => {
    saveToStorage(STORAGE_KEYS.categories, categories);
  }, [categories]);

  const addProduct = useCallback((product: Omit<Product, "id">): string => {
    const id = product.categorySlug + "-" + Date.now();
    setProducts((prev) => [{ ...product, id }, ...prev]);
    addLog("product", "إضافة منتج", "تم إضافة " + product.name);
    return id;
  }, [addLog]);

  const updateProduct = useCallback((id: string, data: Partial<Product>) => {
    setProducts((prev) => prev.map((p) => (p.id === id ? { ...p, ...data } : p)));
    addLog("product", "تعديل منتج", "تم تعديل المنتج " + id);
  }, [addLog]);

  const deleteProduct = useCallback((id: string) => {
    const p = products.find((x) => x.id === id);
    setProducts((prev) => prev.filter((x) => x.id !== id));
    addLog("product", "حذف منتج", "تم حذف " + (p?.name || id));
  }, [products, addLog]);

  const addCategory = useCallback((cat: Omit<Category, "slug" | "productCount" | "subcategories">) => {
    var slug = cat.name.toLowerCase().replace(/\s+/g, "-").replace(/[^\w\u0600-\u06FF-]/g, "") || "cat-" + Date.now();
    setCats((prev) => [...prev, { ...cat, slug: slug, productCount: 0, subcategories: [] }]);
    addLog("category", "إضافة قسم", "تم إضافة " + cat.name);
  }, [addLog]);

  const updateCategory = useCallback((slug: string, data: Partial<Category>) => {
    setCats((prev) => prev.map((c) => (c.slug === slug ? { ...c, ...data } : c)));
    addLog("category", "تعديل قسم", slug);
  }, [addLog]);

  const deleteCategory = useCallback((slug: string) => {
    setCats((prev) => prev.filter((c) => c.slug !== slug));
    addLog("category", "حذف قسم", slug);
  }, [addLog]);

  const getProductsByCategory = useCallback((categorySlug: string) => {
    return products.filter((p) => p.categorySlug === categorySlug);
  }, [products]);

  const value = useMemo(
    () => ({
      products: products,
      addProduct: addProduct,
      updateProduct: updateProduct,
      deleteProduct: deleteProduct,
      categories: categories,
      addCategory: addCategory,
      updateCategory: updateCategory,
      deleteCategory: deleteCategory,
      getProductsByCategory: getProductsByCategory,
    }),
    [products, addProduct, updateProduct, deleteProduct, categories, addCategory, updateCategory, deleteCategory, getProductsByCategory]
  );

  return (
    <AdminProductContext.Provider value={value}>
      {children}
    </AdminProductContext.Provider>
  );
}

export function useAdminProducts() {
  const context = useContext(AdminProductContext);
  if (!context) {
    throw new Error("useAdminProducts must be used within an AdminProductProvider");
  }
  return context;
}
