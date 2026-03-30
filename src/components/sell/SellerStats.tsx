import { Package, DollarSign, TrendingUp } from "lucide-react";

const stats = [
  { icon: Package, iconColor: "text-sky-600", bgColor: "bg-sky-50", value: "12", label: "منتج نشط" },
  { icon: DollarSign, iconColor: "text-emerald-600", bgColor: "bg-emerald-50", value: "4,520 ر.س", label: "إجمالي المبيعات" },
  { icon: TrendingUp, iconColor: "text-orange-600", bgColor: "bg-orange-50", value: "28", label: "طلب هذا الشهر" },
];

export default function SellerStats() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
      {stats.map((stat) => (
        <div key={stat.label} className="card p-5 flex items-center gap-4">
          <div className={`w-12 h-12 rounded-xl ${stat.bgColor} flex items-center justify-center shrink-0`}>
            <stat.icon size={22} className={stat.iconColor} />
          </div>
          <div>
            <p className="text-2xl font-extrabold text-slate-800">{stat.value}</p>
            <p className="text-sm text-slate-500">{stat.label}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
