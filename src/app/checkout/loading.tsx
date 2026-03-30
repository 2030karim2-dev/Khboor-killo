export default function CheckoutLoading() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="h-6 w-40 bg-slate-200 rounded animate-pulse mb-6" />
      <div className="h-8 w-48 bg-slate-200 rounded animate-pulse mb-8" />
      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="card p-6 animate-pulse space-y-4">
            <div className="h-6 w-32 bg-slate-200 rounded" />
            <div className="grid md:grid-cols-2 gap-4">
              {[...Array(5)].map((_, i) => (
                <div key={i} className={`h-11 bg-slate-200 rounded-xl ${i === 4 ? "md:col-span-2" : ""}`} />
              ))}
            </div>
          </div>
          <div className="card p-6 animate-pulse space-y-4">
            <div className="h-6 w-28 bg-slate-200 rounded" />
            <div className="h-16 bg-slate-200 rounded-xl" />
            <div className="h-16 bg-slate-200 rounded-xl" />
          </div>
        </div>
        <div className="card p-6 h-64 animate-pulse">
          <div className="h-6 w-24 bg-slate-200 rounded mb-4" />
          <div className="space-y-3">
            <div className="h-4 w-full bg-slate-200 rounded" />
            <div className="h-4 w-full bg-slate-200 rounded" />
          </div>
        </div>
      </div>
    </div>
  );
}
