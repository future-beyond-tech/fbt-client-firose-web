import styles from './femison.module.css';

const focusAreas = [
  {
    title: 'Portfolio Positioning',
    description:
      'Femison combines baby gripe water, Arwat formulations, and glucose products for infant care and family wellness.',
    bullets: ['Infant comfort support products', 'Arwat health formulations', 'Glucose products for all age groups'],
  },
  {
    title: 'Safety & Quality Assurance',
    description: 'Quality systems emphasize consistency, handling discipline, and product integrity.',
    bullets: ['Controlled process checkpoints', 'Batch consistency focus', 'Packaging reliability standards'],
  },
  {
    title: 'Channel Use-Cases',
    description: 'Prepared for pharmacy, retail, and distributor-oriented demand environments.',
    bullets: ['Medical store distribution', 'General retail and grocery fit', 'Institutional inquiry readiness'],
  },
];

const trustSignals = ['Infant-safe communication focus', 'Safety-led production controls', 'Compliance-ready documentation'];

export default function FemisonProductSections() {
  return (
    <section className={styles.sectionBlock}>
      <header className={styles.sectionHeading}>
        <h3 className={styles.sectionTitle}>Portfolio Architecture</h3>
        <p className={styles.sectionLead}>
          A clean, trust-first product structure designed to support healthcare buyers, retail partners, and
          distributor expansion.
        </p>
      </header>

      <div className={styles.productGrid}>
        {focusAreas.map((area) => (
          <article key={area.title} className={styles.productCard}>
            <h4 className={styles.productTitle}>{area.title}</h4>
            <p className={styles.productText}>{area.description}</p>
            <ul className={styles.productList}>
              {area.bullets.map((point) => (
                <li key={point}>{point}</li>
              ))}
            </ul>
          </article>
        ))}
      </div>

      <article className={styles.productCard}>
        <h4 className={styles.productTitle}>Compliance &amp; Trust Indicators</h4>
        <p className={styles.productText}>
          Certification and assurance artifacts are available for onboarding and regulatory discussions.
        </p>
        <div className={styles.heroChipRow}>
          {trustSignals.map((signal) => (
            <p key={signal} className={styles.heroChip}>
              {signal}
            </p>
          ))}
        </div>
      </article>
    </section>
  );
}
