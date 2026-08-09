import type { MetadataRoute } from 'next';
import { companyConfig } from '@/app/lib/company';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api/', '/thank-you', '/*/thank-you'],
    },
    sitemap: `${companyConfig.websiteUrl}/sitemap.xml`,
    host: companyConfig.websiteUrl,
  };
}
