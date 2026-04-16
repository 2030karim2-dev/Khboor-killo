import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Store, Shield, Truck } from "lucide-react";

const heroImages = [
  { src: "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=600&h=600&fit=crop", alt: "سيارات فاخرة", className: "aspect-square" },
  { src: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=600&h=450&fit=crop", alt: "ملابس عصرية", className: "aspect-[4/3]" },
  { src: "https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=600&h=450&fit=crop", alt: "قطع غيار", className: "aspect-[4/3]" },
  { src: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&h=600&fit=crop", alt: "إكسسوارات", className: "aspect-square" },
];

const features = [
  { icon: Shield, label: "موثوق ومضمون" },
  { icon: Store, label: "+10,000 منتج" },
  { icon: Truck, label: "توصيل سريع" },
];

export default function HeroSection() {
  return (
    <section className="gradient-hero relative overflow-hidden">
      {/* Animated mesh gradient background */}
      <div className="absolute inset-0 gradient-mesh opacity-60" />
      
      {/* Floating orbs */}
      <div className="absolute top-20 right-10 w-72 h-72 bg-sky-500/20 rounded-full blur-[100px] animate-float" />
      <div className="absolute bottom-20 left-10 w-96 h-96 bg-orange-500/15 rounded-full blur-[120px] animate-float animation-delay-200" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-sky-400/10 rounded-full blur-[150px]" />
      
      <div className="max-w-7xl mx-auto px-4 py-16 md:py-20 relative z-10">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Text Content */}
          <div className="text-center lg:text-right animate-slide-up">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 px-4 py-2 rounded-full mb-6">
              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              <span className="text-slate-200 text-sm font-medium">
                أكثر من 10,000 عميل سعيد
              </span>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-tight mb-4">
              كل ما تحتاجه
              <br />
              <span className="text-gradient bg-gradient-to-r from-sky-400 via-white to-orange-400 bg-clip-text text-transparent">
                في مكان واحد
              </span>
            </h1>
            
            <p className="text-slate-300 text-lg md:text-xl mb-8 max-w-lg mx-auto lg:mx-0 leading-relaxed">
              خبور يوفر لك تجربة تسوق استثنائية مع آلاف المنتجات，各类汽车配件、服装、建材和配饰一站式购物。
            </p>
            
            {/* Feature pills */}
            <div className="flex flex-wrap justify-center lg:justify-start gap-3 mb-8">
              {features.map((feature, i) => (
                <div 
                  key={feature.label}
                  className="flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/10 px-4 py-2 rounded-full"
                  style={{ animationDelay: `${i * 100}ms` }}
                >
                  <feature.icon size={18} className="text-sky-400" />
                  <span className="text-slate-200 text-sm font-medium">{feature.label}</span>
                </div>
              ))}
            </div>
            
            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
              <Link
                href="/search"
                className="btn-secondary text-base px-8 py-3.5 shadow-lg hover:shadow-xl"
              >
                تصفح المنتجات
                <ArrowLeft size={20} />
              </Link>
              <Link
                href="/sell"
                className="btn-outline border-white/30 text-white hover:bg-white hover:text-slate-900 text-base px-8 py-3.5"
              >
                ابدأ البيع الآن
              </Link>
            </div>
          </div>
          
          {/* Image Grid */}
          <div className="hidden lg:grid grid-cols-2 gap-4 animate-slide-in-right">
            <div className="space-y-4">
              {[heroImages[0], heroImages[1]].map((img, i) => (
                <div 
                  key={img.alt} 
                  className={`relative rounded-2xl overflow-hidden shadow-2xl hover:scale-[1.02] transition-transform duration-500 ${img.className}`}
                >
                  <Image
                    src={img.src}
                    alt={img.alt}
                    fill
                    sizes="(max-width: 1024px) 50vw, 400px"
                    className="object-cover hover:scale-110 transition-transform duration-700"
                    loading={i === 0 ? "eager" : "lazy"}
                    priority={i === 0}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300" />
                </div>
              ))}
            </div>
            <div className="space-y-4 pt-8">
              {[heroImages[2], heroImages[3]].map((img, i) => (
                <div 
                  key={img.alt} 
                  className={`relative rounded-2xl overflow-hidden shadow-2xl hover:scale-[1.02] transition-transform duration-500 ${img.className}`}
                >
                  <Image
                    src={img.src}
                    alt={img.alt}
                    fill
                    sizes="(max-width: 1024px) 50vw, 400px"
                    className="object-cover hover:scale-110 transition-transform duration-700"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      {/* Bottom wave decoration */}
      <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white dark:from-slate-900 to-transparent" />
    </section>
  );
}
