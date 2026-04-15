"use client";

import { useEffect } from "react";
import { useRecentlyViewed } from "@/contexts/RecentlyViewedContext";
import { Product } from "@/lib/types";

export default function ProductViewTracker({ product }: { product: Product }) {
  const { addProduct } = useRecentlyViewed();

  useEffect(() => {
    addProduct(product);
  }, [product, addProduct]);

  return null;
}
