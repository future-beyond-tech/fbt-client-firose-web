'use client';

import Image from 'next/image';
import { motion, useReducedMotion } from 'framer-motion';
import type { CSSProperties } from 'react';
import { useTranslations } from 'next-intl';
import {
  getDivisionPageHref,
  getDivisionWebsiteHref,
  type DivisionDefinition,
} from '@/app/lib/divisions';
import { divisionMessageKeys } from '@/app/lib/divisionMessages';
import { Link } from '@/i18n/navigation';
import { MOTION_EASE, buttonPress, fadeInUp, hoverLift } from '@/lib/motion';

type DivisionCardProps = {
  division: DivisionDefinition;
  animationDelayMs?: number;
};

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

export default function DivisionCard({ division, animationDelayMs = 0 }: Readonly<DivisionCardProps>) {
  const isTech = division.theme === 'tech';
  const divisionPageHref = getDivisionPageHref(division);
  const divisionWebsiteHref = getDivisionWebsiteHref(division);
  const tCard = useTranslations('divisionCard');
  const tDivision = useTranslations('divisions');
  const keys = divisionMessageKeys[division.id];
  const divisionName = tDivision(keys.name);
  const divisionCategory = tDivision(keys.category);
  const divisionDescription = tDivision(keys.description);
  const reduceMotion = useReducedMotion();
  const cardClassName =
    'fe-stagger-card group overflow-hidden rounded-3xl border border-[#e0c8932a] bg-[linear-gradient(165deg,rgba(20,17,13,0.9),rgba(10,9,7,0.95))] text-[#f5ecdb] shadow-[0_14px_34px_rgba(0,0,0,0.42)] transition hover:-translate-y-0.5 hover:shadow-[0_24px_48px_rgba(0,0,0,0.52)]';
  const categoryClassName = isTech
    ? 'absolute bottom-3 left-3 inline-flex items-center gap-1 rounded-full border border-[#f4dbac66] bg-[#4a3a245c] px-3 py-1 text-[11px] font-medium uppercase tracking-[0.1em] text-[#ecd2a0]'
    : 'absolute bottom-3 left-3 inline-flex items-center gap-1 rounded-full border border-[#f4dbac55] bg-[#382d1d66] px-3 py-1 text-[11px] font-medium uppercase tracking-[0.1em] text-[#ecd2a0]';
  const descriptionClassName = 'text-sm text-[#b7ac97]';
  const actionClassName =
    'mt-1 inline-flex w-fit items-center gap-1 rounded-full border border-[#e0c89366] bg-[#32271975] px-4 py-2 text-xs font-medium uppercase tracking-[0.12em] text-[#f3e8d1] transition hover:border-[#e0c893aa] hover:bg-[#4535239a]';

  return (
    <motion.article
      className={cardClassName}
      variants={fadeInUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      whileHover={reduceMotion ? undefined : hoverLift}
      whileTap={reduceMotion ? undefined : buttonPress}
      transition={{
        duration: 0.44,
        delay: animationDelayMs / 1000,
        ease: MOTION_EASE,
      }}
      style={{ animationDelay: `${animationDelayMs}ms` } as CSSProperties}
    >
      <Link href={divisionPageHref} aria-label={tCard('openDivision', { name: divisionName })}>
        <div className="fe-interactive-media relative h-52 w-full">
          <Image
            src={division.image}
            alt={division.imageAlt}
            fill
            className="object-cover"
            sizes="(max-width: 767px) 100vw, (max-width: 1279px) 50vw, 25vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#080705f2] via-[#0c0a08b8] to-transparent" />
          <p className={categoryClassName}>{divisionCategory}</p>
        </div>
      </Link>

      <div className="grid gap-2 p-4">
        <h3 className="text-xl font-normal text-[#f8f1e3]">{divisionName}</h3>
        <p className={descriptionClassName}>{divisionDescription}</p>

        <motion.a
          href={divisionWebsiteHref}
          target="_self"
          rel="noopener noreferrer"
          className={actionClassName}
          aria-label={tCard('visitExternal', { name: divisionName })}
          whileHover={reduceMotion ? undefined : { y: -1, transition: { duration: 0.18, ease: MOTION_EASE } }}
          whileTap={reduceMotion ? undefined : buttonPress}
        >
          {division.ctaLabel ?? tCard('visitWebsite')}
          <ExternalLinkIcon className="h-4 w-4" />
        </motion.a>
      </div>
    </motion.article>
  );
}
