"use client";

import Link from "next/link";
import { useAdmin } from "@/contexts/AdminContext";
import { orderStatusLabels, orderStatusColors, validStatusTransitions, type OrderStatus } from "@/components/admin/constants";
import { Eye, Truck, Package, CheckCircle, XCircle, Clock } from "lucide-react";
import ExcelTable, { type Column } from "@/components/admin/ExcelTable";
import { useToast } from "@/contexts/ToastContext";

const statusIcons: Record<OrderStatus, typeof CheckCircle> = {
  pending: Clock, confirmed: CheckCircle, processing: Package,
  shipped: Truck, delivered: CheckCircle, cancelled: XCircle,
};

export default function AdminOrders() {
  const { orders, updateOrderStatus } = useAdmin();
  const { success, warning } = useToast();

  const handleStatusChange = (orderId: string, currentStatus: OrderStatus, newStatus: OrderStatus) => {
    const allowed = validStatusTransitions[currentStatus];
    if (!allowed.includes(newStatus)) {
      warning(`لا يمكن تغيير الحالة من "${orderStatusLabels[currentStatus]}" إلى "${orderStatusLabels[newStatus]}"`);
      return;
    }
    if (!confirm(`تغيير حالة الطلب ${orderId} من "${orderStatusLabels[currentStatus]}" إلى "${orderStatusLabels[newStatus]}"؟`)) return;
    updateOrderStatus(orderId, newStatus);
    success("تم تحديث حالة الطلب");
  };

  const columns: Column<(typeof orders)[0]>[] = [
    { key: "id", header: "رقم الطلب", width: 130, render: (v) => <span className="text-sky-600 font-medium">{String(v)}</span> },
    { key: "customer", header: "العميل", width: 150 },
    { key: "phone", header: "الهاتف", width: 120, align: "left" as const, render: (v) => <span dir="ltr">{String(v)}</span> },
    { key: "city", header: "المدينة", width: 100 },
    { key: "items", header: "المنتجات", width: 80, sortable: false, render: (v) => `${(v as unknown[]).length} منتج` },
    { key: "total", header: "المبلغ", width: 120, render: (v) => <span className="font-bold">{(v as number).toLocaleString("en")} ر.ي</span> },
    {
      key: "status", header: "الحالة", width: 150,
      render: (v, row) => {
        const current = v as OrderStatus;
        const allowed = validStatusTransitions[current];
        return (
          <select
            value={current}
            onChange={(e) => handleStatusChange(row.id, current, e.target.value as OrderStatus)}
            onClick={(e) => e.stopPropagation()}
            className={`text-xs font-medium px-2 py-1 rounded-lg border-0 cursor-pointer ${orderStatusColors[current]}`}
          >
            {(Object.keys(orderStatusLabels) as OrderStatus[]).map((s) => (
              <option key={s} value={s} disabled={!allowed.includes(s) && s !== current}>
                {orderStatusLabels[s]}{!allowed.includes(s) && s !== current ? " ✗" : ""}
              </option>
            ))}
          </select>
        );
      },
    },
    { key: "date", header: "التاريخ", width: 100 },
    {
      key: "actions", header: "إجراءات", width: 80, sortable: false,
      render: (_, row) => (
        <Link href={`/admin/orders/${row.id}`} onClick={(e) => e.stopPropagation()} className="p-1.5 rounded-lg hover:bg-sky-50 text-slate-400 hover:text-sky-600 inline-flex" aria-label={`عرض الطلب ${row.id}`}>
          <Eye size={16} />
        </Link>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-extrabold text-slate-800 dark:text-white">الطلبات</h1>
        <p className="text-sm text-slate-500">{orders.length} طلب</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {[
          { label: "الكل", value: orders.length, color: "bg-slate-100 dark:bg-slate-700" },
          { label: "في الانتظار", value: orders.filter((o) => o.status === "pending").length, color: "bg-amber-50 text-amber-600" },
          { label: "جاري التجهيز", value: orders.filter((o) => o.status === "processing").length, color: "bg-purple-50 text-purple-600" },
          { label: "تم التوصيل", value: orders.filter((o) => o.status === "delivered").length, color: "bg-emerald-50 text-emerald-600" },
        ].map((s) => (
          <div key={s.label} className={`rounded-xl p-3 text-center ${s.color}`}>
            <p className="text-2xl font-extrabold">{s.value}</p>
            <p className="text-xs text-slate-500">{s.label}</p>
          </div>
        ))}
      </div>

      <ExcelTable
        columns={columns}
        data={orders}
        getRowId={(o) => o.id}
        searchPlaceholder="بحث برقم الطلب أو اسم العميل..."
        pageSize={8}
      />
    </div>
  );
}
