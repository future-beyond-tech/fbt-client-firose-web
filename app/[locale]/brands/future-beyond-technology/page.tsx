import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import MotionWrapper from '@/app/components/motion/MotionWrapper';
import { FBT_WEBSITE_URL } from '@/app/lib/divisions';
import FbtTransitionBanner from './components/FbtTransitionBanner';
import brandStyles from './components/fbt.module.css';
import styles from '../brands.module.css';

const FBT_HERO_IMAGE =
  'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1800&q=80';

const capabilitySignals = [
  {
    label: 'Product Engineering',
    title: 'Scalable Delivery',
    text: 'Production-grade software systems designed for scale, maintainability, and operational clarity.',
  },
  {
    label: 'Security Engineering',
    title: 'Security by Design',
    text: 'Threat-aware architecture, risk reduction, and secure implementation built into delivery from day one.',
  },
  {
    label: 'AI Automation',
    title: 'Intelligent Workflows',
    text: 'Applied AI for automation and decision support without compromising governance or reliability.',
  },
  {
    label: 'Consulting',
    title: 'Architecture Direction',
    text: 'Early-stage technical decision support for long-term performance, reliability, and cost control.',
  },
];

export const metadata: Metadata = {
  title: 'Future Beyond Technology (FBT)',
  description:
    'Future Beyond Technology (FBT) is the AI and cybersecurity division under Firose Enterprises. Explore the dedicated website at futurebeyondtech.com.',
};

export default function FutureBeyondTechnologyPage() {
  return (
    <main id="main-content" className={`${styles.brandPage} ${brandStyles.brandPageTheme} ${brandStyles.pageFrame}`}>
      <MotionWrapper delay={0.04}>
        <section className={brandStyles.masthead}>
        <div className={brandStyles.mastheadMedia}>
          <Image
            src={FBT_HERO_IMAGE}
            alt="Advanced secure engineering and AI systems environment"
            fill
            className={brandStyles.mastheadImage}
            sizes="(max-width: 920px) 100vw, 44vw"
            priority
          />
          <div className={brandStyles.mastheadOverlay} />
          <p className={brandStyles.mastheadTag}>AI &amp; Cybersecurity Division</p>
        </div>

        <div className={brandStyles.mastheadContent}>
          <p className={brandStyles.mastheadEyebrow}>Technology Division</p>
          <h1 className={brandStyles.mastheadTitle}>Future Beyond Technology (FBT)</h1>
          <p className={brandStyles.mastheadLead}>
            FBT delivers secure, scalable, and intelligent engineering systems for organizations that require strong
            architecture and long-term reliability.
          </p>
          <div className={brandStyles.mastheadChipRow}>
            <p className={brandStyles.mastheadChip}>Security-First Engineering</p>
            <p className={brandStyles.mastheadChip}>Clean Architecture</p>
            <p className={brandStyles.mastheadChip}>Enterprise AI</p>
          </div>

          <div className={brandStyles.mastheadActions}>
            <a href={FBT_WEBSITE_URL} target="_self" rel="noopener noreferrer" className={brandStyles.heroPrimary}>
              Visit Official Website
            </a>
            <Link href="/business-with-us" className={brandStyles.heroSecondary}>
              Strategic Inquiry
            </Link>
          </div>
        </div>
        </section>
      </MotionWrapper>

      <MotionWrapper delay={0.1}>
        <FbtTransitionBanner />
      </MotionWrapper>

      <MotionWrapper delay={0.16} staggerChildren={0.08}>
        <section className={brandStyles.signalGrid} aria-label="FBT capability highlights">
        {capabilitySignals.map((signal) => (
          <article key={signal.label} className={brandStyles.signalCard}>
            <p className={brandStyles.signalLabel}>{signal.label}</p>
            <h2 className={brandStyles.signalTitle}>{signal.title}</h2>
            <p className={brandStyles.signalText}>{signal.text}</p>
          </article>
        ))}
        </section>
      </MotionWrapper>

      <MotionWrapper delay={0.22}>
        <section className="fe-panel p-5 sm:p-7">
          <header className="grid gap-2">
            <p className="text-[11px] uppercase tracking-[0.2em] text-[#b59f75]">Key Metrics</p>
            <h2 className="text-3xl font-normal text-[#f8f1e3] sm:text-4xl">FBT at a Glance</h2>
          </header>
          <div className="mt-4 grid grid-cols-2 gap-3 lg:grid-cols-4">
            <article className="rounded-2xl border border-[#e0c89331] bg-[#15120eb5] p-4 text-center">
              <p className="text-2xl font-medium text-[#f8f1e3]" style={{ fontFamily: 'var(--font-display)' }}>4</p>
              <p className="mt-1 text-sm text-[#b7ac97]">Core Capabilities</p>
            </article>
            <article className="rounded-2xl border border-[#e0c89331] bg-[#15120eb5] p-4 text-center">
              <p className="text-2xl font-medium text-[#f8f1e3]" style={{ fontFamily: 'var(--font-display)' }}>AI &amp; Security</p>
              <p className="mt-1 text-sm text-[#b7ac97]">Primary Focus</p>
            </article>
            {/* PLACEHOLDER: METRIC - FBT enterprise clients count (owner to provide) */}
            <article className="rounded-2xl border border-[#e0c89331] bg-[#15120eb5] p-4 text-center">
              <p className="text-2xl font-medium text-[#9e927b]" style={{ fontFamily: 'var(--font-display)' }}>X+</p>
              <p className="mt-1 text-sm text-[#b7ac97]">Enterprise Clients</p>
            </article>
            <article className="rounded-2xl border border-[#e0c89331] bg-[#15120eb5] p-4 text-center">
              <p className="text-2xl font-medium text-[#f8f1e3]" style={{ fontFamily: 'var(--font-display)' }}>Production-Grade</p>
              <p className="mt-1 text-sm text-[#b7ac97]">Delivery Standard</p>
            </article>
          </div>
        </section>
      </MotionWrapper>

      <MotionWrapper delay={0.26}>
        <div className={styles.actionRow}>
        <Link href="/brands" className={styles.backLink}>
          Back to All Brands
        </Link>
        <a href={FBT_WEBSITE_URL} target="_self" rel="noopener noreferrer" className={`${styles.inlineBrandAction} ${brandStyles.brandAction}`}>
          Visit futurebeyondtech.com
        </a>
        </div>
      </MotionWrapper>
    </main>
  );
}
