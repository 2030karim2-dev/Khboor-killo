import { SkeletonCard } from "@/components/ui/SkeletonCard";

export default function ProductLoading() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="h-6 w-48 bg-slate-200 rounded animate-pulse mb-6" />
      <div className="grid md:grid-cols-2 gap-8">
        <div className="aspect-square bg-slate-200 rounded-2xl animate-pulse" />
        <div className="space-y-4 animate-pulse">
          <div className="h-6 w-24 bg-slate-200 rounded-full" />
          <div className="h-8 w-3/4 bg-slate-200 rounded" />
          <div className="h-5 w-32 bg-slate-200 rounded" />
          <div className="h-16 w-full bg-slate-200 rounded-xl" />
          <div className="h-5 w-full bg-slate-200 rounded" />
          <div className="h-5 w-2/3 bg-slate-200 rounded" />
          <div className="h-12 w-full bg-slate-200 rounded-xl" />
        </div>
      </div>
      <div className="mt-12">
        <div className="h-7 w-40 bg-slate-200 rounded animate-pulse mb-6" />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[...Array(4)].map((_, i) => <SkeletonCard key={i} />)}
        </div>
      </div>
    </div>
  );
}
