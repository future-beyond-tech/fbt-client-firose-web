'use client';

import { FormEvent, useMemo, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { useTranslations } from 'next-intl';
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
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

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
  const tCommon = useTranslations('common');
  const tBusiness = useTranslations('businessWithUs');
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState<FormState>({
    name: '',
    email: '',
    phone: '',
    company: '',
    inquiryType: 'Distributor',
    message: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const quickWhatsAppUrl = useMemo(
    () => buildWhatsAppUrl(`Hello FiroseEnterprises, I have a ${contextLabel.toLowerCase()} enquiry.`),
    [contextLabel]
  );

  function onFieldChange(field: keyof FormState, value: string) {
    setForm((current) => ({ ...current, [field]: value }));
    // Clear error for this field when user starts typing
    if (errors[field]) {
      setErrors((current) => {
        const updated = { ...current };
        delete updated[field];
        return updated;
      });
    }
  }

  function validateForm(): boolean {
    const newErrors: Record<string, string> = {};

    if (!form.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!form.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!EMAIL_PATTERN.test(form.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!form.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    }

    if (!form.message.trim()) {
      newErrors.message = 'Message is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!validateForm()) {
      return;
    }

    const lines = [
      `${tCommon('name')}: ${form.name}`,
      `${tCommon('email')}: ${form.email}`,
      form.phone ? `${tCommon('phone')}: ${form.phone}` : '',
      form.company ? `${tCommon('company')}: ${form.company}` : '',
      showInquiryType ? `${tBusiness('inquiryType')}: ${form.inquiryType}` : '',
      '',
      `${tCommon('message')}:`,
      form.message,
    ].filter(Boolean);

    const mailtoUrl = buildMailToUrl(`${contextLabel} Enquiry`, lines.join('\n'));
    window.location.href = mailtoUrl;
    setSubmitted(true);
    showToast(tCommon('emailClientToast'));
  }

  return (
    <form className={styles.formPanel} onSubmit={handleSubmit}>
      <div className={styles.fieldGrid}>
        <div className={styles.fieldGroup}>
          <label htmlFor={`${contextLabel}-name`}>{tCommon('name')}</label>
          <input
            id={`${contextLabel}-name`}
            type="text"
            value={form.name}
            onChange={(event) => onFieldChange('name', event.target.value)}
            required
            aria-required="true"
            aria-invalid={!!errors.name}
            aria-describedby={errors.name ? `${contextLabel}-name-error` : undefined}
            autoComplete="name"
            placeholder={tCommon('yourName')}
          />
          {errors.name && (
            <p
              id={`${contextLabel}-name-error`}
              className="text-[12px] text-[#e07a5f]"
              role="alert"
            >
              {errors.name}
            </p>
          )}
        </div>

        <div className={styles.fieldGroup}>
          <label htmlFor={`${contextLabel}-email`}>{tCommon('email')}</label>
          <input
            id={`${contextLabel}-email`}
            type="email"
            value={form.email}
            onChange={(event) => onFieldChange('email', event.target.value)}
            required
            aria-required="true"
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? `${contextLabel}-email-error` : undefined}
            autoComplete="email"
            placeholder={tCommon('emailPlaceholder')}
          />
          {errors.email && (
            <p
              id={`${contextLabel}-email-error`}
              className="text-[12px] text-[#e07a5f]"
              role="alert"
            >
              {errors.email}
            </p>
          )}
        </div>
      </div>

      <div className={styles.fieldGrid}>
        <div className={styles.fieldGroup}>
          <label htmlFor={`${contextLabel}-phone`}>{tCommon('phone')}</label>
          <input
            id={`${contextLabel}-phone`}
            type="tel"
            value={form.phone}
            onChange={(event) => onFieldChange('phone', event.target.value)}
            aria-invalid={!!errors.phone}
            aria-describedby={errors.phone ? `${contextLabel}-phone-error` : undefined}
            autoComplete="tel"
            placeholder={tCommon('phonePlaceholder')}
          />
          {errors.phone && (
            <p
              id={`${contextLabel}-phone-error`}
              className="text-[12px] text-[#e07a5f]"
              role="alert"
            >
              {errors.phone}
            </p>
          )}
        </div>

        <div className={styles.fieldGroup}>
          <label htmlFor={`${contextLabel}-company`}>{tCommon('company')}</label>
          <input
            id={`${contextLabel}-company`}
            type="text"
            value={form.company}
            onChange={(event) => onFieldChange('company', event.target.value)}
            autoComplete="organization"
            placeholder={tCommon('companyName')}
          />
        </div>
      </div>

      {showInquiryType ? (
        <div className={styles.fieldGroup}>
          <label htmlFor={`${contextLabel}-type`}>{tBusiness('inquiryType')}</label>
          <select
            id={`${contextLabel}-type`}
            value={form.inquiryType}
            onChange={(event) => onFieldChange('inquiryType', event.target.value)}
          >
            <option value="Distributor">{tBusiness('becomeDistributor')}</option>
            <option value="Bulk Order">{tBusiness('bulkOrders')}</option>
            <option value="Private Label">{tBusiness('privateLabeling')}</option>
            <option value="General Inquiry">{tBusiness('generalInquiry')}</option>
          </select>
        </div>
      ) : null}

      <div className={styles.fieldGroup}>
        <label htmlFor={`${contextLabel}-message`}>{tCommon('message')}</label>
        <textarea
          id={`${contextLabel}-message`}
          value={form.message}
          onChange={(event) => onFieldChange('message', event.target.value)}
          placeholder={showInquiryType ? tBusiness('sharePlaceholder') : tCommon('messagePlaceholder')}
          required
          aria-required="true"
          aria-invalid={!!errors.message}
          aria-describedby={errors.message ? `${contextLabel}-message-error` : undefined}
        />
        {errors.message && (
          <p
            id={`${contextLabel}-message-error`}
            className="text-[12px] text-[#e07a5f]"
            role="alert"
          >
            {errors.message}
          </p>
        )}
      </div>

      <div className={styles.formActions}>
        <motion.button
          type="submit"
          className={styles.primaryAction}
          aria-label={submitted ? (showInquiryType ? tBusiness('sendAnother') : tCommon('sendAnotherEnquiry')) : buttonLabel}
          whileHover={reduceMotion ? undefined : hoverLift}
          whileTap={reduceMotion ? undefined : buttonPress}
          transition={{ duration: 0.2, ease: MOTION_EASE }}
        >
          {submitted ? (showInquiryType ? tBusiness('sendAnother') : tCommon('sendAnotherEnquiry')) : buttonLabel}
        </motion.button>

        <motion.a
          href={quickWhatsAppUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.secondaryAction}
          aria-label={tCommon('connectViaWhatsApp')}
          whileHover={reduceMotion ? undefined : { y: -2, transition: { duration: 0.2, ease: MOTION_EASE } }}
          whileTap={reduceMotion ? undefined : buttonPress}
        >
          {tCommon('whatsApp')}
        </motion.a>
      </div>

      <p className={styles.helperText} aria-live="polite">
        {showInquiryType ? tBusiness('formNote') : tCommon('formOpensEmailClient')}
      </p>
    </form>
  );
}
