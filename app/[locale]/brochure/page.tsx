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
import { createPageMetadata } from '@/app/lib/seo';

type PageProps = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  return createPageMetadata({
    title: 'Consumer Products Catalogue',
    description:
      'Browse 55 consumer products from Femison and Neat & Fresh, with searchable categories, pack sizes, sourced pricing, and enquiry options.',
    path: '/brochure',
    locale,
  });
}

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
