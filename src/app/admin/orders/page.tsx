import { statusLabels, type OrderStatus } from "@/lib/OrderContext";
import { Eye, Truck, Package, CheckCircle, XCircle, Clock, Search } from "lucide-react";

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

const allOrders = [
  { id: "KH12345678", customer: "أحمد محمد", phone: "0501234567", items: 3, total: 1450, status: "delivered" as OrderStatus, date: "2025-01-15", city: "الرياض" },
  { id: "KH12345677", customer: "فاطمة علي", phone: "0509876543", items: 1, total: 380, status: "shipped" as OrderStatus, date: "2025-01-15", city: "جدة" },
  { id: "KH12345676", customer: "عبدالله سعيد", phone: "0551234567", items: 5, total: 12500, status: "confirmed" as OrderStatus, date: "2025-01-14", city: "الدمام" },
  { id: "KH12345675", customer: "مريم حسن", phone: "0561234567", items: 2, total: 890, status: "cancelled" as OrderStatus, date: "2025-01-14", city: "الرياض" },
  { id: "KH12345674", customer: "خالد عمر", phone: "0571234567", items: 4, total: 2100, status: "processing" as OrderStatus, date: "2025-01-13", city: "مكة" },
  { id: "KH12345673", customer: "سارة أحمد", phone: "0581234567", items: 1, total: 599, status: "pending" as OrderStatus, date: "2025-01-13", city: "الرياض" },
  { id: "KH12345672", customer: "يوسف محمد", phone: "0591234567", items: 6, total: 3200, status: "delivered" as OrderStatus, date: "2025-01-12", city: "جدة" },
];

export default function AdminOrders() {
  const stats = {
    total: allOrders.length,
    pending: allOrders.filter((o) => o.status === "pending").length,
    processing: allOrders.filter((o) => o.status === "processing").length,
    delivered: allOrders.filter((o) => o.status === "delivered").length,
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-extrabold text-slate-800 dark:text-white">الطلبات</h1>
          <p className="text-sm text-slate-500">{stats.total} طلب</p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {[
          { label: "الكل", value: stats.total, color: "bg-slate-100 dark:bg-slate-700" },
          { label: "جديد", value: stats.pending, color: "bg-amber-50 text-amber-600" },
          { label: "قيد التجهيز", value: stats.processing, color: "bg-purple-50 text-purple-600" },
          { label: "تم التوصيل", value: stats.delivered, color: "bg-emerald-50 text-emerald-600" },
        ].map((s) => (
          <div key={s.label} className={`rounded-xl p-3 text-center ${s.color}`}>
            <p className="text-2xl font-extrabold">{s.value}</p>
            <p className="text-xs text-slate-500">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-4 flex flex-wrap gap-3">
        <div className="relative flex-1 min-w-[200px]">
          <Search size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input type="search" placeholder="بحث برقم الطلب أو اسم العميل..." className="w-full py-2 pr-9 pl-3 rounded-lg border border-slate-200 dark:border-slate-600 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500 bg-transparent" />
        </div>
        <select className="px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-600 text-sm bg-transparent">
          <option>جميع الحالات</option>
          {(Object.keys(statusLabels) as OrderStatus[]).map((s) => (
            <option key={s} value={s}>{statusLabels[s]}</option>
          ))}
        </select>
      </div>

      {/* Table */}
      <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-xs text-slate-500 text-right border-b border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-700/50">
                <th className="px-4 py-3 font-medium">رقم الطلب</th>
                <th className="px-4 py-3 font-medium">العميل</th>
                <th className="px-4 py-3 font-medium">المنتجات</th>
                <th className="px-4 py-3 font-medium">المبلغ</th>
                <th className="px-4 py-3 font-medium">الحالة</th>
                <th className="px-4 py-3 font-medium">التاريخ</th>
                <th className="px-4 py-3 font-medium">الإجراءات</th>
              </tr>
            </thead>
            <tbody>
              {allOrders.map((order) => {
                const StatusIcon = statusIcons[order.status];
                return (
                  <tr key={order.id} className="border-b border-slate-100 dark:border-slate-700/50 hover:bg-slate-50 dark:hover:bg-slate-700/30">
                    <td className="px-4 py-3 text-sm font-medium text-sky-600">{order.id}</td>
                    <td className="px-4 py-3">
                      <p className="text-sm font-medium text-slate-800 dark:text-white">{order.customer}</p>
                      <p className="text-xs text-slate-400" dir="ltr">{order.phone}</p>
                    </td>
                    <td className="px-4 py-3 text-sm text-slate-600">{order.items} منتجات</td>
                    <td className="px-4 py-3 text-sm font-bold text-slate-800 dark:text-white">{order.total.toLocaleString()} ر.س</td>
                    <td className="px-4 py-3">
                      <span className={`inline-flex items-center gap-1 text-xs font-medium px-2 py-0.5 rounded-full ${statusColors[order.status]}`}>
                        <StatusIcon size={12} />
                        {statusLabels[order.status]}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-xs text-slate-500">{order.date}</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-1">
                        <button className="p-1.5 rounded-lg hover:bg-sky-50 text-slate-400 hover:text-sky-600" aria-label="عرض">
                          <Eye size={16} />
                        </button>
                        <select className="text-xs px-2 py-1 rounded border border-slate-200 dark:border-slate-600 bg-transparent">
                          {(Object.keys(statusLabels) as OrderStatus[]).map((s) => (
                            <option key={s} value={s} selected={s === order.status}>{statusLabels[s]}</option>
                          ))}
                        </select>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
