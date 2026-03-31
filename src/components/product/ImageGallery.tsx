"use client";

import { useState } from "react";
import Image from "next/image";

interface Props {
  images: string[];
  alt: string;
  discount?: number;
  inStock: boolean;
}

export default function ImageGallery({ images, alt, discount, inStock }: Props) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const hasMultiple = images.length > 1;

  return (
    <div className="space-y-3">
      <div className="relative aspect-square rounded-2xl overflow-hidden bg-slate-100">
        <Image
          src={images[selectedIndex]}
          alt={alt}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover"
          priority
        />
        {!inStock && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center z-10">
            <span className="bg-white text-slate-800 font-bold px-4 py-2 rounded-lg">نفد المخزون</span>
          </div>
        )}
        {discount && (
          <span className="absolute top-4 right-4 bg-red-500 text-white text-sm font-bold px-3 py-1 rounded-lg z-10">
            خصم {discount}%
          </span>
        )}
      </div>

      {hasMultiple && (
        <div className="flex gap-2 overflow-x-auto scrollbar-hide">
          {images.map((img, i) => (
            <button
              key={i}
              onClick={() => setSelectedIndex(i)}
              className={`shrink-0 w-16 h-16 rounded-xl overflow-hidden border-2 transition-colors ${
                i === selectedIndex ? "border-sky-500" : "border-transparent hover:border-slate-300"
              }`}
              aria-label={`صورة ${i + 1}`}
              aria-pressed={i === selectedIndex}
            >
              <Image
                src={img}
                alt=""
                width={64}
                height={64}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
