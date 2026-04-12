import { Truck, Shield, HeadphonesIcon, RotateCcw } from "lucide-react";

const features = [
  {
    icon: Truck,
    title: "شحن سريع",
    subtitle: "لجميع المدن اليمنية",
  },
  {
    icon: Shield,
    title: "ضمان الجودة",
    subtitle: "منتجات أصلية ومضمونة",
  },
  {
    icon: HeadphonesIcon,
    title: "دعم 24/7",
    subtitle: "فريق متخصص لمساعدتك",
  },
  {
    icon: RotateCcw,
    title: "إرجاع سهل",
    subtitle: "خلال 14 يوم من الاستلام",
  },
];

export default function TrustBar({ compact = false }: { compact?: boolean }) {
  if (compact) {
    return (
      <div className="grid grid-cols-4 gap-2">
        {features.map((item) => (
          <div
            key={item.title}
            className="flex flex-col items-center gap-1.5 p-2"
          >
            <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-sky-100 to-sky-50 dark:from-sky-900/30 dark:to-sky-800/20 flex items-center justify-center">
              <item.icon size={18} className="text-sky-600 dark:text-sky-400" />
            </div>
            <p className="text-[10px] font-semibold text-slate-700 dark:text-slate-300 text-center">
              {item.title}
            </p>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {features.map((item, i) => (
        <div
          key={item.title}
          className="flex items-center gap-3 p-4 rounded-2xl bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 hover:border-sky-200 dark:hover:border-sky-700 hover:shadow-lg hover:shadow-sky-500/10 transition-all group"
          style={{ animationDelay: `${i * 100}ms` }}
        >
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-sky-100 to-sky-50 dark:from-sky-900/40 dark:to-sky-800/30 flex items-center justify-center group-hover:scale-110 transition-transform">
            <item.icon size={24} className="text-sky-600 dark:text-sky-400" />
          </div>
          <div>
            <p className="font-bold text-slate-800 dark:text-white text-sm">
              {item.title}
            </p>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              {item.subtitle}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}