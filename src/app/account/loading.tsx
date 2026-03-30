export default function AccountLoading() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="h-6 w-32 bg-slate-200 rounded animate-pulse mb-6" />
      <div className="grid md:grid-cols-4 gap-6">
        <div className="card p-4 animate-pulse">
          <div className="flex flex-col items-center mb-4">
            <div className="w-16 h-16 bg-slate-200 rounded-full mb-3" />
            <div className="h-5 w-24 bg-slate-200 rounded" />
            <div className="h-4 w-32 bg-slate-200 rounded mt-1" />
          </div>
          <div className="space-y-2">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="h-10 bg-slate-200 rounded-xl" />
            ))}
          </div>
        </div>
        <div className="md:col-span-3 card p-6 animate-pulse space-y-5">
          <div className="h-6 w-32 bg-slate-200 rounded" />
          <div className="grid md:grid-cols-2 gap-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-11 bg-slate-200 rounded-xl" />
            ))}
          </div>
          <div className="h-11 w-32 bg-slate-200 rounded-xl" />
        </div>
      </div>
    </div>
  );
}
