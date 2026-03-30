"use client";

import Link from "next/link";
import { Package, ChevronLeft, Truck, CheckCircle, Clock, XCircle } from "lucide-react";
import { useOrders, statusLabels, type OrderStatus } from "@/lib/OrderContext";
import { Breadcrumb, EmptyState } from "@/components/ui";
import { formatPrice } from "@/lib";

const statusIcons: Record<OrderStatus, typeof CheckCircle> = {
  pending: Clock,
  confirmed: CheckCircle,
  processing: Package,
  shipped: Truck,
  delivered: CheckCircle,
  cancelled: XCircle,
};

const statusColors: Record<OrderStatus, string> = {
  pending: "bg-amber-50 text-amber-600",
  confirmed: "bg-sky-50 text-sky-600",
  processing: "bg-purple-50 text-purple-600",
  shipped: "bg-indigo-50 text-indigo-600",
  delivered: "bg-emerald-50 text-emerald-600",
  cancelled: "bg-red-50 text-red-600",
};

export default function OrdersPage() {
  const { orders } = useOrders();

  if (orders.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16">
        <Breadcrumb items={[{ label: "الرئيسية", href: "/" }, { label: "طلباتي" }]} />
        <EmptyState
          icon={<Package size={48} className="text-slate-300 mx-auto" />}
          title="لا توجد طلبات"
          description="لم تقم بأي طلبات بعد. ابدأ التسوق الآن!"
          actionLabel="تصفح المنتجات"
          actionHref="/"
        />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <Breadcrumb items={[{ label: "الرئيسية", href: "/" }, { label: "طلباتي" }]} />

      <h1 className="text-2xl font-extrabold text-slate-800 mb-8">طلباتي ({orders.length})</h1>

      <div className="space-y-4">
        {orders.map((order) => {
          const StatusIcon = statusIcons[order.status];
          return (
            <Link
              key={order.id}
              href={`/account/orders/${order.id}`}
              className="card p-5 flex items-center gap-4 hover:border-sky-300 transition-colors"
            >
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${statusColors[order.status]}`}>
                <StatusIcon size={22} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-bold text-slate-800">#{order.id}</span>
                  <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${statusColors[order.status]}`}>
                    {statusLabels[order.status]}
                  </span>
                </div>
                <p className="text-sm text-slate-500">
                  {new Date(order.createdAt).toLocaleDateString("ar-SA", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
                <p className="text-sm text-slate-500">
                  {order.items.length} منتجات - {formatPrice(order.totalPrice + order.shippingCost)}
                </p>
              </div>
              <ChevronLeft size={20} className="text-slate-400 shrink-0" />
            </Link>
          );
        })}
      </div>
    </div>
  );
}
