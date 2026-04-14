import type { AdminOrder, AdminUser, AdminSettings } from "../types/admin";
import { products as defaultProducts, categories as defaultCategories } from "./index";

export const STORAGE_KEYS = {
  products: "khuboor_admin_products",
  orders: "khuboor_admin_orders",
  users: "khuboor_admin_users",
  categories: "khuboor_admin_categories",
  settings: "khuboor_admin_settings",
  activity: "khuboor_admin_activity",
} as const;

export const defaultOrders: AdminOrder[] = [
  { id: "KH12345678", customer: "أحمد محمد", phone: "771234567", city: "صنعاء", address: "حي النخيل", items: [{ productId: "car-1", name: "تويوتا كامري 2024", price: 125000, quantity: 1, image: "" }], total: 125000, totalPrice: 125000, shippingCost: 0, paymentMethod: "card", status: "delivered", date: "2025-01-15", createdAt: "2025-01-15T10:00:00Z" },
  { id: "KH12345677", customer: "فاطمة علي", phone: "739876543", city: "عدن", address: "حي الصفا", items: [{ productId: "part-3", name: "بطارية سيارة 100 أمبير", price: 380, quantity: 1, image: "" }], total: 380, totalPrice: 380, shippingCost: 25, paymentMethod: "cash", status: "shipped", date: "2025-01-15", createdAt: "2025-01-15T11:00:00Z" },
  { id: "KH12345676", customer: "عبدالله سعيد", phone: "711234567", city: "تعز", address: "حي الفيصلية", items: [{ productId: "cloth-1", name: "ثوب رجالي فاخر", price: 180, quantity: 5, image: "" }], total: 900, totalPrice: 900, shippingCost: 0, paymentMethod: "card", status: "confirmed", date: "2025-01-14", createdAt: "2025-01-14T09:00:00Z" },
  { id: "KH12345675", customer: "مريم حسن", phone: "701234567", city: "صنعاء", address: "حي العليا", items: [{ productId: "acc-1", name: "ساعة ذكية احترافية", price: 599, quantity: 1, image: "" }], total: 599, totalPrice: 599, shippingCost: 25, paymentMethod: "cash", status: "cancelled", date: "2025-01-14", createdAt: "2025-01-14T14:00:00Z" },
  { id: "KH12345674", customer: "خالد عمر", phone: "731234567", city: "الحديدة", address: "حي العزيزية", items: [{ productId: "build-4", name: "دهان داخلي أبيض", price: 120, quantity: 3, image: "" }], total: 360, totalPrice: 360, shippingCost: 25, paymentMethod: "card", status: "processing", date: "2025-01-13", createdAt: "2025-01-13T16:00:00Z" },
  { id: "KH12345673", customer: "سارة أحمد", phone: "771234568", city: "إب", address: "حي الملز", items: [{ productId: "acc-4", name: "حقيبة ظهر لابتوب", price: 189, quantity: 1, image: "" }], total: 189, totalPrice: 189, shippingCost: 25, paymentMethod: "cash", status: "pending", date: "2025-01-13", createdAt: "2025-01-13T12:00:00Z" },
];

export const defaultUsers: AdminUser[] = [
  { id: "1", name: "أحمد محمد", email: "ahmed@email.com", phone: "771234567", role: "buyer", orders: 12, totalSpent: 15430, status: "active", joined: "2025-06-15" },
  { id: "2", name: "فاطمة علي", email: "fatima@email.com", phone: "739876543", role: "buyer", orders: 5, totalSpent: 3200, status: "active", joined: "2025-07-20" },
  { id: "3", name: "عبدالله سعيد", email: "abdullah@email.com", phone: "711234567", role: "seller", orders: 0, totalSpent: 0, status: "active", joined: "2025-08-01" },
  { id: "4", name: "مريم حسن", email: "mariam@email.com", phone: "701234567", role: "buyer", orders: 8, totalSpent: 7890, status: "pending", joined: "2025-08-15" },
  { id: "5", name: "خالد عمر", email: "khaled@email.com", phone: "731234567", role: "seller", orders: 0, totalSpent: 0, status: "active", joined: "2025-09-10" },
];

export const defaultSettings: AdminSettings = {
  siteName: "خبور",
  siteDescription: "منصة البيع والشراء الإلكترونية الرائدة",
  supportEmail: "support@khuboor.com",
  freeShippingThreshold: 200,
  shippingCost: 25,
  returnDays: 14,
  emailNotifications: true,
  smsNotifications: false,
  autoConfirmOrders: false,
  minPasswordLength: 8,
  twoFactorAuth: false,
};

export function loadFromStorage<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const stored = localStorage.getItem(key);
    if (stored) return JSON.parse(stored);
  } catch { /* empty */ }
  return fallback;
}

export function saveToStorage<T>(key: string, data: T) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch { /* storage full or unavailable */ }
}

export function getDefaultProducts() {
  return [...defaultProducts];
}

export function getDefaultCategories() {
  return [...defaultCategories];
}
