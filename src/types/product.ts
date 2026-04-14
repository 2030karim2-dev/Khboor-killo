export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  image: string;
  images?: string[];
  category: string;
  categorySlug: string;
  rating: number;
  reviews: number;
  inStock: boolean;
  featured?: boolean;
  discount?: number;
}

export interface SubCategory {
  slug: string;
  name: string;
  icon: string;
  productCount: number;
}

export interface Category {
  slug: string;
  name: string;
  description: string;
  icon: string;
  image: string;
  productCount: number;
  subcategories: SubCategory[];
}

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Address {
  id: string;
  label: string;
  city: string;
  address: string;
  phone: string;
  isDefault: boolean;
}

export interface Review {
  id: string;
  author: string;
  rating: number;
  comment: string;
  date: string;
  helpful: number;
}
