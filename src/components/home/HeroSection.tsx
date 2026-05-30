import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Store, Shield, Truck, Sparkles, TrendingUp, Heart } from "lucide-react";

const heroImages = [
  { src: "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=800&h=600&fit=crop&q=80", alt: "سيارات فاخرة", className: "aspect-square" },
  { src: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&h=450&fit=crop&q=80", alt: "ملابس عصرية", className: "aspect-[4/3]" },
  { src: "https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=800&h=450&fit=crop&q=80", alt: "قطع غيار", className: "aspect-[4/3]" },
  { src: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&h=600&fit=crop&q=80", alt: "إكسسوارات", className: "aspect-square" },
];

const features = [
  { icon: Shield, label: "موثوق ومضمون", variant: "primary" },
  { icon: Store, label: "+10,000 منتج", variant: "secondary" },
  { icon: Truck, label: "توصيل سريع", variant: "accent" },
  { icon: Sparkles, label: "عروض يومية", variant: "primary" },
  { icon: TrendingUp, label: "أسعار تنافسية", variant: "secondary" },
  { icon: Heart, label: "دعم 24/7", variant: "accent" },
];

export default function HeroSection() {
  return (
    <section className="gradient-hero-enhanced relative overflow-hidden">
      {/* Animated mesh gradient background */}
      <div className="absolute inset-0 gradient-mesh-enhanced opacity-70" />
      
      {/* Floating orbs with enhanced effects */}
      <div className="absolute top-16 right-12 w-80 h-80 bg-sky-500/25 rounded-full blur-[120px] animate-float-slow" />
      <div className="absolute bottom-16 left-12 w-104 h-104 bg-orange-500/20 rounded-full blur-[140px] animate-float-slow animation-delay-500" />
      <div className="absolute top-1/3 left-1/3 -translate-x-1/3 -translate-y-1/3 w-[700px] h-[700px] bg-sky-400/12 rounded-full blur-[180px]" />
      <div className="absolute top-1/4 right-1/4 w-[400px] h-[400px] bg-purple-500/8 rounded-full blur-[200px] animate-pulse-slow" />
      
      {/* Subtle animated particles */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-4 h-4 bg-sky-400/50 rounded-full animate-pulse-slow animation-delay-100" />
        <div className="absolute bottom-30 right-20 w-3 h-3 bg-orange-400/50 rounded-full animate-pulse-slow animation-delay-300" />
        <div className="absolute top-1/2 left-1/2 w-2 h-2 bg-emerald-400/50 rounded-full animate-pulse-slow animation-delay-500" />
      </div>
      
      <div className="max-w-5xl mx-auto px-4 py-12 md:py-16 relative z-10">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Text Content */}
          <div className="text-center lg:text-right animate-fade-in-up">
            {/* Enhanced Badge */}
            <div className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-sm border border-white/20 px-4 py-2 rounded-full mb-6">
              <span className="w-2.5 h-2.5 bg-green-400 rounded-full animate-pulse" />
              <span className="text-slate-200 text-base font-medium">
                أكثر من 10,000 عميل سعيد
              </span>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-tight mb-5">
              كل ما تحتاجه
              <br />
              <span className="text-gradient-enhanced bg-gradient-to-r from-sky-400 via-white to-orange-400 bg-clip-text text-transparent">
                في مكان واحد
              </span>
            </h1>
            
            <p className="text-slate-300 text-sm md:text-base mb-8 max-w-xl mx-auto lg:mx-0 leading-relaxed">
              خبور يوفر لك تجربة تسوق استثنائية مع آلاف المنتجات المُختارة بعناية، من سيارات وقطع غيار إلى ملابس ومواد بناء وإكسسوارات - كل ما تحتاجه في مكان واحد موثوق وآمن.
            </p>
            
            {/* Enhanced Feature pills with variants */}
            <div className="flex flex-wrap justify-center lg:justify-start gap-3 mb-6">
              {features.map((feature, i) => (
                <div 
                  key={feature.label}
                  className={`flex items-center gap-3 bg-white/8 backdrop-blur-sm border border-white/12 px-4 py-2.5 rounded-xl hover:bg-white/12 transition-all duration-300 feature-item-${feature.variant}`}
                  style={{ animationDelay: `${i * 120}ms` }}
                >
                  <feature.icon size={18} className={`text-sky-400 feature-${feature.variant}`} />
                  <span className="text-slate-200 text-base font-medium">{feature.label}</span>
                </div>
              ))}
            </div>
            
            {/* Enhanced CTA Buttons */}
            <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
              <Link
                href="/search"
                className="btn-primary-enhanced text-sm px-6 py-3 shadow-lg hover:shadow-xl transform transition-all duration-300"
              >
                تصفح المنتجات
                <ArrowLeft size={20} />
              </Link>
              <Link
                href="/sell"
                className="btn-outline-enhanced border-white/20 text-white hover:bg-white/12 hover:text-slate-900 text-sm px-6 py-3"
              >
                ابدأ البيع الآن
              </Link>
            </div>
          </div>
          
          {/* Enhanced Image Grid with parallax effect */}
          <div className="hidden lg:grid grid-cols-2 gap-5 animate-fade-in-right">
            <div className="space-y-4">
              {[heroImages[0], heroImages[1]].map((img, i) => (
                <div 
                  key={img.alt} 
                  className={`relative rounded-3xl overflow-hidden shadow-2xl hover:scale-[1.03] transition-all duration-500 parallax-item ${img.className}`}
                >
                  <Image
                    src={img.src}
                    alt={img.alt}
                    fill
                    sizes="(max-width: 1024px) 50vw, 400px"
                    className="object-cover hover:scale-105 transition-transform duration-800"
                    loading={i === 0 ? "eager" : "lazy"}
                    priority={i === 0}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/25 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-400" />
                  <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_top_left,_transparent_0%,_rgba(255,255,255,0.03)_50%,_transparent_100%)] opacity-0 hover:opacity-100 transition-opacity duration-500" />
                </div>
              ))}
            </div>
            <div className="space-y-4 pt-8">
              {[heroImages[2], heroImages[3]].map((img, i) => (
                <div 
                  key={img.alt} 
                  className={`relative rounded-3xl overflow-hidden shadow-2xl hover:scale-[1.03] transition-all duration-500 parallax-item ${img.className}`}
                >
                  <Image
                    src={img.src}
                    alt={img.alt}
                    fill
                    sizes="(max-width: 1024px) 50vw, 400px"
                    className="object-cover hover:scale-105 transition-transform duration-800"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/25 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-400" />
                  <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_top_left,_transparent_0%,_rgba(255,255,255,0.03)_50%,_transparent_100%)] opacity-0 hover:opacity-100 transition-opacity duration-500" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      {/* Enhanced Bottom wave decoration */}
      <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white dark:from-slate-900/90 to-transparent" />
      
      {/* Decorative floating elements */}
      <div className="absolute top-1/4 right-1/10 w-16 h-16 bg-sky-500/20 rounded-full rotate-45 animate-float-slow" />
      <div className="absolute bottom-1/4 left-1/10 w-20 h-20 bg-orange-500/15 rounded-full rotate-30 animate-float-slow animation-delay-300" />
    </section>
  );
}
