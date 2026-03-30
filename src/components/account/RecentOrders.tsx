const orders = [
  { id: "KH12345678", date: "2024-01-15", total: "1,450 ر.س", status: "تم التوصيل" },
  { id: "KH12345677", date: "2024-01-10", total: "380 ر.س", status: "قيد الشحن" },
  { id: "KH12345676", date: "2024-01-05", total: "599 ر.س", status: "جاري التجهيز" },
];

const statusStyles: Record<string, string> = {
  "تم التوصيل": "bg-emerald-50 text-emerald-600",
  "قيد الشحن": "bg-sky-50 text-sky-600",
  "جاري التجهيز": "bg-amber-50 text-amber-600",
};

export default function RecentOrders() {
  return (
    <div className="card p-6 md:p-8 mt-6">
      <h2 className="text-xl font-bold text-slate-800 mb-6">آخر الطلبات</h2>
      <div className="space-y-4">
        {orders.map((order) => (
          <div
            key={order.id}
            className="flex items-center justify-between p-4 rounded-xl bg-slate-50"
          >
            <div>
              <p className="font-bold text-slate-800">#{order.id}</p>
              <p className="text-sm text-slate-500">{order.date}</p>
            </div>
            <div className="text-left">
              <p className="font-bold text-slate-800">{order.total}</p>
              <span
                className={`text-xs font-medium px-2 py-0.5 rounded-full ${statusStyles[order.status]}`}
              >
                {order.status}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
