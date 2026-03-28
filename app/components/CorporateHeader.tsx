'use client';

import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { Link, usePathname } from '@/i18n/navigation';
import { divisionCatalog } from '@/app/lib/divisions';
import { MOTION_EASE, buttonPress } from '@/lib/motion';
import LanguageSwitcher from '@/app/components/LanguageSwitcher';

type NavItem = {
  href: string;
  labelKey: string;
  cta?: boolean;
};

const NAV_ITEMS: NavItem[] = [
  { href: '/', labelKey: 'home' },
  { href: '/about', labelKey: 'about' },
  { href: '/leadership', labelKey: 'leadership' },
  { href: '/manufacturing-quality', labelKey: 'manufacturingQuality' },
  { href: '/business-with-us', labelKey: 'businessWithUs' },
  { href: '/brochure', labelKey: 'brochure' },
  { href: '/contact', labelKey: 'contact', cta: true },
];
const DIVISION_ROUTE_OVERRIDES: Partial<Record<string, string>> = {
  'ar-perfumes': '/brands/ar-perfumes',
  femison: '/brands/femison',
  'neat-fresh': '/brands/neat-fresh',
};

function isActive(pathname: string, href: string): boolean {
  if (href === '/') {
    return pathname === '/';
  }

  return pathname === href || pathname.startsWith(`${href}/`);
}

function isDivisionsActive(pathname: string): boolean {
  return pathname === '/brands' || pathname.startsWith('/brands/');
}

function navClassName(item: NavItem, active: boolean): string {
  const base =
    'inline-flex min-h-10 items-center justify-center rounded-md border px-3 py-1.5 text-[11px] font-medium uppercase tracking-[0.14em] transition md:px-3.5';
  const activeStyle = active
    ? 'border-[#e0c8937a] bg-[#3d30206b] text-[#f4e6c8]'
    : 'border-transparent text-[#ab9f88] hover:border-[#d8bc8760] hover:bg-[#2a22166e] hover:text-[#f4e6c8]';
  const ctaStyle = item.cta
    ? 'border-[#e0c89382] bg-gradient-to-r from-[#4f3c228a] to-[#2f251996] text-[#f4e6c8]'
    : '';

  return [base, activeStyle, ctaStyle].filter(Boolean).join(' ');
}

function divisionTriggerClass(active: boolean, open: boolean): string {
  const base =
    'inline-flex min-h-10 items-center justify-center gap-1 rounded-md border px-3 py-1.5 text-[11px] font-medium uppercase tracking-[0.14em] transition md:px-3.5';
  const activeStyle = active || open
    ? 'border-[#e0c8937a] bg-[#3d30206b] text-[#f4e6c8]'
    : 'border-transparent text-[#ab9f88] hover:border-[#d8bc8760] hover:bg-[#2a22166e] hover:text-[#f4e6c8]';

  return `${base} ${activeStyle}`;
}

function divisionLinkClass(active: boolean): string {
  const base =
    'inline-flex min-h-10 items-center justify-between rounded-md border px-3 py-2 text-xs font-medium uppercase tracking-[0.1em] transition';
  const activeStyle = active
    ? 'border-[#e0c8937a] bg-[#3d30206b] text-[#f4e6c8]'
    : 'border-transparent text-[#b8ad95] hover:border-[#d8bc8760] hover:bg-[#2a22166e] hover:text-[#f4e6c8]';

  return `${base} ${activeStyle}`;
}

function resolveDivisionHref(id: string, href: string): string {
  return DIVISION_ROUTE_OVERRIDES[id] ?? href;
}

function shouldUseExternalDivisionLink(id: string, external?: boolean): boolean {
  return DIVISION_ROUTE_OVERRIDES[id] ? false : Boolean(external);
}

function ExternalLinkIcon({ className }: Readonly<{ className?: string }>) {
  return (
    <svg
      viewBox="0 0 20 20"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      aria-hidden="true"
      className={className}
    >
      <path d="M8 4h8v8" />
      <path d="M7 13l9-9" />
      <path d="M16 11v5H4V4h5" />
    </svg>
  );
}

function NavLabel({ label, active }: Readonly<{ label: string; active: boolean }>) {
  return (
    <span className="relative inline-flex items-center">
      {label}
      {active ? (
        <motion.span
          layoutId="header-active-underline"
          className="absolute -bottom-[0.34rem] left-0 h-[2px] w-full rounded-full bg-[#f0d8a8]"
          transition={{ type: 'spring', stiffness: 380, damping: 30, mass: 0.55 }}
        />
      ) : null}
    </span>
  );
}

export default function CorporateHeader() {
  const pathname = usePathname();
  const reduceMotion = useReducedMotion();
  const t = useTranslations('nav');
  const tCommon = useTranslations('common');
  const tDivisionCard = useTranslations('divisionCard');
  const [menuOpen, setMenuOpen] = useState(false);
  const [divisionsOpen, setDivisionsOpen] = useState(false);
  const [headerVisible, setHeaderVisible] = useState(true);
  const divisionsMenuRef = useRef<HTMLDivElement>(null);
  const lastScrollYRef = useRef(0);

  useEffect(() => {
    setMenuOpen(false);
    setDivisionsOpen(false);
  }, [pathname]);

  useEffect(() => {
    function handleOutsideClick(event: MouseEvent) {
      if (!divisionsMenuRef.current) {
        return;
      }

      if (divisionsMenuRef.current.contains(event.target as Node)) {
        return;
      }

      setDivisionsOpen(false);
    }

    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, []);

  useEffect(() => {
    function handleEscape(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setDivisionsOpen(false);
      }
    }

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, []);

  useEffect(() => {
    if (menuOpen || divisionsOpen) {
      setHeaderVisible(true);
    }
  }, [menuOpen, divisionsOpen]);

  useEffect(() => {
    function handleScroll() {
      const currentY = window.scrollY;
      const previousY = lastScrollYRef.current;

      if (currentY <= 30) {
        setHeaderVisible(true);
      } else if (currentY > previousY + 10) {
        setHeaderVisible(false);
      } else if (currentY < previousY - 10) {
        setHeaderVisible(true);
      }

      lastScrollYRef.current = currentY;
    }

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const divisionsActive = isDivisionsActive(pathname);

  return (
    <motion.header
      className="sticky top-0 z-50 border-b border-[#e0c89330] bg-[#090807de] backdrop-blur-xl"
      initial={false}
      animate={
        reduceMotion
          ? { y: 0, opacity: 1 }
          : { y: headerVisible ? 0 : -92, opacity: 1 }
      }
      transition={{ duration: 0.34, ease: MOTION_EASE }}
    >
      <div className="mx-auto flex min-h-[74px] w-[min(1240px,calc(100%_-_1.25rem))] items-center justify-between gap-3 py-2 md:w-[min(1240px,calc(100%_-_2rem))]">
        <Link
          href="/"
          className="text-[clamp(0.92rem,1.5vw,1.12rem)] font-medium uppercase tracking-[0.2em] text-[#ecd9af]"
        >
          Firose Enterprises
        </Link>

        <motion.button
          type="button"
          className="inline-flex min-h-10 items-center justify-center rounded-md border border-[#d8bc8770] bg-[#2a22166e] px-3.5 py-1 text-[11px] font-medium uppercase tracking-[0.14em] text-[#f4e6c8] md:hidden"
          aria-expanded={menuOpen}
          aria-controls="corporate-mobile-nav"
          aria-label={menuOpen ? t('closeMenu') : t('openMenu')}
          onClick={() => setMenuOpen((current) => !current)}
          whileTap={reduceMotion ? undefined : buttonPress}
        >
          {menuOpen ? tCommon('close') : tCommon('menu')}
        </motion.button>

        <nav className="hidden items-center gap-1 md:flex" aria-label={t('primaryNavigation')}>
          {NAV_ITEMS.slice(0, 2).map((item) => {
            const active = isActive(pathname, item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={navClassName(item, active)}
                aria-current={active ? 'page' : undefined}
              >
                <NavLabel label={t(item.labelKey)} active={active} />
              </Link>
            );
          })}

          <div ref={divisionsMenuRef} className="relative">
            <motion.button
              type="button"
              className={divisionTriggerClass(divisionsActive, divisionsOpen)}
              aria-expanded={divisionsOpen}
              aria-haspopup="menu"
              aria-controls="corporate-divisions-menu"
              onClick={() => setDivisionsOpen((current) => !current)}
              onKeyDown={(event) => {
                if (event.key === 'ArrowDown') {
                  event.preventDefault();
                  setDivisionsOpen(true);
                }
              }}
              whileTap={reduceMotion ? undefined : buttonPress}
            >
              <NavLabel label={t('ourDivisions')} active={divisionsActive || divisionsOpen} />
              <svg viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" className="h-4 w-4">
                <path d="M5.2 7.7a.75.75 0 011.06 0L10 11.44l3.74-3.74a.75.75 0 111.06 1.06l-4.27 4.27a.75.75 0 01-1.06 0L5.2 8.76a.75.75 0 010-1.06z" />
              </svg>
            </motion.button>

            <AnimatePresence>
              {divisionsOpen ? (
                <motion.div
                  id="corporate-divisions-menu"
                  className="absolute left-0 top-full z-[70] mt-2 w-[340px] rounded-xl border border-[#e0c89333] bg-[#0f0d0adf] p-2 shadow-[0_24px_44px_rgba(0,0,0,0.52)] backdrop-blur"
                  role="menu"
                  aria-label={t('ourDivisionsMenu')}
                  initial={{ opacity: 0, y: -8, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -8, scale: 0.98 }}
                  transition={{ duration: 0.22, ease: MOTION_EASE }}
                >
                  <div className="grid gap-1">
                    {divisionCatalog.map((division) => {
                      const divisionHref = resolveDivisionHref(division.id, division.href);
                      const useExternalLink = shouldUseExternalDivisionLink(division.id, division.external);
                      const active = !useExternalLink && isActive(pathname, divisionHref);

                      if (useExternalLink) {
                        return (
                          <a
                            key={division.id}
                            href={divisionHref}
                            target="_self"
                            rel="noopener noreferrer"
                            role="menuitem"
                            className={divisionLinkClass(false)}
                            aria-label={tDivisionCard('visitExternal', { name: division.name })}
                          >
                            <span>{division.name}</span>
                            <ExternalLinkIcon className="h-4 w-4 text-[#b8ad95]" />
                          </a>
                        );
                      }

                      return (
                        <Link
                          key={division.id}
                          href={divisionHref}
                          role="menuitem"
                          className={divisionLinkClass(active)}
                          aria-current={active ? 'page' : undefined}
                        >
                          <span>{division.name}</span>
                        </Link>
                      );
                    })}
                  </div>
                </motion.div>
              ) : null}
            </AnimatePresence>
          </div>

          {NAV_ITEMS.slice(2).map((item) => {
            const active = isActive(pathname, item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={navClassName(item, active)}
                aria-current={active ? 'page' : undefined}
              >
                <NavLabel label={t(item.labelKey)} active={active} />
              </Link>
            );
          })}

          <LanguageSwitcher />
        </nav>
      </div>

      <AnimatePresence>
        {menuOpen ? (
          <motion.nav
            id="corporate-mobile-nav"
            className="border-t border-[#e0c89322] bg-[#0c0a08f5] md:hidden"
            aria-label={t('mobilePrimaryNavigation')}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.24, ease: MOTION_EASE }}
          >
            <div className="mx-auto grid w-[min(1240px,calc(100%_-_1.25rem))] gap-2 py-3">
              {NAV_ITEMS.map((item) => {
                const active = isActive(pathname, item.href);
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`${navClassName(item, active)} w-full justify-start`}
                    aria-current={active ? 'page' : undefined}
                    onClick={() => setMenuOpen(false)}
                  >
                    {t(item.labelKey)}
                  </Link>
                );
              })}

              <div className="rounded-xl border border-[#e0c8932f] bg-[#12100dcf] p-2">
                <p className="px-2 py-1 text-[11px] font-medium uppercase tracking-[0.18em] text-[#d7bb85]">{t('ourDivisions')}</p>
                <div className="grid gap-1">
                  {divisionCatalog.map((division) => {
                    const divisionHref = resolveDivisionHref(division.id, division.href);
                    const useExternalLink = shouldUseExternalDivisionLink(division.id, division.external);
                    const active = !useExternalLink && isActive(pathname, divisionHref);

                    if (useExternalLink) {
                      return (
                        <a
                          key={division.id}
                          href={divisionHref}
                          target="_self"
                          rel="noopener noreferrer"
                          className={`${divisionLinkClass(false)} w-full`}
                          aria-label={tDivisionCard('visitExternal', { name: division.name })}
                          onClick={() => setMenuOpen(false)}
                        >
                          <span>{division.name}</span>
                          <ExternalLinkIcon className="h-4 w-4 text-[#b8ad95]" />
                        </a>
                      );
                    }

                    return (
                      <Link
                        key={division.id}
                        href={divisionHref}
                        className={`${divisionLinkClass(active)} w-full`}
                        aria-current={active ? 'page' : undefined}
                        onClick={() => setMenuOpen(false)}
                      >
                        <span>{division.name}</span>
                      </Link>
                    );
                  })}
                </div>
              </div>
            </div>
          </motion.nav>
        ) : null}
      </AnimatePresence>
    </motion.header>
  );
}
