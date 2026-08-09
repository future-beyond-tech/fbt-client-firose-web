import CorporateLeadForm from '@/app/components/CorporateLeadForm';
import MotionWrapper from '@/app/components/motion/MotionWrapper';
import { buildCorporateWhatsAppUrl, companyConfig } from '@/app/lib/company';
import { brandCatalog } from '@/app/lib/brands';
import { brandMeta } from '../data/products';
import styles from '../brochure.module.css';

export default function BrochureContact() {
  const brandCards = brandCatalog.filter((brand) => brand.slug === 'femison' || brand.slug === 'neat-fresh');
  const corporateWhatsAppUrl = buildCorporateWhatsAppUrl(
    'Hello FIROSE Enterprises, I am interested in the consumer products catalogue.'
  );

  return (
    <section id="contact" className={styles.contactSection}>
      <div className={styles.container}>
        <div className={styles.sectionHeading}>
          <div className={styles.sectionEyebrow}>Product Enquiries</div>
          <h2 className={styles.sectionTitle}>Connect With the Right Team</h2>
          <p className={styles.sectionLead}>
            This catalogue covers Femison and Neat &amp; Fresh. Submit the form for pricing, availability, distribution,
            or bulk-order discussions.
          </p>
        </div>

        <div className={styles.contactGrid}>
          <MotionWrapper>
            <div className={styles.contactCard}>
              <h3 className={styles.contactCardTitle}>FIROSE Enterprises (Corporate)</h3>
              <ul className={styles.contactInfo}>
                <li><strong>Location:</strong> {companyConfig.location}</li>
                <li><strong>Phone:</strong> <a href={`tel:${companyConfig.phoneHref}`}>{companyConfig.phone}</a></li>
                {companyConfig.publicEnquiryEmail ? (
                  <li><strong>Email:</strong> <a href={`mailto:${companyConfig.publicEnquiryEmail}`}>{companyConfig.publicEnquiryEmail}</a></li>
                ) : null}
              </ul>
              <div className={styles.contactActions}>
                <a href={corporateWhatsAppUrl} target="_blank" rel="noopener noreferrer" className={styles.btnWhatsapp}>
                  WhatsApp
                </a>
              </div>
            </div>
          </MotionWrapper>

          {brandCards.map((brand) => {
            const meta = brandMeta[brand.slug as 'femison' | 'neat-fresh'];
            return (
              <MotionWrapper key={brand.slug}>
                <div className={styles.contactCard} style={{ borderLeft: `3px solid ${meta.color}` }}>
                  <h3 className={styles.contactCardTitle}>{brand.name}</h3>
                  <ul className={styles.contactInfo}>
                    <li><strong>Portfolio:</strong> {brand.portfolioDescription}</li>
                    <li><strong>Phone:</strong> <a href={`tel:${brand.contact.phone}`}>{brand.contact.phoneDisplay}</a></li>
                  </ul>
                  <div className={styles.contactActions}>
                    <a href={`tel:${brand.contact.phone}`} className={styles.btnSecondary}>Call</a>
                  </div>
                </div>
              </MotionWrapper>
            );
          })}
        </div>

        <div className={styles.formPanel}>
          <h3>Send a Catalogue Enquiry</h3>
          <CorporateLeadForm contextLabel="Catalogue" buttonLabel="Submit Catalogue Enquiry" showInquiryType />
        </div>
      </div>
    </section>
  );
}
