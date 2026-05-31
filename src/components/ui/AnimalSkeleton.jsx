export default function AnimalSkeleton() {
  return (
    <div className="bg-white p-0 rounded-3xl border border-slate-200 shadow-sm animate-pulse flex flex-col h-full overflow-hidden">
      {/* Aspect square igual a la card */}
      <div className="aspect-square bg-slate-200 w-full" />
      
      <div className="p-5 space-y-3">
        <div className="h-6 bg-slate-200 rounded-lg w-2/3" />
        <div className="space-y-2">
          <div className="h-4 bg-slate-100 rounded w-full" />
          <div className="h-4 bg-slate-100 rounded w-4/5" />
        </div>
        <div className="h-12 bg-slate-100 rounded-2xl mt-4" />
      </div>
    </div>
  );
}