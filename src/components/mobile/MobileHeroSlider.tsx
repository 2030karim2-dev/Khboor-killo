"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";

const slides = [
  {
    image: "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=800&h=500&fit=crop",
    title: "سيارات بأفضل الأسعار",
    subtitle: "اكتشف مجموعة واسعة من السيارات",
    href: "/category/cars",
    color: "from-blue-900/80",
  },
  {
    image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&h=500&fit=crop",
    title: "ملابس عصرية",
    subtitle: "أحدث صيحات الموضة",
    href: "/category/clothing",
    color: "from-purple-900/80",
  },
  {
    image: "https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=800&h=500&fit=crop",
    title: "قطع غيار أصلية",
    subtitle: "ضمان الجودة والأصلية",
    href: "/category/auto-parts",
    color: "from-slate-900/80",
  },
];

export default function MobileHeroSlider() {
  const [current, setCurrent] = useState(0);
  const touchStart = useRef(0);
  const intervalRef = useRef<ReturnType<typeof setInterval>>(undefined);

  const next = useCallback(() => setCurrent((c) => (c + 1) % slides.length), []);
  const prev = useCallback(() => setCurrent((c) => (c - 1 + slides.length) % slides.length), []);

  useEffect(() => {
    intervalRef.current = setInterval(next, 4000);
    return () => clearInterval(intervalRef.current);
  }, [next]);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStart.current = e.touches[0].clientX;
    clearInterval(intervalRef.current);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    const diff = touchStart.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) {
      diff > 0 ? next() : prev();
    }
    intervalRef.current = setInterval(next, 4000);
  };

  return (
    <div className="relative rounded-2xl overflow-hidden" onTouchStart={handleTouchStart} onTouchEnd={handleTouchEnd}>
      {slides.map((slide, i) => (
        <div
          key={i}
          className={`transition-all duration-500 ${i === current ? "block" : "hidden"}`}
        >
          <Link href={slide.href} className="block relative aspect-[16/9]">
            <Image
              src={slide.image}
              alt={slide.title}
              fill
              sizes="100vw"
              className="object-cover"
              priority={i === 0}
              loading={i === 0 ? "eager" : "lazy"}
            />
            <div className={`absolute inset-0 bg-gradient-to-r ${slide.color} to-transparent`} />
            <div className="absolute inset-0 flex flex-col justify-end p-5">
              <h2 className="text-white text-lg font-extrabold mb-1">{slide.title}</h2>
              <p className="text-white/80 text-xs">{slide.subtitle}</p>
            </div>
          </Link>
        </div>
      ))}

      {/* Dots */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`h-1.5 rounded-full transition-all ${
              i === current ? "w-5 bg-white" : "w-1.5 bg-white/50"
            }`}
            aria-label={`شريحة ${i + 1}`}
          />
        ))}
      </div>

      {/* Nav arrows (hidden on touch devices via CSS) */}
      <button onClick={prev} className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/20 backdrop-blur flex items-center justify-center text-white hidden touch-none" aria-label="السابق">
        <ChevronLeft size={18} />
      </button>
      <button onClick={next} className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/20 backdrop-blur flex items-center justify-center text-white hidden touch-none" aria-label="التالي">
        <ChevronRight size={18} />
      </button>
    </div>
  );
}
