'use client';

import { useState, useRef, useEffect } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { useRouter, usePathname } from '@/i18n/navigation';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { MOTION_EASE } from '@/lib/motion';
import { locales, localeNames, type Locale } from '@/i18n/routing';

export default function LanguageSwitcher() {
  const locale = useLocale() as Locale;
  const router = useRouter();
  const pathname = usePathname();
  const reduceMotion = useReducedMotion();
  const t = useTranslations('nav');
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    function handleEscape(event: KeyboardEvent) {
      if (event.key === 'Escape') setOpen(false);
    }
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, []);

  function switchLocale(newLocale: Locale) {
    router.replace(pathname, { locale: newLocale });
    setOpen(false);
  }

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="inline-flex min-h-11 items-center gap-1.5 rounded-md border border-transparent px-2.5 py-1.5 text-[11px] font-medium uppercase tracking-[0.14em] text-[#ab9f88] transition hover:border-[#d8bc8760] hover:bg-[#2a22166e] hover:text-[#f4e6c8]"
        aria-expanded={open}
        aria-haspopup="listbox"
        aria-label={t('selectLanguage')}
      >
        <svg
          viewBox="0 0 20 20"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          className="h-4 w-4"
          aria-hidden="true"
        >
          <circle cx="10" cy="10" r="8" />
          <path d="M2 10h16" />
          <path d="M10 2c2.5 2.5 3.5 5 3.5 8s-1 5.5-3.5 8c-2.5-2.5-3.5-5-3.5-8s1-5.5 3.5-8z" />
        </svg>
        <span>{localeNames[locale]}</span>
        <svg viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" className="h-3.5 w-3.5">
          <path d="M5.2 7.7a.75.75 0 011.06 0L10 11.44l3.74-3.74a.75.75 0 111.06 1.06l-4.27 4.27a.75.75 0 01-1.06 0L5.2 8.76a.75.75 0 010-1.06z" />
        </svg>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            className="absolute right-0 top-full z-[70] mt-2 w-[180px] overflow-hidden rounded-xl border border-[#e0c89333] bg-[#0f0d0adf] shadow-[0_24px_44px_rgba(0,0,0,0.52)] backdrop-blur"
            role="listbox"
            aria-label={t('availableLanguages')}
            initial={{ opacity: 0, y: -8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.98 }}
            transition={{ duration: reduceMotion ? 0.1 : 0.22, ease: MOTION_EASE }}
          >
            <div className="p-1.5">
              {locales.map((loc) => {
                const isActive = loc === locale;
                return (
                  <button
                    key={loc}
                    type="button"
                    role="option"
                    aria-selected={isActive}
                    onClick={() => switchLocale(loc)}
                    className={`flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-left text-sm transition ${
                      isActive
                        ? 'bg-[#3d30206b] text-[#f4e6c8]'
                        : 'text-[#b8ad95] hover:bg-[#2a22166e] hover:text-[#f4e6c8]'
                    }`}
                  >
                    <span className="font-medium">{localeNames[loc]}</span>
                    {isActive && (
                      <span style={{ color: 'var(--fe-primary)' }} aria-hidden="true">
                        ✓
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
