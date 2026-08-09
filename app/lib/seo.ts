import type { Metadata } from 'next';
import { routing, type Locale } from '@/i18n/routing';
import { absoluteCompanyUrl, companyConfig } from './company';

type PageMetadataOptions = Readonly<{
  title: string;
  description: string;
  path: string;
  locale?: string;
  noIndex?: boolean;
  absoluteTitle?: string;
}>;

function localePath(path: string, locale: Locale): string {
  const normalizedPath = path === '/' ? '' : path;
  return locale === routing.defaultLocale ? normalizedPath || '/' : `/${locale}${normalizedPath}`;
}

export function createPageMetadata({
  title,
  description,
  path,
  locale = routing.defaultLocale,
  noIndex = false,
  absoluteTitle,
}: PageMetadataOptions): Metadata {
  const activeLocale = routing.locales.includes(locale as Locale) ? (locale as Locale) : routing.defaultLocale;
  const canonical = absoluteCompanyUrl(localePath(path, activeLocale));
  const languages = Object.fromEntries(
    routing.locales.map((supportedLocale) => [
      supportedLocale,
      absoluteCompanyUrl(localePath(path, supportedLocale)),
    ])
  );

  return {
    title: absoluteTitle ? { absolute: absoluteTitle } : title,
    description,
    alternates: {
      canonical,
      languages: {
        ...languages,
        'x-default': absoluteCompanyUrl(path),
      },
    },
    openGraph: {
      title: absoluteTitle ?? `${title} | ${companyConfig.name}`,
      description,
      url: canonical,
      siteName: companyConfig.name,
      locale: activeLocale === 'en' ? 'en_IN' : `${activeLocale}_IN`,
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
      title: absoluteTitle ?? `${title} | ${companyConfig.name}`,
      description,
      images: [absoluteCompanyUrl('/images/about-social.jpg')],
    },
    robots: noIndex ? { index: false, follow: false } : undefined,
  };
}
