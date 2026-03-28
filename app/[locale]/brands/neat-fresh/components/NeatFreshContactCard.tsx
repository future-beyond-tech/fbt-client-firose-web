import type { BrandContact } from '@/app/lib/brands';
import styles from './neatFresh.module.css';

type NeatFreshContactCardProps = {
  contact: BrandContact;
  whatsappUrl: string;
  mailtoUrl: string;
};

export default function NeatFreshContactCard({
  contact,
  whatsappUrl,
  mailtoUrl,
}: Readonly<NeatFreshContactCardProps>) {
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
        <li>
          <span>Email</span>
          <a href={`mailto:${contact.email}`}>{contact.email}</a>
        </li>
        <li>
          <span>Region</span>
          <p>{contact.cityRegion}</p>
        </li>
      </ul>

      <div className={styles.contactActionRow}>
        <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className={styles.contactAction}>
          WhatsApp
        </a>
        <a href={mailtoUrl} className={styles.contactAction}>
          Email
        </a>
      </div>
    </section>
  );
}
