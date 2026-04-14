"use client";

import { use } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import Image from "next/image";
import { useAdmin } from "@/lib/AdminContext";
import { orderStatusLabels, orderStatusColors, validStatusTransitions, type OrderStatus } from "@/components/admin/constants";
import { useToast } from "@/lib/ToastContext";
import { ArrowRight, CheckCircle, Clock, Package, Truck, XCircle, MapPin, Phone, User } from "lucide-react";

const stepIcons: Record<OrderStatus, typeof CheckCircle> = {
  pending: Clock, confirmed: CheckCircle, processing: Package,
  shipped: Truck, delivered: CheckCircle, cancelled: XCircle,
};
const steps: OrderStatus[] = ["confirmed", "processing", "shipped", "delivered"];

export default function OrderDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const { getOrder, updateOrderStatus } = useAdmin();
  const { success, warning } = useToast();
  const order = getOrder(id);

  if (!order) notFound();

  const currentStepIndex = steps.indexOf(order.status);

  const handleStatusChange = (newStatus: OrderStatus) => {
    const allowed = validStatusTransitions[order.status as OrderStatus];
    if (!allowed.includes(newStatus)) {
      warning(`لا يمكن تغيير الحالة من "${orderStatusLabels[order.status as OrderStatus]}" إلى "${orderStatusLabels[newStatus]}"`);
      return;
    }
    if (!confirm(`تغيير حالة الطلب من "${orderStatusLabels[order.status as OrderStatus]}" إلى "${orderStatusLabels[newStatus]}"؟`)) return;
    updateOrderStatus(order.id, newStatus);
    success("تم تحديث الحالة");
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center gap-3">
        <Link href="/admin/orders" className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700">
          <ArrowRight size={20} />
        </Link>
        <div>
          <h1 className="text-xl font-extrabold text-slate-800 dark:text-white">طلب #{order.id}</h1>
          <p className="text-sm text-slate-500">{order.date}</p>
        </div>
        <span className={`mr-auto text-sm font-medium px-3 py-1 rounded-lg ${orderStatusColors[order.status as OrderStatus]}`}>
          {orderStatusLabels[order.status as OrderStatus]}
        </span>
      </div>

      {/* Progress */}
      {order.status !== "cancelled" && (
        <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-6">
          <div className="flex items-center justify-between relative">
            <div className="absolute top-5 right-0 left-0 h-0.5 bg-slate-200 dark:bg-slate-600" />
            <div className="absolute top-5 right-0 h-0.5 bg-sky-500 transition-all" style={{ width: `${Math.max(0, (currentStepIndex / (steps.length - 1)) * 100)}%` }} />
            {steps.map((step, i) => {
              const Icon = stepIcons[step];
              const isComplete = i <= currentStepIndex && order.status !== "pending";
              return (
                <div key={step} className="relative z-10 flex flex-col items-center">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${isComplete ? "bg-sky-500 text-white" : "bg-slate-200 dark:bg-slate-600 text-slate-400"}`}>
                    <Icon size={18} />
                  </div>
                  <span className={`text-xs mt-2 ${isComplete ? "text-sky-600 font-medium" : "text-slate-400"}`}>{orderStatusLabels[step]}</span>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {order.status === "cancelled" && (
        <div className="bg-red-50 dark:bg-red-900/20 rounded-xl p-4 flex items-center gap-3">
          <XCircle size={20} className="text-red-500" />
          <span className="text-red-700 dark:text-red-400 font-medium">تم إلغاء هذا الطلب</span>
        </div>
      )}

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Order Items */}
        <div className="lg:col-span-2 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-6">
          <h2 className="font-bold text-slate-800 dark:text-white mb-4">المنتجات</h2>
          <div className="space-y-3">
            {order.items.map((item, i) => (
              <div key={i} className="flex items-center gap-3 p-3 bg-slate-50 dark:bg-slate-700/50 rounded-xl">
                {item.image ? (
                  <div className="w-14 h-14 relative rounded-lg overflow-hidden bg-slate-100 shrink-0">
                    <Image src={item.image} alt={item.name} fill sizes="56px" className="object-cover" />
                  </div>
                ) : (
                  <div className="w-14 h-14 bg-slate-200 dark:bg-slate-600 rounded-lg flex items-center justify-center text-2xl shrink-0">📦</div>
                )}
                <div className="flex-1">
                  <p className="font-medium text-slate-800 dark:text-white">{item.name}</p>
                  <p className="text-sm text-slate-500">الكمية: {item.quantity} × {item.price.toLocaleString("en")} ر.ي</p>
                </div>
                <p className="font-bold text-slate-800 dark:text-white">{(item.price * item.quantity).toLocaleString("en")} ر.ي</p>
              </div>
            ))}
          </div>

          <hr className="my-4 border-slate-200 dark:border-slate-700" />

          <div className="space-y-2 text-sm">
            <div className="flex justify-between"><span className="text-slate-600">المجموع الفرعي</span><span>{order.total.toLocaleString("en")} ر.ي</span></div>
            <div className="flex justify-between"><span className="text-slate-600">الشحن</span><span>{order.shippingCost === 0 ? "مجاني" : `${order.shippingCost} ر.ي`}</span></div>
            <div className="flex justify-between font-bold text-base pt-2 border-t border-slate-200 dark:border-slate-700"><span>الإجمالي</span><span>{(order.total + order.shippingCost).toLocaleString("en")} ر.ي</span></div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-4">
          {/* Customer */}
          <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-4">
            <h3 className="font-bold text-slate-800 dark:text-white mb-3">معلومات العميل</h3>
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2"><User size={14} className="text-slate-400" /><span>{order.customer}</span></div>
              <div className="flex items-center gap-2"><Phone size={14} className="text-slate-400" /><span dir="ltr">{order.phone}</span></div>
              <div className="flex items-center gap-2"><MapPin size={14} className="text-slate-400" /><span>{order.city} - {order.address}</span></div>
            </div>
          </div>

          {/* Status Update */}
          <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-4">
            <h3 className="font-bold text-slate-800 dark:text-white mb-3">تحديث الحالة</h3>
            <select
              value={order.status}
              onChange={(e) => handleStatusChange(e.target.value as OrderStatus)}
              className="w-full px-3 py-2.5 rounded-lg border border-slate-200 dark:border-slate-600 bg-transparent text-sm"
            >
              {(Object.keys(orderStatusLabels) as OrderStatus[]).map((s) => {
                const allowed = validStatusTransitions[order.status as OrderStatus];
                return (
                  <option key={s} value={s} disabled={!allowed.includes(s) && s !== order.status}>
                    {orderStatusLabels[s]}{!allowed.includes(s) && s !== order.status ? " (غير مسموح)" : ""}
                  </option>
                );
              })}
            </select>
          </div>

          {/* Payment */}
          <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-4">
            <h3 className="font-bold text-slate-800 dark:text-white mb-3">طريقة الدفع</h3>
            <p className="text-sm text-slate-600">{order.paymentMethod === "card" ? "بطاقة ائتمانية" : "الدفع عند الاستلام"}</p>
          </div>

          {/* Notes */}
          {order.notes && (
            <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-4">
              <h3 className="font-bold text-slate-800 dark:text-white mb-3">ملاحظات</h3>
              <p className="text-sm text-slate-600">{order.notes}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
