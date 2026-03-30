# خطة التطوير الشاملة - منصة خبور

## نظرة عامة على المراحل

| المرحلة | التركيز | الأولوية | المهام |
|---------|---------|----------|--------|
| 1 | الأساسيات | حرجة | مصادقة، تخزين سلة، إشعارات، تحقق نماذج |
| 2 | تجربة المستخدم الأساسية | حرجة | loading، error، accessibility، metadata |
| 3 | إكمال الميزات | عالية | مفضلة، تقييمات، تتبع طلبات، فلاتر |
| 4 | الصفحات المفقودة | متوسطة | طلباتي، عناوين، نسيت كلمة المرور، قانونية |
| 5 | ميزات متقدمة | متوسطة | إشعارات، بائع CRUD، رفع صور |
| 6 | تحسينات | متوسطة | أنيميشن، PWA، SEO، أداء، موبايل |

---

## المرحلة 1: الأساسيات الحرجة

### 1.1 نظام المصادقة (AuthContext)
- إنشاء `src/lib/AuthContext.tsx`
- حالة المستخدم (مُسجل، غير مُسجل)
- دوال: `login()`, `register()`, `logout()`, `getSession()`
- حماية الصفحات المحمية (`/account`, `/sell`, `/checkout`)
- إعادة توجيه بعد تسجيل الدخول
- ربط نماذج Login/Register بالسياق

### 1.2 تخزين السلة (localStorage)
- تحديث `CartContext.tsx` لاستخدام `localStorage`
- تحميل السلة عند بدء التطبيق
- دمج السلة عند تسجيل الدخول
- إضافة `useMemo` لـ `totalItems` و `totalPrice`

### 1.3 نظام Toast/Notifications
- إنشاء `src/components/ui/Toast.tsx`
- إنشاء `src/lib/ToastContext.tsx`
- أنواع: success, error, warning, info
- تأكيدات: إضافة للسلة، حذف، إتمام طلب
- مدة ظهور تلقائية مع إمكانية الإغلاق

### 1.4 ربط التحقق من النماذج
- تثبيت `@hookform/resolvers` و `react-hook-form`
- ربط Zod schemas بالنماذج
- عرض رسائل الأخطاء تحت الحقول
- التحقق في: Login, Register, Checkout, Sell, Account

### 1.5 Next.js Config كامل
- إعداد `images.remotePatterns` لـ Unsplash/icons8
- إعداد `redirects` للروابط القديمة

---

## المرحلة 2: تجربة المستخدم الأساسية

### 2.1 Loading States (8 صفحات)
- `product/[id]/loading.tsx` - هيكل تفاصيل المنتج
- `cart/loading.tsx`
- `checkout/loading.tsx`
- `account/loading.tsx`
- `sell/loading.tsx`
- `login/loading.tsx`
- `register/loading.tsx`
- `page.tsx` (home) loading

### 2.2 Error Boundaries (8 صفحات)
- `category/[slug]/error.tsx`
- `product/[id]/error.tsx`
- `cart/error.tsx`
- `checkout/error.tsx`
- `account/error.tsx`
- `sell/error.tsx`
- `search/error.tsx`
- `login/error.tsx`

### 2.3 Accessibility (شامل)
- إضافة `aria-label` لجميع الأزرار النصية
- إضافة `aria-expanded` للقوائم المنسدلة
- إضافة `aria-current` للعناصر النشطة
- إضافة `role` و `aria-modal` للقائمة المحمولة
- إضافة `skip-to-content` link
- إخفاء الأيقونات الزخرفية بـ `aria-hidden`
- ربط `htmlFor`/`id` في النماذج
- إصلاح اتجاه الفاصل في Breadcrumb لـ RTL
- إضافة `fieldset`/`legend` لمجموعات الراديو

### 2.4 Dynamic Metadata
- `category/[slug]` - `generateMetadata()`
- `product/[id]` - `generateMetadata()`
- `search` - metadata ديناميكي
- إصلاح الكلمات المفتاحية (إزالة الصيني)
- OpenGraph و Twitter Cards

### 2.5 Server Components
- تحويل `page.tsx` (home) إلى Server Component
- تحويل `search/page.tsx` مع client island
- تحويل `product/[id]` مع client islands

---

## المرحلة 3: إكمال الميزات

### 3.1 نظام المفضلة (Wishlist)
- إنشاء `WishlistContext.tsx`
- ربط زر القلب في ProductCard
- إنشاء صفحة `/wishlist`
- إضافة رابط في Header (للمستخدمين المُسجلين)
- تخزين محلي + مزامنة مع الحساب

### 3.2 نظام التقييمات
- إنشاء `src/components/product/ReviewList.tsx`
- إنشاء `src/components/product/ReviewForm.tsx`
- عرض التقييمات في صفحة المنتج
- نموذج إضافة تقييم (مع Zod validation)
- عرض توزيع النجوم

### 3.3 تصفية وترتيب المنتجات
- ربط زر الفلترة في صفحة القسم
- ربط dropdown الترتيب
- ربط toggle عرض الشبكة/القائمة
- فلترة حسب: السعر، التقييم، التوفر
- ترقيم الصفحات (Pagination)

### 3.4 بحث متقدم
- إكمال تلقائي (Autocomplete)
- اقتراحات أثناء الكتابة
- تاريخ البحث
- بحث ضبابي (Fuzzy search)

### 3.5 تحسين صفحة المنتج
- معرض صور (Image gallery)
- معلومات البائع
- حالة التوفر
- منتجات مشابهة محسّنة
- زر مشاركة فعال

---

## المرحلة 4: الصفحات المفقودة

### 4.1 صفحات الطلبات
- `/account/orders` - قائمة الطلبات
- `/account/orders/[id]` - تفاصيل الطلب + التتبع

### 4.2 صفحات الحساب
- `/account/addresses` - دفتر العناوين
- `/account/settings` - الإعدادات

### 4.3 صفحات المصادقة
- `/forgot-password` - نسيت كلمة المرور
- `/reset-password` - إعادة تعيين

### 4.4 الصفحات القانونية
- `/privacy` - سياسة الخصوصية
- `/terms` - الشروط والأحكام
- `/about` - من نحن
- `/contact` - اتصل بنا
- `/faq` - الأسئلة الشائعة

### 4.5 صفحة المفضلة
- `/wishlist` - قائمة المنتجات المفضلة

---

## المرحلة 5: ميزات متقدمة

### 5.1 نظام الإشعارات
- قائمة إشعارات في Header
- إشعارات: تحديث حالة الطلب، عروض جديدة، رسائل
- عداد إشعارات غير مقروءة

### 5.2 لوحة البائع المكتملة
- إضافة منتج حقيقي (مع API)
- تعديل المنتجات
- حذف المنتجات
- إحصائيات حقيقية
- إدارة الطلبات الواردة

### 5.3 رفع الصور
- منطقة سحب وإفلات حقيقية
- معاينة الصور
- رفع متعدد
- ضغط الصور

### 5.4 نظام الطلبات الكامل
- إنشاء طلب حقيقي
- حفظ الطلبات
- تتبع حالة الطلب
- تاريخ الطلبات

---

## المرحلة 6: تحسينات و打磨

### 6.1 أنيميشن وانتقالات
- انتقالات بين الصفحات
- تأثير fly-to-cart عند الإضافة
- أنيميشن القائمة المنسدلة
- skeleton loading محسّن

### 6.2 تحسينات الموبايل
- شريط تنقل سفلي (Bottom nav)
- PWA manifest
- Service worker
- أهداف لمس أكبر (44px minimum)

### 6.3 SEO
- JSON-LD structured data
- sitemap.xml
- robots.txt
- Canonical URLs
- Breadcrumb structured data

### 6.4 أداء
- ISR لصفحات المنتجات
- Image optimization config
- API caching headers
- Code splitting
- useMemo للمحاسبات المكلفة

### 6.5 أخرى
- إصلاح سنة Copyright ديناميكية
- حذف data.ts القديم
- إضافة tests
- Error logging (Sentry)
