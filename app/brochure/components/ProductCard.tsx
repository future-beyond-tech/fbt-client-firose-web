'use client';

import { Product, brandMeta } from '../data/products';
import { buildBrandWhatsAppUrl, buildBrandMailToUrl, getBrandBySlug } from '@/app/lib/brands';
import styles from '../brochure.module.css';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const brandContact = getBrandBySlug(product.brand === 'neat-fresh' ? 'neat-fresh' : 'femison').contact;
  const meta = brandMeta[product.brand];

  return (
    <div
      className={styles.cardWrap}
      aria-label={`${product.name} - ${product.size}`}
      tabIndex={0}
    >
      <div className={styles.card}>
        {/* FRONT */}
        <div className={styles.cardFront}>
          <div
            className={`${styles.cardImage} ${
              product.brand === 'femison' ? styles.cardImageFemison : styles.cardImageNeatFresh
            }`}
          >
            <div
              className={styles.cardBrandStrip}
              style={{ background: meta.color + '33', color: meta.color }}
            >
              {meta.name}
            </div>
            {product.isNew && <div className={styles.cardNewBadge}>NEW</div>}
            <div className={styles.cardEmoji}>{product.emoji}</div>
          </div>

          <div className={styles.cardBody}>
            <h3 className={styles.cardTitle}>{product.name}</h3>
            <p className={styles.cardVariant}>{product.variant}</p>
            <div className={styles.cardMeta}>
              <span className={styles.cardSize}>{product.size}</span>
              {product.mrp !== null ? (
                <span className={styles.cardPrice}>₹{product.mrp}</span>
              ) : (
                <span className={styles.cardPriceTbd}>MRP TBD</span>
              )}
            </div>
          </div>
        </div>

        {/* BACK */}
        <div className={styles.cardBack}>
          <h3 className={styles.cardBackTitle}>{product.name}</h3>
          <p className={styles.cardBackSub}>
            {product.variant} · {product.size}
          </p>

          <ul className={styles.cardFeatures}>
            {product.features.map((feature, index) => (
              <li key={index}>{feature}</li>
            ))}
          </ul>

          <div className={styles.cardBackActions}>
            <a
              className={styles.btnWhatsapp}
              href={buildBrandWhatsAppUrl(
                brandContact,
                `Hello! I am interested in: ${product.name} – ${product.variant} (${product.size}). Please share details.`
              )}
              target="_blank"
              rel="noopener noreferrer"
            >
              WhatsApp
            </a>
            <a
              className={styles.btnSecondary}
              href={buildBrandMailToUrl(
                brandContact,
                `Enquiry: ${product.name}`,
                `Hello, I am interested in ${product.name} (${product.variant}, ${product.size}). Please share pricing and availability.`
              )}
            >
              Email
            </a>
            <a
              className={styles.btnSecondary}
              href={`tel:${brandContact.phone}`}
            >
              Call
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
