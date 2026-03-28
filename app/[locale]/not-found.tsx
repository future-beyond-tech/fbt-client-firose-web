import { Link } from '@/i18n/navigation';

export default function NotFound() {
  return (
    <main id="main-content" className="fe-main fe-ambient-drift" style={{ minHeight: '60vh' }}>
      <section className="fe-panel-strong flex flex-col items-center justify-center p-8 text-center sm:p-12 lg:p-16">
        <p className="text-[11px] uppercase tracking-[0.2em] text-[#b59f75]">Page Not Found</p>
        <h1 className="mt-4 text-5xl font-normal text-[#f8f1e3] sm:text-6xl lg:text-7xl" style={{ fontFamily: '"Iowan Old Style", "Palatino Linotype", serif' }}>
          404
        </h1>
        <p className="mt-3 max-w-[48ch] text-sm leading-relaxed text-[#b7ac97] sm:text-base">
          The page you are looking for does not exist or has been moved. Return to the homepage or explore our divisions.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <Link href="/" className="fe-btn-primary">Back to Home</Link>
          <Link href="/brands" className="fe-link-chip">Explore Divisions</Link>
          <Link href="/contact" className="fe-link-chip">Contact Us</Link>
        </div>
      </section>
    </main>
  );
}
