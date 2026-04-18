import { Gift, TrendingUp, ShoppingCart, Award, ChevronRight } from "lucide-react";
import Link from "next/link";
import { Breadcrumb } from "@/components/ui";

export default function PointsPage() {
  const points = 350;
  const totalEarned = 1250;
  const totalSpent = 900;
  const tier = "ذهبي";
  const nextTier = "VIP";
  const pointsToNextTier = 250;

  const transactions = [
    { id: 1, type: "earned", amount: 50, description: "شراء منتج - كاميرا احترافية", date: "2026-04-15" },
    { id: 2, type: "earned", amount: 25, description: "شراء منتج - حقيبة ظهر", date: "2026-04-10" },
    { id: 3, type: "spent", amount: 100, description: "خصم على طلب - بطاقة هدايا", date: "2026-04-05" },
    { id: 4, type: "earned", amount: 75, description: "شراء منتج - إكسسوارات سيارة", date: "2026-03-28" },
    { id: 5, type: "earned", amount: 30, description: "شراء منتج - ملابس", date: "2026-03-20" },
  ];

  const rewards = [
    { id: 1, name: "خصم 10%", points: 200, description: "خصم على أي طلب" },
    { id: 2, name: "شحن مجاني", points: 150, description: "شحن مجاني لأي طلب" },
    { id: 3, name: "خصم 20%", points: 400, description: "خصم على طلب выше 500 ر.ي" },
    { id: 4, name: "منتج مجاني", points: 500, description: "اختر منتج من القائمة" },
  ];

  const tiers = [
    { name: "برونزي", min: 0, color: "bg-amber-700" },
    { name: "فضي", min: 500, color: "bg-slate-400" },
    { name: "ذهبي", min: 1500, color: "bg-amber-500" },
    { name: "VIP", min: 5000, color: "bg-gradient-to-r from-purple-500 to-pink-500" },
  ];

  const currentTierIndex = tiers.findIndex((t) => t.name === tier);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <Breadcrumb
        items={[
          { label: "الرئيسية", href: "/" },
          { label: "حسابي", href: "/account" },
          { label: "نقاطي" },
        ]}
      />

      <div className="grid md:grid-cols-3 gap-6 mb-8">
        {/* Points Balance */}
        <div className="card p-6 text-center bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 dark:bg-slate-800">
          <Gift size={32} className="text-amber-500 mx-auto mb-3" />
          <p className="text-sm text-slate-500 dark:text-slate-400 mb-1">رصيد نقاطك</p>
          <p className="text-4xl font-bold text-amber-600 dark:text-amber-400">{points}</p>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-2">نقاط</p>
        </div>

        {/* Total Earned */}
        <div className="card p-6 text-center dark:bg-slate-800">
          <TrendingUp size={32} className="text-emerald-500 mx-auto mb-3" />
          <p className="text-sm text-slate-500 dark:text-slate-400 mb-1">إجمالي المكتسب</p>
          <p className="text-3xl font-bold text-slate-800 dark:text-white">{totalEarned}</p>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-2">نقاط</p>
        </div>

        {/* Total Spent */}
        <div className="card p-6 text-center dark:bg-slate-800">
          <ShoppingCart size={32} className="text-sky-500 mx-auto mb-3" />
          <p className="text-sm text-slate-500 dark:text-slate-400 mb-1">إجمالي المستبدل</p>
          <p className="text-3xl font-bold text-slate-800 dark:text-white">{totalSpent}</p>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-2">نقاط</p>
        </div>
      </div>

      {/* Tier Progress */}
      <div className="card p-6 mb-8 dark:bg-slate-800">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-slate-800 dark:text-white flex items-center gap-2">
            <Award className="text-amber-500" />
            مستواك: {tier}
          </h2>
          <span className="text-sm text-amber-600 dark:text-amber-400 font-medium">
            {pointsToNextTier} نقطة للـ {nextTier}
          </span>
        </div>

        <div className="relative h-4 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
          {tiers.map((t, i) => {
            const progress = i === currentTierIndex 
              ? ((points - t.min) / (tiers[i + 1]?.min - t.min || 1)) * 100
              : points >= t.min ? 100 : 0;
            return (
              <div
                key={t.name}
                className={`absolute top-0 h-full ${t.color} ${i <= currentTierIndex ? 'opacity-100' : 'opacity-30'}`}
                style={{ 
                  left: `${(t.min / 5000) * 100}%`,
                  width: `${i === tiers.length - 1 ? 100 - (t.min / 5000) * 100 : ((tiers[i + 1]?.min || 5000) - t.min) / 5000 * 100}%`
                }}
              />
            );
          })}
        </div>

        <div className="flex justify-between mt-2 text-xs text-slate-500 dark:text-slate-400">
          <span>برونزي</span>
          <span>فضي</span>
          <span>ذهبي</span>
          <span>VIP</span>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Recent Transactions */}
        <div className="card p-6 dark:bg-slate-800">
          <h2 className="text-lg font-bold text-slate-800 dark:text-white mb-4">
            أحدث المعاملات
          </h2>
          <div className="space-y-3">
            {transactions.map((tx) => (
              <div
                key={tx.id}
                className="flex items-center justify-between py-3 border-b border-slate-100 dark:border-slate-700 last:border-0"
              >
                <div>
                  <p className="font-medium text-slate-800 dark:text-white text-sm">
                    {tx.description}
                  </p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    {tx.date}
                  </p>
                </div>
                <span
                  className={`font-bold text-sm ${
                    tx.type === "earned"
                      ? "text-emerald-500"
                      : "text-red-500"
                  }`}
                >
                  {tx.type === "earned" ? "+" : "-"}{tx.amount}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Available Rewards */}
        <div className="card p-6 dark:bg-slate-800">
          <h2 className="text-lg font-bold text-slate-800 dark:text-white mb-4">
            المكافآت المتاحة
          </h2>
          <div className="space-y-3">
            {rewards.map((reward) => (
              <div
                key={reward.id}
                className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-700 rounded-xl"
              >
                <div>
                  <p className="font-bold text-slate-800 dark:text-white">
                    {reward.name}
                  </p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    {reward.description}
                  </p>
                </div>
                <button
                  disabled={points < reward.points}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    points >= reward.points
                      ? "bg-amber-500 text-white hover:bg-amber-600"
                      : "bg-slate-200 text-slate-400 cursor-not-allowed"
                  }`}
                >
                  {reward.points} نقطة
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* How to Earn Points */}
      <div className="card p-6 mt-6 dark:bg-slate-800">
        <h2 className="text-lg font-bold text-slate-800 dark:text-white mb-4">
          كيف تكسب نقاط؟
        </h2>
        <div className="grid md:grid-cols-3 gap-4">
          <div className="text-center p-4">
            <div className="w-12 h-12 rounded-full bg-sky-100 dark:bg-sky-900/30 flex items-center justify-center mx-auto mb-3">
              <ShoppingCart size={24} className="text-sky-500" />
            </div>
            <p className="font-bold text-slate-800 dark:text-white">1 نقطة لكل شراء</p>
            <p className="text-sm text-slate-500 dark:text-slate-400">كل 1 ر.ي = 1 نقطة</p>
          </div>
          <div className="text-center p-4">
            <div className="w-12 h-12 rounded-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center mx-auto mb-3">
              <TrendingUp size={24} className="text-emerald-500" />
            </div>
            <p className="font-bold text-slate-800 dark:text-white">نقاط إضافية</p>
            <p className="text-sm text-slate-500 dark:text-slate-400">عند تقييم المنتجات</p>
          </div>
          <div className="text-center p-4">
            <div className="w-12 h-12 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center mx-auto mb-3">
              <Gift size={24} className="text-purple-500" />
            </div>
            <p className="font-bold text-slate-800 dark:text-white">صديق يحيل صديق</p>
            <p className="text-sm text-slate-500 dark:text-slate-400">50 نقطة لكل إحالة</p>
          </div>
        </div>
      </div>
    </div>
  );
}