import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import BreadcrumbSchema from '@/app/components/BreadcrumbSchema';
import {
  brandCatalog,
  buildBrandMailToUrl,
  buildBrandWhatsAppUrl,
  getBrandUrl,
} from '@/app/lib/brands';
import CorporateLeadForm from '@/app/components/CorporateLeadForm';
import MotionWrapper from '@/app/components/motion/MotionWrapper';
import { Link } from '@/i18n/navigation';
import styles from '../../corporate.module.css';

type PageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'contact' });

  return {
    title: t('title'),
    description: t('description'),
  };
}

export default async function ContactPage() {
  const tContact = await getTranslations('contact');
  const tCommon = await getTranslations('common');
  const tNav = await getTranslations('nav');

  const corporateWhatsAppUrl = `https://wa.me/919790600220?text=${encodeURIComponent(
    tContact('corporateWhatsAppMessage')
  )}`;

  const roleBySlug = {
    'neat-fresh': tContact('neatFreshRole'),
    'ar-perfumes': tContact('arPerfumesRole'),
    femison: tContact('femisonRole'),
  } as const;

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
                  <strong>{tContact('addressLabel')}:</strong> {tContact('address')}
                </li>
                <li>
                  <strong>{tContact('phoneLabel')}:</strong> +91 9790600220
                </li>
                <li>
                  <strong>{tContact('emailLabel')}:</strong> info.firoseenterprises@gmail.com
                </li>
                <li>
                  <strong>{tContact('whatsAppLabel')}:</strong> +91 9790600220
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
              const mailToUrl = buildBrandMailToUrl(
                brand.contact,
                tContact('brandMailSubject', { brand: brand.name }),
                tContact('brandMailBody', { person: brand.contact.personName, brand: brand.name })
              );

              return (
                <article key={brand.slug} className={styles.contactCard}>
                  <h3>{brand.name}</h3>
                  <ul className={styles.contactList}>
                    <li>
                      <strong>{tCommon('contactPerson')}:</strong> {brand.contact.personName}
                    </li>
                    <li>
                      <strong>{tCommon('role')}:</strong> {roleBySlug[brand.slug]}
                    </li>
                    <li>
                      <strong>{tCommon('phone')}:</strong>{' '}
                      <a href={`tel:${brand.contact.phone}`}>{brand.contact.phoneDisplay}</a>
                    </li>
                    <li>
                      <strong>{tCommon('email')}:</strong>{' '}
                      <a href={`mailto:${brand.contact.email}`}>{brand.contact.email}</a>
                    </li>
                  </ul>

                  <div className={styles.actionRow}>
                    <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className={styles.inlineAction}>
                      {tCommon('whatsApp')}
                    </a>
                    <a href={mailToUrl} className={styles.inlineAction}>
                      {tCommon('email')}
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
