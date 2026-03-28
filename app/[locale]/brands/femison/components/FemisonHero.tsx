import Link from 'next/link';
import styles from './femison.module.css';

type FemisonHeroProps = {
  whatsappUrl: string;
  contactPerson: string;
};

export default function FemisonHero({ whatsappUrl, contactPerson }: Readonly<FemisonHeroProps>) {
  const readinessBlocks = [
    { label: 'Clinical Position', value: 'Infant & Family Wellness' },
    { label: 'Channel Coverage', value: 'Pharmacy, Retail, Distribution' },
    { label: 'Partner Contact', value: contactPerson },
  ];

  return (
    <section className={styles.hero}>
      <p className={styles.heroBadge}>Operational Readiness</p>
      <h2 className={styles.heroTitle}>Healthcare-Ready Product Architecture</h2>
      <p className={styles.heroLead}>
        Built for healthcare and retail continuity with disciplined quality controls, documented process checkpoints,
        and dependable partner support.
      </p>

      <div className={styles.heroChipRow}>
        <p className={styles.heroChip}>Safety-Oriented Formulations</p>
        <p className={styles.heroChip}>Regulatory-Aware Documentation</p>
        <p className={styles.heroChip}>Distributor Onboarding Ready</p>
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
          Start Healthcare Inquiry
        </Link>
        <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className={styles.heroSecondary}>
          WhatsApp Brand Team
        </a>
      </div>
    </section>
  );
}
