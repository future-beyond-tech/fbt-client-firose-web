'use client';

import { useReducedMotion } from 'framer-motion';

const TRUST_ITEMS = [
  'MSME Registered Enterprise',
  '55+ Products Across 2 Brands',
  'WhatsApp: +91 97906 00220',
  'AR Perfumes \u00B7 Femison \u00B7 Neat & Fresh \u00B7 Future Beyond Technology',
  'Trusted Across India Since 1980',
  'Committed to Quality & Heritage',
];

function TrustContent() {
  return (
    <>
      {TRUST_ITEMS.map((item, index) => (
        <span key={index} className="mx-6 inline-block whitespace-nowrap text-[11px] font-medium uppercase tracking-[0.14em] sm:mx-8">
          <span className="mr-3 text-[#c8a86b]" aria-hidden="true">{'\u2726'}</span>
          {item}
        </span>
      ))}
    </>
  );
}

export default function TrustBar() {
  const reduceMotion = useReducedMotion();

  return (
    <div
      className="relative z-[60] overflow-hidden border-b border-[#c8a86b1a] bg-[#0D1B3E]"
      role="marquee"
      aria-label="Company trust highlights"
    >
      <div
        className="flex whitespace-nowrap py-2 text-[#e8d5ac]"
        style={reduceMotion ? undefined : { animation: 'fe-trust-scroll 32s linear infinite' }}
      >
        {/* Duplicate content for seamless loop */}
        <TrustContent />
        <TrustContent />
        <TrustContent />
      </div>
    </div>
  );
}
