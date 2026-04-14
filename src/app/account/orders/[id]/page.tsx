"use client";

import { use } from "react";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { CheckCircle, Clock, Package, Truck, XCircle } from "lucide-react";
import { useOrders, statusLabels, type OrderStatus } from "@/contexts/OrderContext";
import { Breadcrumb } from "@/components/ui";
import { useFormatPrice } from "@/hooks/useFormatPrice";

const steps: OrderStatus[] = ["confirmed", "processing", "shipped", "delivered"];

const stepIcons: Record<OrderStatus, typeof CheckCircle> = {
  pending: Clock,
  confirmed: CheckCircle,
  processing: Package,
  shipped: Truck,
  delivered: CheckCircle,
  cancelled: XCircle,
};

export default function OrderDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const { getOrder } = useOrders();
  const { format: formatCurrency } = useFormatPrice();
  const order = getOrder(id);

  if (!order) notFound();

  const currentStepIndex = steps.indexOf(order.status);

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <Breadcrumb
        items={[
          { label: "الرئيسية", href: "/" },
          { label: "طلباتي", href: "/account/orders" },
          { label: `طلب #${order.id}` },
        ]}
      />

      <div className="card p-6 mb-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-xl font-extrabold text-slate-800">طلب #{order.id}</h1>
            <p className="text-sm text-slate-500">
              {new Date(order.createdAt).toLocaleDateString("ar-YE", {
                year: "numeric",
                month: "long",
                day: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              })}
            </p>
          </div>
          <span className="text-sm font-medium px-3 py-1 rounded-full bg-sky-50 text-sky-600">
            {statusLabels[order.status]}
          </span>
        </div>

        {order.status !== "cancelled" && (
          <div className="mb-8">
            <div className="flex items-center justify-between relative">
              <div className="absolute top-5 right-0 left-0 h-0.5 bg-slate-200" />
              <div
                className="absolute top-5 right-0 h-0.5 bg-sky-500 transition-all"
                style={{ width: `${(currentStepIndex / (steps.length - 1)) * 100}%` }}
              />
              {steps.map((step, i) => {
                const Icon = stepIcons[step];
                const isComplete = i <= currentStepIndex;
                return (
                  <div key={step} className="relative z-10 flex flex-col items-center">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      isComplete ? "bg-sky-500 text-white" : "bg-slate-200 text-slate-400"
                    }`}>
                      <Icon size={18} />
                    </div>
                    <span className={`text-xs mt-2 ${isComplete ? "text-sky-600 font-medium" : "text-slate-400"}`}>
                      {statusLabels[step]}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        <h2 className="font-bold text-slate-800 mb-4">المنتجات</h2>
        <div className="space-y-3 mb-6">
          {order.items.map((item) => (
            <div key={item.product.id} className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl">
              <div className="w-14 h-14 relative rounded-lg overflow-hidden shrink-0">
                <Image src={item.product.image} alt={item.product.name} fill sizes="56px" className="object-cover" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium text-slate-800 truncate">{item.product.name}</p>
                <p className="text-sm text-slate-500">الكمية: {item.quantity}</p>
              </div>
              <p className="font-bold text-slate-800 shrink-0">{formatCurrency(item.product.price * item.quantity)}</p>
            </div>
          ))}
        </div>

        <hr className="my-4" />

        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-slate-600">المجموع الفرعي</span>
            <span>{formatCurrency(order.totalPrice)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-600">الشحن</span>
            <span>{order.shippingCost === 0 ? "مجاني" : formatCurrency(order.shippingCost)}</span>
          </div>
          <div className="flex justify-between font-bold text-base pt-2">
            <span>الإجمالي</span>
            <span>{formatCurrency(order.totalPrice + order.shippingCost)}</span>
          </div>
        </div>

        <hr className="my-4" />

        <h2 className="font-bold text-slate-800 mb-2">عنوان الشحن</h2>
        <p className="text-sm text-slate-600">
          {order.shipping.firstName} {order.shipping.lastName}
        </p>
        <p className="text-sm text-slate-600">{order.shipping.phone}</p>
        <p className="text-sm text-slate-600">{order.shipping.city} - {order.shipping.address}</p>
      </div>

      <Link href="/account/orders" className="btn-outline">
        العودة للطلبات
      </Link>
    </div>
  );
}
