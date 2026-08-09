'use client';

import { FormEvent, useMemo, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { buildCorporateWhatsAppUrl } from '@/app/lib/company';
import { INQUIRY_TYPES, INTEREST_OPTIONS, type InquiryType, type InterestOption } from '@/app/lib/enquiries';
import { MOTION_EASE, buttonPress, hoverLift } from '@/lib/motion';
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
  countryLocation: string;
  inquiryType: InquiryType;
  interestedDivision: InterestOption;
  message: string;
  website: string;
};

type SubmissionStatus = 'idle' | 'submitting' | 'success' | 'error';

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_PATTERN = /^[+()\-\s0-9]{7,24}$/;

function createInitialForm(showInquiryType: boolean): FormState {
  return {
    name: '',
    email: '',
    phone: '',
    company: '',
    countryLocation: '',
    inquiryType: showInquiryType ? 'Distributor' : 'General Inquiry',
    interestedDivision: 'Corporate / General',
    message: '',
    website: '',
  };
}

export default function CorporateLeadForm({
  contextLabel,
  buttonLabel,
  showInquiryType = false,
}: Readonly<CorporateLeadFormProps>) {
  const reduceMotion = useReducedMotion();
  const tCommon = useTranslations('common');
  const tBusiness = useTranslations('businessWithUs');
  const formId = useMemo(
    () => contextLabel.toLowerCase().replace(/[^a-z0-9]+/g, '-') || 'enquiry',
    [contextLabel]
  );
  const [form, setForm] = useState<FormState>(() => createInitialForm(showInquiryType));
  const [startedAt, setStartedAt] = useState(() => Date.now());
  const [status, setStatus] = useState<SubmissionStatus>('idle');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [formError, setFormError] = useState('');

  const quickWhatsAppUrl = useMemo(
    () => buildCorporateWhatsAppUrl(`Hello FIROSE Enterprises, I have a ${contextLabel.toLowerCase()} enquiry.`),
    [contextLabel]
  );

  function onFieldChange(field: keyof FormState, value: string) {
    setForm((current) => ({ ...current, [field]: value }));
    if (errors[field]) {
      setErrors((current) => {
        const updated = { ...current };
        delete updated[field];
        return updated;
      });
    }
    if (status === 'error') {
      setStatus('idle');
      setFormError('');
    }
  }

  function validateForm(): boolean {
    const nextErrors: Record<string, string> = {};

    if (form.name.trim().length < 2) nextErrors.name = 'Please enter your name.';
    if (!EMAIL_PATTERN.test(form.email.trim())) nextErrors.email = 'Please enter a valid email address.';
    if (form.phone.trim() && !PHONE_PATTERN.test(form.phone.trim())) {
      nextErrors.phone = 'Please enter a valid phone number.';
    }
    if (form.message.trim().length < 10) nextErrors.message = 'Please provide at least 10 characters.';

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status === 'submitting' || !validateForm()) return;

    setStatus('submitting');
    setFormError('');

    try {
      const response = await fetch('/api/enquiries', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ ...form, context: contextLabel, startedAt }),
      });
      const result = (await response.json().catch(() => null)) as
        | { ok?: boolean; error?: string; fieldErrors?: Record<string, string> }
        | null;

      if (!response.ok || !result?.ok) {
        if (result?.fieldErrors) setErrors(result.fieldErrors);
        throw new Error(
          result?.fieldErrors?.form ||
            result?.error ||
            'We could not send your enquiry right now. Please try again shortly.'
        );
      }

      setStatus('success');
    } catch (error) {
      setStatus('error');
      setFormError(
        error instanceof Error
          ? error.message
          : 'We could not send your enquiry right now. Please try again shortly.'
      );
    }
  }

  function resetForm() {
    setForm(createInitialForm(showInquiryType));
    setErrors({});
    setFormError('');
    setStartedAt(Date.now());
    setStatus('idle');
  }

  if (status === 'success') {
    return (
      <section className={styles.formPanel} role="status" aria-live="polite">
        <p className={styles.successTitle}>Enquiry received</p>
        <p className={styles.helperText}>
          Thank you. Your enquiry has been received. Our business team will contact you shortly.
        </p>
        <div className={styles.formActions}>
          <button type="button" className={styles.primaryAction} onClick={resetForm}>
            {showInquiryType ? tBusiness('sendAnother') : tCommon('sendAnotherEnquiry')}
          </button>
        </div>
      </section>
    );
  }

  return (
    <form className={styles.formPanel} onSubmit={handleSubmit} noValidate aria-busy={status === 'submitting'}>
      <div className={styles.fieldGrid}>
        <div className={styles.fieldGroup}>
          <label htmlFor={`${formId}-name`}>{tCommon('name')}</label>
          <input
            id={`${formId}-name`}
            type="text"
            value={form.name}
            onChange={(event) => onFieldChange('name', event.target.value)}
            required
            aria-required="true"
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? `${formId}-name-error` : undefined}
            autoComplete="name"
            maxLength={120}
            placeholder={tCommon('yourName')}
          />
          {errors.name ? <p id={`${formId}-name-error`} className={styles.fieldError} role="alert">{errors.name}</p> : null}
        </div>

        <div className={styles.fieldGroup}>
          <label htmlFor={`${formId}-company`}>Company / Organization <span className={styles.optionalLabel}>(optional)</span></label>
          <input
            id={`${formId}-company`}
            type="text"
            value={form.company}
            onChange={(event) => onFieldChange('company', event.target.value)}
            autoComplete="organization"
            maxLength={160}
            placeholder={tCommon('companyName')}
          />
        </div>
      </div>

      <div className={styles.fieldGrid}>
        <div className={styles.fieldGroup}>
          <label htmlFor={`${formId}-email`}>{tCommon('email')}</label>
          <input
            id={`${formId}-email`}
            type="email"
            value={form.email}
            onChange={(event) => onFieldChange('email', event.target.value)}
            required
            aria-required="true"
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? `${formId}-email-error` : undefined}
            autoComplete="email"
            maxLength={254}
            placeholder={tCommon('emailPlaceholder')}
          />
          {errors.email ? <p id={`${formId}-email-error`} className={styles.fieldError} role="alert">{errors.email}</p> : null}
        </div>

        <div className={styles.fieldGroup}>
          <label htmlFor={`${formId}-phone`}>{tCommon('phone')} <span className={styles.optionalLabel}>(optional)</span></label>
          <input
            id={`${formId}-phone`}
            type="tel"
            value={form.phone}
            onChange={(event) => onFieldChange('phone', event.target.value)}
            aria-invalid={Boolean(errors.phone)}
            aria-describedby={errors.phone ? `${formId}-phone-error` : undefined}
            autoComplete="tel"
            maxLength={24}
            placeholder={tCommon('phonePlaceholder')}
          />
          {errors.phone ? <p id={`${formId}-phone-error`} className={styles.fieldError} role="alert">{errors.phone}</p> : null}
        </div>
      </div>

      <div className={styles.fieldGrid}>
        <div className={styles.fieldGroup}>
          <label htmlFor={`${formId}-location`}>Country / Location <span className={styles.optionalLabel}>(optional)</span></label>
          <input
            id={`${formId}-location`}
            type="text"
            value={form.countryLocation}
            onChange={(event) => onFieldChange('countryLocation', event.target.value)}
            autoComplete="country-name"
            maxLength={120}
            placeholder="City, state, or country"
          />
        </div>

        <div className={styles.fieldGroup}>
          <label htmlFor={`${formId}-type`}>{tBusiness('inquiryType')}</label>
          <select
            id={`${formId}-type`}
            value={form.inquiryType}
            onChange={(event) => onFieldChange('inquiryType', event.target.value)}
            aria-invalid={Boolean(errors.inquiryType)}
            aria-describedby={errors.inquiryType ? `${formId}-type-error` : undefined}
          >
            {INQUIRY_TYPES.map((option) => <option key={option} value={option}>{option}</option>)}
          </select>
          {errors.inquiryType ? <p id={`${formId}-type-error`} className={styles.fieldError} role="alert">{errors.inquiryType}</p> : null}
        </div>
      </div>

      <div className={styles.fieldGroup}>
        <label htmlFor={`${formId}-division`}>Interested Division / Brand</label>
        <select
          id={`${formId}-division`}
          value={form.interestedDivision}
          onChange={(event) => onFieldChange('interestedDivision', event.target.value)}
          aria-invalid={Boolean(errors.interestedDivision)}
          aria-describedby={errors.interestedDivision ? `${formId}-division-error` : undefined}
        >
          {INTEREST_OPTIONS.map((option) => <option key={option} value={option}>{option}</option>)}
        </select>
        {errors.interestedDivision ? <p id={`${formId}-division-error`} className={styles.fieldError} role="alert">{errors.interestedDivision}</p> : null}
      </div>

      <div className={styles.fieldGroup}>
        <label htmlFor={`${formId}-message`}>{tCommon('message')}</label>
        <textarea
          id={`${formId}-message`}
          value={form.message}
          onChange={(event) => onFieldChange('message', event.target.value)}
          placeholder={showInquiryType ? tBusiness('sharePlaceholder') : tCommon('messagePlaceholder')}
          required
          aria-required="true"
          aria-invalid={Boolean(errors.message)}
          aria-describedby={errors.message ? `${formId}-message-error` : undefined}
          maxLength={3000}
        />
        {errors.message ? <p id={`${formId}-message-error`} className={styles.fieldError} role="alert">{errors.message}</p> : null}
      </div>

      <div className={styles.honeypot} aria-hidden="true">
        <label htmlFor={`${formId}-website`}>Website</label>
        <input
          id={`${formId}-website`}
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={form.website}
          onChange={(event) => onFieldChange('website', event.target.value)}
        />
      </div>

      {formError ? <p className={styles.formError} role="alert">{formError}</p> : null}

      <div className={styles.formActions}>
        <motion.button
          type="submit"
          className={styles.primaryAction}
          disabled={status === 'submitting'}
          whileHover={reduceMotion || status === 'submitting' ? undefined : hoverLift}
          whileTap={reduceMotion || status === 'submitting' ? undefined : buttonPress}
          transition={{ duration: 0.2, ease: MOTION_EASE }}
        >
          {status === 'submitting' ? 'Submitting…' : buttonLabel}
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
        Your details are sent securely to the FIROSE business team. Fields marked optional may be left blank.
      </p>
    </form>
  );
}
