import { CartItem } from "./product";

export type OrderStatus = "pending" | "confirmed" | "processing" | "shipped" | "delivered" | "cancelled";

export interface OrderShipping {
  firstName: string;
  lastName: string;
  phone: string;
  city: string;
  address: string;
}

export interface Order {
  id: string;
  items: CartItem[];
  totalPrice: number;
  shippingCost: number;
  status: OrderStatus;
  shipping: OrderShipping;
  paymentMethod: "card" | "cash" | "bank" | "wallet";
  createdAt: string;
  customerId?: string;
  notes?: string;
}

export const statusLabels: Record<OrderStatus, string> = {
  pending: "في الانتظار",
  confirmed: "تم التأكيد",
  processing: "قيد التجهيز",
  shipped: "قيد الشحن",
  delivered: "تم التوصيل",
  cancelled: "ملغي",
};
