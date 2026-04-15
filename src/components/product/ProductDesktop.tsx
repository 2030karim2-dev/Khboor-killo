"use client";

import Image from "next/image";
import { ShoppingCart, Heart, Share2, Minus, Plus } from "lucide-react";
import { Product } from "@/types/product";
import { formatNumber } from "@/utils/helpers";
import { useCart } from "@/contexts/CartContext";
import { useWishlist } from "@/contexts/WishlistContext";
import { useToast } from "@/contexts/ToastContext";
import { useFormatPrice } from "@/hooks/useFormatPrice";
import { Breadcrumb, StarRating, TrustBar } from "@/components/ui";
import ShareButton from "@/components/product/ShareButton";
import ReviewList from "@/components/product/ReviewList";
import ReviewForm from "@/components/product/ReviewForm";
import ProductCard from "@/components/ProductCard";

interface Props {
  product: Product;
  quantity: number;
  setQuantity: (v: number) => void;
  related: Product[];
}

export function ProductDesktop({ product, quantity, setQuantity, related }: Props) {
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const { success } = useToast();
  const { format: formatCurrency } = useFormatPrice();
  const liked = isInWishlist(product.id);

  const handleAdd = () => {
    for (let i = 0; i < quantity; i++) addToCart(product);
    success(`تمت إضافة ${quantity} للسلة`);
  };

  return (
    <div className="hidden md:block max-w-7xl mx-auto px-4 py-8">
      <Breadcrumb items={[{ label: "الرئيسية", href: "/" }, { label: product.category, href: `/category/${product.categorySlug}` }, { label: product.name }]} />

      <div className="grid md:grid-cols-2 gap-8 mb-12">
        <div className="card overflow-hidden">
          <div className="relative aspect-square">
            <Image src={product.image} alt={product.name} fill sizes="50vw" className="object-cover" priority />
            {!product.inStock && <div className="absolute inset-0 bg-black/50 flex items-center justify-center z-10"><span className="bg-white text-slate-800 font-bold px-4 py-2 rounded-lg">نفد المخزون</span></div>}
            {product.discount && <span className="absolute top-4 right-4 bg-red-500 text-white text-sm font-bold px-3 py-1 rounded-lg z-10">خصم {product.discount}%</span>}
          </div>
        </div>

        <div className="animate-slide-up">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-sm text-sky-600 bg-sky-50 px-3 py-1 rounded-full font-medium">{product.category}</span>
            {product.inStock ? <span className="text-sm text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full">متوفر</span> : <span className="text-sm text-red-600 bg-red-50 px-3 py-1 rounded-full">نفد</span>}
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-slate-800 mb-3">{product.name}</h1>
          <StarRating rating={product.rating} reviews={product.reviews} size={16} />
          <div className="bg-slate-50 rounded-xl p-4 my-4">
            <div className="flex items-baseline gap-3">
              <span className="text-3xl font-extrabold text-slate-900">{formatCurrency(product.price)}</span>
              {product.originalPrice && <><span className="text-lg text-slate-400 line-through">{formatCurrency(product.originalPrice)}</span><span className="text-sm font-bold text-red-500 bg-red-50 px-2 py-0.5 rounded-full">وفر {formatNumber(product.originalPrice - product.price)}</span></>}
            </div>
          </div>
          <p className="text-slate-600 leading-relaxed mb-6">{product.description}</p>
          <div className="flex items-center gap-4 mb-6">
            <span className="font-medium text-slate-700">الكمية:</span>
            <div className="flex items-center gap-0 border border-slate-200 rounded-xl overflow-hidden">
              <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="p-2.5 hover:bg-slate-100"><Minus size={18} /></button>
              <span className="w-12 text-center font-bold">{quantity}</span>
              <button onClick={() => setQuantity(quantity + 1)} className="p-2.5 hover:bg-slate-100"><Plus size={18} /></button>
            </div>
          </div>
          <div className="flex gap-3 mb-8">
            <button onClick={handleAdd} disabled={!product.inStock} className="flex-1 btn-primary py-3 text-base justify-center disabled:opacity-50"><ShoppingCart size={20} />{product.inStock ? "أضف للسلة" : "غير متوفر"}</button>
            <button onClick={() => { toggleWishlist(product); success(liked ? "تم الإزالة" : "تمت الإضافة"); }} className={`p-3 rounded-xl border-2 transition-colors ${liked ? "border-red-500 bg-red-50 text-red-500" : "border-slate-200 hover:border-red-300"}`}><Heart size={20} className={liked ? "fill-red-500" : ""} /></button>
            <ShareButton title={product.name} text={product.description} />
          </div>
          <TrustBar compact />
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-8 mb-12">
        <ReviewForm productId={product.id} />
        <ReviewList productId={product.id} />
      </div>

      {related.length > 0 && <section><h2 className="text-xl font-extrabold text-slate-800 mb-6">منتجات مشابهة</h2><div className="grid grid-cols-2 md:grid-cols-4 gap-4">{related.map((p) => <ProductCard key={p.id} product={p} />)}</div></section>}
    </div>
  );
}
