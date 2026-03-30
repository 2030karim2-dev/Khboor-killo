import Link from "next/link";
import Image from "next/image";
import { ArrowLeft } from "lucide-react";

const heroImages = [
  { src: "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=400&h=400&fit=crop", alt: "سيارات", className: "aspect-square" },
  { src: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&h=300&fit=crop", alt: "ملابس", className: "aspect-[4/3]" },
  { src: "https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=400&h=300&fit=crop", alt: "قطع غيار", className: "aspect-[4/3]" },
  { src: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop", alt: "إكسسوارات", className: "aspect-square" },
];

export default function HeroSection() {
  return (
    <section className="gradient-hero relative overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 right-10 w-72 h-72 bg-sky-400 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-10 left-10 w-96 h-96 bg-orange-400 rounded-full blur-3xl animate-float" />
      </div>
      <div className="max-w-7xl mx-auto px-4 py-16 md:py-24 relative z-10">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div className="text-center md:text-right animate-slide-up">
            <span className="inline-block bg-sky-500/20 text-sky-300 px-4 py-1 rounded-full text-sm mb-4 font-medium">
              منصة موثوقة +10 آلاف مستخدم
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-tight mb-4">
              كل ما تحتاجه
              <br />
              <span className="text-gradient bg-gradient-to-r from-sky-400 to-orange-400 bg-clip-text text-transparent">
                في مكان واحد
              </span>
            </h1>
            <p className="text-slate-300 text-lg mb-8 max-w-lg mx-auto md:mx-0">
              خبور يوفر لك تجربة تسوق فريدة مع آلاف المنتجات من سيارات وقطع
              غيار وملابس ومواد بناء وإكسسوارات.
            </p>
            <div className="flex flex-wrap gap-3 justify-center md:justify-start">
              <Link
                href="/category/cars"
                className="btn-secondary text-base px-6 py-3"
              >
                تصفح المنتجات
                <ArrowLeft size={18} />
              </Link>
              <Link
                href="/sell"
                className="btn-outline border-white/30 text-white hover:bg-white hover:text-slate-900 text-base px-6 py-3"
              >
                ابدأ البيع الآن
              </Link>
            </div>
          </div>
          <div className="hidden md:grid grid-cols-2 gap-3 animate-slide-in-right">
            <div className="space-y-3">
              {[heroImages[0], heroImages[1]].map((img) => (
                <div key={img.alt} className={`rounded-2xl overflow-hidden ${img.className}`}>
                  <Image
                    src={img.src}
                    alt={img.alt}
                    width={400}
                    height={400}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  />
                </div>
              ))}
            </div>
            <div className="space-y-3 pt-6">
              {[heroImages[2], heroImages[3]].map((img) => (
                <div key={img.alt} className={`rounded-2xl overflow-hidden ${img.className}`}>
                  <Image
                    src={img.src}
                    alt={img.alt}
                    width={400}
                    height={400}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
