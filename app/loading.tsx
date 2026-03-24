export default function Loading() {
  return (
    <main className="fe-main">
      <div className="fe-skeleton h-[60vh] min-h-[400px]" />
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="fe-skeleton h-48" />
        <div className="fe-skeleton h-48" />
      </div>
      <div className="fe-skeleton h-64" />
    </main>
  );
}
