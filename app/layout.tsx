import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import Link from 'next/link';
import CorporateHeader from '@/app/components/CorporateHeader';
import FloatingBackToTop from '@/app/components/FloatingBackToTop';
import SkipLink from '@/app/components/SkipLink';
import WelcomeOverlay from '@/app/components/WelcomeOverlay';
import { ToastProvider } from '@/app/components/Toast';
import MotionProvider from '@/app/components/motion/MotionProvider';
import RouteTransition from '@/app/components/motion/RouteTransition';
import { FBT_WEBSITE_URL, divisionCatalog, type DivisionDefinition } from '@/app/lib/divisions';
import './globals.css';

const ORGANIZATION_ID = 'https://firoseenterprises.com/#organization';
const ORGANIZATION_URL = 'https://firoseenterprises.com';
const FEMISON_WEBSITE_URL = 'https://femison.in';
const FOOTER_EXTERNAL_DIVISION_LINKS: Partial<Record<DivisionDefinition['id'], string>> = {
  femison: FEMISON_WEBSITE_URL,
  'future-beyond-technology': FBT_WEBSITE_URL,
};

const subOrganizationSchema = divisionCatalog.map((division) => ({
  '@type': 'Organization',
  name: division.name,
  url: division.external ? division.href : `${ORGANIZATION_URL}${division.href}`,
  description: division.description,
  parentOrganization: { '@id': ORGANIZATION_ID },
}));

const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  '@id': ORGANIZATION_ID,
  name: 'Firose Enterprises',
  url: ORGANIZATION_URL,
  description:
    'Firose Enterprises is a diversified enterprise group operating AR Perfumes, Femison, Neat & Fresh, and Future Beyond Technology across fragrance, baby care and nutrition, hygiene FMCG, AI engineering, and cybersecurity.',
  keywords:
    'Neat & Fresh, hygiene, cleanliness, daily essentials, premium care, housekeeping products, FMCG, AR Perfumes, Femison, Future Beyond Technology',
  brand: divisionCatalog.map((division) => division.name),
  subOrganization: subOrganizationSchema,
  contactPoint: [
    {
      '@type': 'ContactPoint',
      contactType: 'customer support',
      email: 'corporate@firoseenterprises.com',
      telephone: '+91-9790600220',
      areaServed: 'IN',
    },
  ],
};

export const metadata: Metadata = {
  metadataBase: new URL('https://firoseenterprises.com'),
  title: {
    default: 'Firose Enterprises',
    template: '%s | Firose Enterprises',
  },
  description:
    'Firose Enterprises is the parent group for AR Perfumes, Femison, Neat & Fresh, and Future Beyond Technology, built for trusted consumer products, baby care and nutrition offerings, and enterprise-grade technology systems.',
  keywords: [
    'Firose Enterprises',
    'AR Perfumes',
    'Neat and Fresh',
    'Femison',
    'Future Beyond Technology',
    'FBT',
    'consumer brands',
    'housekeeping products',
    'hygiene',
    'cleanliness',
    'daily essentials',
    'premium care',
    'gripe water',
    'fragrance brand',
    'AI automation',
    'cybersecurity',
    'enterprise software',
    'secure systems',
  ],
  openGraph: {
    title: 'Firose Enterprises',
    description:
      'One group. Multiple trusted divisions across fragrance, baby care and nutrition, hygiene FMCG, and AI-driven technology systems.',
    url: ORGANIZATION_URL,
    siteName: 'Firose Enterprises',
    locale: 'en_US',
    type: 'website',
  },
  icons: {
    icon: '/favicon.ico',
  },
};

function ExternalLinkIcon({ className }: Readonly<{ className?: string }>) {
  return (
    <svg
      viewBox="0 0 20 20"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      aria-hidden="true"
      className={className}
    >
      <path d="M8 4h8v8" />
      <path d="M7 13l9-9" />
      <path d="M16 11v5H4V4h5" />
    </svg>
  );
}

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en" data-scroll-behavior="smooth" id="top">
      <body>
        <MotionProvider>
          <ToastProvider>
            <div className="fe-shell">
              <SkipLink />
              <CorporateHeader />

              <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
              />

              <RouteTransition>{children}</RouteTransition>

              <footer className="relative mt-auto border-t border-[#e0c8932b] bg-[linear-gradient(180deg,#0c0a08,#090807)]">
                <div className="pointer-events-none absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-[#c8a86b44] to-transparent" />
                <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-[radial-gradient(80%_100%_at_50%_0%,rgba(200,168,107,0.06)_0%,transparent_70%)]" />

                <div className="relative mx-auto w-[min(1240px,calc(100%_-_1.25rem))] md:w-[min(1240px,calc(100%_-_2rem))] py-10 lg:py-12">
                  <div className="grid gap-8 lg:grid-cols-[1.25fr_1fr_1fr]">
                    <div className="grid gap-3">
                      <p className="text-sm font-medium uppercase tracking-[0.2em] text-[#d7bb85]">Firose Enterprises</p>
                      <p className="max-w-[44ch] text-sm leading-relaxed text-[#a99d87]">
                        One group. Multiple trusted divisions operating with heritage discipline and future-facing capability.
                      </p>
                      <p className="mt-1 text-[11px] uppercase tracking-[0.16em] text-[#7d745f]">
                        Trusted across India
                      </p>
                    </div>

                    <div className="grid gap-3">
                      <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-[#d7bb85]">Our Companies</p>
                      <nav className="grid gap-1.5" aria-label="Our companies">
                        {divisionCatalog.map((division) => {
                          const footerExternalHref = FOOTER_EXTERNAL_DIVISION_LINKS[division.id];
                          const useExternalLink = Boolean(footerExternalHref) || division.external;
                          const linkHref = footerExternalHref ?? division.href;

                          return useExternalLink ? (
                            <a
                              key={division.id}
                              href={linkHref}
                              target="_self"
                              rel="noopener noreferrer"
                              className="inline-flex items-center justify-between rounded-md border border-[#e0c89325] bg-[#18140fbf] px-3 py-2 text-xs uppercase tracking-[0.1em] text-[#d8ccb4] transition hover:border-[#e0c89362] hover:bg-[#221b14]"
                              aria-label={`Visit ${division.name} external website`}
                            >
                              <span>{division.name}</span>
                              <ExternalLinkIcon className="h-4 w-4 text-[#a99d87]" />
                            </a>
                          ) : (
                            <Link
                              key={division.id}
                              href={linkHref}
                              className="inline-flex items-center rounded-md border border-[#e0c89325] bg-[#18140fbf] px-3 py-2 text-xs uppercase tracking-[0.1em] text-[#d8ccb4] transition hover:border-[#e0c89362] hover:bg-[#221b14]"
                            >
                              {division.name}
                            </Link>
                          );
                        })}
                      </nav>
                    </div>

                    <div className="grid gap-3">
                      <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-[#d7bb85]">Corporate</p>
                      <nav className="grid gap-1.5" aria-label="Footer links">
                        <Link href="/about" className="inline-flex items-center rounded-md border border-[#e0c89325] bg-[#18140fbf] px-3 py-2 text-xs uppercase tracking-[0.1em] text-[#d8ccb4] transition hover:border-[#e0c89362] hover:bg-[#221b14]">About</Link>
                        <Link href="/brands" className="inline-flex items-center rounded-md border border-[#e0c89325] bg-[#18140fbf] px-3 py-2 text-xs uppercase tracking-[0.1em] text-[#d8ccb4] transition hover:border-[#e0c89362] hover:bg-[#221b14]">Our Divisions</Link>
                        <Link href="/manufacturing-quality" className="inline-flex items-center rounded-md border border-[#e0c89325] bg-[#18140fbf] px-3 py-2 text-xs uppercase tracking-[0.1em] text-[#d8ccb4] transition hover:border-[#e0c89362] hover:bg-[#221b14]">Manufacturing &amp; Quality</Link>
                        <Link href="/business-with-us" className="inline-flex items-center rounded-md border border-[#e0c89325] bg-[#18140fbf] px-3 py-2 text-xs uppercase tracking-[0.1em] text-[#d8ccb4] transition hover:border-[#e0c89362] hover:bg-[#221b14]">Business With Us</Link>
                        <Link href="/brochure" className="inline-flex items-center gap-1.5 rounded-md border border-[#e0c89342] bg-gradient-to-r from-[#2a2218bf] to-[#18140fbf] px-3 py-2 text-xs uppercase tracking-[0.1em] text-[#e8d5ac] transition hover:border-[#e0c89372] hover:bg-[#2a2218]">
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" /><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" /></svg>
                          Product Brochure
                        </Link>
                        <Link href="/contact" className="inline-flex items-center rounded-md border border-[#e0c89325] bg-[#18140fbf] px-3 py-2 text-xs uppercase tracking-[0.1em] text-[#d8ccb4] transition hover:border-[#e0c89362] hover:bg-[#221b14]">Contact</Link>
                        <Link href="/privacy" className="inline-flex items-center rounded-md border border-[#e0c89325] bg-[#18140fbf] px-3 py-2 text-xs uppercase tracking-[0.1em] text-[#d8ccb4] transition hover:border-[#e0c89362] hover:bg-[#221b14]">Privacy Policy</Link>
                        <Link href="/terms" className="inline-flex items-center rounded-md border border-[#e0c89325] bg-[#18140fbf] px-3 py-2 text-xs uppercase tracking-[0.1em] text-[#d8ccb4] transition hover:border-[#e0c89362] hover:bg-[#221b14]">Terms of Service</Link>
                      </nav>
                    </div>
                  </div>

                  <div className="mt-8 flex flex-col items-center gap-4 border-t border-[#e0c89318] pt-6 sm:flex-row sm:justify-between">
                    <p className="text-xs uppercase tracking-[0.12em] text-[#968a74]">
                      &copy; {new Date().getFullYear()} Firose Enterprises. All rights reserved.
                    </p>
                    <a
                      href="#top"
                      className="text-[11px] uppercase tracking-[0.16em] text-[#9e927b] transition hover:text-[#c8a86b]"
                    >
                      Back to Top &uarr;
                    </a>
                  </div>
                </div>
              </footer>

              <FloatingBackToTop />
              <WelcomeOverlay />
            </div>
          </ToastProvider>
        </MotionProvider>
      </body>
    </html>
  );
}
