import { defineRouting } from 'next-intl/routing';

export const locales = ['en', 'ta', 'hi', 'te', 'kn'] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = 'en';

export const localeNames: Record<Locale, string> = {
  en: 'English',
  ta: 'தமிழ்',
  hi: 'हिन्दी',
  te: 'తెలుగు',
  kn: 'ಕನ್ನಡ',
};

export const routing = defineRouting({
  locales,
  defaultLocale,
  localePrefix: 'as-needed', // English has no prefix, others get /ta, /hi, etc.
  localeDetection: false, // Prevent Accept-Language / cookie-based redirect loops
});
