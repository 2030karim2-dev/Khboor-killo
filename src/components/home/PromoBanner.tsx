import Link from "next/link";

export default function PromoBanner() {
  return (
    <section className="max-w-7xl mx-auto px-4 py-12">
      <div className="gradient-primary rounded-2xl p-8 md:p-12 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-64 h-64 bg-white/10 rounded-full -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-48 h-48 bg-white/10 rounded-full translate-x-1/3 translate-y-1/3" />
        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h2 className="text-2xl md:text-3xl font-extrabold text-white mb-2">
              عروض حصرية بانتظارك!
            </h2>
            <p className="text-sky-100">
              احصل على خصم يصل إلى 50% على آلاف المنتجات
            </p>
          </div>
          <Link
            href="/search"
            className="px-8 py-3 bg-white text-sky-600 font-bold rounded-xl hover:bg-sky-50 transition-colors whitespace-nowrap text-lg"
          >
            تصفح العروض
          </Link>
        </div>
      </div>
    </section>
  );
}
