import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import BreadcrumbSchema from '@/app/components/BreadcrumbSchema';
import {
  brandCatalog,
  buildBrandWhatsAppUrl,
  getBrandUrl,
} from '@/app/lib/brands';
import { buildCorporateWhatsAppUrl, companyConfig } from '@/app/lib/company';
import CorporateLeadForm from '@/app/components/CorporateLeadForm';
import MotionWrapper from '@/app/components/motion/MotionWrapper';
import { Link } from '@/i18n/navigation';
import styles from '../../corporate.module.css';
import { createPageMetadata } from '@/app/lib/seo';

type PageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'contact' });

  return createPageMetadata({
    title: t('title'),
    description: t('description'),
    path: '/contact',
    locale,
  });
}

export default async function ContactPage() {
  const tContact = await getTranslations('contact');
  const tCommon = await getTranslations('common');
  const tNav = await getTranslations('nav');

  const corporateWhatsAppUrl = buildCorporateWhatsAppUrl(tContact('corporateWhatsAppMessage'));

  return (
    <main id="main-content" className={styles.page}>
      <BreadcrumbSchema items={[{ name: tNav('home'), href: '/' }, { name: tContact('title'), href: '/contact' }]} />
      <MotionWrapper delay={0.04}>
        <section className={styles.section}>
          <header className={styles.sectionHeading}>
            <p className={styles.eyebrow}>{tContact('eyebrow')}</p>
            <h1 className={styles.title}>{tContact('heading')}</h1>
            <p className={styles.lead}>{tContact('intro')}</p>
          </header>

          <div className={styles.contactGrid}>
            <article className={styles.contactCard}>
              <h2 className={styles.sectionTitle}>{tContact('corporateDetails')}</h2>
              <ul className={styles.contactList}>
                <li>
                  <strong>{tContact('addressLabel')}:</strong> {companyConfig.location}
                </li>
                <li>
                  <strong>{tContact('phoneLabel')}:</strong>{' '}
                  <a href={`tel:${companyConfig.phoneHref}`}>{companyConfig.phone}</a>
                </li>
                {companyConfig.publicEnquiryEmail ? (
                  <li>
                    <strong>{tContact('emailLabel')}:</strong>{' '}
                    <a href={`mailto:${companyConfig.publicEnquiryEmail}`}>{companyConfig.publicEnquiryEmail}</a>
                  </li>
                ) : null}
                <li>
                  <strong>{tContact('whatsAppLabel')}:</strong> {companyConfig.phone}
                </li>
              </ul>

              <div className={styles.actionRow}>
                <a href={corporateWhatsAppUrl} target="_blank" rel="noopener noreferrer" className={styles.primaryAction}>
                  {tCommon('whatsApp')}
                </a>
                <Link href="/business-with-us" className={styles.inlineAction}>
                  {tCommon('businessWithUs')}
                </Link>
              </div>
            </article>

            <article className={styles.contactCard}>
              <h2 className={styles.sectionTitle}>{tContact('sendEnquiry')}</h2>
              <CorporateLeadForm contextLabel={tContact('eyebrow')} buttonLabel={tContact('sendEnquiry')} />
            </article>
          </div>
        </section>
      </MotionWrapper>

      <MotionWrapper delay={0.1}>
        <section className={styles.section}>
          <header className={styles.sectionHeading}>
            <h2 className={styles.sectionTitle}>{tContact('brandContacts')}</h2>
            <p className={styles.sectionLead}>{tContact('brandContactsDesc')}</p>
          </header>

          <div className={styles.contactGrid}>
            {brandCatalog.map((brand) => {
              const whatsappUrl = buildBrandWhatsAppUrl(
                brand.contact,
                tContact('brandWhatsAppMessage', { person: brand.contact.personName, brand: brand.name })
              );
              return (
                <article key={brand.slug} className={styles.contactCard}>
                  <h3>{brand.name}</h3>
                  <ul className={styles.contactList}>
                    <li>
                      <strong>{tCommon('contactPerson')}:</strong> {brand.contact.personName}
                    </li>
                    <li>
                      <strong>{tCommon('role')}:</strong> {brand.contact.role}
                    </li>
                    <li>
                      <strong>{tCommon('phone')}:</strong>{' '}
                      <a href={`tel:${brand.contact.phone}`}>{brand.contact.phoneDisplay}</a>
                    </li>
                    {brand.contact.email ? (
                      <li>
                        <strong>{tCommon('email')}:</strong>{' '}
                        <a href={`mailto:${brand.contact.email}`}>{brand.contact.email}</a>
                      </li>
                    ) : null}
                  </ul>

                  <div className={styles.actionRow}>
                    <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className={styles.inlineAction}>
                      {tCommon('whatsApp')}
                    </a>
                    <Link href={getBrandUrl(brand.slug)} className={styles.inlineAction}>
                      {tContact('openBrandPage')}
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
