'use client';

import { useState, type MouseEvent } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { MOTION_EASE, buttonPress, fadeInUp, hoverLift } from '@/lib/motion';

type BrandLink = {
  name: string;
  href: string;
  subtitle: string;
};

export default function BrandNavigation() {
  const [isRedirecting, setIsRedirecting] = useState(false);
  const [activeBrand, setActiveBrand] = useState('');
  const reduceMotion = useReducedMotion();
  const t = useTranslations('brandNav');
  const brandLinks: BrandLink[] = [
    {
      name: 'Neat & Fresh',
      href: 'https://neatfresh.online',
      subtitle: t('neatFreshSubtitle'),
    },
    {
      name: 'Future Beyond Tech',
      href: 'https://futurebeyondtech.com',
      subtitle: t('fbtSubtitle'),
    },
  ];

  function handleClick(event: MouseEvent<HTMLAnchorElement>, brand: BrandLink) {
    event.preventDefault();
    if (isRedirecting) return;

    setIsRedirecting(true);
    setActiveBrand(brand.name);

    // 300-500ms transition window for smooth UX before hard redirect.
    window.setTimeout(() => {
      window.location.href = brand.href;
    }, 400);
  }

  return (
    <>
      <AnimatePresence>
        {isRedirecting ? (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-[#070605c2] backdrop-blur-[2px]"
            role="status"
            aria-live="polite"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.24, ease: MOTION_EASE }}
          >
            <motion.div
              className="flex items-center gap-3 rounded-xl border border-[#e0c8935e] bg-[#110f0ce8] px-5 py-4 shadow-2xl"
              variants={fadeInUp}
              initial="hidden"
              animate="visible"
              exit="hidden"
              transition={{ duration: 0.3, ease: MOTION_EASE }}
            >
              <span className="h-5 w-5 animate-spin rounded-full border-2 border-[#5c4b31] border-t-[#f1ddb4]" aria-hidden="true" />
              <p className="text-sm font-medium text-[#f3e8d1]">{t('opening', { brand: activeBrand })}</p>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>

      <motion.nav
        className="rounded-2xl border border-[#e0c8932f] bg-[linear-gradient(160deg,rgba(20,17,13,0.9),rgba(10,8,7,0.95))] p-6 shadow-[0_22px_42px_rgba(0,0,0,0.45)]"
        aria-label={t('title')}
        variants={fadeInUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        <div className="mb-4">
          <h2 className="text-2xl font-normal text-[#f8f1e3]">{t('title')}</h2>
          <p className="mt-1 text-sm text-[#b8ad95]">{t('description')}</p>
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          {brandLinks.map((brand) => (
            <motion.a
              key={brand.name}
              href={brand.href}
              target="_self"
              rel="noopener noreferrer"
              onClick={(event) => handleClick(event, brand)}
              className="group rounded-xl border border-[#e0c89332] bg-gradient-to-b from-[#211a12] to-[#100d0a] px-4 py-4 transition duration-300 hover:-translate-y-0.5 hover:border-[#e0c89378] hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#e0c89377] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0b0908]"
              aria-label={`Visit ${brand.name}`}
              whileHover={reduceMotion ? undefined : hoverLift}
              whileTap={reduceMotion ? undefined : buttonPress}
            >
              {/* Use <a> for external domains so crawlers and browsers treat this as standard outbound navigation. */}
              <p className="text-base font-medium text-[#f3e8d1]">{brand.name}</p>
              <p className="mt-0.5 text-sm text-[#b8ad95]">{brand.subtitle}</p>
              <span className="mt-3 inline-flex items-center text-xs font-medium uppercase tracking-[0.12em] text-[#d7bb85]">
                {t('visitSite')}
              </span>
            </motion.a>
          ))}
        </div>

        <p className="mt-4 text-xs text-[#9e927b]">
          {/* Same-tab is the corporate default to keep one clear journey and avoid extra-tab clutter during business flow. */}
          {t('navNote')}
        </p>
      </motion.nav>
    </>
  );
}
