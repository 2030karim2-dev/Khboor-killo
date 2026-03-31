"use client";

import Link from "next/link";
import Image from "next/image";
import { CartItem } from "@/lib/types";
import { formatPrice } from "@/lib/helpers";
import { FREE_SHIPPING_THRESHOLD } from "@/lib/constants";

export default function OrderSummary({
  items,
  totalPrice,
  shipping,
  discount = 0,
  actionLabel,
  actionHref,
  onAction,
}: {
  items: CartItem[];
  totalPrice: number;
  shipping: number;
  discount?: number;
  actionLabel?: string;
  actionHref?: string;
  onAction?: () => void;
}) {
  return (
    <div className="card p-6 h-fit sticky top-32">
      <h2 className="text-lg font-bold text-slate-800 mb-4">ملخص الطلب</h2>
      <div className="space-y-3 mb-4">
        {items.map((item) => (
          <div key={item.product.id} className="flex gap-3 items-center">
            <div className="w-12 h-12 relative rounded-lg overflow-hidden shrink-0">
              <Image
                src={item.product.image}
                alt={item.product.name}
                fill
                sizes="48px"
                className="object-cover"
              />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-slate-800 truncate">
                {item.product.name}
              </p>
              <p className="text-xs text-slate-500">
                الكمية: {item.quantity}
              </p>
            </div>
            <p className="text-sm font-bold shrink-0">
              {formatPrice(item.product.price * item.quantity)}
            </p>
          </div>
        ))}
      </div>
      <hr className="my-3" />
      <div className="space-y-2 text-sm">
        <div className="flex justify-between">
          <span className="text-slate-600">المجموع الفرعي</span>
          <span className="font-medium">{formatPrice(totalPrice)}</span>
        </div>
        {discount > 0 && (
          <div className="flex justify-between text-emerald-600">
            <span>الخصم</span>
            <span className="font-medium">-{formatPrice(discount)}</span>
          </div>
        )}
        <div className="flex justify-between">
          <span className="text-slate-600">الشحن</span>
          <span className="font-medium">
            {shipping === 0 ? (
              <span className="text-emerald-600">مجاني</span>
            ) : (
              formatPrice(shipping)
            )}
          </span>
        </div>
        {shipping > 0 && (
          <p className="text-xs text-sky-600">
            أضف {formatPrice(FREE_SHIPPING_THRESHOLD - totalPrice)} للحصول على شحن مجاني
          </p>
        )}
        <hr className="my-2" />
        <div className="flex justify-between text-base">
          <span className="font-bold text-slate-800">الإجمالي</span>
          <span className="font-extrabold text-slate-900">
            {formatPrice(totalPrice - discount + shipping)}
          </span>
        </div>
      </div>
      {actionHref && (
        <Link
          href={actionHref}
          className="btn-primary w-full justify-center mt-6 py-3 text-base"
        >
          {actionLabel}
        </Link>
      )}
      {onAction && (
        <button
          onClick={onAction}
          className="btn-secondary w-full justify-center mt-6 py-3 text-base"
        >
          {actionLabel}
        </button>
      )}
    </div>
  );
}
