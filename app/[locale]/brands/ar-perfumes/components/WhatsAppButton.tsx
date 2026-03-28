import { buildWhatsAppMessageUrl } from './products';
import styles from './arPerfumes.module.css';

export default function WhatsAppButton() {
  return (
    <a
      href={buildWhatsAppMessageUrl('Hello AR Perfume, I want to place an order.')}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Order on WhatsApp"
      className={styles.whatsappButton}
    >
      <svg viewBox="0 0 32 32" aria-hidden="true" className={styles.whatsappIcon}>
        <path
          d="M19.1 17.8c-.3-.2-1.7-.8-2-.9s-.5-.2-.7.2-.8.9-1 .9-.4 0-.7-.2c-.3-.2-1.2-.4-2.2-1.3-.8-.7-1.3-1.5-1.5-1.8-.2-.3 0-.5.2-.7.2-.2.3-.4.5-.6.2-.2.2-.4.3-.6.1-.2 0-.4 0-.5 0-.2-.7-1.8-1-2.4-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4s-1 1-1 2.3 1 2.5 1.2 2.7c.2.2 2 3.1 4.9 4.3.7.3 1.2.5 1.6.6.7.2 1.3.2 1.8.1.6-.1 1.7-.7 1.9-1.3s.2-1.2.1-1.3c-.1-.1-.3-.2-.6-.4z"
          fill="currentColor"
        />
        <path
          d="M16 3C8.8 3 3 8.8 3 16c0 2.5.7 4.9 2 6.9L3.1 29l6.4-1.8c1.9 1.1 4 1.7 6.3 1.7 7.2 0 13-5.8 13-13S23.2 3 16 3zm0 23.4c-2 0-3.9-.6-5.5-1.7l-.4-.2-3.8 1.1 1.1-3.7-.2-.4c-1.2-1.7-1.8-3.7-1.8-5.7 0-5.8 4.7-10.6 10.6-10.6S26.6 10.2 26.6 16 21.8 26.4 16 26.4z"
          fill="currentColor"
        />
      </svg>
      <span>WhatsApp</span>
    </a>
  );
}
