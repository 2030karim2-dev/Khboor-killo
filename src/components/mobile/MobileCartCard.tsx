"use client";

import Image from "next/image";
import Link from "next/link";
import { Trash2 } from "lucide-react";
import { CartItem } from "@/lib/types";
import { formatPrice } from "@/lib";
import { useCart } from "@/lib/CartContext";
import { useToast } from "@/lib/ToastContext";

export default function MobileCartCard({ item }: { item: CartItem }) {
  const { updateQuantity, removeFromCart } = useCart();
  const { warning } = useToast();

  return (
    <div className="bg-white rounded-2xl border border-slate-100 p-3 flex gap-3 animate-fade-in">
      <Link href={`/product/${item.product.id}`} className="w-20 h-20 relative rounded-xl overflow-hidden shrink-0">
        <Image src={item.product.image} alt={item.product.name} fill sizes="80px" className="object-cover" />
      </Link>

      <div className="flex-1 min-w-0">
        <Link href={`/product/${item.product.id}`}>
          <h3 className="text-sm font-bold text-slate-800 line-clamp-1 mb-0.5">{item.product.name}</h3>
        </Link>
        <p className="text-xs text-slate-400 mb-2">{item.product.category}</p>

        <div className="flex items-center justify-between">
          <p className="text-sm font-extrabold text-slate-900">
            {formatPrice(item.product.price * item.quantity)}
          </p>

          <div className="flex items-center gap-1">
            <button
              onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
              className="w-7 h-7 rounded-lg bg-slate-100 flex items-center justify-center active:bg-slate-200 transition-colors"
              aria-label="نقصان"
            >
              <span className="text-sm font-bold text-slate-600">−</span>
            </button>
            <span className="w-8 text-center text-sm font-bold">{item.quantity}</span>
            <button
              onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
              className="w-7 h-7 rounded-lg bg-sky-500 text-white flex items-center justify-center active:bg-sky-600 transition-colors"
              aria-label="زيادة"
            >
              <span className="text-sm font-bold">+</span>
            </button>
            <button
              onClick={() => {
                removeFromCart(item.product.id);
                warning("تم الحذف من السلة");
              }}
              className="w-7 h-7 rounded-lg flex items-center justify-center text-slate-300 hover:text-red-500 active:bg-red-50 transition-colors mr-1"
              aria-label="حذف"
            >
              <Trash2 size={15} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
