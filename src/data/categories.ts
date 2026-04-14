import { Category } from "../types/product";

export const categories: Category[] = [
  {
    slug: "cars",
    name: "سيارات",
    description: "سيارات جديدة ومستعملة بجميع الفئات",
    icon: "🚗",
    image: "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=600&h=400&fit=crop",
    productCount: 4,
    subcategories: [
      { slug: "sedan", name: "سيدان", icon: "🚗", productCount: 1 },
      { slug: "suv", name: "دفع رباعي", icon: "🚙", productCount: 1 },
      { slug: "pickup", name: "بيك أب", icon: "🛻", productCount: 1 },
      { slug: "sports", name: "رياضية", icon: "🏎️", productCount: 1 },
    ],
  },
  {
    slug: "auto-parts",
    name: "قطع غيار السيارات",
    description: "قطع غيار أصلية ومتقنة لجميع أنواع السيارات",
    icon: "🔧",
    image: "https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=600&h=400&fit=crop",
    productCount: 4,
    subcategories: [
      { slug: "brakes", name: "فرامل", icon: "🛞", productCount: 1 },
      { slug: "engine", name: "محرك", icon: "⚙️", productCount: 1 },
      { slug: "oil-filters", name: "زيوت وفلاتر", icon: "🛢️", productCount: 1 },
      { slug: "batteries", name: "بطاريات", icon: "🔋", productCount: 1 },
    ],
  },
  {
    slug: "clothing",
    name: "ملابس",
    description: "ملابس رجالية ونسائية وأطفال عصرية",
    icon: "👕",
    image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=600&h=400&fit=crop",
    productCount: 4,
    subcategories: [
      { slug: "men", name: "رجالي", icon: "👔", productCount: 2 },
      { slug: "women", name: "نسائي", icon: "👗", productCount: 1 },
      { slug: "kids", name: "أطفال", icon: "👶", productCount: 1 },
    ],
  },
  {
    slug: "building-materials",
    name: "مواد بناء",
    description: "كل ما تحتاجه لأعمال البناء والتشطيب",
    icon: "🧱",
    image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=600&h=400&fit=crop",
    productCount: 4,
    subcategories: [
      { slug: "cement", name: "أسمنت", icon: "🧱", productCount: 1 },
      { slug: "steel", name: "حديد", icon: "🔩", productCount: 1 },
      { slug: "paint", name: "دهانات", icon: "🎨", productCount: 1 },
      { slug: "plumbing", name: "سباكة", icon: "🔧", productCount: 1 },
    ],
  },
  {
    slug: "accessories",
    name: "إكسسوارات",
    description: "إكسسوارات عصرية للمنزل والسيارة والمزيد",
    icon: "💎",
    image: "https://images.unsplash.com/photo-1523170335258-f5ed11844a49?w=600&h=400&fit=crop",
    productCount: 4,
    subcategories: [
      { slug: "watches", name: "ساعات", icon: "⌚", productCount: 1 },
      { slug: "sunglasses", name: "نظارات شمسية", icon: "🕶️", productCount: 1 },
      { slug: "bags", name: "حقائب", icon: "👜", productCount: 1 },
      { slug: "jewelry", name: "مجوهرات", icon: "💍", productCount: 1 },
    ],
  },
];
