export function SkeletonCard() {
  return (
    <div className="card animate-pulse">
      <div className="aspect-[4/3] bg-slate-200" />
      <div className="p-4 space-y-3">
        <div className="flex justify-between">
          <div className="h-4 w-16 bg-slate-200 rounded-full" />
          <div className="h-4 w-12 bg-slate-200 rounded" />
        </div>
        <div className="h-5 w-3/4 bg-slate-200 rounded" />
        <div className="h-4 w-full bg-slate-200 rounded" />
        <div className="flex justify-between items-center">
          <div className="h-6 w-20 bg-slate-200 rounded" />
          <div className="h-10 w-10 bg-slate-200 rounded-xl" />
        </div>
      </div>
    </div>
  );
}

export function SkeletonLine({ width = "full", height = "4" }: { width?: string; height?: string }) {
  return <div className={`h-${height} w-${width} bg-slate-200 rounded animate-pulse`} />;
}

export function SkeletonCategoryBanner() {
  return (
    <div className="relative rounded-2xl overflow-hidden mb-8 animate-pulse">
      <div className="w-full h-48 md:h-64 bg-slate-200" />
    </div>
  );
}
