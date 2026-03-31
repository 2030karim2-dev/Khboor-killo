"use client";

import { useState } from "react";
import Image from "next/image";
import { ShoppingCart, Heart, Minus, Plus } from "lucide-react";
import { Product, formatPrice, formatNumber } from "@/lib";
import { useCart } from "@/lib/CartContext";
import { useWishlist } from "@/lib/WishlistContext";
import { useToast } from "@/lib/ToastContext";
import { StarRating, TrustBar } from "@/components/ui";
import ShareButton from "@/components/product/ShareButton";
import ImageGallery from "@/components/product/ImageGallery";

interface Props {
  product: Product;
}

export function ProductActionsDesktop({ product }: Props) {
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const { success } = useToast();
  const liked = isInWishlist(product.id);

  const images = product.images?.length ? product.images : [product.image];

  const handleAdd = () => {
    for (let i = 0; i < quantity; i++) addToCart(product);
    success(`تمت إضافة ${quantity} للسلة`);
  };

  return (
    <div className="hidden md:grid md:grid-cols-2 gap-8 mb-12">
      <ImageGallery images={images} alt={product.name} discount={product.discount} inStock={product.inStock} />

      <div className="animate-slide-up">
        <div className="flex items-center gap-2 mb-3">
          <span className="text-sm text-sky-600 bg-sky-50 px-3 py-1 rounded-full font-medium">{product.category}</span>
          {product.inStock ? <span className="text-sm text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full">متوفر</span> : <span className="text-sm text-red-600 bg-red-50 px-3 py-1 rounded-full">نفد</span>}
        </div>
        <h1 className="text-2xl md:text-3xl font-extrabold text-slate-800 mb-3">{product.name}</h1>
        <StarRating rating={product.rating} reviews={product.reviews} size={16} />
        <div className="bg-slate-50 rounded-xl p-4 my-4">
          <div className="flex items-baseline gap-3">
            <span className="text-3xl font-extrabold text-slate-900">{formatPrice(product.price)}</span>
            {product.originalPrice && <><span className="text-lg text-slate-400 line-through">{formatPrice(product.originalPrice)}</span><span className="text-sm font-bold text-red-500 bg-red-50 px-2 py-0.5 rounded-full">وفر {formatNumber(product.originalPrice - product.price)}</span></>}
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
          <button onClick={() => { toggleWishlist(product); success(liked ? "تم الإزالة" : "تمت الإضافة"); }} className={`p-3 rounded-xl border-2 transition-colors ${liked ? "border-red-500 bg-red-50 text-red-500" : "border-slate-200 hover:border-red-300"}`} aria-label={liked ? "إزالة من المفضلة" : "إضافة للمفضلة"}><Heart size={20} className={liked ? "fill-red-500" : ""} /></button>
          <ShareButton title={product.name} text={product.description} />
        </div>
        <TrustBar compact />
      </div>
    </div>
  );
}

export function ProductActionsMobile({ product }: Props) {
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const { success } = useToast();
  const liked = isInWishlist(product.id);

  const handleAdd = () => {
    for (let i = 0; i < quantity; i++) addToCart(product);
    success("تمت الإضافة للسلة");
  };

  return (
    <div className="md:hidden">
      <div className="relative aspect-square">
        <Image src={product.image} alt={product.name} fill sizes="100vw" className="object-cover" priority />
        {!product.inStock && <div className="absolute inset-0 bg-black/50 flex items-center justify-center"><span className="bg-white text-slate-800 font-bold px-4 py-2 rounded-lg">نفد المخزون</span></div>}
        {product.discount && <span className="absolute top-4 right-4 bg-red-500 text-white text-sm font-bold px-3 py-1 rounded-lg z-10">خصم {product.discount}%</span>}
        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-black/30 to-transparent" />
      </div>

      <div className="bg-white rounded-t-3xl -mt-6 relative z-10 px-4 pt-5 pb-24">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-xs text-sky-600 bg-sky-50 px-2 py-0.5 rounded-full font-medium">{product.category}</span>
          {product.inStock ? <span className="text-xs text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">متوفر</span> : <span className="text-xs text-red-600 bg-red-50 px-2 py-0.5 rounded-full">نفد</span>}
        </div>
        <h1 className="text-xl font-extrabold text-slate-800 mb-2">{product.name}</h1>
        <StarRating rating={product.rating} reviews={product.reviews} size={14} />
        <div className="bg-slate-50 rounded-xl p-3 my-4">
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-extrabold text-slate-900">{formatPrice(product.price)}</span>
            {product.originalPrice && <><span className="text-sm text-slate-400 line-through">{formatPrice(product.originalPrice)}</span><span className="text-xs font-bold text-red-500 bg-red-50 px-1.5 py-0.5 rounded-full">وفر {formatNumber(product.originalPrice - product.price)}</span></>}
          </div>
        </div>
        <p className="text-sm text-slate-600 leading-relaxed mb-4">{product.description}</p>

        <div className="flex items-center gap-3 mb-4">
          <span className="text-sm font-medium text-slate-700">الكمية:</span>
          <div className="flex items-center gap-0 border border-slate-200 rounded-xl overflow-hidden">
            <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="w-10 h-10 flex items-center justify-center active:bg-slate-100"><Minus size={16} /></button>
            <span className="w-10 text-center font-bold">{quantity}</span>
            <button onClick={() => setQuantity(quantity + 1)} className="w-10 h-10 flex items-center justify-center active:bg-slate-100"><Plus size={16} /></button>
          </div>
        </div>

        <div className="flex gap-2 mb-4">
          <ShareButton title={product.name} text={product.description} />
          <button onClick={() => { toggleWishlist(product); success(liked ? "تم الإزالة" : "تمت الإضافة"); }} className={`p-3 rounded-xl border-2 transition-colors ${liked ? "border-red-500 bg-red-50 text-red-500" : "border-slate-200"}`} aria-label={liked ? "إزالة من المفضلة" : "إضافة للمفضلة"}><Heart size={18} className={liked ? "fill-red-500" : ""} /></button>
        </div>
        <TrustBar compact />
      </div>

      <div className="fixed bottom-16 left-0 right-0 z-40 p-3 bg-white/90 backdrop-blur border-t border-slate-100">
        <div className="flex items-center gap-3">
          <div className="flex-1"><p className="text-xs text-slate-500">السعر</p><p className="text-lg font-extrabold text-slate-900">{formatPrice(product.price * quantity)}</p></div>
          <button onClick={handleAdd} disabled={!product.inStock} className="flex-1 btn-primary py-3 justify-center text-sm disabled:opacity-50"><ShoppingCart size={18} />{product.inStock ? "أضف للسلة" : "غير متوفر"}</button>
        </div>
      </div>
    </div>
  );
}
