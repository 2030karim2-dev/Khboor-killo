export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: string;
  categorySlug: string;
  rating: number;
  reviews: number;
  inStock: boolean;
  featured?: boolean;
  discount?: number;
}

export interface Category {
  slug: string;
  name: string;
  description: string;
  icon: string;
  image: string;
  productCount: number;
}

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}
