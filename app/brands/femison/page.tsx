import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import MotionWrapper from '@/app/components/motion/MotionWrapper';
import {
  buildBrandMailToUrl,
  buildBrandWhatsAppUrl,
  getBrandBySlug,
} from '@/app/lib/brands';
import { brandVisuals } from '@/app/lib/brandVisuals';
import FemisonContactCard from './components/FemisonContactCard';
import FemisonCtaBlocks from './components/FemisonCtaBlocks';
import FemisonHero from './components/FemisonHero';
import FemisonProductSections from './components/FemisonProductSections';
import FemisonTransitionBanner from './components/FemisonTransitionBanner';
import brandStyles from './components/femison.module.css';
import styles from '../brands.module.css';

const femisonBrand = getBrandBySlug('femison');
const femisonContact = femisonBrand.contact;

const femisonWhatsAppUrl = buildBrandWhatsAppUrl(
  femisonContact,
  'Hello, I would like to discuss Femison baby gripe water, Arwat, and glucose distribution opportunities.'
);
const femisonMailToUrl = buildBrandMailToUrl(
  femisonContact,
  'Femison Enquiry',
  'Hello, I would like to discuss Femison baby gripe water, Arwat, and glucose product information and channel opportunities.'
);
const femisonVisual = brandVisuals.femison;
const FEMISON_WEBSITE_URL = 'https://femison.in';

export const metadata: Metadata = {
  title: 'Femison',
  description:
    'Femison is the baby gripe water, Arwat, and glucose brand under Firose Enterprises, built for infant care and everyday family wellness. The dedicated website is available at femison.in.',
};

export default function Femison() {
  return (
    <main id="main-content" className={`${styles.brandPage} ${brandStyles.brandPageTheme} ${brandStyles.pageFrame}`}>
      <MotionWrapper delay={0.04}>
        <section className={brandStyles.masthead}>
        <div className={brandStyles.mastheadMedia}>
          <Image
            src={femisonVisual.heroImage}
            alt={femisonVisual.alt}
            fill
            className={brandStyles.mastheadImage}
            sizes="(max-width: 899px) 100vw, 44vw"
            priority
          />
          <div className={brandStyles.mastheadOverlay} />
          <p className={brandStyles.mastheadTag}>{femisonVisual.focus}</p>
        </div>

        <div className={brandStyles.mastheadContent}>
          <p className={brandStyles.mastheadEyebrow}>Baby Care &amp; Nutrition Brand</p>
          <h1 className={brandStyles.mastheadTitle}>Femison</h1>
          <p className={brandStyles.mastheadLead}>
            A trusted infant-care and family wellness portfolio with safety-focused formulations built for pharmacy,
            retail, and distributor channels.
          </p>
          <div className={brandStyles.mastheadChipRow}>
            <p className={brandStyles.mastheadChip}>Baby Gripe Water</p>
            <p className={brandStyles.mastheadChip}>Arwat Formulations</p>
            <p className={brandStyles.mastheadChip}>Glucose for All Ages</p>
          </div>

          <div className={brandStyles.mastheadActions}>
            <a href={FEMISON_WEBSITE_URL} target="_self" rel="noopener noreferrer" className={brandStyles.heroPrimary}>
              Visit Website
            </a>
            <Link href="/business-with-us" className={brandStyles.heroSecondary}>
              Healthcare Inquiry
            </Link>
          </div>
        </div>
        </section>
      </MotionWrapper>

      <MotionWrapper delay={0.1}>
        <FemisonTransitionBanner />
      </MotionWrapper>

      <MotionWrapper delay={0.16}>
        <div className={styles.actionRow}>
        <Link href="/brands" className={styles.backLink}>
          Back to All Brands
        </Link>
        <Link href="/business-with-us" className={`${styles.inlineBrandAction} ${brandStyles.brandAction}`}>
          Inquiry
        </Link>
        </div>
      </MotionWrapper>

      <MotionWrapper delay={0.2}>
        <FemisonHero whatsappUrl={femisonWhatsAppUrl} contactPerson={femisonContact.personName} />
      </MotionWrapper>
      <MotionWrapper delay={0.24}>
        <FemisonProductSections />
      </MotionWrapper>
      <MotionWrapper delay={0.28}>
        <section className="fe-panel p-5 sm:p-7">
          <header className="grid gap-2">
            <p className="text-[11px] uppercase tracking-[0.2em] text-[#b59f75]">Key Metrics</p>
            <h2 className="text-3xl font-normal text-[#f8f1e3] sm:text-4xl">Femison at a Glance</h2>
          </header>
          <div className="mt-4 grid grid-cols-2 gap-3 lg:grid-cols-4">
            <article className="rounded-2xl border border-[#e0c89331] bg-[#15120eb5] p-4 text-center">
              <p className="text-2xl font-medium text-[#f8f1e3]" style={{ fontFamily: '"Iowan Old Style", "Palatino Linotype", serif' }}>3+</p>
              <p className="mt-1 text-sm text-[#b7ac97]">Baby Care Products</p>
            </article>
            {/* PLACEHOLDER: METRIC - Femison hospitals served (owner to provide) */}
            <article className="rounded-2xl border border-[#e0c89331] bg-[#15120eb5] p-4 text-center">
              <p className="text-2xl font-medium text-[#7d745f]" style={{ fontFamily: '"Iowan Old Style", "Palatino Linotype", serif' }}>X+</p>
              <p className="mt-1 text-sm text-[#b7ac97]">Hospitals Served</p>
            </article>
            {/* PLACEHOLDER: METRIC - Femison pharmacy partners (owner to provide) */}
            <article className="rounded-2xl border border-[#e0c89331] bg-[#15120eb5] p-4 text-center">
              <p className="text-2xl font-medium text-[#7d745f]" style={{ fontFamily: '"Iowan Old Style", "Palatino Linotype", serif' }}>X+</p>
              <p className="mt-1 text-sm text-[#b7ac97]">Pharmacy Partners</p>
            </article>
            {/* PLACEHOLDER: METRIC - Femison compliance status (owner to confirm FSSAI or other) */}
            <article className="rounded-2xl border border-[#e0c89331] bg-[#15120eb5] p-4 text-center">
              <p className="text-2xl font-medium text-[#7d745f]" style={{ fontFamily: '"Iowan Old Style", "Palatino Linotype", serif' }}>FSSAI</p>
              <p className="mt-1 text-sm text-[#b7ac97]">Compliant</p>
            </article>
          </div>
        </section>
      </MotionWrapper>

      <MotionWrapper delay={0.32}>
        <FemisonContactCard contact={femisonContact} whatsappUrl={femisonWhatsAppUrl} mailtoUrl={femisonMailToUrl} />
      </MotionWrapper>
      <MotionWrapper delay={0.36}>
        <FemisonCtaBlocks whatsappUrl={femisonWhatsAppUrl} mailtoUrl={femisonMailToUrl} />
      </MotionWrapper>
    </main>
  );
}
