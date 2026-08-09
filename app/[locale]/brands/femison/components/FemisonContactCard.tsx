import type { BrandContact } from '@/app/lib/brands';
import styles from './femison.module.css';

type FemisonContactCardProps = {
  contact: BrandContact;
  whatsappUrl: string;
  mailtoUrl: string | null;
};

export default function FemisonContactCard({ contact, whatsappUrl, mailtoUrl }: Readonly<FemisonContactCardProps>) {
  return (
    <section className={styles.contactCard}>
      <h3 className={styles.contactTitle}>Brand Contact Desk</h3>

      <ul className={styles.contactList}>
        <li>
          <span>Contact Person</span>
          <p>{contact.personName}</p>
        </li>
        <li>
          <span>Role</span>
          <p>{contact.role}</p>
        </li>
        <li>
          <span>Phone</span>
          <a href={`tel:${contact.phone}`}>{contact.phoneDisplay}</a>
        </li>
        {contact.email ? (
          <li>
            <span>Email</span>
            <a href={`mailto:${contact.email}`}>{contact.email}</a>
          </li>
        ) : null}
        <li>
          <span>Region</span>
          <p>{contact.cityRegion}</p>
        </li>
      </ul>

      <div className={styles.contactActionRow}>
        <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className={styles.contactAction}>
          WhatsApp
        </a>
        {mailtoUrl ? <a href={mailtoUrl} className={styles.contactAction}>Email</a> : null}
      </div>
    </section>
  );
}
