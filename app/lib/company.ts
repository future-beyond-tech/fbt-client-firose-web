const optionalPublicValue = (value: string | undefined): string | null => {
  const normalized = value?.trim();
  return normalized ? normalized : null;
};

const configuredWebsiteUrl = optionalPublicValue(process.env.NEXT_PUBLIC_SITE_URL);

export const companyConfig = {
  name: 'FIROSE Enterprises',
  websiteUrl: (configuredWebsiteUrl ?? 'https://firoseenterprises.in').replace(/\/$/, ''),
  establishedYear: 2018,
  heritageSince: 1980,
  location: 'Chennai, Tamil Nadu, India',
  phone: '+91 9790600220',
  phoneHref: '+919790600220',
  whatsappNumber: '919790600220',
  publicEnquiryEmail: optionalPublicValue(process.env.NEXT_PUBLIC_CORPORATE_EMAIL),
  social: {
    instagram: optionalPublicValue(process.env.NEXT_PUBLIC_INSTAGRAM_URL),
    linkedIn: optionalPublicValue(process.env.NEXT_PUBLIC_LINKEDIN_URL),
    youtube: optionalPublicValue(process.env.NEXT_PUBLIC_YOUTUBE_URL),
    amazon: optionalPublicValue(process.env.NEXT_PUBLIC_AMAZON_STOREFRONT_URL),
    indiaMart: 'https://www.indiamart.com/firose-enterpriseschennai/',
  },
} as const;

export function buildCorporateWhatsAppUrl(message: string): string {
  return `https://wa.me/${companyConfig.whatsappNumber}?text=${encodeURIComponent(message)}`;
}

export function absoluteCompanyUrl(path = '/'): string {
  return new URL(path, `${companyConfig.websiteUrl}/`).toString();
}
