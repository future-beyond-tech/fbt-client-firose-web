import { Link } from '@/i18n/navigation';
import styles from './femison.module.css';

type FemisonCtaBlocksProps = {
  whatsappUrl: string;
  mailtoUrl: string | null;
};

export default function FemisonCtaBlocks({ whatsappUrl, mailtoUrl }: Readonly<FemisonCtaBlocksProps>) {
  return (
    <section className={styles.ctaGrid}>
      <article className={styles.ctaCard}>
        <h3 className={styles.ctaTitle}>Consumer &amp; Retail Channel Enquiries</h3>
        <p className={styles.ctaText}>
          Discuss retail, distribution, and product-information requirements with the FIROSE business team.
        </p>
        <Link href="/business-with-us" className={styles.ctaLink}>
          Start Business Inquiry
        </Link>
      </article>

      <article className={styles.ctaCard}>
        <h3 className={styles.ctaTitle}>Product &amp; Distribution Discussions</h3>
        <p className={styles.ctaText}>
          Connect with the brand desk for product profiles, pack information, and available documentation.
        </p>
        <div className={styles.ctaActionRow}>
          <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className={styles.ctaLink}>
            WhatsApp Contact
          </a>
          {mailtoUrl ? <a href={mailtoUrl} className={styles.ctaLink}>Email Contact</a> : null}
        </div>
      </article>
    </section>
  );
}
