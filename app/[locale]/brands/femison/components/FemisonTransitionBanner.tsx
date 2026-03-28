import Link from 'next/link';
import styles from './femison.module.css';

const FEMISON_WEBSITE_URL = 'https://femison.in';

export default function FemisonTransitionBanner() {
  return (
    <section className={styles.transitionBanner}>
      <div className={styles.transitionContent}>
        <div className={styles.transitionIcon} aria-hidden="true">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={styles.iconSvg}
          >
            <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
          </svg>
        </div>

        <div className={styles.transitionText}>
          <h3 className={styles.transitionTitle}>Femison is Now Available on Its Dedicated Website</h3>
          <p className={styles.transitionDescription}>
            Visit <strong>femison.in</strong> for brand-led updates while Femison continues to operate as a core
            division of{' '}
            <Link href="/" className={styles.transitionLink}>
              Firose Enterprises
            </Link>
            .
          </p>
        </div>

        <div className={styles.transitionActions}>
          <a
            href={FEMISON_WEBSITE_URL}
            target="_self"
            rel="noopener noreferrer"
            className={styles.transitionButton}
            aria-label="Visit Femison website"
          >
            Visit femison.in
            <svg
              viewBox="0 0 20 20"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className={styles.buttonIcon}
              aria-hidden="true"
            >
              <path d="M7 13l6-6M13 13V7H7" />
            </svg>
          </a>
        </div>
      </div>

      <div className={styles.ownershipFooter}>
        <svg
          viewBox="0 0 24 24"
          fill="currentColor"
          className={styles.shieldIcon}
          aria-hidden="true"
        >
          <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 10.99h7c-.53 4.12-3.28 7.79-7 8.94V12H5V6.3l7-3.11v8.8z" />
        </svg>
        <p className={styles.ownershipText}>
          <strong>Brand Ownership:</strong> Femison remains owned and operated by{' '}
          <Link href="/" className={styles.ownershipLink}>
            Firose Enterprises
          </Link>
          , with quality, customer support, and business operations managed through the same corporate framework.
        </p>
      </div>
    </section>
  );
}
