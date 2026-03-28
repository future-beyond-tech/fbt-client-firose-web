import Link from 'next/link';
import styles from './neatFresh.module.css';

type NeatFreshHeroProps = {
  whatsappUrl: string;
  contactPerson: string;
};

export default function NeatFreshHero({ whatsappUrl, contactPerson }: Readonly<NeatFreshHeroProps>) {
  const readinessBlocks = [
    { label: 'Delivery Model', value: 'Regional + Bulk Logistics' },
    { label: 'Channel Fit', value: 'Retail, Office, Institutional' },
    { label: 'Partner Contact', value: contactPerson },
  ];

  return (
    <section className={styles.hero}>
      <p className={styles.heroBadge}>Operational Readiness</p>
      <h2 className={styles.heroTitle}>Channel-Ready Hygiene Portfolio</h2>
      <p className={styles.heroLead}>
        Structured for repeat procurement and long-term distributor growth with consistent formulations, dependable
        packaging, and scalable supply.
      </p>

      <div className={styles.heroChipRow}>
        <p className={styles.heroChip}>Standardized SKUs</p>
        <p className={styles.heroChip}>Procurement Friendly Packs</p>
        <p className={styles.heroChip}>Repeat Order Reliability</p>
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
