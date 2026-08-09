import styles from './femison.module.css';

const focusAreas = [
  {
    title: 'Portfolio Positioning',
    description:
      'Femison combines baby gripe water, Arwat, glucose, and related named products in a consumer-care catalogue.',
    bullets: ['Baby gripe water products', 'Arwat product formats', 'Glucose pack options'],
  },
  {
    title: 'Product Information',
    description: 'The catalogue presents product names, variants, pack sizes, and sourced pricing where available.',
    bullets: ['Product and variant names', 'Pack-size information', 'Direct enquiry options'],
  },
  {
    title: 'Channel Use-Cases',
    description: 'Prepared for pharmacy, retail, and distributor-oriented demand environments.',
    bullets: ['Retail enquiries', 'General trade discussions', 'Distributor enquiries'],
  },
];

const trustSignals = ['Pack directions apply', 'Documentation shared when verified', 'Claims require supporting evidence'];

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
        <h4 className={styles.productTitle}>Information &amp; Documentation</h4>
        <p className={styles.productText}>
          Applicable product documentation can be discussed during an enquiry. Certifications are not represented here
          until supporting records are verified.
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
