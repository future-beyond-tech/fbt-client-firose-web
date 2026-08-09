'use client';

import { useReducedMotion } from 'framer-motion';
import { useTranslations } from 'next-intl';

function TrustContent({ items, ariaHidden = false }: Readonly<{ items: string[]; ariaHidden?: boolean }>) {
  return (
    <span aria-hidden={ariaHidden || undefined}>
      {items.map((item, index) => (
        <span key={index} className="mx-4 sm:mx-6 inline-block whitespace-nowrap text-[12px] font-medium uppercase tracking-[0.14em] sm:mx-8">
          <span className="mr-3" style={{ color: 'var(--fe-primary)' }} aria-hidden="true">{'\u2726'}</span>
          <span>{item}</span>
        </span>
      ))}
    </span>
  );
}

export default function TrustBar() {
  const reduceMotion = useReducedMotion();
  const t = useTranslations('trustBar');
  const trustItems = [
    t('msme'),
    t('products'),
    t('whatsapp'),
    t('brands'),
    t('trusted'),
    t('quality'),
  ];

  return (
    <div
      className="relative z-[60] overflow-hidden border-b border-[#c8a86b1a] bg-[#0D1B3E]"
      role="region"
      aria-label={t('quality')}
    >
      <div
        className="relative flex whitespace-nowrap py-2 text-[#e8d5ac]"
        style={reduceMotion ? undefined : { animation: 'fe-trust-scroll 32s linear infinite' }}
      >
        {/* Duplicate content for seamless loop */}
        <TrustContent items={trustItems} />
        <TrustContent items={trustItems} ariaHidden />
        <TrustContent items={trustItems} ariaHidden />
      </div>
    </div>
  );
}
