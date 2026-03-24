import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Page Not Found',
  description: 'The page you are looking for does not exist.',
};

export default function NotFound() {
  return (
    <main className="fe-main">
      <section className="fe-panel-strong flex min-h-[60vh] flex-col items-center justify-center gap-6 p-8 text-center">
        <p className="text-[11px] uppercase tracking-[0.2em] text-[#b59f75]">404</p>
        <h1 className="max-w-[16ch] text-4xl font-normal text-[#f8f1e3] sm:text-5xl">
          Page Not Found
        </h1>
        <p className="max-w-[52ch] text-[#b7ac97]">
          The page you are looking for may have been moved, removed, or does not exist.
          Return to the homepage to continue exploring Firose Enterprises.
        </p>
        <div className="mt-2 flex flex-wrap justify-center gap-3">
          <Link href="/" className="fe-btn-primary">
            Return Home
          </Link>
          <Link href="/contact" className="fe-link-chip">
            Contact Us
          </Link>
        </div>
        <div className="mt-4 h-px w-16 bg-gradient-to-r from-transparent via-[#c8a86b44] to-transparent" />
      </section>
    </main>
  );
}
