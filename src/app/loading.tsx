export default function Loading() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center bg-bg-deep">
      <div className="flex flex-col items-center gap-4">
        <div className="relative h-10 w-10">
          <div className="absolute inset-0 animate-spin rounded-full border-2 border-border-subtle border-t-accent" />
          <div className="absolute inset-1 animate-spin rounded-full border-2 border-transparent border-b-accent/30" style={{ animationDirection: "reverse", animationDuration: "1.5s" }} />
        </div>
        <span className="text-xs text-text-muted tracking-widest uppercase">Loading</span>
      </div>
    </div>
  );
}
