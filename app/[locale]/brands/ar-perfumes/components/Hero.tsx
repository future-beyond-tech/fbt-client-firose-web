import Image from 'next/image';
import Link from 'next/link';
import styles from './arPerfumes.module.css';

export default function Hero() {
  return (
    <section className={styles.hero}>
      <div className={styles.heroBg} aria-hidden="true" />

      <div className={styles.heroContent}>
        <Image
          src="/images/AR_Logo.PNG"
          alt="AR Perfumes logo"
          width={220}
          height={220}
          className={styles.heroLogoImage}
          priority
        />
        <p className={styles.heroLogo}>AR PERFUMES</p>
        <h1 className={styles.heroHeadline}>DEFINE YOUR PRESENCE</h1>
        <p className={styles.heroSubheadline}>A signature fragrance for every soul</p>
        <div className={styles.heroCta}>
          <Link href="#products" className={`${styles.btn} ${styles.btnPrimary}`}>
            Explore Collection
          </Link>
          <Link href="#why-choose" className={`${styles.btn} ${styles.btnSecondary}`}>
            Why Choose AR
          </Link>
        </div>
      </div>
    </section>
  );
}
