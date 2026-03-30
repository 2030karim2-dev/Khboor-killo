"use client";

import Link from "next/link";
import { Trash2, ShoppingBag } from "lucide-react";
import { useCart } from "@/lib/CartContext";
import { formatPrice } from "@/lib";
import { Breadcrumb, QuantityStepper, OrderSummary, EmptyState } from "@/components/ui";

export default function CartPage() {
  const { items, removeFromCart, updateQuantity, totalPrice, clearCart } =
    useCart();

  if (items.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16">
        <EmptyState
          icon="🛒"
          title="سلة التسوق فارغة"
          description="لم تقم بإضافة أي منتجات إلى سلة التسوق بعد"
          actionLabel="تصفح المنتجات"
          actionHref="/"
        />
      </div>
    );
  }

  const shipping = totalPrice >= 200 ? 0 : 25;

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <Breadcrumb
        items={[
          { label: "الرئيسية", href: "/" },
          { label: "سلة التسوق" },
        ]}
      />

      <h1 className="text-2xl font-extrabold text-slate-800 mb-8">
        سلة التسوق ({items.length} منتجات)
      </h1>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-4">
          {items.map((item) => (
            <div
              key={item.product.id}
              className="card p-4 flex gap-4 animate-slide-up"
            >
              <img
                src={item.product.image}
                alt={item.product.name}
                className="w-24 h-24 rounded-xl object-cover shrink-0"
              />
              <div className="flex-1 min-w-0">
                <Link
                  href={`/product/${item.product.id}`}
                  className="font-bold text-slate-800 hover:text-sky-600 transition-colors line-clamp-1"
                >
                  {item.product.name}
                </Link>
                <p className="text-sm text-slate-500 mt-0.5">
                  {item.product.category}
                </p>
                <div className="flex items-center justify-between mt-3">
                  <QuantityStepper
                    value={item.quantity}
                    onChange={(v) => updateQuantity(item.product.id, v)}
                    min={0}
                    size="sm"
                  />
                  <div className="text-left">
                    <p className="font-bold text-slate-800">
                      {formatPrice(item.product.price * item.quantity)}
                    </p>
                  </div>
                </div>
              </div>
              <button
                onClick={() => removeFromCart(item.product.id)}
                className="text-slate-400 hover:text-red-500 transition-colors self-start p-1"
              >
                <Trash2 size={18} />
              </button>
            </div>
          ))}

          <button
            onClick={clearCart}
            className="text-sm text-red-500 hover:text-red-600 font-medium"
          >
            إفراغ السلة
          </button>
        </div>

        <OrderSummary
          items={items}
          totalPrice={totalPrice}
          shipping={shipping}
          actionLabel="إتمام الشراء"
          actionHref="/checkout"
        />
      </div>
    </div>
  );
}
