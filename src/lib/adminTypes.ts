import type { Product, Category } from "./types";
import type { OrderStatus } from "./orderTypes";

export interface AdminOrder {
  id: string;
  customer: string;
  phone: string;
  city: string;
  address: string;
  items: { productId: string; name: string; price: number; quantity: number; image: string }[];
  total: number;
  shippingCost: number;
  paymentMethod: "card" | "cash";
  status: OrderStatus;
  date: string;
  notes?: string;
}

export interface AdminUser {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: "buyer" | "seller" | "admin";
  orders: number;
  totalSpent: number;
  status: "active" | "pending" | "banned";
  joined: string;
}

export interface AdminSettings {
  siteName: string;
  siteDescription: string;
  supportEmail: string;
  freeShippingThreshold: number;
  shippingCost: number;
  returnDays: number;
  emailNotifications: boolean;
  smsNotifications: boolean;
  autoConfirmOrders: boolean;
  minPasswordLength: number;
  twoFactorAuth: boolean;
}

export interface ActivityLogEntry {
  id: string;
  action: string;
  details: string;
  user: string;
  timestamp: string;
  type: "order" | "product" | "user" | "category" | "settings";
}

export interface AdminStats {
  totalSales: number;
  totalOrders: number;
  totalProducts: number;
  totalUsers: number;
  pendingOrders: number;
  lowStockProducts: number;
}

export interface AdminContextType {
  products: Product[];
  addProduct: (product: Omit<Product, "id">) => string;
  updateProduct: (id: string, data: Partial<Product>) => void;
  deleteProduct: (id: string) => void;
  orders: AdminOrder[];
  updateOrderStatus: (id: string, status: OrderStatus) => void;
  getOrder: (id: string) => AdminOrder | undefined;
  users: AdminUser[];
  updateUserRole: (id: string, role: AdminUser["role"]) => void;
  updateUserStatus: (id: string, status: AdminUser["status"]) => void;
  categories: Category[];
  addCategory: (cat: Omit<Category, "slug" | "productCount" | "subcategories">) => void;
  updateCategory: (slug: string, data: Partial<Category>) => void;
  deleteCategory: (slug: string) => void;
  settings: AdminSettings;
  updateSettings: (data: Partial<AdminSettings>) => void;
  activityLog: ActivityLogEntry[];
  getStats: () => AdminStats;
}
