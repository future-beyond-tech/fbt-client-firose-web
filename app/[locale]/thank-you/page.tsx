import type { Metadata } from 'next';
import Link from 'next/link';
import BreadcrumbSchema from '@/app/components/BreadcrumbSchema';
import MotionWrapper from '@/app/components/motion/MotionWrapper';
import styles from '../../corporate.module.css';

export const metadata: Metadata = {
  title: 'Thank You',
  description: 'Thank you for your enquiry. The Firose Enterprises team will be in touch shortly.',
  robots: { index: false, follow: false },
};

export default function ThankYouPage() {
  return (
    <main id="main-content" className={styles.page}>
      <BreadcrumbSchema
        items={[
          { name: 'Home', href: '/' },
          { name: 'Thank You', href: '/thank-you' },
        ]}
      />

      <MotionWrapper delay={0.04}>
        <section className={styles.section} style={{ textAlign: 'center', paddingTop: 'clamp(2rem, 5vw, 3.5rem)', paddingBottom: 'clamp(2rem, 5vw, 3.5rem)' }}>
          <header className={styles.sectionHeading} style={{ alignItems: 'center' }}>
            <div
              style={{
                width: '4.5rem',
                height: '4.5rem',
                borderRadius: '50%',
                background: 'linear-gradient(140deg, #f1ddb4 0%, #d8b372 49%, #b98e4a 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 0.5rem',
                boxShadow: '0 10px 26px rgba(0,0,0,0.44), 0 0 0 1px rgba(224,200,147,0.44) inset',
              }}
              aria-hidden="true"
            >
              <svg
                width="32"
                height="32"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#20170d"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </div>

            <p className={styles.eyebrow} style={{ margin: '0 auto' }}>Confirmation</p>
            <h1 className={styles.title} style={{ maxWidth: '24ch', margin: '0.65rem auto 0' }}>
              Thank You for Reaching Out
            </h1>
            <p className={styles.lead} style={{ maxWidth: '52ch', margin: '0.35rem auto 0' }}>
              We have received your enquiry and our team will get back to you within 24 hours. We appreciate your interest in Firose Enterprises.
            </p>
          </header>

          <div className={styles.actionRow} style={{ justifyContent: 'center', marginTop: '1rem' }}>
            <Link href="/" className={styles.primaryAction}>
              Back to Home
            </Link>
            <Link href="/brands" className={styles.inlineAction}>
              Explore Our Brands
            </Link>
          </div>
        </section>
      </MotionWrapper>
    </main>
  );
}
