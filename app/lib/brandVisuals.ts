import type { BrandDefinition } from './brands';

export type BrandVisual = {
  cardImage: string;
  heroImage: string;
  alt: string;
  highlight: string;
  focus: string;
};

export const corporateVisuals = {
  heroImage:
    'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1800&q=80',
  supportImage: '/images/about.png',
  aboutHeroImage:
    'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=2000&q=80',
  aboutValuesImage:
    'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1800&q=80',
  storyHeroImage:
    'https://images.unsplash.com/photo-1474631245212-32dc3c8310c6?auto=format&fit=crop&w=2000&q=80',
  storyOperationsImage: '/images/about.png',
  storyQualityImage: '/images/about.png',
};

export const brandVisuals: Record<BrandDefinition['slug'], BrandVisual> = {
  'ar-perfumes': {
    cardImage:
      'https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&w=1400&q=80',
    heroImage:
      'https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&w=1800&q=80',
    alt: 'Luxury perfume bottles arranged in premium lighting',
    highlight: 'Luxury fragrance identity with premium gift-ready presentation.',
    focus: 'Fragrance & Lifestyle',
  },
  femison: {
    cardImage:
      'https://images.unsplash.com/photo-1544126592-807ade215a0b?auto=format&fit=crop&w=1400&q=80',
    heroImage:
      'https://images.unsplash.com/photo-1544126592-807ade215a0b?auto=format&fit=crop&w=1800&q=80',
    alt: 'Family-focused consumer care setting',
    highlight: 'Baby gripe water, Arwat, glucose, and related consumer product formats.',
    focus: 'Baby Care, Arwat & Glucose',
  },
  'neat-fresh': {
    cardImage:
      'https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=1400&q=80',
    heroImage:
      'https://images.unsplash.com/photo-1563453392212-326f5e854473?auto=format&fit=crop&w=1800&q=80',
    alt: 'Housekeeping and hygiene cleaning setup',
    highlight: 'Practical hygiene solutions for home, office, and institutional demand.',
    focus: 'Housekeeping & Hygiene',
  },
};
