import ProductGridSkeleton from "@/components/ui/ProductGridSkeleton";

export default function SearchLoading() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="h-6 w-32 bg-slate-200 rounded animate-pulse mb-6" />
      <div className="relative max-w-2xl mb-8 animate-pulse">
        <div className="h-14 w-full bg-slate-200 rounded-2xl" />
      </div>
      <div className="h-7 w-64 bg-slate-200 rounded animate-pulse mb-2" />
      <div className="h-5 w-32 bg-slate-200 rounded animate-pulse mb-6" />
      <ProductGridSkeleton count={4} />
    </div>
  );
}
