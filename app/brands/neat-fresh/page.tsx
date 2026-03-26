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
import BrandTransitionBanner from './components/BrandTransitionBanner';
import NeatFreshContactCard from './components/NeatFreshContactCard';
import NeatFreshCtaBlocks from './components/NeatFreshCtaBlocks';
import NeatFreshHero from './components/NeatFreshHero';
import NeatFreshProductSections from './components/NeatFreshProductSections';
import brandStyles from './components/neatFresh.module.css';
import styles from '../brands.module.css';

const neatFreshBrand = getBrandBySlug('neat-fresh');
const neatFreshContact = neatFreshBrand.contact;

const neatFreshWhatsAppUrl = buildBrandWhatsAppUrl(
  neatFreshContact,
  'Hello, I would like to discuss Neat & Fresh distribution and product options.'
);
const neatFreshMailToUrl = buildBrandMailToUrl(
  neatFreshContact,
  'Neat & Fresh Enquiry',
  'Hello, I would like to discuss Neat & Fresh products and distribution opportunities.'
);
const neatFreshVisual = brandVisuals['neat-fresh'];
const NEAT_FRESH_WEBSITE_URL = 'https://neatfresh.online';

export const metadata: Metadata = {
  title: 'Neat & Fresh',
  description:
    'Neat & Fresh is the housekeeping products brand under Firose Enterprises, serving home, office, and commercial hygiene segments. Now transitioning to neatfresh.online while maintaining the same quality standards and Firose Enterprises ownership.',
};

export default function NeatFresh() {
  return (
    <main id="main-content" className={`${styles.brandPage} ${brandStyles.brandPageTheme} ${brandStyles.pageFrame}`}>
      <MotionWrapper delay={0.04}>
        <section className={brandStyles.masthead}>
        <div className={brandStyles.mastheadMedia}>
          <Image
            src={neatFreshVisual.heroImage}
            alt={neatFreshVisual.alt}
            fill
            className={brandStyles.mastheadImage}
            sizes="(max-width: 899px) 100vw, 44vw"
            priority
          />
          <div className={brandStyles.mastheadOverlay} />
          <p className={brandStyles.mastheadTag}>{neatFreshVisual.focus}</p>
        </div>

        <div className={brandStyles.mastheadContent}>
          <p className={brandStyles.mastheadEyebrow}>Housekeeping Product Brand</p>
          <h1 className={brandStyles.mastheadTitle}>Neat &amp; Fresh</h1>
          <p className={brandStyles.mastheadLead}>
            A premium hygiene division built for dependable cleaning performance across residential, workplace, and
            institutional environments.
          </p>
          <div className={brandStyles.mastheadChipRow}>
            <p className={brandStyles.mastheadChip}>Surface Care</p>
            <p className={brandStyles.mastheadChip}>Disinfection Systems</p>
            <p className={brandStyles.mastheadChip}>Institutional Supply</p>
          </div>

          <div className={brandStyles.mastheadActions}>
            <a href={NEAT_FRESH_WEBSITE_URL} target="_self" rel="noopener noreferrer" className={brandStyles.heroPrimary}>
              Visit Website
            </a>
            <Link href="/business-with-us" className={brandStyles.heroSecondary}>
              Become a Distributor
            </Link>
          </div>
        </div>
        </section>
      </MotionWrapper>

      <MotionWrapper delay={0.1}>
        <BrandTransitionBanner />
      </MotionWrapper>

      <MotionWrapper delay={0.16}>
        <div className={styles.actionRow}>
        <Link href="/brands" className={styles.backLink}>
          Back to All Brands
        </Link>
        <Link href="/business-with-us" className={`${styles.inlineBrandAction} ${brandStyles.brandAction}`}>
          Become a Distributor
        </Link>
        </div>
      </MotionWrapper>

      <MotionWrapper delay={0.2}>
        <NeatFreshHero whatsappUrl={neatFreshWhatsAppUrl} contactPerson={neatFreshContact.personName} />
      </MotionWrapper>
      <MotionWrapper delay={0.24}>
        <NeatFreshProductSections />
      </MotionWrapper>
      <MotionWrapper delay={0.28}>
        <section className="fe-panel p-5 sm:p-7">
          <header className="grid gap-2">
            <p className="text-[11px] uppercase tracking-[0.2em] text-[#b59f75]">Key Metrics</p>
            <h2 className="text-3xl font-normal text-[#f8f1e3] sm:text-4xl">Neat &amp; Fresh at a Glance</h2>
          </header>
          <div className="mt-4 grid grid-cols-2 gap-3 lg:grid-cols-4">
            {/* PLACEHOLDER: METRIC - Neat & Fresh product SKUs (owner to provide) */}
            <article className="rounded-2xl border border-[#e0c89331] bg-[#15120eb5] p-4 text-center">
              <p className="text-2xl font-medium text-[#7d745f]" style={{ fontFamily: '"Iowan Old Style", "Palatino Linotype", serif' }}>X+</p>
              <p className="mt-1 text-sm text-[#b7ac97]">Product SKUs</p>
            </article>
            {/* PLACEHOLDER: METRIC - Neat & Fresh institutional clients (owner to provide) */}
            <article className="rounded-2xl border border-[#e0c89331] bg-[#15120eb5] p-4 text-center">
              <p className="text-2xl font-medium text-[#7d745f]" style={{ fontFamily: '"Iowan Old Style", "Palatino Linotype", serif' }}>X+</p>
              <p className="mt-1 text-sm text-[#b7ac97]">Institutional Clients</p>
            </article>
            {/* PLACEHOLDER: METRIC - Neat & Fresh cities covered (owner to provide) */}
            <article className="rounded-2xl border border-[#e0c89331] bg-[#15120eb5] p-4 text-center">
              <p className="text-2xl font-medium text-[#7d745f]" style={{ fontFamily: '"Iowan Old Style", "Palatino Linotype", serif' }}>X+</p>
              <p className="mt-1 text-sm text-[#b7ac97]">Cities Covered</p>
            </article>
            <article className="rounded-2xl border border-[#e0c89331] bg-[#15120eb5] p-4 text-center">
              <p className="text-2xl font-medium text-[#f8f1e3]" style={{ fontFamily: '"Iowan Old Style", "Palatino Linotype", serif' }}>Quality Assured</p>
              <p className="mt-1 text-sm text-[#b7ac97]">Standards</p>
            </article>
          </div>
        </section>
      </MotionWrapper>

      <MotionWrapper delay={0.32}>
        <NeatFreshContactCard
          contact={neatFreshContact}
          whatsappUrl={neatFreshWhatsAppUrl}
          mailtoUrl={neatFreshMailToUrl}
        />
      </MotionWrapper>
      <MotionWrapper delay={0.36}>
        <NeatFreshCtaBlocks whatsappUrl={neatFreshWhatsAppUrl} mailtoUrl={neatFreshMailToUrl} />
      </MotionWrapper>
    </main>
  );
}
