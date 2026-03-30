export { categories } from "./categories";
export { products } from "./products";
export {
  getProductById,
  getProductsByCategory,
  getFeaturedProducts,
  getCategoryBySlug,
  searchProducts,
  formatPrice,
  calculateDiscount,
} from "./helpers";
export type { Product, Category, BreadcrumbItem, CartItem, FormFieldProps } from "./types";
