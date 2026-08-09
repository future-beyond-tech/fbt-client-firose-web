import type { MetadataRoute } from 'next';
import { companyConfig } from '@/app/lib/company';
import { routing } from '@/i18n/routing';

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    { path: '/', priority: 1.0, changeFrequency: 'monthly' as const },
    { path: '/about', priority: 0.8, changeFrequency: 'monthly' as const },
    { path: '/about/story', priority: 0.7, changeFrequency: 'monthly' as const },
    { path: '/leadership', priority: 0.7, changeFrequency: 'monthly' as const },
    { path: '/about/timeline', priority: 0.6, changeFrequency: 'yearly' as const },
    { path: '/brands', priority: 0.9, changeFrequency: 'monthly' as const },
    { path: '/brands/ar-perfumes', priority: 0.8, changeFrequency: 'monthly' as const },
    { path: '/brands/femison', priority: 0.8, changeFrequency: 'monthly' as const },
    { path: '/brands/neat-fresh', priority: 0.8, changeFrequency: 'monthly' as const },
    { path: '/brands/future-beyond-technology', priority: 0.8, changeFrequency: 'monthly' as const },
    { path: '/manufacturing-quality', priority: 0.7, changeFrequency: 'monthly' as const },
    { path: '/business-with-us', priority: 0.8, changeFrequency: 'monthly' as const },
    { path: '/contact', priority: 0.8, changeFrequency: 'monthly' as const },
    { path: '/brochure', priority: 0.9, changeFrequency: 'monthly' as const },
    { path: '/privacy', priority: 0.3, changeFrequency: 'yearly' as const },
    { path: '/terms', priority: 0.3, changeFrequency: 'yearly' as const },
  ];

  return routing.locales.flatMap((locale) =>
    routes.map((route) => {
      const localePrefix = locale === routing.defaultLocale ? '' : `/${locale}`;
      const path = route.path === '/' ? localePrefix || '/' : `${localePrefix}${route.path}`;
      return {
        url: new URL(path, `${companyConfig.websiteUrl}/`).toString(),
        changeFrequency: route.changeFrequency,
        priority: locale === routing.defaultLocale ? route.priority : Math.max(route.priority - 0.1, 0.1),
      };
    })
  );
}
