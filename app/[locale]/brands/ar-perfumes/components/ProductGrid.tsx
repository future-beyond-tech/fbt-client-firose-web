import ProductCard from './ProductCard';
import { products } from './products';
import styles from './arPerfumes.module.css';

type ProductGridProps = {
  title?: string;
  subtitle?: string;
  sectionId?: string;
};

export default function ProductGrid({
  title = 'Featured Collection',
  subtitle = 'Curated fragrances that embody elegance and identity.',
  sectionId = 'products',
}: ProductGridProps) {
  return (
    <section className={`${styles.section} ${styles.collectionSection}`} id={sectionId}>
      <div className={styles.container}>
        <div className={styles.sectionTitle}>
          <h2>{title}</h2>
          <p>{subtitle}</p>
        </div>

        <div className={styles.collectionGrid}>
          {products.map((product) => (
            <ProductCard key={product.slug} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
