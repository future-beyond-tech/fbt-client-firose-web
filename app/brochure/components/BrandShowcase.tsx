import styles from '../brochure.module.css';
import MotionWrapper from '@/app/components/motion/MotionWrapper';
import { BrandMeta } from '../data/products';

interface BrandShowcaseProps {
  brand: BrandMeta;
  productCount: number;
  index: number;
}

export default function BrandShowcase({
  brand,
  productCount,
  index,
}: BrandShowcaseProps) {
  return (
    <section id={brand.id} className={styles.brandSection}>
      <div className={styles.container}>
        <MotionWrapper delay={0.04}>
          <div className={styles.brandHero}>
            {/* Left Column */}
            <div className={styles.brandHeroText}>
              {/* Brand Label Pill */}
              <div
                className={styles.brandLabel}
                style={{
                  background: brand.color + '22',
                  color: brand.color,
                  border: '1px solid ' + brand.color + '44',
                }}
              >
                Sub-Brand {index} · {productCount} Products
              </div>

              {/* Brand Name */}
              <h2 className={styles.brandName}>{brand.name}</h2>

              {/* Tagline */}
              <p className={styles.brandTagline}>{brand.tagline}</p>

              {/* Description */}
              <p className={styles.brandDescription}>{brand.description}</p>

              {/* Actions */}
              <div className={styles.brandActions}>
                <a
                  href={'#' + brand.id + '-products'}
                  className={styles.btnPrimary}
                >
                  View Products
                </a>
                <a href="#contact" className={styles.btnSecondary}>
                  Enquire Now
                </a>
              </div>
            </div>

            {/* Right Column - Category Grid */}
            <div className={styles.categoryGrid}>
              {brand.categories.map((category, idx) => (
                <div key={idx} className={styles.categoryCard}>
                  <div className={styles.categoryEmoji}>{category.emoji}</div>
                  <h3 className={styles.categoryTitle}>{category.label}</h3>
                  <span className={styles.categoryExamples}>
                    {category.examples}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </MotionWrapper>
      </div>
    </section>
  );
}
