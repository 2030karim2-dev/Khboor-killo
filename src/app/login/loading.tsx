export default function AuthLoading() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md animate-pulse">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-slate-200 rounded-2xl mx-auto mb-4" />
          <div className="h-7 w-40 bg-slate-200 rounded mx-auto" />
          <div className="h-5 w-48 bg-slate-200 rounded mx-auto mt-2" />
        </div>
        <div className="card p-6 space-y-4">
          <div className="h-5 w-24 bg-slate-200 rounded" />
          <div className="h-11 bg-slate-200 rounded-xl" />
          <div className="h-5 w-28 bg-slate-200 rounded" />
          <div className="h-11 bg-slate-200 rounded-xl" />
          <div className="h-12 bg-slate-200 rounded-xl" />
        </div>
      </div>
    </div>
  );
}
