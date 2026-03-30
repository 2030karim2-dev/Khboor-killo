import { Truck, Shield, HeadphonesIcon, RotateCcw } from "lucide-react";

const features = [
  {
    icon: Truck,
    iconColor: "text-sky-600",
    bgColor: "bg-sky-50",
    title: "شحن سريع",
    subtitle: "لجميع المدن",
  },
  {
    icon: Shield,
    iconColor: "text-emerald-600",
    bgColor: "bg-emerald-50",
    title: "ضمان الجودة",
    subtitle: "منتجات أصلية",
  },
  {
    icon: HeadphonesIcon,
    iconColor: "text-orange-600",
    bgColor: "bg-orange-50",
    title: "دعم 24/7",
    subtitle: "فريق متخصص",
  },
  {
    icon: RotateCcw,
    iconColor: "text-purple-600",
    bgColor: "bg-purple-50",
    title: "إرجاع سهل",
    subtitle: "خلال 14 يوم",
  },
];

export default function TrustBar({ compact = false }: { compact?: boolean }) {
  const items = compact ? features.slice(0, 3) : features;
  const gridClass = compact ? "grid-cols-3" : "grid-cols-2 md:grid-cols-4";

  return (
    <div className={`grid ${gridClass} gap-4`}>
      {items.map((item) => (
        <div
          key={item.title}
          className={`flex items-center gap-3 ${compact ? "justify-center flex-col text-center p-3" : "justify-center md:justify-start"}`}
        >
          <div
            className={`${compact ? "w-10 h-10" : "w-12 h-12"} rounded-xl ${item.bgColor} flex items-center justify-center shrink-0`}
          >
            <item.icon size={compact ? 18 : 22} className={item.iconColor} />
          </div>
          <div>
            <p className={`font-bold text-slate-800 ${compact ? "text-xs" : "text-sm"}`}>
              {item.title}
            </p>
            {!compact && (
              <p className="text-xs text-slate-500">{item.subtitle}</p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
