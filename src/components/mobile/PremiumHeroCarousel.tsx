"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight, ArrowLeft } from "lucide-react";

const slides = [
  {
    image: "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=800&h=500&fit=crop",
    title: "سيارات بأفضل الأسعار",
    subtitle: "اكتشف مجموعة واسعة من السيارات الجديدة والمستعملة",
    href: "/category/cars",
    gradient: "from-blue-900/90 via-blue-800/60 to-transparent",
  },
  {
    image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&h=500&fit=crop",
    title: "ملابس عصرية",
    subtitle: "أحدث صيحات الموضة لجميع أفراد العائلة",
    href: "/category/clothing",
    gradient: "from-purple-900/90 via-purple-800/60 to-transparent",
  },
  {
    image: "https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=800&h=500&fit=crop",
    title: "قطع غيار أصلية",
    subtitle: "ضمان الجودة والأصلية مع شحن سريع",
    href: "/category/auto-parts",
    gradient: "from-slate-900/90 via-slate-800/60 to-transparent",
  },
  {
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&h=500&fit=crop",
    title: "إكسسوارات عصرية",
    subtitle: "ساعات، نظارات، حقائب وأكثر",
    href: "/category/accessories",
    gradient: "from-amber-900/90 via-amber-800/60 to-transparent",
  },
];

export default function PremiumHeroCarousel() {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);
  const touchStart = useRef(0);
  const touchDelta = useRef(0);
  const intervalRef = useRef<ReturnType<typeof setInterval>>(undefined);

  const next = useCallback(() => setCurrent((c) => (c + 1) % slides.length), []);
  const prev = useCallback(() => setCurrent((c) => (c - 1 + slides.length) % slides.length), []);

  useEffect(() => {
    if (paused) return;
    intervalRef.current = setInterval(next, 4500);
    return () => clearInterval(intervalRef.current);
  }, [next, paused]);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStart.current = e.touches[0].clientX;
    setPaused(true);
    clearInterval(intervalRef.current);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchDelta.current = e.touches[0].clientX - touchStart.current;
  };

  const handleTouchEnd = () => {
    if (Math.abs(touchDelta.current) > 50) {
      touchDelta.current > 0 ? prev() : next();
    }
    touchDelta.current = 0;
    setPaused(false);
  };

  return (
    <div className="relative rounded-2xl overflow-hidden shadow-lg">
      <div
        className="relative"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {slides.map((slide, i) => (
          <div
            key={i}
            className={`transition-all duration-500 ${
              i === current ? "block" : "hidden"
            }`}
          >
            <Link href={slide.href} className="block relative aspect-[16/9]">
              <Image
                src={slide.image}
                alt={slide.title}
                fill
                sizes="100vw"
                className="object-cover"
                priority={i === 0}
              />
              <div className={`absolute inset-0 bg-gradient-to-r ${slide.gradient}`} />
              <div className="absolute inset-0 flex flex-col justify-end p-5">
                <h2 className="text-white text-lg font-extrabold mb-1 drop-shadow-lg">
                  {slide.title}
                </h2>
                <p className="text-white/90 text-xs mb-3 drop-shadow">
                  {slide.subtitle}
                </p>
                <span className="inline-flex items-center gap-1 bg-white/20 backdrop-blur-sm text-white text-[11px] font-bold px-3 py-1.5 rounded-full w-fit hover:bg-white/30 transition-colors">
                  تسوق الآن <ArrowLeft size={12} />
                </span>
              </div>
            </Link>
          </div>
        ))}
      </div>

      {/* Dots */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              i === current
                ? "w-5 bg-white shadow-lg"
                : "w-1.5 bg-white/50 hover:bg-white/80"
            }`}
            aria-label={`شريحة ${i + 1}`}
          />
        ))}
      </div>

      {/* Nav arrows (hidden on touch devices) */}
      <button
        onClick={prev}
        className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/20 backdrop-blur flex items-center justify-center text-white hover:bg-white/40 transition-colors hidden sm:flex"
        aria-label="السابق"
      >
        <ChevronRight size={18} />
      </button>
      <button
        onClick={next}
        className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/20 backdrop-blur flex items-center justify-center text-white hover:bg-white/40 transition-colors hidden sm:flex"
        aria-label="التالي"
      >
        <ChevronLeft size={18} />
      </button>
    </div>
  );
}
