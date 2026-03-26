import type { Metadata } from 'next';
import Link from 'next/link';
import BreadcrumbSchema from '@/app/components/BreadcrumbSchema';
import {
  brandCatalog,
  buildBrandMailToUrl,
  buildBrandWhatsAppUrl,
  getBrandUrl,
} from '@/app/lib/brands';
import CorporateLeadForm from '@/app/components/CorporateLeadForm';
import MotionWrapper from '@/app/components/motion/MotionWrapper';
import styles from '../corporate.module.css';

const CORPORATE_WHATSAPP = 'https://wa.me/919790600220?text=Hello%20FiroseEnterprises%2C%20I%20have%20a%20contact%20enquiry.';

export const metadata: Metadata = {
  title: 'Contact Us',
  description: 'Contact Firose Enterprises for distribution and corporate enquiries.',
};

export default function ContactPage() {
  return (
    <main id="main-content" className={styles.page}>
      <BreadcrumbSchema items={[{ name: 'Home', href: '/' }, { name: 'Contact', href: '/contact' }]} />
      <MotionWrapper delay={0.04}>
        <section className={styles.section}>
        <header className={styles.sectionHeading}>
          <p className={styles.eyebrow}>Contact</p>
          <h1 className={styles.title}>Contact Firose Enterprises</h1>
          <p className={styles.lead}>
            Reach our team for business enquiries, distribution discussions, and brand-level support.
          </p>
        </header>

        <div className={styles.contactGrid}>
          <article className={styles.contactCard}>
            <h2 className={styles.sectionTitle}>Corporate Contact Details</h2>
            <ul className={styles.contactList}>
              <li>
                <strong>Address:</strong> Firose Enterprises, India
              </li>
              <li>
                <strong>Phone:</strong> +91 9790600220
              </li>
              <li>
                <strong>Email:</strong> info.firoseenterprises@gmail.com
              </li>
              <li>
                <strong>WhatsApp:</strong> +91 9790600220
              </li>
            </ul>

            <div className={styles.actionRow}>
              <a href={CORPORATE_WHATSAPP} target="_blank" rel="noopener noreferrer" className={styles.primaryAction}>
                WhatsApp
              </a>
              <Link href="/business-with-us" className={styles.inlineAction}>
                Business With Us
              </Link>
            </div>
          </article>

          <article className={styles.contactCard}>
            <h2 className={styles.sectionTitle}>Send an Enquiry</h2>
            <CorporateLeadForm contextLabel="Contact" buttonLabel="Send Enquiry" />
          </article>
        </div>
        </section>
      </MotionWrapper>

      <MotionWrapper delay={0.1}>
        <section className={styles.section}>
        <header className={styles.sectionHeading}>
          <h2 className={styles.sectionTitle}>Brand Contact Persons</h2>
          <p className={styles.sectionLead}>Each brand has a separate contact person for faster and focused support.</p>
        </header>

        <div className={styles.contactGrid}>
          {brandCatalog.map((brand) => {
            const whatsappUrl = buildBrandWhatsAppUrl(
              brand.contact,
              `Hello ${brand.contact.personName}, I have an enquiry for ${brand.name}.`
            );
            const mailToUrl = buildBrandMailToUrl(
              brand.contact,
              `${brand.name} Enquiry`,
              `Hello ${brand.contact.personName}, I would like to discuss ${brand.name}.`
            );

            return (
              <article key={brand.slug} className={styles.contactCard}>
                <h3>{brand.name}</h3>
                <ul className={styles.contactList}>
                  <li>
                    <strong>Contact Person:</strong> {brand.contact.personName}
                  </li>
                  <li>
                    <strong>Role:</strong> {brand.contact.role}
                  </li>
                  <li>
                    <strong>Phone:</strong>{' '}
                    <a href={`tel:${brand.contact.phone}`}>
                      {brand.contact.phoneDisplay}
                    </a>
                  </li>
                  <li>
                    <strong>Email:</strong>{' '}
                    <a href={`mailto:${brand.contact.email}`}>{brand.contact.email}</a>
                  </li>
                </ul>

                <div className={styles.actionRow}>
                  <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className={styles.inlineAction}>
                    WhatsApp
                  </a>
                  <a href={mailToUrl} className={styles.inlineAction}>
                    Email
                  </a>
                  <Link href={getBrandUrl(brand.slug)} className={styles.inlineAction}>
                    Open Brand Page
                  </Link>
                </div>
              </article>
            );
          })}
        </div>
        </section>
      </MotionWrapper>
    </main>
  );
}
