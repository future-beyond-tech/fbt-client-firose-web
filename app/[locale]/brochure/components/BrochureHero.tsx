import styles from '../brochure.module.css';
import MotionWrapper from '@/app/components/motion/MotionWrapper';

export default function BrochureHero() {
  return (
    <section className={styles.hero} id="hero">
      <div className={styles.container}>
        <div className={styles.heroInner}>
          <MotionWrapper delay={0}>
            <div className={styles.heroBadge}>
              Digital Brochure 2026
            </div>
          </MotionWrapper>

          <MotionWrapper delay={0.08}>
            <h1 className={styles.heroTitle}>
              FIROSE Group Product Catalogue
            </h1>
          </MotionWrapper>

          <MotionWrapper delay={0.16}>
            <p className={styles.heroLead}>
              Explore our complete product range across two trusted consumer brands — health, wellness, and home care solutions for every Indian household.
            </p>
          </MotionWrapper>

          <MotionWrapper delay={0.24}>
            <div className={styles.heroStats}>
              <div className={styles.heroStat}>
                <span className={styles.heroStatValue}>55+</span>
                <span className={styles.heroStatLabel}>Products</span>
              </div>
              <div className={styles.heroStat}>
                <span className={styles.heroStatValue}>2</span>
                <span className={styles.heroStatLabel}>Brands</span>
              </div>
              <div className={styles.heroStat}>
                <span className={styles.heroStatValue}>29</span>
                <span className={styles.heroStatLabel}>Femison SKUs</span>
              </div>
              <div className={styles.heroStat}>
                <span className={styles.heroStatValue}>26</span>
                <span className={styles.heroStatLabel}>Neat & Fresh SKUs</span>
              </div>
            </div>
          </MotionWrapper>

          <MotionWrapper delay={0.32}>
            <div className={styles.heroActions}>
              <a href="#femison" className={styles.btnPrimary}>
                Explore Femison
              </a>
              <a href="#neat-fresh" className={styles.btnSecondary}>
                Explore Neat & Fresh
              </a>
              <a href="#download" className={styles.btnOutline}>
                Download PDF
              </a>
            </div>
          </MotionWrapper>
        </div>
      </div>
    </section>
  );
}
