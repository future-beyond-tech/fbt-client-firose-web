import type { Metadata } from 'next';
import { Link } from '@/i18n/navigation';
import BreadcrumbSchema from '@/app/components/BreadcrumbSchema';
import CorporateLeadForm from '@/app/components/CorporateLeadForm';
import MotionWrapper from '@/app/components/motion/MotionWrapper';
import styles from '../../corporate.module.css';
import { createPageMetadata } from '@/app/lib/seo';

type PageProps = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  return createPageMetadata({
    title: 'Business With Us',
    description:
      'Connect with FIROSE Enterprises for distribution, bulk orders, category enquiries, and business partnerships.',
    path: '/business-with-us',
    locale,
  });
}

export default function BusinessWithUsPage() {
  return (
    <main id="main-content" className={styles.page}>
      <BreadcrumbSchema items={[{ name: 'Home', href: '/' }, { name: 'Business With Us', href: '/business-with-us' }]} />
      <MotionWrapper delay={0.04}>
        <section className={styles.section}>
        <header className={styles.sectionHeading}>
          <p className={styles.eyebrow}>Business Enquiries</p>
          <h1 className={styles.title}>Business With Us</h1>
          <p className={styles.lead}>
            Use this form to discuss distribution, bulk-order requirements, division opportunities, or other corporate enquiries.
          </p>
        </header>

        <div className={styles.splitGrid}>
          <article className={styles.panel}>
            <h2 className={styles.sectionTitle}>Distribution Enquiries</h2>
            <p>Share the market, channel, and division you are interested in so the business team can review the request.</p>
          </article>

          <article className={styles.panel}>
            <h2 className={styles.sectionTitle}>Bulk-Order Enquiries</h2>
            <p>Provide the relevant products, expected volume, location, and timing for a business review.</p>
          </article>

          <article className={styles.panel}>
            <h2 className={styles.sectionTitle}>Corporate &amp; Division Enquiries</h2>
            <p>Select the relevant division or “Corporate / General” so the request can be routed appropriately.</p>
          </article>
        </div>
        </section>
      </MotionWrapper>

      <MotionWrapper delay={0.1}>
        <section className={styles.section}>
        <article className={styles.contactCard}>
          <h2 className={styles.sectionTitle}>Submit a Business Request</h2>
          <CorporateLeadForm contextLabel="Business" buttonLabel="Submit Business Inquiry" showInquiryType />
        </article>

        <div className={styles.actionRow}>
          <Link href="/brands" className={styles.inlineAction}>
            Review Brand Portfolio
          </Link>
          <Link href="/manufacturing-quality" className={styles.inlineAction}>
            See Quality Framework
          </Link>
        </div>
        </section>
      </MotionWrapper>
    </main>
  );
}
