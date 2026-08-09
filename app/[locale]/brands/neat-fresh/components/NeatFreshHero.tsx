import { Link } from '@/i18n/navigation';
import styles from './neatFresh.module.css';

type NeatFreshHeroProps = {
  whatsappUrl: string;
  contactPerson: string;
};

export default function NeatFreshHero({ whatsappUrl, contactPerson }: Readonly<NeatFreshHeroProps>) {
  const readinessBlocks = [
    { label: 'Catalogue Position', value: 'Housekeeping & Hygiene' },
    { label: 'Enquiry Channels', value: 'Retail & Institutional' },
    { label: 'Partner Contact', value: contactPerson },
  ];

  return (
    <section className={styles.hero}>
      <p className={styles.heroBadge}>Operational Readiness</p>
      <h2 className={styles.heroTitle}>Channel-Ready Hygiene Portfolio</h2>
      <p className={styles.heroLead}>
        Organized for catalogue discovery, pack-size comparison, and retail, distributor, or institutional enquiries.
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
          Start Distributor Discussion
        </Link>
        <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className={styles.heroSecondary}>
          WhatsApp Brand Team
        </a>
      </div>
    </section>
  );
}
