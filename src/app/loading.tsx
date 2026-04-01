export default function Loading() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center bg-parchment">
      <div className="text-center">
        <div className="inline-block h-8 w-8 border-2 border-brass/20 border-t-brass animate-spin rounded-full" />
        <p className="mt-4 text-body-sm text-warm-gray">Loading...</p>
      </div>
    </div>
  );
}
