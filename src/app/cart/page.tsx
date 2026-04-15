"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Trash2, ShoppingBag } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { useToast } from "@/contexts/ToastContext";
import { FREE_SHIPPING_THRESHOLD, DEFAULT_SHIPPING_COST } from "@/utils/constants";
import { Breadcrumb, QuantityStepper, OrderSummary, EmptyState } from "@/components/ui";
import { MobileCartCard } from "@/components/mobile";
import { useFormatPrice } from "@/hooks/useFormatPrice";

export default function CartPage() {
  const { items, removeFromCart, updateQuantity, totalPrice, clearCart } = useCart();
  const { success, warning } = useToast();
  const { format: formatCurrency } = useFormatPrice();
  const [confirmClear, setConfirmClear] = useState(false);

  const handleRemove = (id: string, name: string) => {
    removeFromCart(id);
    warning(`تم إزالة "${name}" من السلة`);
  };

  const handleClear = () => {
    if (!confirmClear) {
      setConfirmClear(true);
      return;
    }
    clearCart();
    setConfirmClear(false);
    success("تم إفراغ السلة بنجاح");
  };

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

  const shipping = totalPrice >= FREE_SHIPPING_THRESHOLD ? 0 : DEFAULT_SHIPPING_COST;

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Desktop Breadcrumb */}
      <div className="hidden md:block">
        <Breadcrumb items={[{ label: "الرئيسية", href: "/" }, { label: "سلة التسوق" }]} />
      </div>

      {/* Mobile Header */}
      <div className="md:hidden flex items-center justify-between mb-4">
        <h1 className="text-lg font-extrabold text-slate-800 dark:text-white">
          سلة التسوق ({items.length})
        </h1>
        <button
          onClick={handleClear}
          className={`text-xs font-medium px-3 py-1.5 rounded-lg transition-colors ${
            confirmClear ? "bg-red-500 text-white" : "text-red-500 bg-red-50 dark:bg-red-900/20"
          }`}
        >
          {confirmClear ? "تأكيد الإفراغ؟" : "إفراغ"}
        </button>
      </div>

      {/* Desktop Header */}
      <h1 className="hidden md:block text-2xl font-extrabold text-slate-800 dark:text-white mb-8">
        سلة التسوق ({items.length} منتجات)
      </h1>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          {/* Mobile Cart Items */}
          <div className="md:hidden space-y-2.5">
            {items.map((item) => (
              <MobileCartCard key={item.product.id} item={item} />
            ))}
          </div>

          {/* Desktop Cart Items */}
          <div className="hidden md:block space-y-4">
            {items.map((item) => (
              <div key={item.product.id} className="card p-4 flex gap-4 animate-slide-up">
                <div className="w-24 h-24 relative rounded-xl overflow-hidden shrink-0">
                  <Image src={item.product.image} alt={item.product.name} fill sizes="96px" className="object-cover" />
                </div>
                <div className="flex-1 min-w-0">
                  <Link href={`/product/${item.product.id}`} className="font-bold text-slate-800 dark:text-white hover:text-sky-600 dark:hover:text-sky-400 transition-colors line-clamp-1">
                    {item.product.name}
                  </Link>
                  <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5">{item.product.category}</p>
                  <div className="flex items-center justify-between mt-3">
                    <QuantityStepper value={item.quantity} onChange={(v) => updateQuantity(item.product.id, v)} min={0} size="sm" />
                    <p className="font-bold text-slate-800 dark:text-white">{formatCurrency(item.product.price * item.quantity)}</p>
                  </div>
                </div>
                <button onClick={() => handleRemove(item.product.id, item.product.name)} className="text-slate-400 hover:text-red-500 transition-colors self-start p-1" aria-label={`إزالة ${item.product.name}`}>
                  <Trash2 size={18} />
                </button>
              </div>
            ))}
            <button onClick={handleClear} className={`text-sm font-medium transition-colors ${confirmClear ? "text-red-700 bg-red-50 dark:bg-red-900/30 px-3 py-1 rounded-lg" : "text-red-500 hover:text-red-600"}`}>
              {confirmClear ? "تأكيد الإفراغ؟" : "إفراغ السلة"}
            </button>
          </div>
        </div>

        {/* Mobile Summary */}
        <div className="lg:hidden fixed bottom-16 left-0 right-0 z-40 p-3 bg-white dark:bg-slate-800/90 backdrop-blur border-t border-slate-100 dark:border-slate-700">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-slate-600 dark:text-slate-300">الإجمالي</span>
            <span className="text-lg font-extrabold text-slate-900 dark:text-white">{formatCurrency(totalPrice + shipping)}</span>
          </div>
          <Link href="/checkout" className="btn-primary w-full justify-center py-3 text-sm">
            <ShoppingBag size={16} />
            إتمام الشراء ({formatCurrency(totalPrice + shipping)})
          </Link>
        </div>

        {/* Desktop Summary */}
        <div className="hidden lg:block">
          <OrderSummary items={items} totalPrice={totalPrice} shipping={shipping} actionLabel="إتمام الشراء" actionHref="/checkout" />
        </div>
      </div>
    </div>
  );
}
