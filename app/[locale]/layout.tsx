import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { notFound } from 'next/navigation';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, getTranslations, setRequestLocale } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import { routing } from '@/i18n/routing';
import CorporateHeader from '@/app/components/CorporateHeader';
import FloatingBackToTop from '@/app/components/FloatingBackToTop';
import FloatingWhatsApp from '@/app/components/FloatingWhatsApp';
import SkipLink from '@/app/components/SkipLink';
import TrustBar from '@/app/components/TrustBar';
import WelcomeOverlay from '@/app/components/WelcomeOverlay';
import { ToastProvider } from '@/app/components/Toast';
import MotionProvider from '@/app/components/motion/MotionProvider';
import RouteTransition from '@/app/components/motion/RouteTransition';
import { absoluteCompanyUrl, companyConfig } from '@/app/lib/company';
import { FBT_WEBSITE_URL, divisionCatalog, type DivisionDefinition } from '@/app/lib/divisions';
import '@/app/globals.css';

/* ─── Static params for all supported locales ─────────────────────────── */

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

/* ─── Constants ───────────────────────────────────────────────────────── */

const ORGANIZATION_ID = `${companyConfig.websiteUrl}/#organization`;
const ORGANIZATION_URL = companyConfig.websiteUrl;
const WEBSITE_ID = `${companyConfig.websiteUrl}/#website`;
const FEMISON_WEBSITE_URL = 'https://femison.in';
const FOOTER_EXTERNAL_DIVISION_LINKS: Partial<Record<DivisionDefinition['id'], string>> = {
  femison: FEMISON_WEBSITE_URL,
  'future-beyond-technology': FBT_WEBSITE_URL,
};

const configuredSocialLinks = [
  { label: 'Instagram', href: companyConfig.social.instagram },
  { label: 'LinkedIn', href: companyConfig.social.linkedIn },
  { label: 'YouTube', href: companyConfig.social.youtube },
  { label: 'Amazon', href: companyConfig.social.amazon },
  { label: 'IndiaMART', href: companyConfig.social.indiaMart },
].filter((link): link is { label: string; href: string } => Boolean(link.href));

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
  name: companyConfig.name,
  url: ORGANIZATION_URL,
  foundingDate: String(companyConfig.establishedYear),
  location: {
    '@type': 'Place',
    name: companyConfig.location,
  },
  description:
    'FIROSE Enterprises, established in 2018 with business heritage dating back to 1980, operates AR Perfumes, Femison, Neat & Fresh, and Future Beyond Technology.',
  keywords:
    'Neat & Fresh, hygiene, cleanliness, daily essentials, premium care, housekeeping products, FMCG, AR Perfumes, Femison, Future Beyond Technology',
  brand: divisionCatalog.map((division) => division.name),
  subOrganization: subOrganizationSchema,
  sameAs: configuredSocialLinks.map((link) => link.href),
  contactPoint: {
    '@type': 'ContactPoint',
    contactType: 'business enquiries',
    telephone: companyConfig.phone,
    areaServed: 'IN',
    ...(companyConfig.publicEnquiryEmail ? { email: companyConfig.publicEnquiryEmail } : {}),
  },
};

const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': WEBSITE_ID,
  name: companyConfig.name,
  url: ORGANIZATION_URL,
  publisher: { '@id': ORGANIZATION_ID },
  inLanguage: routing.locales,
};

/* ─── Metadata ────────────────────────────────────────────────────────── */

export const metadata: Metadata = {
  metadataBase: new URL(companyConfig.websiteUrl),
  title: {
    default: companyConfig.name,
    template: `%s | ${companyConfig.name}`,
  },
  description:
    'FIROSE Enterprises operates four divisions across fragrance, consumer care, housekeeping and hygiene, and enterprise technology.',
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
    title: companyConfig.name,
    description:
      'Established in 2018 with business heritage dating back to 1980, FIROSE Enterprises operates four divisions.',
    url: ORGANIZATION_URL,
    siteName: companyConfig.name,
    locale: 'en_IN',
    type: 'website',
    images: [
      {
        url: absoluteCompanyUrl('/images/about-social.jpg'),
        width: 1536,
        height: 1024,
        alt: `${companyConfig.name} corporate presentation`,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: companyConfig.name,
    description:
      'Four operating divisions across fragrance, consumer care, housekeeping and hygiene, and enterprise technology.',
    images: [absoluteCompanyUrl('/images/about-social.jpg')],
  },
  alternates: {
    canonical: ORGANIZATION_URL,
    languages: {
      en: ORGANIZATION_URL,
      ta: `${ORGANIZATION_URL}/ta`,
      hi: `${ORGANIZATION_URL}/hi`,
      te: `${ORGANIZATION_URL}/te`,
      kn: `${ORGANIZATION_URL}/kn`,
      'x-default': ORGANIZATION_URL,
    },
  },
  icons: {
    icon: '/favicon.ico',
  },
};

/* ─── Helper Components ───────────────────────────────────────────────── */

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

/* ─── Layout ──────────────────────────────────────────────────────────── */

type Props = {
  children: ReactNode;
  params: Promise<{ locale: string }>;
};

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;

  // Validate locale
  if (!routing.locales.includes(locale as (typeof routing.locales)[number])) {
    notFound();
  }

  // Enable static rendering
  setRequestLocale(locale);

  // Get all messages for this locale
  const messages = await getMessages();
  const clientMessages = {
    common: messages.common,
    nav: messages.nav,
    trustBar: messages.trustBar,
    whatsappFloat: messages.whatsappFloat,
    divisionCard: messages.divisionCard,
    divisions: messages.divisions,
    brandNav: messages.brandNav,
    heroSection: messages.heroSection,
    proofPoints: messages.proofPoints,
    leadershipPage: messages.leadershipPage,
    businessWithUs: messages.businessWithUs,
  };
  const tCommon = await getTranslations('common');
  const tFooter = await getTranslations('footer');

  return (
    <html lang={locale} data-scroll-behavior="smooth" id="top" suppressHydrationWarning>
      <head>
        <meta name="format-detection" content="telephone=no, date=no, email=no, address=no" />
      </head>
      <body>
        <NextIntlClientProvider locale={locale} messages={clientMessages} timeZone="Asia/Kolkata">
          <MotionProvider>
            <ToastProvider>
              <div className="fe-shell">
                <SkipLink />
                <TrustBar />
                <CorporateHeader />

                <script
                  type="application/ld+json"
                  dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
                />
                <script
                  type="application/ld+json"
                  dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
                />

                <RouteTransition>{children}</RouteTransition>

                <footer className="relative mt-auto border-t border-[#e0c8932b] bg-[linear-gradient(180deg,#0c0a08,#090807)]">
                  <div className="pointer-events-none absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-[#c8a86b44] to-transparent" />
                  <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-[radial-gradient(80%_100%_at_50%_0%,rgba(200,168,107,0.06)_0%,transparent_70%)]" />

                  <div className="relative mx-auto w-[min(1240px,calc(100%_-_1.25rem))] md:w-[min(1240px,calc(100%_-_2rem))] py-10 lg:py-12">
                    <div className="grid gap-8 lg:grid-cols-[1.25fr_1fr_1fr]">
                      <div className="grid gap-3">
                        <p className="text-sm font-medium uppercase tracking-[0.2em] text-[#d7bb85]">{tCommon('brandName')}</p>
                        <p className="max-w-[44ch] text-sm leading-relaxed text-[#a99d87]">
                          {tFooter('description')}
                        </p>
                        <p className="mt-1 text-[11px] uppercase tracking-[0.16em] text-[#9e927b]">
                          {tCommon('trustedAcrossIndia')}
                        </p>
                        {configuredSocialLinks.length > 0 ? (
                          <nav className="mt-2 flex flex-wrap gap-2" aria-label="Digital presence">
                            {configuredSocialLinks.map((link) => (
                              <a
                                key={link.label}
                                href={link.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="rounded-full border border-[#e0c89325] px-3 py-1.5 text-[11px] uppercase tracking-[0.12em] text-[#b7ac97] transition hover:border-[#e0c89362] hover:text-[#e8d5ac] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#d7bb85]"
                              >
                                {link.label}
                              </a>
                            ))}
                          </nav>
                        ) : null}
                      </div>

                      <div className="grid gap-3">
                        <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-[#d7bb85]">{tFooter('ourCompanies')}</p>
                        <nav className="grid gap-1.5" aria-label={tFooter('ourCompanies')}>
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
                                aria-label={tFooter('visitExternal', { name: division.name })}
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
                        <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-[#d7bb85]">{tFooter('corporate')}</p>
                        <nav className="grid gap-1.5" aria-label={tFooter('corporate')}>
                          <Link href="/about" className="inline-flex items-center rounded-md border border-[#e0c89325] bg-[#18140fbf] px-3 py-2 text-xs uppercase tracking-[0.1em] text-[#d8ccb4] transition hover:border-[#e0c89362] hover:bg-[#221b14]">{tFooter('about')}</Link>
                          <Link href="/brands" className="inline-flex items-center rounded-md border border-[#e0c89325] bg-[#18140fbf] px-3 py-2 text-xs uppercase tracking-[0.1em] text-[#d8ccb4] transition hover:border-[#e0c89362] hover:bg-[#221b14]">{tFooter('ourDivisions')}</Link>
                          <Link href="/manufacturing-quality" className="inline-flex items-center rounded-md border border-[#e0c89325] bg-[#18140fbf] px-3 py-2 text-xs uppercase tracking-[0.1em] text-[#d8ccb4] transition hover:border-[#e0c89362] hover:bg-[#221b14]">{tFooter('manufacturingQuality')}</Link>
                          <Link href="/business-with-us" className="inline-flex items-center rounded-md border border-[#e0c89325] bg-[#18140fbf] px-3 py-2 text-xs uppercase tracking-[0.1em] text-[#d8ccb4] transition hover:border-[#e0c89362] hover:bg-[#221b14]">{tFooter('businessWithUs')}</Link>
                          <Link href="/brochure" className="inline-flex items-center gap-1.5 rounded-md border border-[#e0c89342] bg-gradient-to-r from-[#2a2218bf] to-[#18140fbf] px-3 py-2 text-xs uppercase tracking-[0.1em] text-[#e8d5ac] transition hover:border-[#e0c89372] hover:bg-[#2a2218]">
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" /><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" /></svg>
                            {tFooter('productBrochure')}
                          </Link>
                          <Link href="/contact" className="inline-flex items-center rounded-md border border-[#e0c89325] bg-[#18140fbf] px-3 py-2 text-xs uppercase tracking-[0.1em] text-[#d8ccb4] transition hover:border-[#e0c89362] hover:bg-[#221b14]">{tFooter('contact')}</Link>
                          <Link href="/privacy" className="inline-flex items-center rounded-md border border-[#e0c89325] bg-[#18140fbf] px-3 py-2 text-xs uppercase tracking-[0.1em] text-[#d8ccb4] transition hover:border-[#e0c89362] hover:bg-[#221b14]">{tFooter('privacyPolicy')}</Link>
                          <Link href="/terms" className="inline-flex items-center rounded-md border border-[#e0c89325] bg-[#18140fbf] px-3 py-2 text-xs uppercase tracking-[0.1em] text-[#d8ccb4] transition hover:border-[#e0c89362] hover:bg-[#221b14]">{tFooter('termsOfService')}</Link>
                        </nav>
                      </div>
                    </div>

                    <div className="mt-8 flex flex-col items-center gap-4 border-t border-[#e0c89318] pt-6 sm:flex-row sm:justify-between">
                      <p className="text-xs uppercase tracking-[0.12em] text-[#968a74]">
                        {tCommon('copyright', { year: new Date().getFullYear() })}
                      </p>
                      <a
                        href="#top"
                        className="text-[11px] uppercase tracking-[0.16em] text-[#9e927b] transition hover:text-[#c8a86b]"
                      >
                        {tCommon('backToTop')}
                      </a>
                    </div>
                  </div>
                </footer>

                <FloatingBackToTop />
                <FloatingWhatsApp />
                <WelcomeOverlay />
              </div>
            </ToastProvider>
          </MotionProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
