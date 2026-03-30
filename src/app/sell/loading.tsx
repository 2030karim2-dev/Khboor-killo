export default function SellLoading() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="h-6 w-32 bg-slate-200 rounded animate-pulse mb-6" />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="card p-5 animate-pulse flex items-center gap-4">
            <div className="w-12 h-12 bg-slate-200 rounded-xl" />
            <div className="space-y-2">
              <div className="h-6 w-16 bg-slate-200 rounded" />
              <div className="h-4 w-24 bg-slate-200 rounded" />
            </div>
          </div>
        ))}
      </div>
      <div className="flex gap-2 mb-6">
        <div className="h-10 w-40 bg-slate-200 rounded-xl animate-pulse" />
        <div className="h-10 w-28 bg-slate-200 rounded-xl animate-pulse" />
      </div>
      <div className="card p-6 md:p-8 animate-pulse space-y-5">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="h-11 bg-slate-200 rounded-xl" />
        ))}
      </div>
    </div>
  );
}
