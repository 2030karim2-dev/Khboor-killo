import Link from "next/link";

export default function PromoBanner() {
  return (
    <section className="max-w-7xl mx-auto px-4 py-8">
      <div className="gradient-primary rounded-xl p-5 md:p-8 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-48 h-48 bg-white/10 rounded-full -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-32 h-32 bg-white/10 rounded-full translate-x-1/3 translate-y-1/3" />
        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <h2 className="text-xl md:text-2xl font-extrabold text-white mb-1">
              عروض حصرية بانتظارك!
            </h2>
            <p className="text-sky-100 text-sm">
              احصل على خصم يصل إلى 50% على آلاف المنتجات
            </p>
          </div>
          <Link
            href="/search"
            className="px-6 py-2.5 bg-white text-sky-600 font-bold rounded-lg hover:bg-sky-50 transition-colors whitespace-nowrap text-sm"
          >
            تصفح العروض
          </Link>
        </div>
      </div>
    </section>
  );
}
