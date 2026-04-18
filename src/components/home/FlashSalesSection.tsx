"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { Clock, Flame, Tag, Users, Gift, ArrowRight, Copy, Check } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/contexts/ToastContext";

interface FlashDeal {
  id: string;
  name: string;
  image: string;
  originalPrice: number;
  salePrice: number;
  discount: number;
  endsAt: string;
  sold: number;
  total: number;
}

function calculateTimeLeft(endDate: string) {
  const difference = new Date(endDate).getTime() - new Date().getTime();
  if (difference <= 0) return null;
  
  return {
    hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((difference / 1000 / 60) % 60),
    seconds: Math.floor((difference / 1000) % 60),
  };
}

const flashDeals: FlashDeal[] = [
  {
    id: "deal-1",
    name: "كاميرا احترافية DSLR",
    image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=400&h=300&fit=crop",
    originalPrice: 2500,
    salePrice: 1875,
    discount: 25,
    endsAt: "2026-04-20T23:59:59",
    sold: 45,
    total: 100,
  },
  {
    id: "deal-2",
    name: "إطارات رياضية Michelin",
    image: "https://images.unsplash.com/photo-1569391572574-0f8d2cbe5d72?w=400&h=300&fit=crop",
    originalPrice: 850,
    salePrice: 595,
    discount: 30,
    endsAt: "2026-04-21T23:59:59",
    sold: 28,
    total: 50,
  },
  {
    id: "deal-3",
    name: "لابتوب Dell XPS 15",
    image: "https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=400&h=300&fit=crop",
    originalPrice: 4500,
    salePrice: 3600,
    discount: 20,
    endsAt: "2026-04-22T23:59:59",
    sold: 12,
    total: 30,
  },
];

export default function FlashSalesSection() {
  const [timeLeft, setTimeLeft] = useState({ hours: 5, minutes: 32, seconds: 15 });
  const [copied, setCopied] = useState(false);
  const { user } = useAuth();
  const { addToast } = useToast();

  const endDate = flashDeals[0]?.endsAt || null;

  useEffect(() => {
    if (!endDate) return;
    const timer = setInterval(() => {
      const remaining = calculateTimeLeft(endDate);
      if (remaining) {
        setTimeLeft(remaining);
      }
    }, 1000);
    return () => clearInterval(timer);
  }, [endDate]);

  const referralLink = user ? `https://khuboor.com/ref/${user.id}` : "https://khuboor.com/register?ref=demo";

  const handleCopyLink = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(referralLink);
      setCopied(true);
      addToast("success", "تم نسخ الرابط بنجاح!");
      setTimeout(() => setCopied(false), 2000);
    } catch {
      addToast("error", "فشل نسخ الرابط");
    }
  }, [referralLink, addToast]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-red-500 to-orange-500 flex items-center justify-center">
            <Flame size={20} className="text-white" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-800 dark:text-white">عروض محدودة</h2>
            <p className="text-sm text-slate-500 dark:text-slate-400">خصومات حصرية حتى نفاذ الكمية</p>
          </div>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 bg-red-50 dark:bg-red-900/20 rounded-full">
          <Clock size={16} className="text-red-500" />
          <span className="text-sm font-bold text-red-600 dark:text-red-400">
            {String(timeLeft.hours).padStart(2, "0")}:
            {String(timeLeft.minutes).padStart(2, "0")}:
            {String(timeLeft.seconds).padStart(2, "0")}
          </span>
        </div>
      </div>

      {/* Deals Grid */}
      <div className="grid md:grid-cols-3 gap-4">
        {flashDeals.map((deal) => {
          const progress = (deal.sold / deal.total) * 100;
          return (
            <div
              key={deal.id}
              className="card p-0 overflow-hidden group hover:border-red-300 transition-colors dark:hover:border-red-700"
            >
              <div className="relative aspect-video">
                <img
                  src={deal.image}
                  alt={deal.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-2 right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                  -{deal.discount}%
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-3 right-3 left-3">
                  <p className="text-white font-bold line-clamp-1">{deal.name}</p>
                </div>
              </div>
              <div className="p-4">
                <div className="flex items-baseline gap-2 mb-2">
                  <span className="text-lg font-bold text-red-600 dark:text-red-400">
                    {deal.salePrice} ر.ي
                  </span>
                  <span className="text-sm text-slate-400 line-through">
                    {deal.originalPrice} ر.ي
                  </span>
                </div>
                <div className="relative h-2 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden mb-2">
                  <div
                    className="absolute top-0 left-0 h-full bg-gradient-to-r from-red-500 to-orange-500 rounded-full"
                    style={{ width: `${progress}%` }}
                  />
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Sold: {deal.sold}/{deal.total}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      <Link
        href="/search?featured=flash"
        className="flex items-center justify-center gap-2 w-full py-3 bg-gradient-to-r from-red-500 to-orange-500 text-white rounded-xl font-bold hover:from-red-600 hover:to-orange-600 transition-colors"
      >
        عرض الكل
        <ArrowRight size={18} />
      </Link>

      {/* Referral Program */}
      <div className="card p-6 bg-gradient-to-br from-sky-50 to-purple-50 dark:from-sky-900/20 dark:to-purple-900/20">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-sky-500 to-purple-500 flex items-center justify-center shrink-0">
            <Users size={24} className="text-white" />
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-bold text-slate-800 dark:text-white mb-1">
              صديق يحيل صديق
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-300 mb-3">
              شارك رابطك واحصل على نقاط عند كل صديق يسجل ويشتري
            </p>
            <div className="flex flex-wrap gap-3">
{user ? (
                        <Link 
                          href="/account/referrals"
                          className="flex items-center gap-2 px-4 py-2 bg-sky-500 text-white rounded-lg text-sm font-medium hover:bg-sky-600 transition-colors"
                        >
                          <Gift size={16} />
                          50 نقطة لكل إحالة
                        </Link>
                      ) : (
                        <Link 
                          href="/login?redirect=/"
                          className="flex items-center gap-2 px-4 py-2 bg-sky-500 text-white rounded-lg text-sm font-medium hover:bg-sky-600 transition-colors"
                        >
                          <Gift size={16} />
                          سجّل للحصول على رابطك
                        </Link>
                      )}
<button 
                        onClick={handleCopyLink}
                        className="flex items-center gap-2 px-4 py-2 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 rounded-lg text-sm font-medium hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
                      >
                        {copied ? <Check size={16} /> : <Copy size={16} />}
                        {copied ? "تم النسخ" : "نسخ الرابط"}
                      </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}