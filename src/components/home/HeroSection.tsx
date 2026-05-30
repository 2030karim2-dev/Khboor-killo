import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Store, Shield, Truck, Sparkles, TrendingUp, Heart } from "lucide-react";

export default function HeroSection() {
  return (
    <section className="relative bg-gradient-to-b from-slate-50 dark:from-slate-900 to-slate-100 dark:to-slate-900 overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 left-0 w-full h-[300px] bg-gradient-to-r from-slate-100 dark:from-slate-900 to-slate-50 dark:to-slate-600 opacity-50" />
        <div className="absolute bottom-0 left-0 w-full h-[200px] bg-gradient-to-t from-slate-100 dark:from-slate-900 to-slate-50 dark:to-slate-600 opacity-30" />
      </div>
      
      {/* Subtle pattern overlay */}
      <div className="absolute inset-0 -z-10 bg-[url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" viewBox="0 0 60 60"><path d="M30 0 L0 30 L30 60 L60 30 Z" fill="%23e2e8f0" fill-opacity="0.05" /></svg>')] />
      
      <div className="relative z-10">
        <div className="max-w-6xl mx-auto px-6 py-16 lg:py-24">
          <div className="grid lg:grid-cols-2 gap-12 items-start lg:items-center">
            {/* Text Content */}
            <div className="space-y-8">
              {/* Subtle badge/badge-like element */}
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 bg-slate-500 dark:bg-slate-400 rounded-full animate-pulse" />
                <span className="text-sm font-medium text-slate-600 dark:text-slate-300">
                  منصة التسوق الرائدة في اليمن
                </span>
              </div>
              
              {/* Main headline */}
              <h1 className="text-4xl lg:text-5xl font-bold text-slate-900 dark:text-slate-50 leading-tight tracking-tighter">
                كل ما تحتاجه<br />
                <span className="block bg-gradient-to-r from-slate-900 dark:from-slate-50 via-slate-500 dark:via-slate-400 to-slate-900 dark:to-slate-50 bg-clip-text text-transparent">
                  في مكان واحد
                </span>
              </h1>
              
              {/* Description */}
              <p className="text-lg lg:text-xl text-slate-600 dark:text-slate-300 leading-relaxed max-w-2xl">
                اكتشف تجربة تسوق لا مثيل لها مع آلاف المنتجات المختارة بعناية - من السيارات وقطع الغيار إلى الملابس والإكسسوارات، كل ما تحتاجه بجودة مضمونة وأسعار تنافسية.
              </p>
              
              {/* Features highlight */}
              <div className="mt-10 space-y-6">
                <div className="flex items-center gap-4">
                  <Shield className="w-5 h-5 text-slate-500 dark:text-slate-400 flex-shrink-0" />
                  <div>
                    <h3 className="font-medium text-slate-800 dark:text-slate-100">تسوق آمن ومضمون</h3>
                    <p className="text-sm text-slate-500 dark:text-slate-400">
                      حماية كاملة للمشتري والبائع مع ضمان جودة جميع المنتجات
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <Truck className="w-5 h-5 text-slate-500 dark:text-slate-400 flex-shrink-0" />
                  <div>
                    <h3 className="font-medium text-slate-800 dark:text-slate-100">توصيل سريع وموثوق</h3>
                    <p className="text-sm text-slate-500 dark:text-slate-400">
                      شحن سريع إلى جميع المحافظات مع تتبع دقيق للطلبية
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <Heart className="w-5 h-5 text-slate-500 dark:text-slate-400 flex-shrink-0" />
                  <div>
                    <h3 className="font-medium text-slate-800 dark:text-slate-100">دعم عملاء استثنائي</h3>
                    <p className="text-sm text-slate-500 dark:text-slate-400">
                      فريق دعم متخصص جاهز للمساعدة على مدار الساعة
                    </p>
                  </div>
                </div>
              </div>
              
              {/* Call to action buttons */}
              <div className="mt-12 flex flex-wrap gap-6 justify-start">
                <Link
                  href="/search"
                  className="inline-flex items-center px-8 py-4 bg-slate-900 dark:bg-slate-50 text-slate-50 dark:text-slate-900 font-medium rounded-xl hover:bg-slate-800 dark:hover:bg-slate-100 transition-all duration-300 transform hover:-translate-y-1 shadow-lg hover:shadow-xl"
                >
                  استكشف الفئات
                  <ArrowLeft className="ml-3 h-4 w-4" />
                </Link>
                <Link
                  href="/sell"
                  className="inline-flex items-center px-8 py-4 border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 font-medium rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800/20 transition-all duration-300 transform hover:-translate-y-1"
                >
                  ابدأ البيع الآن
                </Link>
              </div>
            </div>
            
            {/* Image Content */}
            <div className="relative lg:flex lg:items-center lg:justify-center">
              <div className="relative h-[400px] lg:h-[500px] w-full rounded-2xl overflow-hidden shadow-2xl ring-1 ring-slate-200 dark:ring-slate-700/50">
                {/* Image carousel simulation */}
                <div className="absolute inset-0">
                  <Image
                    src="https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=1200&h=800&fit=crop&q=80"
                    alt="سيارات فاخرة ومعروضات متنوعة"
                    fill
                    className="object-cover object-center"
                    priority
                  />
                  {/* Gradient overlay for depth */}
                  <div className="absolute inset-0 bg-gradient-to-t from-transparent to-slate-50 dark:from-transparent dark:to-slate-900/50" />
                  {/* Subtle vignette */}
                  <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,var(--tw-gradient-stops))] from-via-transparent to-slate-900/10 dark:from-via-transparent dark:to-slate-50/20" />
                </div>
                
                {/* Interactive product tags */}
                <div className="absolute bottom-6 left-6 flex space-x-3">
                  <div className="flex items-center gap-2 px-3 py-1.5 bg-white dark:bg-slate-800/80 backdrop-blur rounded-xl text-sm font-medium text-slate-800 dark:text-slate-100 ring-1 ring-slate-200 dark:ring-slate-600/30">
                    <Store className="h-4 w-4 text-slate-500 dark:text-slate-400" />
                    <span>سيارات فاخرة</span>
                  </div>
                  <div className="flex items-center gap-2 px-3 py-1.5 bg-white dark:bg-slate-800/80 backdrop-blur rounded-xl text-sm font-medium text-slate-800 dark:text-slate-100 ring-1 ring-slate-200 dark:ring-slate-600/30">
                    <Sparkles className="h-4 w-4 text-slate-500 dark:text-slate-400" />
                    <span>عروض خاصة</span>
                  </div>
                </div>
                
                {/* Quality badge */}
                <div className="absolute top-4 right-4 flex items-center gap-2 px-3 py-1.5 bg-slate-900 dark:bg-slate-50 text-slate-50 dark:text-slate-900 text-sm font-medium rounded-xl ring-1 ring-slate-200 dark:ring-slate-700/20">
                  <Shield className="h-4 w-4 text-slate-400 dark:text-slate-500" />
                  <span>جودة مضمونة</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Bottom decorative element */}
      <div className="absolute bottom-0 left-0 right-0 h-[80px] pointer-events-none">
        <div className="absolute inset-x-0 bottom-0 h-[40px] bg-gradient-to-t from-slate-50 dark:from-slate-900 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-[20px] bg-gradient-to-t from-slate-100 dark:from-slate-900 to-transparent/50" />
      </div>
    </section>
  );
}
