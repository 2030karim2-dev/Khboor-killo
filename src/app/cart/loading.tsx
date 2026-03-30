export default function CartLoading() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="h-6 w-32 bg-slate-200 rounded animate-pulse mb-6" />
      <div className="h-8 w-64 bg-slate-200 rounded animate-pulse mb-8" />
      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-4">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="card p-4 flex gap-4 animate-pulse">
              <div className="w-24 h-24 bg-slate-200 rounded-xl" />
              <div className="flex-1 space-y-3">
                <div className="h-5 w-3/4 bg-slate-200 rounded" />
                <div className="h-4 w-1/2 bg-slate-200 rounded" />
                <div className="h-10 w-32 bg-slate-200 rounded-lg" />
              </div>
            </div>
          ))}
        </div>
        <div className="card p-6 h-64 animate-pulse">
          <div className="h-6 w-24 bg-slate-200 rounded mb-4" />
          <div className="space-y-3">
            <div className="h-4 w-full bg-slate-200 rounded" />
            <div className="h-4 w-full bg-slate-200 rounded" />
            <div className="h-6 w-full bg-slate-200 rounded" />
          </div>
        </div>
      </div>
    </div>
  );
}
