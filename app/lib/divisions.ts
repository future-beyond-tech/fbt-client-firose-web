import { brandVisuals } from './brandVisuals';

export type DivisionDefinition = {
  id: 'ar-perfumes' | 'femison' | 'neat-fresh' | 'future-beyond-technology';
  name: string;
  category: string;
  description: string;
  href: string;
  external?: boolean;
  ctaLabel?: string;
  image: string;
  imageAlt: string;
  theme?: 'default' | 'tech';
};

export const FBT_WEBSITE_URL = 'https://futurebeyondtech.com/';
export const NEAT_FRESH_WEBSITE_URL = 'https://neatfresh.online';
export const AR_PERFUMES_WEBSITE_URL = 'https://arperfumes.in';
export const FEMISON_WEBSITE_URL = 'https://femison.in';

const DIVISION_PAGE_HREF_BY_ID: Record<DivisionDefinition['id'], string> = {
  'ar-perfumes': '/brands/ar-perfumes',
  femison: '/brands/femison',
  'neat-fresh': '/brands/neat-fresh',
  'future-beyond-technology': '/brands/future-beyond-technology',
};

const DIVISION_WEBSITE_HREF_BY_ID: Record<DivisionDefinition['id'], string> = {
  'ar-perfumes': AR_PERFUMES_WEBSITE_URL,
  femison: FEMISON_WEBSITE_URL,
  'neat-fresh': NEAT_FRESH_WEBSITE_URL,
  'future-beyond-technology': FBT_WEBSITE_URL,
};

export const divisionCatalog: DivisionDefinition[] = [
  {
    id: 'ar-perfumes',
    name: 'AR Perfumes',
    category: 'Luxury Fragrance',
    description:
      'Luxury fragrance division focused on premium attars, gifting collections, and identity-led brand storytelling.',
    href: AR_PERFUMES_WEBSITE_URL,
    external: true,
    image: brandVisuals['ar-perfumes'].cardImage,
    imageAlt: brandVisuals['ar-perfumes'].alt,
  },
  {
    id: 'femison',
    name: 'Femison',
    category: 'Baby Care & Nutrition',
    description:
      'Healthcare and nutrition division offering baby gripe water, Arwat formulations, and glucose products for everyday family use.',
    href: '/brands/femison',
    image: brandVisuals.femison.cardImage,
    imageAlt: brandVisuals.femison.alt,
  },
  {
    id: 'neat-fresh',
    name: 'Neat & Fresh',
    category: 'Hygiene / FMCG',
    description:
      'Premium hygiene and cleanliness solutions for daily essentials across homes, offices, and institutional channels.',
    href: NEAT_FRESH_WEBSITE_URL,
    external: true,
    image: brandVisuals['neat-fresh'].cardImage,
    imageAlt: brandVisuals['neat-fresh'].alt,
  },
  {
    id: 'future-beyond-technology',
    name: 'Future Beyond Technology (FBT)',
    category: 'AI & Cybersecurity',
    description:
      'An AI-driven software engineering and cybersecurity division focused on automation, secure architecture, and enterprise-grade systems.',
    href: '/brands/future-beyond-technology',
    image:
      'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1800&q=80',
    imageAlt: 'Advanced technology workspace with secure digital systems',
    theme: 'tech',
  },
];

export function getDivisionPageHref(division: Pick<DivisionDefinition, 'id' | 'href'>): string {
  return DIVISION_PAGE_HREF_BY_ID[division.id] ?? division.href;
}

export function getDivisionWebsiteHref(division: Pick<DivisionDefinition, 'id'>): string {
  return DIVISION_WEBSITE_HREF_BY_ID[division.id];
}
