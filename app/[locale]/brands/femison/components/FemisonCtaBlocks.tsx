import Link from 'next/link';
import styles from './femison.module.css';

type FemisonCtaBlocksProps = {
  whatsappUrl: string;
  mailtoUrl: string;
};

export default function FemisonCtaBlocks({ whatsappUrl, mailtoUrl }: Readonly<FemisonCtaBlocksProps>) {
  return (
    <section className={styles.ctaGrid}>
      <article className={styles.ctaCard}>
        <h3 className={styles.ctaTitle}>Healthcare &amp; Retail Channel Expansion</h3>
        <p className={styles.ctaText}>
          Expand Femison across healthcare and retail channels with a structured distributor onboarding model.
        </p>
        <Link href="/business-with-us" className={styles.ctaLink}>
          Start Business Inquiry
        </Link>
      </article>

      <article className={styles.ctaCard}>
        <h3 className={styles.ctaTitle}>Product &amp; Distribution Discussions</h3>
        <p className={styles.ctaText}>
          Connect with the brand desk for product profiles, dosage guidance references, and documentation support.
        </p>
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
