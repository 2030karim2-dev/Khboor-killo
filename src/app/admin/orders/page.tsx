"use client";

import Link from "next/link";
import { useAdmin } from "@/lib/AdminContext";
import { statusLabels, type OrderStatus } from "@/lib/OrderContext";
import { Eye, Truck, Package, CheckCircle, XCircle, Clock } from "lucide-react";
import ExcelTable, { type Column } from "@/components/admin/ExcelTable";
import { useToast } from "@/lib/ToastContext";

const statusIcons: Record<OrderStatus, typeof CheckCircle> = {
  pending: Clock, confirmed: CheckCircle, processing: Package,
  shipped: Truck, delivered: CheckCircle, cancelled: XCircle,
};

const statusColors: Record<OrderStatus, string> = {
  pending: "bg-amber-50 text-amber-600",
  confirmed: "bg-sky-50 text-sky-600",
  processing: "bg-purple-50 text-purple-600",
  shipped: "bg-indigo-50 text-indigo-600",
  delivered: "bg-emerald-50 text-emerald-600",
  cancelled: "bg-red-50 text-red-600",
};

export default function AdminOrders() {
  const { orders, updateOrderStatus } = useAdmin();
  const { success } = useToast();

  const columns: Column<(typeof orders)[0]>[] = [
    { key: "id", header: "رقم الطلب", width: 130, render: (v) => <span className="text-sky-600 font-medium">{String(v)}</span> },
    { key: "customer", header: "العميل", width: 150 },
    { key: "phone", header: "الهاتف", width: 120, align: "left" as const, render: (v) => <span dir="ltr">{String(v)}</span> },
    { key: "city", header: "المدينة", width: 100 },
    { key: "items", header: "المنتجات", width: 80, render: (v) => `${(v as unknown[]).length} منتج` },
    { key: "total", header: "المبلغ", width: 120, render: (v) => <span className="font-bold">{(v as number).toLocaleString("en")} ر.ي</span> },
    {
      key: "status", header: "الحالة", width: 140,
      render: (v, row) => {
        const StatusIcon = statusIcons[v as OrderStatus];
        return (
          <select
            value={v as string}
            onChange={(e) => {
              updateOrderStatus(row.id, e.target.value as OrderStatus);
              success(`تم تحديث حالة الطلب ${row.id}`);
            }}
            onClick={(e) => e.stopPropagation()}
            className={`text-xs font-medium px-2 py-1 rounded-lg border-0 cursor-pointer ${statusColors[v as OrderStatus]}`}
          >
            {(Object.keys(statusLabels) as OrderStatus[]).map((s) => (
              <option key={s} value={s}>{statusLabels[s]}</option>
            ))}
          </select>
        );
      },
    },
    { key: "date", header: "التاريخ", width: 100 },
    {
      key: "actions", header: "إجراءات", width: 80, sortable: false,
      render: (_, row) => (
        <Link href={`/admin/orders/${row.id}`} onClick={(e) => e.stopPropagation()} className="p-1.5 rounded-lg hover:bg-sky-50 text-slate-400 hover:text-sky-600 inline-flex">
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

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {[
          { label: "الكل", value: orders.length, color: "bg-slate-100 dark:bg-slate-700" },
          { label: "جديد", value: orders.filter((o) => o.status === "pending").length, color: "bg-amber-50 text-amber-600" },
          { label: "قيد التجهيز", value: orders.filter((o) => o.status === "processing").length, color: "bg-purple-50 text-purple-600" },
          { label: "مكتمل", value: orders.filter((o) => o.status === "delivered").length, color: "bg-emerald-50 text-emerald-600" },
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
