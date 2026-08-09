import { Link } from '@/i18n/navigation';
import styles from './brandTransition.module.css';

export default function BrandTransitionBanner() {
  return (
    <div className={styles.transitionBanner}>
      <div className={styles.transitionContent}>
        <div className={styles.transitionIcon}>
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={styles.iconSvg}
            aria-hidden="true"
          >
            <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
          </svg>
        </div>
        
        <div className={styles.transitionText}>
          <h3 className={styles.transitionTitle}>
            Neat &amp; Fresh is Moving to Its Own Home
          </h3>
          <p className={styles.transitionDescription}>
            <strong>Neat &amp; Fresh</strong> is transitioning to its dedicated website at{' '}
            <a 
              href="https://neatfresh.online" 
              target="_self" 
              rel="noopener noreferrer"
              className={styles.transitionLink}
            >
              neatfresh.online
            </a>
            . It remains presented as an operating division of{' '}
            <Link href="/" className={styles.transitionLink}>
              Firose Enterprises
            </Link>
            .
          </p>
        </div>

        <div className={styles.transitionActions}>
          <a
            href="https://neatfresh.online"
            target="_self"
            rel="noopener noreferrer"
            className={styles.transitionButton}
            aria-label="Visit Neat & Fresh new website"
          >
            Visit New Website
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
          <strong>Division Relationship:</strong> Neat &amp; Fresh is presented as an operating division of{' '}
          <Link href="/" className={styles.ownershipLink}>
            Firose Enterprises
          </Link>
          . Visit the dedicated Neat &amp; Fresh website for current brand-specific information.
        </p>
      </div>
    </div>
  );
}
