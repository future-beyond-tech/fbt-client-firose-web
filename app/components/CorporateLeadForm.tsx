'use client';

import { FormEvent, useMemo, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { MOTION_EASE, buttonPress, hoverLift } from '@/lib/motion';
import { useToast } from '@/app/components/Toast';
import styles from '@/app/corporate.module.css';

type CorporateLeadFormProps = {
  contextLabel: string;
  buttonLabel: string;
  showInquiryType?: boolean;
};

type FormState = {
  name: string;
  email: string;
  phone: string;
  company: string;
  inquiryType: string;
  message: string;
};

const CORPORATE_EMAIL = 'info.firoseenterprises@gmail.com';
const CORPORATE_WHATSAPP = '919790600220';

function buildMailToUrl(subject: string, body: string): string {
  const normalizedBody = body.replace(/\r?\n/g, '\r\n');
  const encodedSubject = encodeURIComponent(subject);
  const encodedBody = encodeURIComponent(normalizedBody);
  return `mailto:${CORPORATE_EMAIL}?subject=${encodedSubject}&body=${encodedBody}`;
}

function buildWhatsAppUrl(message: string): string {
  return `https://wa.me/${CORPORATE_WHATSAPP}?text=${encodeURIComponent(message)}`;
}

export default function CorporateLeadForm({
  contextLabel,
  buttonLabel,
  showInquiryType = false,
}: Readonly<CorporateLeadFormProps>) {
  const reduceMotion = useReducedMotion();
  const { showToast } = useToast();
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState<FormState>({
    name: '',
    email: '',
    phone: '',
    company: '',
    inquiryType: 'Distributor',
    message: '',
  });

  const quickWhatsAppUrl = useMemo(
    () => buildWhatsAppUrl(`Hello FiroseEnterprises, I have a ${contextLabel.toLowerCase()} enquiry.`),
    [contextLabel]
  );

  function onFieldChange(field: keyof FormState, value: string) {
    setForm((current) => ({ ...current, [field]: value }));
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const lines = [
      `Name: ${form.name}`,
      `Email: ${form.email}`,
      form.phone ? `Phone: ${form.phone}` : '',
      form.company ? `Company: ${form.company}` : '',
      showInquiryType ? `Inquiry Type: ${form.inquiryType}` : '',
      '',
      'Message:',
      form.message,
    ].filter(Boolean);

    const mailtoUrl = buildMailToUrl(`${contextLabel} Enquiry`, lines.join('\n'));
    window.location.href = mailtoUrl;
    setSubmitted(true);
    showToast('Message prepared — your email client will open shortly');
  }

  return (
    <form className={styles.formPanel} onSubmit={handleSubmit}>
      <div className={styles.fieldGrid}>
        <div className={styles.fieldGroup}>
          <label htmlFor={`${contextLabel}-name`}>Name</label>
          <input
            id={`${contextLabel}-name`}
            type="text"
            value={form.name}
            onChange={(event) => onFieldChange('name', event.target.value)}
            required
            aria-required="true"
            autoComplete="name"
            placeholder="Your full name"
          />
        </div>

        <div className={styles.fieldGroup}>
          <label htmlFor={`${contextLabel}-email`}>Email</label>
          <input
            id={`${contextLabel}-email`}
            type="email"
            value={form.email}
            onChange={(event) => onFieldChange('email', event.target.value)}
            required
            aria-required="true"
            autoComplete="email"
            placeholder="you@company.com"
          />
        </div>
      </div>

      <div className={styles.fieldGrid}>
        <div className={styles.fieldGroup}>
          <label htmlFor={`${contextLabel}-phone`}>Phone</label>
          <input
            id={`${contextLabel}-phone`}
            type="tel"
            value={form.phone}
            onChange={(event) => onFieldChange('phone', event.target.value)}
            autoComplete="tel"
            placeholder="+91 XXXXX XXXXX"
          />
        </div>

        <div className={styles.fieldGroup}>
          <label htmlFor={`${contextLabel}-company`}>Company</label>
          <input
            id={`${contextLabel}-company`}
            type="text"
            value={form.company}
            onChange={(event) => onFieldChange('company', event.target.value)}
            autoComplete="organization"
            placeholder="Company name"
          />
        </div>
      </div>

      {showInquiryType ? (
        <div className={styles.fieldGroup}>
          <label htmlFor={`${contextLabel}-type`}>Inquiry Type</label>
          <select
            id={`${contextLabel}-type`}
            value={form.inquiryType}
            onChange={(event) => onFieldChange('inquiryType', event.target.value)}
          >
            <option value="Distributor">Become a Distributor</option>
            <option value="Bulk Order">Bulk Order</option>
            <option value="Private Label">Private Labeling</option>
            <option value="General Inquiry">General Business Inquiry</option>
          </select>
        </div>
      ) : null}

      <div className={styles.fieldGroup}>
        <label htmlFor={`${contextLabel}-message`}>Message</label>
        <textarea
          id={`${contextLabel}-message`}
          value={form.message}
          onChange={(event) => onFieldChange('message', event.target.value)}
          placeholder="Share your requirement and expected timelines"
          required
          aria-required="true"
        />
      </div>

      <div className={styles.formActions}>
        <motion.button
          type="submit"
          className={styles.primaryAction} aria-label={submitted ? 'Send another enquiry' : buttonLabel}
          whileHover={reduceMotion ? undefined : hoverLift}
          whileTap={reduceMotion ? undefined : buttonPress}
          transition={{ duration: 0.2, ease: MOTION_EASE }}
        >
          {submitted ? 'Send Another Enquiry' : buttonLabel}
        </motion.button>

        <motion.a
          href={quickWhatsAppUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.secondaryAction} aria-label="Connect via WhatsApp"
          whileHover={reduceMotion ? undefined : { y: -2, transition: { duration: 0.2, ease: MOTION_EASE } }}
          whileTap={reduceMotion ? undefined : buttonPress}
        >
          WhatsApp
        </motion.a>
      </div>

      <p className={styles.helperText} aria-live="polite">This form opens your email client with a ready-to-send enquiry summary.</p>
    </form>
  );
}
