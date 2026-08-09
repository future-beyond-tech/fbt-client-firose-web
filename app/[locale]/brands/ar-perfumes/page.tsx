import type { Metadata } from 'next';
import Image from 'next/image';
import { Link } from '@/i18n/navigation';
import MotionWrapper from '@/app/components/motion/MotionWrapper';
import BrandTransitionBanner from './components/BrandTransitionBanner';
import arStyles from './components/arPerfumes.module.css';
import styles from '../brands.module.css';
import { createPageMetadata } from '@/app/lib/seo';
import { brandVisuals } from '@/app/lib/brandVisuals';

const AR_PERFUMES_WEBSITE_URL = 'https://arperfumes.in';
const externalBrandWebsite = process.env.NEXT_PUBLIC_AR_BRAND_WEBSITE?.trim();
const brandWebsiteUrl = externalBrandWebsite || AR_PERFUMES_WEBSITE_URL;
const brandWebsiteLabel = 'Visit Brand Website';
const arVisual = brandVisuals['ar-perfumes'];

type PageProps = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  return createPageMetadata({
    title: 'AR Perfumes',
    description: 'Explore AR Perfumes, the fragrance division of FIROSE Enterprises, and visit its dedicated brand website.',
    path: '/brands/ar-perfumes',
    locale,
  });
}

export default function ARPerfumesPage() {
  return (
    <main id="main-content" className={styles.brandPage}>
      <MotionWrapper delay={0.04}>
        <p className={styles.metaTag}>Premium Fragrance Brand</p>
      </MotionWrapper>

      <MotionWrapper delay={0.1}>
        <section className={styles.brandSpotlight}>
        <div className={styles.brandSpotlightMedia}>
          <Image
            src={arVisual.heroImage}
            alt={arVisual.alt}
            fill
            className={styles.brandSpotlightImage}
            sizes="(max-width: 899px) 100vw, 50vw"
            priority
          />
        </div>

        <div className={styles.brandSpotlightContent}>
          <p className={styles.brandSpotlightBadge}>{arVisual.focus}</p>
          <h2 className={`${styles.brandSpotlightTitle} ${arStyles.goldHeading}`}>AR Perfumes</h2>
          <p className={styles.brandSpotlightText}>
            AR Perfumes carries the premium fragrance identity within the group, with curated product storytelling and
            direct order conversion through WhatsApp.
          </p>
          <div className={styles.brandSpotlightChips}>
            <p className={styles.brandSpotlightChip}>Signature Attars</p>
            <p className={styles.brandSpotlightChip}>Gift-Ready Packaging</p>
            <p className={styles.brandSpotlightChip}>Direct Ordering Flow</p>
          </div>
        </div>
        </section>
      </MotionWrapper>

      <MotionWrapper delay={0.16}>
        <div className={styles.sectionGrid}>
        <article className={styles.sectionCard}>
          <h3 className={styles.cardTitle}>Brand Story</h3>
          <p className={styles.cardText}>
            Built around identity and presence, AR Perfumes is positioned for premium fragrance seekers and gifting-led
            purchase journeys.
          </p>
        </article>

        <article className={styles.sectionCard}>
          <h3 className={styles.cardTitle}>Product Highlights</h3>
          <ul className={styles.bulletList}>
            <li>Signature attars and fragrance profiles.</li>
            <li>Gift-ready packaging options.</li>
            <li>Direct order support through WhatsApp.</li>
          </ul>
        </article>
        </div>
      </MotionWrapper>

      <MotionWrapper delay={0.22}>
        <section className="fe-panel p-5 sm:p-7">
          <header className="grid gap-2">
            <p className="text-[11px] uppercase tracking-[0.2em] text-[#b59f75]">Portfolio Snapshot</p>
            <h2 className="text-3xl font-normal text-[#f8f1e3] sm:text-4xl">AR Perfumes at a Glance</h2>
          </header>
          <div className="mt-4 grid grid-cols-2 gap-3 lg:grid-cols-4">
            <article className="rounded-2xl border border-[#e0c89331] bg-[#15120eb5] p-4 text-center">
              <p className="text-xl font-medium text-[#f8f1e3]" style={{ fontFamily: 'var(--font-display)' }}>Fragrance</p>
              <p className="mt-1 text-sm text-[#b7ac97]">Portfolio Category</p>
            </article>
            <article className="rounded-2xl border border-[#e0c89331] bg-[#15120eb5] p-4 text-center">
              <p className="text-xl font-medium text-[#f8f1e3]" style={{ fontFamily: 'var(--font-display)' }}>Gift Sets</p>
              <p className="mt-1 text-sm text-[#b7ac97]">Presentation Focus</p>
            </article>
            <article className="rounded-2xl border border-[#e0c89331] bg-[#15120eb5] p-4 text-center">
              <p className="text-xl font-medium text-[#f8f1e3]" style={{ fontFamily: 'var(--font-display)' }}>WhatsApp</p>
              <p className="mt-1 text-sm text-[#b7ac97]">Direct Order Channel</p>
            </article>
            <article className="rounded-2xl border border-[#e0c89331] bg-[#15120eb5] p-4 text-center">
              <p className="text-xl font-medium text-[#f8f1e3]" style={{ fontFamily: 'var(--font-display)' }}>Dedicated</p>
              <p className="mt-1 text-sm text-[#b7ac97]">Brand Website</p>
            </article>
          </div>
        </section>
      </MotionWrapper>

      <MotionWrapper delay={0.26}>
        <div className={styles.actionRow}>
        <Link href="/brands" className={styles.backLink}>
          Back to All Brands
        </Link>
        <a
          href={brandWebsiteUrl}
          target="_self"
          rel="noopener noreferrer"
          className={styles.inlineBrandAction}
        >
          {brandWebsiteLabel}
        </a>
        <Link href="/business-with-us" className={styles.inlineBrandAction}>
          Business Inquiry
        </Link>
        </div>
      </MotionWrapper>

      <MotionWrapper delay={0.32}>
        <div className={`${arStyles.arTheme} scroll-mt-28`}>
          <BrandTransitionBanner />
        </div>
      </MotionWrapper>
    </main>
  );
}
