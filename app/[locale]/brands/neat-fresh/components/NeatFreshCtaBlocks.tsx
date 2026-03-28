import Link from 'next/link';
import styles from './neatFresh.module.css';

type NeatFreshCtaBlocksProps = {
  whatsappUrl: string;
  mailtoUrl: string;
};

export default function NeatFreshCtaBlocks({ whatsappUrl, mailtoUrl }: Readonly<NeatFreshCtaBlocksProps>) {
  return (
    <section className={styles.ctaGrid}>
      <article className={styles.ctaCard}>
        <h3 className={styles.ctaTitle}>Distributor Expansion</h3>
        <p className={styles.ctaText}>
          Expand Neat &amp; Fresh across regional retail and institutional channels with a clear onboarding and support flow.
        </p>
        <Link href="/business-with-us" className={styles.ctaLink}>
          Start Distributor Inquiry
        </Link>
      </article>

      <article className={styles.ctaCard}>
        <h3 className={styles.ctaTitle}>Bulk Supply Discussions</h3>
        <p className={styles.ctaText}>Share volume, frequency, and delivery timelines for housekeeping and hygiene procurement.</p>
        <div className={styles.ctaActionRow}>
          <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className={styles.ctaLink}>
            WhatsApp Contact
          </a>
          <a href={mailtoUrl} className={styles.ctaLink}>
            Email Contact
          </a>
        </div>
      </article>
    </section>
  );
}
