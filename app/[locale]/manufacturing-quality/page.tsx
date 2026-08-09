import type { Metadata } from 'next';
import { Link } from '@/i18n/navigation';
import BreadcrumbSchema from '@/app/components/BreadcrumbSchema';
import EvidencePlaceholder from '@/app/components/EvidencePlaceholder';
import MotionWrapper from '@/app/components/motion/MotionWrapper';
import styles from '../../corporate.module.css';
import { createPageMetadata } from '@/app/lib/seo';

type PageProps = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  return createPageMetadata({
    title: 'Manufacturing & Quality',
    description:
      'Review the stated manufacturing process framework, quality checkpoints, documentation approach, and evidence readiness of FIROSE Enterprises.',
    path: '/manufacturing-quality',
    locale,
  });
}

export default function ManufacturingQualityPage() {
  return (
    <main id="main-content" className={styles.page}>
      <BreadcrumbSchema items={[{ name: 'Home', href: '/' }, { name: 'Manufacturing & Quality', href: '/manufacturing-quality' }]} />
      <MotionWrapper delay={0.04}>
        <section className={styles.section}>
        <header className={styles.sectionHeading}>
          <p className={styles.eyebrow}>Process &amp; Evidence</p>
          <h1 className={styles.title}>Manufacturing &amp; Quality</h1>
          <p className={styles.lead}>
            This page separates FIROSE&apos;s stated process framework from the photographs, records, licences, and
            certifications that must be verified before publication.
          </p>
        </header>

        <div className={styles.splitGrid}>
          <article className={styles.panel}>
            <h2 className={styles.sectionTitle}>Stated Process Framework</h2>
            <ul className={styles.list}>
              <li>SOP-driven production workflows.</li>
              <li>Incoming-material checks and category-specific handling steps.</li>
              <li>Batch records intended to support traceability.</li>
            </ul>
            <p className={styles.helperText}>These are process statements, not published proof of certification or test performance.</p>
          </article>

          <article className={styles.panel}>
            <h2 className={styles.sectionTitle}>Quality Control Process</h2>
            <ul className={styles.list}>
              <li>Incoming material review.</li>
              <li>In-process checkpoints and documentation.</li>
              <li>Final review before release and dispatch.</li>
            </ul>
          </article>
        </div>
        </section>
      </MotionWrapper>

      <MotionWrapper delay={0.1}>
        <section className={styles.section}>
        <div className={styles.splitGrid}>
          <article className={styles.panel}>
            <h2 className={styles.sectionTitle}>Documentation Readiness</h2>
            <ul className={styles.list}>
              <li>Process and batch documentation can be reviewed by applicable product category.</li>
              <li>Product claims require matching test, licence, or regulatory evidence before publication.</li>
              <li>Pack directions and applicable product records remain the source for product-specific use.</li>
            </ul>
          </article>

          <article className={styles.panel}>
            <h2 className={styles.sectionTitle}>Evidence Status</h2>
            <p>
              No certification, licence, facility photograph, test report, or compliance document was verified in the
              website repository during this content review.
            </p>
            <p>Quality documentation and certifications can be added for applicable product categories after verification.</p>
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

      <MotionWrapper delay={0.16}>
        <section className={styles.section}>
          <header className={styles.sectionHeading}>
            <p className={styles.eyebrow}>Verified Assets</p>
            <h2 className={styles.sectionTitle}>Evidence Library Structure</h2>
            <p className={styles.sectionLead}>
              These reserved content areas prevent unsupported stock imagery or certificate claims while keeping the page
              ready for genuine FIROSE materials.
            </p>
          </header>
          <div className={styles.splitGrid}>
            <EvidencePlaceholder title="Facility Photographs" description="Exterior, production-area, and equipment photographs with confirmed location and capture details." />
            <EvidencePlaceholder title="Quality-Control Process" description="Photographs or approved diagrams showing incoming, in-process, and final checks." />
            <EvidencePlaceholder title="Packaging Process" description="Approved packaging-line and batch-identification visuals for applicable products." />
            <EvidencePlaceholder title="Certifications & Licences" description="Current documents with readable issuer, holder, scope, licence number, and validity dates." />
          </div>
        </section>
      </MotionWrapper>
    </main>
  );
}
