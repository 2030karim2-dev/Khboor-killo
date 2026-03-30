# خطة التطوير الشاملة والنهائية - منصة خبور

## حالة المشروع الحالية

| المقياس | القيمة |
|---------|--------|
| TypeScript Errors | 0 ✅ |
| ESLint Warnings | 0 ✅ |
| صفحات مكتملة | 12/17 |
| مكونات UI | 18 |
| نقاط API | 4 |
| سياقات (Contexts) | 3 (Auth, Cart, Toast) |
| مخططات Zod | 6 |

---

## المرحلة 1: الإصلاحات الحرجة 🔴 (URLException 1-2 يوم)

### 1.1 روابط مكسورة - تصلح فوراً
- [ ] إنشاء صفحة `/wishlist` (الروابط موجودة في Header, MobileMenu, AccountSidebar)
- [ ] إنشاء صفحة `/forgot-password` (الرابط موجود في Login)
- [ ] تحديث `package.json` الاسم من `nextjs-template` إلى `khuboor`

### 1.2 حماية الصفحات المحمية
- [ ] إنشاء `src/middleware.ts` لحماية المسارات
- [ ] إعادة توجيه غير المُسجلين من `/account/*` إلى `/login`
- [ ] إعادة توجيه غير المُسجلين من `/sell` إلى `/login`
- [ ] إعادة توجيه غير المُسجلين من `/checkout` إلى `/login`
- [ ] حفظ المسار المطلوب للعودة بعد تسجيل الدخول

### 1.3 Error Boundaries المتبقية
- [ ] `src/app/global-error.tsx` - حدود أخطاء الجذر
- [ ] `src/app/category/[slug]/error.tsx`
- [ ] `src/app/product/[id]/error.tsx`
- [ ] `src/app/cart/error.tsx`
- [ ] `src/app/checkout/error.tsx`
- [ ] `src/app/account/error.tsx`
- [ ] `src/app/sell/error.tsx`
- [ ] `src/app/search/error.tsx`
- [ ] `src/app/login/error.tsx`

### 1.4 Loading States المتبقية
- [ ] `src/app/loading.tsx` - الصفحة الرئيسية
- [ ] `src/app/account/loading.tsx`
- [ ] `src/app/sell/loading.tsx`
- [ ] `src/app/login/loading.tsx`
- [ ] `src/app/register/loading.tsx`

---

## المرحلة 2: تحسين تجربة المستخدم 🟡 (2-3 أيام)

### 2.1 Dynamic Metadata لجميع الصفحات
- [ ] `category/[slug]` - `generateMetadata()` مع اسم القسم
- [ ] `product/[id]` - `generateMetadata()` مع اسم المنتج والسعر
- [ ] `search` - metadata ديناميكي مع كلمة البحث
- [ ] OpenGraph images ديناميكية
- [ ] Twitter Card metadata

### 2.2 تحسينات إمكانية الوصول (Accessibility)
- [ ] `aria-current="page"` على عناصر التنقل النشطة
- [ ] `role="dialog"` و `aria-modal="true"` على القائمة المحمولة
- [ ] Focus trap في القائمة المحمولة
- [ ] إغلاق القائمة المحمولة بزر Escape
- [ ] تحسين ترتيب Tab في النماذج
- [ ] إضافة رسائل ARIA للحالات (تمت الإضافة، تم الحذف)

### 2.3 توحيد التحقق من النماذج
- [ ] تحويل Checkout إلى `react-hook-form` + `zodResolver`
- [ ] تحويل Sell Form إلى `react-hook-form` + `zodResolver`
- [ ] تحويل Account Profile إلى `react-hook-form` + `zodResolver`
- [ ] إنشاء مكون `SelectField` مشابه لـ `FormField`
- [ ] إنشاء مكون `TextareaField` مشابه لـ `FormField`

### 2.4 تحسين صفحة المنتج
- [ ] استخدام مكون `StarRating` بدلاً من الكود المكرر
- [ ] عرض حالة التوفر بوضوح (متوفر/نفد المخزون)
- [ ] زر مشاركة فعال (Web Share API)
- [ ] معلومات البائع الأساسية
- [ ] عداد "تم الإضافة حديثاً" للسلة

### 2.5 تحسين صفحة القسم
- [ ] ربط فلتر السعر (min/max)
- [ ] ربط فلتر التقييم
- [ ] ربط الترتيب (الأحدث، الأقل سعراً، الأعلى تقييماً)
- [ ] ترقيم الصفحات (Pagination) - 12 منتج في الصفحة
- [ ] حفظ حالة الفلتر في URL query params

---

## المرحلة 3: نظام المفضلة والطلبات 🟡 (2-3 أيام)

### 3.1 نظام المفضلة الكامل
- [ ] إنشاء `src/lib/WishlistContext.tsx`
- [ ] تخزين محلي في localStorage
- [ ] ربط زر القلب في `ProductCard` بالسياق
- [ ] إنشاء صفحة `/wishlist`
- [ ] عداد المفضلة في Header
- [ ] زر "نقل الكل للسلة"

### 3.2 نظام الطلبات
- [ ] إنشاء `src/lib/OrderContext.tsx` أو API routes
- [ ] حفظ الطلبات في localStorage (كـ mock)
- [ ] صفحة `/account/orders` - قائمة الطلبات
- [ ] صفحة `/account/orders/[id]` - تفاصيل الطلب
- [ ] شريط تقدم حالة الطلب (تم الطلب ← قيد التجهيز ← قيد الشحن ← تم التوصيل)
- [ ] ربط Checkout بإنشاء طلب حقيقي

### 3.3 نظام التقييمات
- [ ] إنشاء `src/components/product/ReviewList.tsx`
- [ ] إنشاء `src/components/product/ReviewForm.tsx`
- [ ] عرض توزيع النجوم (5 نجوم: 45%, 4 نجوم: 30%, ...)
- [ ] نموذج إضافة تقييم (مع Zod)
- [ ] أزرار "هل كانت هذه المراجعة مفيدة؟"
- [ ] عرض التقييمات في صفحة المنتج

---

## المرحلة 4: الصفحات المفقودة 🟢 (2-3 أيام)

### 4.1 صفحات الحساب الفرعية
- [ ] `/account/addresses` - دفتر العناوين (إضافة/تعديل/حذف)
- [ ] `/account/settings` - الإعدادات (كلمة المرور، الإشعارات، حذف الحساب)

### 4.2 صفحة نسيت كلمة المرور
- [ ] `/forgot-password` - إدخال البريد الإلكتروني
- [ ] `/reset-password` - إعادة تعيين كلمة المرور (مع token)

### 4.3 الصفحات القانونية والمعلوماتية
- [ ] `/privacy` - سياسة الخصوصية
- [ ] `/terms` - الشروط والأحكام
- [ ] `/about` - من نحن
- [ ] `/contact` - اتصل بنا (نموذج + معلومات التواصل)
- [ ] `/faq` - الأسئلة الشائعة (_accordion UI_)

### 4.4 صفحة البائع الكاملة
- [ ] عرض المنتجات الخاصة بالبائع
- [ ] تعديل المنتج (نموذج معبأ مسبقاً)
- [ ] حذف المنتج (مع تأكيد)
- [ ] إحصائيات حقيقية (من بيانات الطلبات)

---

## المرحلة 5: ميزات متقدمة 🔵 (3-4 أيام)

### 5.1 نظام الإشعارات
- [ ] إنشاء `src/lib/NotificationsContext.tsx`
- [ ] قائمة إشعارات منسدلة في Header (أيقونة 🔔)
- [ ] أنواع: تحديث الطلب، عروض، رسائل
- [ ] عداد إشعارات غير مقروءة
- [ ] زر "تعيين الكل كمقروء"

### 5.2 بحث متقدم
- [ ] إكمال تلقائي أثناء الكتابة (debounced)
- [ ] اقتراحات أقسام ومنتجات
- [ ] تاريخ البحث (محلي)
- [ ] بحث في الوصف وليس الاسم فقط

### 5.3 رفع الصور
- [ ] منطقة سحب وإفلات حقيقية
- [ ] معاينة الصور قبل الرفع
- [ ] رفع متعدد (حتى 5 صور)
- [ ] ضغط الصور تلقائياً (client-side)

### 5.4 SEO و Structured Data
- [ ] JSON-LD للمنتج (اسم، سعر، تقييم، مخزون)
- [ ] JSON-LD لل breadcrumbs
- [ ] JSON-LD للمنظمة
- [ ] `sitemap.xml` ديناميكي
- [ ] `robots.txt`
- [ ] Canonical URLs

---

## المرحلة 6: تحسينات و打磨 🔵 (2-3 أيام)

### 6.1 أنيميشن وانتقالات
- [ ] انتقالات بين الصفحات (View Transitions API)
- [ ] تأثير fly-to-cart عند إضافة منتج
- [ ] أنيميشن عداد السلة
- [ ] أنيميشن فتح/إغلاق القوائم
- [ ] skeleton loading محسّن مع shimmer

### 6.2 تحسينات الموبايل
- [ ] شريط تنقل سفلي (Bottom Navigation Bar)
- [ ] أهداف لمس أكبر (min 44px)
- [ ] تحسين النماذج للمس
- [ ] تحسين Checkout كخطوات متتالية

### 6.3 PWA
- [ ] `manifest.json` مع أيقونة التطبيق
- [ ] Service Worker للعمل بدون إنترنت
- [ ] تثبيت كتطبيق
- [ ] شاشة Splash

### 6.4 أداء
- [ ] تحويل المزيد من الصفحات إلى Server Components
- [ ] ISR لصفحات المنتجات والأقسام
- [ ] Code splitting للمكونات الثقيلة
- [ ] Prefetch للروابط المرئية
- [ ] API caching headers

### 6.5 أخرى
- [ ] إضافة اختبارات Vitest للمكونات الأساسية
- [ ] إضافة اختبارات E2E (Playwright)
- [ ] إعداد CI/CD
- [ ] Error logging (Sentry أو مماثل)
- [ ] Analytics (Vercel Analytics)

---

## هيكل الملفات النهائي المستهدف

```
src/
├── middleware.ts                    # حماية المسارات
├── app/
│   ├── layout.tsx
│   ├── page.tsx
│   ├── loading.tsx                  # ✨ جديد
│   ├── error.tsx
│   ├── global-error.tsx             # ✨ جديد
│   ├── not-found.tsx
│   ├── globals.css
│   ├── wishlist/page.tsx            # ✨ جديد
│   ├── forgot-password/page.tsx     # ✨ جديد
│   ├── reset-password/page.tsx      # ✨ جديد
│   ├── privacy/page.tsx             # ✨ جديد
│   ├── terms/page.tsx               # ✨ جديد
│   ├── about/page.tsx               # ✨ جديد
│   ├── contact/page.tsx             # ✨ جديد
│   ├── faq/page.tsx                 # ✨ جديد
│   ├── account/
│   │   ├── orders/page.tsx          # ✨ جديد
│   │   ├── orders/[id]/page.tsx     # ✨ جديد
│   │   ├── addresses/page.tsx       # ✨ جديد
│   │   ├── settings/page.tsx        # ✨ جديد
│   │   ├── loading.tsx              # ✨ جديد
│   │   └── error.tsx                # ✨ جديد
│   ├── cart/
│   │   └── error.tsx                # ✨ جديد
│   ├── checkout/
│   │   └── error.tsx                # ✨ جديد
│   ├── category/[slug]/
│   │   └── error.tsx                # ✨ جديد
│   ├── product/[id]/
│   │   └── error.tsx                # ✨ جديد
│   ├── search/
│   │   └── error.tsx                # ✨ جديد
│   ├── sell/
│   │   ├── error.tsx                # ✨ جديد
│   │   └── loading.tsx              # ✨ جديد
│   ├── login/
│   │   ├── error.tsx                # ✨ جديد
│   │   └── loading.tsx              # ✨ جديد
│   ├── register/
│   │   └── loading.tsx              # ✨ جديد
│   └── api/
│       ├── auth/                    # ✨ جديد
│       ├── orders/                  # ✨ جديد
│       ├── wishlist/                # ✨ جديد
│       └── reviews/                 # ✨ جديد
├── components/
│   ├── ui/
│   │   ├── SelectField.tsx          # ✨ جديد
│   │   ├── TextareaField.tsx        # ✨ جديد
│   │   ├── Pagination.tsx           # ✨ جديد
│   │   ├── PriceRange.tsx           # ✨ جديد
│   │   ├── Accordion.tsx            # ✨ جديد
│   │   ├── Modal.tsx                # ✨ جديد
│   │   ├── NotificationBell.tsx     # ✨ جديد
│   │   ├── ImageUpload.tsx          # ✨ جديد
│   │   └── RatingBar.tsx            # ✨ جديد
│   ├── product/
│   │   ├── ReviewList.tsx           # ✨ جديد
│   │   ├── ReviewForm.tsx           # ✨ جديد
│   │   ├── ImageGallery.tsx         # ✨ جديد
│   │   ├── ProductTabs.tsx          # ✨ جديد
│   │   └── ShareButton.tsx          # ✨ جديد
│   ├── wishlist/
│   │   └── WishlistItem.tsx         # ✨ جديد
│   ├── orders/
│   │   ├── OrderCard.tsx            # ✨ جديد
│   │   └── OrderStatusTracker.tsx   # ✨ جديد
│   ├── account/
│   │   ├── AddressCard.tsx          # ✨ جديد
│   │   └── AddressForm.tsx          # ✨ جديد
│   ├── checkout/
│   │   └── CheckoutSteps.tsx        # ✨ جديد
│   ├── faq/
│   │   └── FaqAccordion.tsx         # ✨ جديد
│   └── layout/
│       ├── BottomNav.tsx            # ✨ جديد
│       └── NotificationDropdown.tsx # ✨ جديد
├── lib/
│   ├── WishlistContext.tsx           # ✨ جديد
│   ├── OrderContext.tsx              # ✨ جديد
│   ├── NotificationsContext.tsx      # ✨ جديد
│   └── search.ts                    # ✨ جديد (fuzzy search)
└── public/
    ├── manifest.json                # ✨ جديد
    ├── robots.txt                    # ✨ جديد
    └── icons/                        # ✨ جديد (PWA icons)
```

---

## ملخص المهام

| المرحلة | المهام | الأيام المقدرة |
|---------|--------|---------------|
| 1 - إصلاحات حرجة | 20 مهمة | 1-2 يوم |
| 2 - تجربة مستخدم | 22 مهمة | 2-3 أيام |
| 3 - مفضلة وطلبات | 15 مهمة | 2-3 أيام |
| 4 - صفحات مفقودة | 16 مهمة | 2-3 أيام |
| 5 - ميزات متقدمة | 18 مهمة | 3-4 أيام |
| 6 - تحسينات | 20 مهمة | 2-3 أيام |
| **المجموع** | **111 مهمة** | **12-18 يوم** |
