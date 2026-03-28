import type { Metadata } from 'next';
import Image from 'next/image';
import { getTranslations } from 'next-intl/server';
import BreadcrumbSchema from '@/app/components/BreadcrumbSchema';
import MotionWrapper from '@/app/components/motion/MotionWrapper';
import {
  getDivisionPageHref,
  getDivisionWebsiteHref,
  divisionCatalog,
} from '@/app/lib/divisions';
import { divisionMessageKeys } from '@/app/lib/divisionMessages';
import { Link } from '@/i18n/navigation';
import styles from './brands.module.css';

type PageProps = {
  params: Promise<{ locale: string }>;
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

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'brands' });

  return {
    title: t('title'),
    description: t('description'),
  };
}

export default async function BrandsOverview() {
  const tBrands = await getTranslations('brands');
  const tNav = await getTranslations('nav');
  const tCommon = await getTranslations('common');
  const tDivisionCard = await getTranslations('divisionCard');
  const tDivisions = await getTranslations('divisions');

  return (
    <main id="main-content" className={styles.brandPage}>
      <BreadcrumbSchema items={[{ name: tNav('home'), href: '/' }, { name: tBrands('title'), href: '/brands' }]} />
      <MotionWrapper delay={0.04}>
        <section className={styles.portfolioHero}>
          <p className={styles.brandItemTag}>{tBrands('divisionArchitecture')}</p>
          <h2 className={styles.portfolioHeroTitle}>{tBrands('exploreEvery')}</h2>
          <p className={styles.portfolioHeroLead}>{tBrands('brandsIntro')}</p>

          <div className={styles.chipRow}>
            <p className={styles.chip}>{tBrands('fragrance')}</p>
            <p className={styles.chip}>{tBrands('babyCare')}</p>
            <p className={styles.chip}>{tBrands('hygieneFmcg')}</p>
            <p className={styles.chip}>{tBrands('aiCyber')}</p>
            <p className={styles.chip}>{tBrands('distributorReady')}</p>
          </div>
        </section>
      </MotionWrapper>

      <MotionWrapper delay={0.1} staggerChildren={0.08}>
        <ul className={styles.brandList}>
          {divisionCatalog.map((division) => {
            const divisionPageHref = getDivisionPageHref(division);
            const divisionWebsiteHref = getDivisionWebsiteHref(division);
            const isTech = division.theme === 'tech';
            const keys = divisionMessageKeys[division.id];
            const divisionName = tDivisions(keys.name);
            const divisionCategory = tDivisions(keys.category);
            const divisionDescription = tDivisions(keys.description);
            const ctaLabel = division.ctaLabel ?? tCommon('visitWebsite');
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
                    aria-label={tDivisionCard('openDivision', { name: divisionName })}
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
                      <p className={categoryClass}>{divisionCategory}</p>
                    </div>
                  </Link>

                  <div className={styles.brandVisualBody}>
                    <h3 className={titleClass}>{divisionName}</h3>
                    <p className={focusClass}>{isTech ? tBrands('technologyDivision') : tBrands('consumerDivision')}</p>
                    <p className={descriptionClass}>{divisionDescription}</p>

                    <a
                      href={divisionWebsiteHref}
                      target="_self"
                      rel="noopener noreferrer"
                      className={actionClass}
                      aria-label={tDivisionCard('visitExternal', { name: divisionName })}
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
            {tCommon('backToHome')}
          </Link>
          <Link href="/business-with-us" className={styles.inlineBrandAction}>
            {tBrands('businessInquiry')}
          </Link>
        </div>
      </MotionWrapper>
    </main>
  );
}
