import Image from 'next/image';
import styles from './arPerfumes.module.css';

const reasons = [
  {
    title: 'Lasting Signature',
    text: 'Fragrances designed for depth and projection without overpowering the room.',
  },
  {
    title: 'Premium Craft',
    text: 'Carefully selected notes balanced for richness, comfort, and daily wear.',
  },
  {
    title: 'Gift-Ready Packaging',
    text: 'Elegant presentation options for personal moments and special occasions.',
  },
];

export default function WhyChoose() {
  return (
    <section className={`${styles.section} ${styles.whySection}`} id="why-choose">
      <div className={styles.container}>
        <div className={styles.sectionTitle}>
          <h2>Why Choose AR Perfume</h2>
          <p>Luxury attars built for confidence, memory, and meaningful gifting.</p>
        </div>

        <div className={styles.whyGrid}>
          {reasons.map((reason) => (
            <article key={reason.title} className={styles.whyCard}>
              <h3 className={styles.whyCardTitle}>{reason.title}</h3>
              <p className={styles.whyCardText}>{reason.text}</p>
            </article>
          ))}
        </div>

        <div className={styles.giftPreview}>
          <div className={styles.giftImage}>
            <Image
              src="/images/gift-box.png"
              alt="AR Perfume gift set in standard packaging"
              width={640}
              height={640}
              sizes="(max-width: 1023px) 100vw, 30vw"
            />
          </div>
          <div className={styles.giftImage}>
            <Image
              src="/images/gift-box-sample.png"
              alt="AR Perfume gift set in premium packaging"
              width={640}
              height={640}
              sizes="(max-width: 1023px) 100vw, 30vw"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
