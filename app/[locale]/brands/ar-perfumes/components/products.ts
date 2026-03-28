import { getBrandBySlug } from '@/app/lib/brands';

export type Product = {
  slug: string;
  name: string;
  image: string;
  shortDescription: string;
  tagline: string;
  notes: string;
};

const arBrandContact = getBrandBySlug('ar-perfumes').contact;

export const WHATSAPP_NUMBER = arBrandContact.whatsappNumber;

export const CONTACT_INFO = {
  personName: arBrandContact.personName,
  role: arBrandContact.role,
  whatsappNumber: arBrandContact.whatsappNumber,
  whatsappDisplay: arBrandContact.whatsappDisplay,
  phone: arBrandContact.phone,
  phoneDisplay: arBrandContact.phoneDisplay,
  cityRegion: arBrandContact.cityRegion,
  email: arBrandContact.email,
};

const BASE_WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}`;

export const products: Product[] = [
  {
    slug: 'pure-oud',
    name: 'Pure Oud',
    image: '/images/products/pure-oud.png',
    shortDescription: 'Deep, woody, unmistakably noble',
    tagline: 'Where depth meets devotion.',
    notes: 'Oud · Woody · Warm · Persistent',
  },
  {
    slug: 'magna',
    name: 'Magna',
    image: '/images/products/magna.png',
    shortDescription: 'Bold character, refined presence',
    tagline: 'Presence without announcement.',
    notes: 'Amber · Spice · Leather · Depth',
  },
  {
    slug: '7-boys',
    name: '7 Boys',
    image: '/images/products/7-boys.png',
    shortDescription: 'Seven facets of sophistication',
    tagline: 'Seven dimensions of character.',
    notes: 'Floral · Woody · Musk · Citrus · Spice · Amber · Oud',
  },
  {
    slug: 'lord',
    name: 'Lord',
    image: '/images/products/lord.png',
    shortDescription: 'Commanding and timeless',
    tagline: 'Command respect. Invite intrigue.',
    notes: 'Oud · Leather · Tobacco · Vanilla',
  },
  {
    slug: 'opal',
    name: 'Opal',
    image: '/images/products/opal.png',
    shortDescription: 'Luminous, rare, unforgettable',
    tagline: 'Rare. Luminous. Unforgettable.',
    notes: 'Floral · Powdery · Soft woods · Musk',
  },
  {
    slug: 'abaya',
    name: 'Abaya',
    image: '/images/products/abaya.png',
    shortDescription: 'Grace and quiet strength',
    tagline: 'Grace that speaks in silence.',
    notes: 'Rose · Oud · Saffron · Soft musk',
  },
];

export function buildWhatsAppMessageUrl(message: string): string {
  return `${BASE_WHATSAPP_URL}?text=${encodeURIComponent(message)}`;
}

export function buildWhatsAppOrderUrl(productName: string): string {
  return buildWhatsAppMessageUrl(
    `Hello AR Perfume, I would like to order ${productName}. Please share availability and pricing.`
  );
}
