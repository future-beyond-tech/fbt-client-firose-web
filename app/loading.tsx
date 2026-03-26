export default function Loading() {
  return (
    <main className="fe-main" aria-label="Loading content">
      <div className="grid gap-6">
        {/* Hero skeleton */}
        <div className="fe-skeleton h-[320px] sm:h-[400px]" />
        {/* Content skeletons */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="fe-skeleton h-40" />
          <div className="fe-skeleton h-40" />
          <div className="fe-skeleton h-40" />
          <div className="fe-skeleton h-40" />
        </div>
        <div className="fe-skeleton h-64" />
      </div>
    </main>
  );
}
