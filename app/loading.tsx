export default function Loading() {
  return (
    <main className="flex flex-1 items-center justify-center bg-[#141619] px-6 text-white">
      <div className="flex items-center gap-3" role="status" aria-live="polite">
        <span className="h-5 w-5 animate-spin rounded-full border-2 border-white/20 border-t-[#ccff00]" />
        <span className="text-sm text-zinc-300">Loading workouts…</span>
      </div>
    </main>
  );
}