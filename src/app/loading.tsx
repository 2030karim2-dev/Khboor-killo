export default function HomeLoading() {
  return (
    <div>
      <div className="w-full h-[400px] bg-slate-200 animate-pulse" />
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="h-8 w-48 bg-slate-200 rounded animate-pulse mb-8" />
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="aspect-[3/2] bg-slate-200 rounded-xl animate-pulse" />
          ))}
        </div>
      </div>
    </div>
  );
}
