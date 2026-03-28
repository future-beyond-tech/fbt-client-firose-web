import type { Metadata } from 'next';
import BrochureHero from './components/BrochureHero';
import BrandShowcase from './components/BrandShowcase';
import ProductGrid from './components/ProductGrid';
import BrochureContact from './components/BrochureContact';
import BrochureDownload from './components/BrochureDownload';
import {
  brandMeta,
  femisonProducts,
  neatFreshProducts,
} from './data/products';
import styles from './brochure.module.css';

export const metadata: Metadata = {
  title: 'Digital Brochure — Product Catalogue',
  description:
    'Explore the complete FIROSE Group product catalogue — 55+ products across Femison (health, herbal, medicinal) and Neat & Fresh (home care, cleaning, hygiene). Download PDF catalogues instantly.',
  keywords: [
    'Firose Group catalogue',
    'Femison products',
    'Neat and Fresh products',
    'product brochure',
    'FMCG catalogue India',
    'gripe water',
    'cleaning products',
    'herbal products',
  ],
  openGraph: {
    title: 'FIROSE Group — Digital Product Catalogue',
    description:
      'Browse 55+ products across two trusted brands. Health, wellness, and home care solutions for every Indian household.',
    url: 'https://firoseenterprises.com/brochure',
  },
};

const femisonMeta = brandMeta['femison'];
const neatFreshMeta = brandMeta['neat-fresh'];

export default function BrochurePage() {
  return (
    <main id="main-content" className={styles.page}>
      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <BrochureHero />

      {/* ── Femison Brand Section ────────────────────────────────────────── */}
      <BrandShowcase
        brand={femisonMeta}
        productCount={femisonProducts.length}
        index={1}
      />
      <section className={styles.container} id="femison-products">
        <ProductGrid products={femisonProducts} brand={femisonMeta} />
      </section>

      {/* ── Neat & Fresh Brand Section ───────────────────────────────────── */}
      <BrandShowcase
        brand={neatFreshMeta}
        productCount={neatFreshProducts.length}
        index={2}
      />
      <section className={styles.container} id="neat-fresh-products">
        <ProductGrid products={neatFreshProducts} brand={neatFreshMeta} />
      </section>

      {/* ── Contact ──────────────────────────────────────────────────────── */}
      <BrochureContact />

      {/* ── Download ─────────────────────────────────────────────────────── */}
      <BrochureDownload />
    </main>
  );
}
