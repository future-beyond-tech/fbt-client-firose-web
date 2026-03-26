import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import BreadcrumbSchema from '@/app/components/BreadcrumbSchema';
import MotionWrapper from '@/app/components/motion/MotionWrapper';
import {
  getDivisionPageHref,
  getDivisionWebsiteHref,
  divisionCatalog,
} from '@/app/lib/divisions';
import styles from './brands.module.css';

export const metadata: Metadata = {
  title: 'Our Divisions',
  description:
    'Portfolio overview of AR Perfumes, Femison, Neat & Fresh, and Future Beyond Technology under Firose Enterprises.',
};

function ExternalLinkIcon({ className }: Readonly<{ className?: string }>) {
  return (
    <svg
      viewBox="0 0 20 20"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      aria-hidden="true"
      className={className}
    >
      <path d="M8 4h8v8" />
      <path d="M7 13l9-9" />
      <path d="M16 11v5H4V4h5" />
    </svg>
  );
}

export default function BrandsOverview() {
  return (
    <main id="main-content" className={styles.brandPage}>
      <BreadcrumbSchema items={[{ name: 'Home', href: '/' }, { name: 'Divisions', href: '/brands' }]} />
      <MotionWrapper delay={0.04}>
        <section className={styles.portfolioHero}>
        <p className={styles.brandItemTag}>FIROSE Division Architecture</p>
        <h2 className={styles.portfolioHeroTitle}>Explore Every Division</h2>
        <p className={styles.portfolioHeroLead}>
          FIROSE ENTERPRISES combines consumer-focused brands with an AI-driven technology division for diversified,
          long-horizon growth.
        </p>

        <div className={styles.chipRow}>
          <p className={styles.chip}>Fragrance</p>
          <p className={styles.chip}>Baby Care &amp; Nutrition</p>
          <p className={styles.chip}>Hygiene / FMCG</p>
          <p className={styles.chip}>AI & Cybersecurity</p>
          <p className={styles.chip}>Distributor Ready</p>
        </div>
        </section>
      </MotionWrapper>

      <MotionWrapper delay={0.1} staggerChildren={0.08}>
        <ul className={styles.brandList}>
        {divisionCatalog.map((division) => {
          const divisionPageHref = getDivisionPageHref(division);
          const divisionWebsiteHref = getDivisionWebsiteHref(division);
          const isTech = division.theme === 'tech';
          const ctaLabel = division.ctaLabel ?? 'Visit Website';
          const cardClass = isTech ? `${styles.brandVisualCard} ${styles.brandVisualCardTech}` : styles.brandVisualCard;
          const categoryClass = isTech
            ? `${styles.brandVisualCategory} ${styles.brandVisualCategoryTech}`
            : styles.brandVisualCategory;
          const actionClass = isTech
            ? `${styles.brandVisualAction} ${styles.brandVisualActionTech}`
            : styles.brandVisualAction;
          const titleClass = isTech
            ? `${styles.brandItemTitle} ${styles.brandItemTitleTech}`
            : styles.brandItemTitle;
          const focusClass = isTech
            ? `${styles.brandVisualFocus} ${styles.brandVisualFocusTech}`
            : styles.brandVisualFocus;
          const descriptionClass = styles.brandItemText;

          return (
            <li key={division.id}>
              <article className={cardClass}>
                <Link
                  href={divisionPageHref}
                  className={styles.brandVisualMediaLink}
                  aria-label={`Open ${division.name} division page`}
                >
                  <div className={styles.brandVisualMedia}>
                    <Image
                      src={division.image}
                      alt={division.imageAlt}
                      fill
                      className={styles.brandVisualImage}
                      sizes="(max-width: 767px) 100vw, (max-width: 1199px) 50vw, 33vw"
                    />
                    <div className={styles.brandVisualOverlay} />
                    <p className={categoryClass}>{division.category}</p>
                  </div>
                </Link>

                <div className={styles.brandVisualBody}>
                  <h3 className={titleClass}>{division.name}</h3>
                  <p className={focusClass}>
                    {isTech ? 'Technology Division' : 'Consumer Division'}
                  </p>
                  <p className={descriptionClass}>{division.description}</p>

                  <a
                    href={divisionWebsiteHref}
                    target="_self"
                    rel="noopener noreferrer"
                    className={actionClass}
                    aria-label={`Visit ${division.name} website`}
                  >
                    {ctaLabel}
                    <ExternalLinkIcon className="h-4 w-4" />
                  </a>
                </div>
              </article>
            </li>
          );
        })}
        </ul>
      </MotionWrapper>

      <MotionWrapper delay={0.18}>
        <div className={styles.actionRow}>
        <Link href="/" className={styles.backLink}>
          Back to Home
        </Link>
        <Link href="/business-with-us" className={styles.inlineBrandAction}>
          Business Inquiry
        </Link>
        </div>
      </MotionWrapper>
    </main>
  );
}
