import styles from './neatFresh.module.css';

const productGroups = [
  {
    title: 'Home Cleaning Range',
    description: 'General cleaners and household formulations for daily hygiene.',
    bullets: ['Floor-cleaning products', 'Bathroom-care products', 'Kitchen-cleaning products'],
  },
  {
    title: 'Floor & Surface Care',
    description: 'Named liquid and powder product formats for routine housekeeping use.',
    bullets: ['Floor-care liquids', 'Surface-cleaning products', 'Pack directions apply'],
  },
  {
    title: 'Institutional Formats',
    description: 'Channel-ready packing options for offices and commercial operations.',
    bullets: ['Bulk packs', 'Procurement-friendly SKUs', 'Repeat-order consistency'],
  },
];

const targetSegments = ['Homes', 'Apartments', 'Offices', 'Commercial Facilities', 'Institutional Buyers'];

export default function NeatFreshProductSections() {
  return (
    <section className={styles.sectionBlock}>
      <header className={styles.sectionHeading}>
        <h3 className={styles.sectionTitle}>Portfolio Architecture</h3>
        <p className={styles.sectionLead}>
          A clean, category-led structure designed for fast distributor onboarding and clear procurement conversations.
        </p>
      </header>

      <div className={styles.productGrid}>
        {productGroups.map((group) => (
          <article key={group.title} className={styles.productCard}>
            <h4 className={styles.productTitle}>{group.title}</h4>
            <p className={styles.productText}>{group.description}</p>
            <ul className={styles.productList}>
              {group.bullets.map((point) => (
                <li key={point}>{point}</li>
              ))}
            </ul>
          </article>
        ))}
      </div>

      <article className={styles.productCard}>
        <h4 className={styles.productTitle}>Core Demand Segments</h4>
        <p className={styles.productText}>Priority channels where Neat &amp; Fresh is built to scale through partner networks.</p>
        <div className={styles.heroChipRow}>
          {targetSegments.map((segment) => (
            <p key={segment} className={styles.heroChip}>
              {segment}
            </p>
          ))}
        </div>
      </article>
    </section>
  );
}
