import type { Metadata } from 'next';
import Link from 'next/link';
import BreadcrumbSchema from '@/app/components/BreadcrumbSchema';
import MotionWrapper from '@/app/components/motion/MotionWrapper';
import styles from '../../corporate.module.css';

export const metadata: Metadata = {
  title: 'Manufacturing & Quality',
  description:
    'Discover Firose Enterprises manufacturing standards, quality control process, and product safety approach.',
};

export default function ManufacturingQualityPage() {
  return (
    <main id="main-content" className={styles.page}>
      <BreadcrumbSchema items={[{ name: 'Home', href: '/' }, { name: 'Manufacturing & Quality', href: '/manufacturing-quality' }]} />
      <MotionWrapper delay={0.04}>
        <section className={styles.section}>
        <header className={styles.sectionHeading}>
          <p className={styles.eyebrow}>Authority & Compliance</p>
          <h1 className={styles.title}>Manufacturing &amp; Quality</h1>
          <p className={styles.lead}>
            We build products through process-led manufacturing and quality assurance frameworks that support trust,
            consistency, and regulatory readiness.
          </p>
        </header>

        <div className={styles.splitGrid}>
          <article className={styles.panel}>
            <h2 className={styles.sectionTitle}>Manufacturing Standards</h2>
            <ul className={styles.list}>
              <li>Documented SOP-driven production workflows.</li>
              <li>Category-specific handling protocols for fragrance, hygiene, and baby care.</li>
              <li>Traceable batch-level execution records.</li>
            </ul>
          </article>

          <article className={styles.panel}>
            <h2 className={styles.sectionTitle}>Quality Control Process</h2>
            <ul className={styles.list}>
              <li>Input quality verification for critical materials.</li>
              <li>In-process checks to reduce deviation risk.</li>
              <li>Final release checks before market dispatch.</li>
            </ul>
          </article>
        </div>
        </section>
      </MotionWrapper>

      <MotionWrapper delay={0.1}>
        <section className={styles.section}>
        <div className={styles.splitGrid}>
          <article className={styles.panel}>
            <h2 className={styles.sectionTitle}>Safety &amp; Compliance</h2>
            <ul className={styles.list}>
              <li>Safety-first operating controls across manufacturing and packaging stages.</li>
              <li>Regulatory-aware documentation and process discipline.</li>
              <li>Continuous review for quality and compliance consistency.</li>
            </ul>
          </article>

          <article className={styles.panel}>
            <h2 className={styles.sectionTitle}>Certifications</h2>
            <p>Certification and compliance documents can be shared based on onboarding stage and requirements.</p>
          </article>
        </div>

        <div className={styles.actionRow}>
          <Link href="/business-with-us" className={styles.primaryAction}>
            Business Inquiry
          </Link>
          <Link href="/contact" className={styles.inlineAction}>
            Contact Quality Team
          </Link>
        </div>
        </section>
      </MotionWrapper>
    </main>
  );
}
