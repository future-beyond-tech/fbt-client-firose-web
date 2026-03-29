'use client';

import { useReducedMotion } from 'framer-motion';
import { useTranslations } from 'next-intl';

function TrustContent({ items }: Readonly<{ items: string[] }>) {
  return (
    <>
      {items.map((item, index) => (
        <span key={index} className="mx-6 inline-block whitespace-nowrap text-[11px] font-medium uppercase tracking-[0.14em] sm:mx-8">
          <span className="mr-3" style={{ color: 'var(--fe-primary)' }} aria-hidden="true">{'\u2726'}</span>
          {item}
        </span>
      ))}
    </>
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
      role="marquee"
      aria-label={t('quality')}
    >
      <div
        className="flex whitespace-nowrap py-2 text-[#e8d5ac]"
        style={reduceMotion ? undefined : { animation: 'fe-trust-scroll 32s linear infinite' }}
      >
        {/* Duplicate content for seamless loop */}
        <TrustContent items={trustItems} />
        <TrustContent items={trustItems} />
        <TrustContent items={trustItems} />
      </div>
    </div>
  );
}
