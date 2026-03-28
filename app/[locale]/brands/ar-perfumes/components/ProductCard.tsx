import Image from 'next/image';
import { Product, buildWhatsAppOrderUrl } from './products';
import styles from './arPerfumes.module.css';

type ProductCardProps = {
  product: Product;
};

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <article className={styles.perfumeCard}>
      <div className={styles.perfumeCardImage}>
        <Image
          src={product.image}
          alt={`${product.name} — AR Perfume`}
          width={120}
          height={180}
          sizes="(max-width: 767px) 40vw, (max-width: 1023px) 24vw, 160px"
        />
      </div>
      <h3 className={styles.perfumeCardName}>{product.name}</h3>
      <p className={styles.perfumeCardDesc}>{product.shortDescription}</p>
      <a
        href={buildWhatsAppOrderUrl(product.name)}
        target="_blank"
        rel="noopener noreferrer"
        className={`${styles.btn} ${styles.btnSecondary} ${styles.orderButton}`}
      >
        Order on WhatsApp
      </a>
    </article>
  );
}
