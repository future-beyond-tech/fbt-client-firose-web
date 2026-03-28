import Image from 'next/image';
import styles from './arPerfumes.module.css';

type AboutProps = {
  variant?: 'short' | 'full';
  sectionId?: string;
};

export default function About({ variant = 'short', sectionId = 'about' }: AboutProps) {
  const full = variant === 'full';

  return (
    <section className={`${styles.section} ${styles.aboutSection}`} id={sectionId}>
      <div className={styles.container}>
        <div className={styles.sectionTitle}>
          <h2>{full ? 'Our Story' : 'The Essence of AR'}</h2>
          <p>
            {full
              ? 'Built on heritage ingredients and modern refinement, AR Perfume is crafted for intentional presence.'
              : 'Tradition, intention, and timeless refinement in every bottle.'}
          </p>
        </div>

        <div className={styles.aboutGrid}>
          <div className={styles.aboutCopy}>
            <p>
              AR Perfume was created from one belief: presence is felt before words are spoken. Every composition is
              built to leave a calm, premium impression that reflects identity.
            </p>
            <p>
              Our inspiration comes from timeless perfumery traditions, interpreted for modern daily wear with depth,
              balance, and consistency.
            </p>
            {full ? (
              <p>
                Quality and authenticity guide every bottle. From raw material selection to blending discipline, we
                focus on reliable performance and a signature finish worthy of gifting.
              </p>
            ) : null}
          </div>

          <div className={styles.aboutVisual}>
            <Image
              src="/images/about.png"
              alt="AR Perfume craftsmanship and elegance"
              width={800}
              height={450}
              sizes="(max-width: 1023px) 100vw, 45vw"
            />
          </div>
        </div>

        {full ? (
          <div className={styles.aboutHighlights}>
            <article className={styles.aboutHighlightCard}>
              <h3>Brand Story</h3>
              <p>AR Perfume is rooted in confidence, calm character, and luxury that feels intentional.</p>
            </article>
            <article className={styles.aboutHighlightCard}>
              <h3>Inspiration</h3>
              <p>Traditional notes and modern blending practices create scents with depth and identity.</p>
            </article>
            <article className={styles.aboutHighlightCard}>
              <h3>Quality & Authenticity</h3>
              <p>Each formula is curated for authenticity, balance, and dependable long-wear experience.</p>
            </article>
          </div>
        ) : null}
      </div>
    </section>
  );
}
