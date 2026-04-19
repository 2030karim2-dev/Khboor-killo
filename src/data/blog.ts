export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  image: string;
  category: string;
  tags: string[];
  publishedAt: string;
  readTime: number;
  featured?: boolean;
}

export interface BlogCategory {
  slug: string;
  name: string;
  icon: string;
  postCount: number;
}

export const blogCategories: BlogCategory[] = [
  { slug: "news", name: "أخبار", icon: "📰", postCount: 3 },
  { slug: "tips", name: "نصائح", icon: "💡", postCount: 4 },
  { slug: "guides", name: "أدلة", icon: "📖", postCount: 2 },
  { slug: "offers", name: "عروض", icon: "🎁", postCount: 1 },
];

export const blogPosts: BlogPost[] = [
  {
    id: "1",
    title: "كيف تختار قطع الغيار المناسبة لسيارتك؟",
    excerpt: "دليل شامل لاختيار قطع الغيار الأصلية لسيارتك",
    content: `
## مقدمة
اختيار قطع الغيار المناسبة لسيارتك أمر حيوي لسلامتك وسلامة مركبتك. في هذا الدليل، سنشارك معك أهم النصائح لاختيار القطع الأصلية.

## لماذا جودة قطع الغيار مهمة؟
- تؤثر على أداء محركك
- تضمن سلامتك أثناء القيادة
- توفرتك المال على المدى الطويل

## نصائح للاختيار
1. **تحقق من رقم القطعة**: تأكد من تطابق رقم القطعة مع المواصفات
2. **شراء من مصادر موثوقة**: اشترِ من موزعين معتمدين
3. **فحص الضمانة**: تأكد من وجود ضمانة على القطعة
    `,
    author: "فريق خبور",
    image: "https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=800&h=400&fit=crop",
    category: "tips",
    tags: ["قطع الغيار", "صيانة", "سيارات"],
    publishedAt: "2025-04-15",
    readTime: 5,
    featured: true,
  },
  {
    id: "2",
    title: "أفضل النصائح للقيادة الآمنة",
    excerpt: "نصائح مهمة للقيادة الآمنة على الطرق",
    content: `
## أهمية القيادة الآمنة
القيادة الآمنة مسؤولية كل سائق. اتبع هذه النصائح للقيادة بأمان.

## نصائح أساسية
- لا تتجاوز السرعة المحددة
- حافظ على مسافة آمنة
- تجنبdistracted القيادة
    `,
    author: "فريق خبور",
    image: "https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=800&h=400&fit=crop",
    category: "guides",
    tags: ["قيادة", "أمان", "نصائح"],
    publishedAt: "2025-04-10",
    readTime: 3,
  },
  {
    id: "3",
    title: "خصم 20% على جميع إطارات Michelin",
    excerpt: "عرض خاص على إطارات Michelin لجميع المقاسات",
    content: `
## العرض الجديد
نقدم لك خصم 20% على جميع إطارات Michelin لفترة محدودة!

## التفاصيل
- الخصم: 20%
- المدة: حتى نهاية الشهر
- الشحن: مجاني
    `,
    author: "فريق خبور",
    image: "https://images.unsplash.com/photo-1569391572574-0f8d2cbe5d72?w=800&h=400&fit=crop",
    category: "offers",
    tags: ["عروض", "إطارات", "Michelin"],
    publishedAt: "2025-04-18",
    readTime: 2,
    featured: true,
  },
  {
    id: "4",
    title: "كيف تحافظ على سيارتك في الصيف؟",
    excerpt: "نصائح للعناية بالسيارة في الطقس الحار",
    content: `
## تحديات الصيف
الحرارة الشديدة تؤثر على سيارتك. إليك نصائح للعناية بها.

## نصائح العناية
- افحص نظام التبريد بانتظام
- حافظ على ضغط الإطارات
- نظف السيارة بانتظام
    `,
    author: "فريق خبور",
    image: "https://images.unsplash.com/photo-1492144531236-3c72f0e0118d?w=800&h=400&fit=crop",
    category: "tips",
    tags: ["صيانة", "صيف", "سيارات"],
    publishedAt: "2025-04-08",
    readTime: 4,
  },
  {
    id: "5",
    title: "خطوات بسيطة لتحسين اقتصاد الوقود",
    excerpt: "وفر المال باتباع هذه النصائح البسيطة",
    content: `
## نصائح لتوفير الوقود
1. تجنب التسارع المفاجئ
2. حافظ على سرعة ثابتة
3. أزل الوزن الزائد من السيارة
    `,
    author: "فريق خبور",
    image: "https://images.unsplash.com/photo-1530046339160-ce3e8f73980e?w=800&h=400&fit=crop",
    category: "tips",
    tags: ["وقود", "توفير", "نصائح"],
    publishedAt: "2025-04-05",
    readTime: 3,
  },
];

export function getBlogPostById(id: string): BlogPost | undefined {
  return blogPosts.find((post) => post.id === id);
}

export function getBlogPostsByCategory(category: string): BlogPost[] {
  return blogPosts.filter((post) => post.category === category);
}

export function getFeaturedPosts(): BlogPost[] {
  return blogPosts.filter((post) => post.featured);
}

export function searchBlogPosts(query: string): BlogPost[] {
  const lowerQuery = query.toLowerCase();
  return blogPosts.filter(
    (post) =>
      post.title.toLowerCase().includes(lowerQuery) ||
      post.excerpt.toLowerCase().includes(lowerQuery) ||
      post.tags.some((tag) => tag.toLowerCase().includes(lowerQuery))
  );
}