'use client';

import { FormEvent, useMemo, useState } from 'react';
import { CONTACT_INFO, buildWhatsAppMessageUrl } from './products';
import styles from './arPerfumes.module.css';

type ContactProps = {
  sectionId?: string;
  introTitle?: string;
  introText?: string;
  showBusinessDetails?: boolean;
};

export default function Contact({
  sectionId = 'contact',
  introTitle = 'Contact & Orders',
  introText = 'All Phase-1 orders are handled directly on WhatsApp.',
  showBusinessDetails = false,
}: ContactProps) {
  const [name, setName] = useState('');
  const [interest, setInterest] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const quickChatUrl = useMemo(
    () => buildWhatsAppMessageUrl('Hello AR Perfume, I would like to place an order.'),
    []
  );

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const lines = [
      'Hello AR Perfume, I would like to place an order.',
      name ? `Name: ${name}` : '',
      interest ? `Interested In: ${interest}` : '',
      message ? `Message: ${message}` : 'Please share your current perfume and gift set options.',
    ].filter(Boolean);

    const orderUrl = buildWhatsAppMessageUrl(lines.join('\n'));
    window.open(orderUrl, '_blank', 'noopener,noreferrer');
    setSubmitted(true);
  }

  return (
    <section className={`${styles.section} ${styles.contactSection}`} id={sectionId}>
      <div className={styles.container}>
        <div className={styles.contactIntro}>
          <h2>{introTitle}</h2>
          <p>{introText}</p>
        </div>

        {showBusinessDetails ? (
          <div className={styles.contactDetails}>
            <h3>Business Details</h3>
            <ul className={styles.contactDetailsList}>
              <li>
                <span>Contact Person</span>
                <p>{CONTACT_INFO.personName}</p>
              </li>
              <li>
                <span>Role</span>
                <p>{CONTACT_INFO.role}</p>
              </li>
              <li>
                <span>WhatsApp</span>
                <a href={`https://wa.me/${CONTACT_INFO.whatsappNumber}`} target="_blank" rel="noopener noreferrer">
                  {CONTACT_INFO.whatsappDisplay}
                </a>
              </li>
              <li>
                <span>Phone</span>
                <a href={`tel:${CONTACT_INFO.phone}`}>{CONTACT_INFO.phoneDisplay}</a>
              </li>
              <li>
                <span>City / Region</span>
                <p>{CONTACT_INFO.cityRegion}</p>
              </li>
              <li>
                <span>Email</span>
                <a href={`mailto:${CONTACT_INFO.email}`}>{CONTACT_INFO.email}</a>
              </li>
            </ul>

            <a className={`${styles.btn} ${styles.btnPrimary} ${styles.contactAction}`} href={quickChatUrl}>
              Order via WhatsApp
            </a>
          </div>
        ) : null}

        <form className={styles.contactForm} onSubmit={handleSubmit}>
          <div className={styles.formGrid}>
            <div className={styles.formGroup}>
              <label htmlFor="name">Name</label>
              <input
                id="name"
                name="name"
                type="text"
                value={name}
                onChange={(event) => setName(event.target.value)}
                placeholder="Your name"
                autoComplete="name"
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="interest">Fragrance Interest</label>
              <input
                id="interest"
                name="interest"
                type="text"
                value={interest}
                onChange={(event) => setInterest(event.target.value)}
                placeholder="e.g. Pure Oud, Gift Set"
              />
            </div>
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="message">Message</label>
            <textarea
              id="message"
              name="message"
              value={message}
              onChange={(event) => setMessage(event.target.value)}
              placeholder="Tell us what you need"
            />
          </div>

          <button className={`${styles.btn} ${styles.btnPrimary}`} type="submit">
            {submitted ? 'Open WhatsApp Again' : 'Continue on WhatsApp'}
          </button>

          <p className={styles.quickChat}>
            Prefer instant chat?{' '}
            <a href={quickChatUrl} target="_blank" rel="noopener noreferrer">
              Start WhatsApp conversation
            </a>
          </p>
        </form>
      </div>
    </section>
  );
}
