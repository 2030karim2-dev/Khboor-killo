export default function WishlistLoading() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="h-4 w-32 bg-slate-200 rounded animate-shimmer mb-8" />
      <div className="h-8 w-48 bg-slate-200 rounded animate-shimmer mb-8" />
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="card animate-shimmer">
            <div className="aspect-[4/3] bg-slate-200" />
            <div className="p-4 space-y-2">
              <div className="h-4 w-3/4 bg-slate-200 rounded" />
              <div className="h-6 w-1/2 bg-slate-200 rounded" />
              <div className="h-10 w-full bg-slate-200 rounded-xl" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
