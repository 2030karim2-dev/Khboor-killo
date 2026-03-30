import ProductGridSkeleton from "@/components/ui/ProductGridSkeleton";

export default function CategoryLoading() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="h-6 w-48 bg-slate-200 rounded animate-pulse mb-6" />
      <div className="relative rounded-2xl overflow-hidden mb-8 animate-pulse">
        <div className="w-full h-48 md:h-64 bg-slate-200" />
      </div>
      <div className="flex items-center justify-between mb-6 bg-white rounded-xl p-4 border border-slate-200 animate-pulse">
        <div className="flex gap-3">
          <div className="h-9 w-20 bg-slate-200 rounded-lg" />
          <div className="h-9 w-40 bg-slate-200 rounded-lg" />
        </div>
        <div className="flex gap-2">
          <div className="h-9 w-9 bg-slate-200 rounded-lg" />
          <div className="h-9 w-9 bg-slate-200 rounded-lg" />
        </div>
      </div>
      <ProductGridSkeleton count={8} />
    </div>
  );
}
