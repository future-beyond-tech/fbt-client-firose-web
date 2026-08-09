import { Link } from '@/i18n/navigation';
import styles from './femison.module.css';

type FemisonHeroProps = {
  whatsappUrl: string;
  contactPerson: string;
};

export default function FemisonHero({ whatsappUrl, contactPerson }: Readonly<FemisonHeroProps>) {
  const readinessBlocks = [
    { label: 'Portfolio Position', value: 'Consumer & Family Care' },
    { label: 'Enquiry Channels', value: 'Retail & Distribution' },
    { label: 'Partner Contact', value: contactPerson },
  ];

  return (
    <section className={styles.hero}>
      <p className={styles.heroBadge}>Operational Readiness</p>
      <h2 className={styles.heroTitle}>Consumer-Care Product Architecture</h2>
      <p className={styles.heroLead}>
        Organized for clear catalogue discovery, pack-size comparison, and direct product or distribution enquiries.
      </p>

      <div className={styles.heroChipRow}>
        <p className={styles.heroChip}>Named Product Portfolio</p>
        <p className={styles.heroChip}>Pack-Size Information</p>
        <p className={styles.heroChip}>Direct Enquiry Route</p>
      </div>

      <div className={styles.readinessGrid}>
        {readinessBlocks.map((block) => (
          <article key={block.label} className={styles.readinessCard}>
            <p className={styles.readinessLabel}>{block.label}</p>
            <p className={styles.readinessValue}>{block.value}</p>
          </article>
        ))}
      </div>

      <p className={styles.heroContactHint}>Primary brand contact: {contactPerson}</p>

      <div className={styles.heroActionRow}>
        <Link href="/business-with-us" className={styles.heroPrimary}>
          Start Product Enquiry
        </Link>
        <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className={styles.heroSecondary}>
          WhatsApp Brand Team
        </a>
      </div>
    </section>
  );
}
