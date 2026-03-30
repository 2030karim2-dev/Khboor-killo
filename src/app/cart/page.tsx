"use client";

import Link from "next/link";
import { ChevronLeft, Minus, Plus, Trash2, ShoppingBag } from "lucide-react";
import { useCart } from "@/lib/CartContext";
import { formatPrice } from "@/lib/data";

export default function CartPage() {
  const { items, removeFromCart, updateQuantity, totalPrice, clearCart } =
    useCart();

  if (items.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center animate-fade-in">
        <div className="text-7xl mb-6">🛒</div>
        <h1 className="text-2xl font-extrabold text-slate-800 mb-2">
          سلة التسوق فارغة
        </h1>
        <p className="text-slate-500 mb-6">
          لم تقم بإضافة أي منتجات إلى سلة التسوق بعد
        </p>
        <Link href="/" className="btn-primary text-base">
          <ShoppingBag size={18} />
          تصفح المنتجات
        </Link>
      </div>
    );
  }

  const shipping = totalPrice >= 200 ? 0 : 25;

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <nav className="flex items-center gap-2 text-sm text-slate-500 mb-6">
        <Link href="/" className="hover:text-sky-600 transition-colors">
          الرئيسية
        </Link>
        <ChevronLeft size={14} />
        <span className="text-slate-800 font-medium">سلة التسوق</span>
      </nav>

      <h1 className="text-2xl font-extrabold text-slate-800 mb-8">
        سلة التسوق ({items.length} منتجات)
      </h1>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Items */}
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
                  <div className="flex items-center gap-0 border border-slate-200 rounded-lg overflow-hidden">
                    <button
                      onClick={() =>
                        updateQuantity(item.product.id, item.quantity - 1)
                      }
                      className="p-1.5 hover:bg-slate-100 transition-colors"
                    >
                      <Minus size={14} />
                    </button>
                    <span className="w-8 text-center text-sm font-bold">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() =>
                        updateQuantity(item.product.id, item.quantity + 1)
                      }
                      className="p-1.5 hover:bg-slate-100 transition-colors"
                    >
                      <Plus size={14} />
                    </button>
                  </div>
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

        {/* Summary */}
        <div className="card p-6 h-fit sticky top-32">
          <h2 className="text-lg font-bold text-slate-800 mb-4">ملخص الطلب</h2>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-slate-600">المجموع الفرعي</span>
              <span className="font-medium">{formatPrice(totalPrice)}</span>
            </div>
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
                أضف {formatPrice(200 - totalPrice)} للحصول على شحن مجاني
              </p>
            )}
            <hr className="my-2" />
            <div className="flex justify-between text-base">
              <span className="font-bold text-slate-800">الإجمالي</span>
              <span className="font-extrabold text-slate-900">
                {formatPrice(totalPrice + shipping)}
              </span>
            </div>
          </div>
          <Link
            href="/checkout"
            className="btn-primary w-full justify-center mt-6 py-3 text-base"
          >
            إتمام الشراء
          </Link>
          <Link
            href="/"
            className="btn-outline w-full justify-center mt-3 py-2.5 text-sm"
          >
            متابعة التسوق
          </Link>
        </div>
      </div>
    </div>
  );
}
