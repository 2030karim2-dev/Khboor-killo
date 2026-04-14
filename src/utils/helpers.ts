import { Product, Category } from "../types/product";
import { products } from "../data/products";
import { categories } from "../data/categories";
import { CURRENCY } from "./constants";

export function getProductById(id: string): Product | undefined {
  return products.find((p) => p.id === id);
}

export function getProductsByCategory(slug: string): Product[] {
  return products.filter((p) => p.categorySlug === slug);
}

export function getFeaturedProducts(): Product[] {
  return products.filter((p) => p.featured);
}

export function getCategoryBySlug(slug: string): Category | undefined {
  return categories.find((c) => c.slug === slug);
}

export function searchProducts(query: string): Product[] {
  const q = query.toLowerCase();
  return products.filter(
    (p) =>
      p.name.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q)
  );
}

export function formatNumber(num: number): string {
  return num.toLocaleString("en");
}

export function formatPrice(price: number): string {
  return formatNumber(price) + " " + CURRENCY;
}

export function calculateDiscountPercent(original: number, current: number): number {
  return Math.round(((original - current) / original) * 100);
}
