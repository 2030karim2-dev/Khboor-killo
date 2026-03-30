"use client";

import { use } from "react";
import { getProductById, getProductsByCategory } from "@/lib";
import { useState } from "react";
import { notFound } from "next/navigation";
import { ProductDesktop } from "@/components/product/ProductDesktop";
import { ProductMobile } from "@/components/product/ProductMobile";

export default function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const product = getProductById(id);
  const [quantity, setQuantity] = useState(1);

  if (!product) notFound();

  const related = getProductsByCategory(product.categorySlug)
    .filter((p) => p.id !== product.id)
    .slice(0, 4);

  return (
    <div>
      <ProductMobile product={product} quantity={quantity} setQuantity={setQuantity} related={related} />
      <ProductDesktop product={product} quantity={quantity} setQuantity={setQuantity} related={related} />
    </div>
  );
}
