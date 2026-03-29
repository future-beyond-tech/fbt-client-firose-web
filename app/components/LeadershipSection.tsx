'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import {
  AnimatePresence,
  motion,
  useInView,
  useReducedMotion,
  useScroll,
  useTransform,
} from 'framer-motion';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { MOTION_EASE } from '@/lib/motion';

/* ═══════════════════════════════════════════════════════════════════════════ */
/*  LEADER DATA                                                              */
/* ═══════════════════════════════════════════════════════════════════════════ */

type Leader = {
  nameKey: string;
  title1Key: string;
  title2Key?: string;
  bioKey: string;
  badgeKey: string;
  quoteKey?: string;
  accent: string;
  initials: string;
  photo?: string;
};

const LEADERS: Leader[] = [
  {
    nameKey: 'ferozeName',
    title1Key: 'ferozeTitle1',
    title2Key: 'ferozeTitle2',
    bioKey: 'ferozeBio',
    badgeKey: 'ferozeBadge',
    quoteKey: 'ferozeQuote',
    accent: '#4A90D9',
    initials: 'FB',
  },
  {
    nameKey: 'razakName',
    title1Key: 'razakTitle1',
    title2Key: 'razakTitle2',
    bioKey: 'razakBio',
    badgeKey: 'razakBadge',
    accent: '#C87D6A',
    initials: 'AR',
  },
  {
    nameKey: 'srikanthName',
    title1Key: 'srikanthTitle1',
    title2Key: 'srikanthTitle2',
    bioKey: 'srikanthBio',
    badgeKey: 'srikanthBadge',
    accent: '#4A90D9',
    initials: 'GS',
  },
];

/* ═══════════════════════════════════════════════════════════════════════════ */
/*  AMBIENT PARTICLES                                                        */
/* ═══════════════════════════════════════════════════════════════════════════ */

function AmbientParticles() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      {[...Array(14)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            width: i % 3 === 0 ? 3 : 2,
            height: i % 3 === 0 ? 3 : 2,
            background: `rgba(200, 168, 107, ${0.15 + (i % 4) * 0.08})`,
            left: `${8 + ((i * 7.3) % 84)}%`,
            top: `${5 + ((i * 13.7) % 90)}%`,
          }}
          animate={{
            y: [0, -40 - (i % 3) * 20, 0],
            opacity: [0, 0.7, 0],
            scale: [0.4, 1, 0.4],
          }}
          transition={{
            duration: 5 + (i % 3) * 2,
            delay: i * 0.7,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  );
}

function shouldRevealTitleByCharacter(text: string) {
  return /^[\p{Script=Latin}\p{Number}\p{Punctuation}\p{Separator}]+$/u.test(text);
}

function getTitleRevealUnits(text: string) {
  if (shouldRevealTitleByCharacter(text)) {
    return {
      units: [...text],
      gapClassName: 'gap-x-[0.25em]',
      renderUnit: (unit: string) => (unit === ' ' ? '\u00A0' : unit),
    };
  }

  return {
    units: text.trim().split(/\s+/).filter(Boolean),
    gapClassName: 'gap-x-[0.35em] gap-y-[0.12em]',
    renderUnit: (unit: string) => unit,
  };
}

/* ═══════════════════════════════════════════════════════════════════════════ */
/*  GOLD LINE DRAW                                                           */
/* ═══════════════════════════════════════════════════════════════════════════ */

function GoldLineDraw({ width = 120, className = '' }: { width?: number; className?: string }) {
  const ref = useRef<SVGSVGElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <svg
      ref={ref}
      width={width}
      height="2"
      viewBox={`0 0 ${width} 2`}
      className={className}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="goldLine" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="transparent" />
          <stop offset="30%" stopColor="#c8a86b" />
          <stop offset="70%" stopColor="#c8a86b" />
          <stop offset="100%" stopColor="transparent" />
        </linearGradient>
      </defs>
      <motion.line
        x1="0"
        y1="1"
        x2={width}
        y2="1"
        stroke="url(#goldLine)"
        strokeWidth="1.5"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={isInView ? { pathLength: 1, opacity: 1 } : {}}
        transition={{ duration: 1.2, ease: MOTION_EASE }}
      />
    </svg>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════ */
/*  AVATAR                                                                   */
/* ═══════════════════════════════════════════════════════════════════════════ */

function Avatar({
  initials,
  accent,
  size = 96,
  photo,
  name,
  glow = false,
}: {
  initials: string;
  accent: string;
  size?: number;
  photo?: string;
  name?: string;
  glow?: boolean;
}) {
  return (
    <div className="relative flex-shrink-0" style={{ width: size, height: size }}>
      {/* Outer glow */}
      {glow && (
        <div
          className="absolute rounded-full"
          style={{
            inset: -8,
            background: `radial-gradient(circle, ${accent}22 0%, transparent 70%)`,
            filter: 'blur(8px)',
          }}
        />
      )}
      {/* Accent ring */}
      <div
        className="absolute inset-0 rounded-full transition-opacity duration-500 group-hover:opacity-80"
        style={{ border: `2px solid ${accent}`, opacity: 0.4 }}
      />
      {/* Inner circle */}
      <div
        className="absolute flex items-center justify-center overflow-hidden rounded-full"
        style={{ inset: 3, background: '#1d1813' }}
      >
        {photo ? (
          <Image
            src={photo}
            alt={`${name ?? initials} portrait`}
            fill
            className="object-cover"
            sizes={`${size}px`}
          />
        ) : (
          <span
            style={{
              fontFamily: 'var(--font-display, "Iowan Old Style", "Palatino Linotype", serif)',
              color: '#c8a86b',
              fontSize: size * 0.32,
              fontWeight: 500,
              letterSpacing: '0.06em',
            }}
          >
            {initials}
          </span>
        )}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════ */
/*  BADGE                                                                    */
/* ═══════════════════════════════════════════════════════════════════════════ */

function Badge({ text, accent }: { text: string; accent: string }) {
  return (
    <span
      className="inline-block rounded-full border px-3 py-1 text-[10px] font-semibold uppercase"
      style={{
        background: `${accent}14`,
        borderColor: `${accent}44`,
        color: accent,
        letterSpacing: '1.2px',
      }}
    >
      {text}
    </span>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════ */
/*  LEADER CARD — PREMIUM VERSION                                            */
/* ═══════════════════════════════════════════════════════════════════════════ */

function LeaderCard({
  leader,
  t,
  index,
}: {
  leader: Leader;
  t: ReturnType<typeof useTranslations>;
  index: number;
}) {
  const name = t(leader.nameKey);
  const title1 = t(leader.title1Key);
  const title2Raw = leader.title2Key ? t(leader.title2Key) : '';
  const title2 = title2Raw || undefined;
  const bio = t(leader.bioKey);
  const quote = leader.quoteKey ? t(leader.quoteKey) : undefined;
  const badgeText = t(leader.badgeKey);
  const badges = badgeText.split('|').map((b) => b.trim());

  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <motion.article
      ref={ref}
      className="group relative flex flex-col items-center overflow-hidden rounded-3xl border border-[#e0c89320] bg-[#110f0cdd] p-8 text-center backdrop-blur-md sm:p-10"
      initial={{ opacity: 0, y: 50, scale: 0.97 }}
      animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{
        duration: 0.75,
        delay: index * 0.18,
        ease: MOTION_EASE,
      }}
      whileHover={{
        y: -8,
        transition: { duration: 0.4, ease: MOTION_EASE },
      }}
      style={{
        boxShadow: '0 4px 40px rgba(0, 0, 0, 0.3)',
      }}
    >
      {/* Top accent line — draws on hover */}
      <div
        className="absolute left-0 right-0 top-0 h-[2px] origin-left scale-x-0 transition-transform duration-700 group-hover:scale-x-100"
        style={{
          background: `linear-gradient(90deg, transparent, ${leader.accent}, transparent)`,
        }}
      />

      {/* Radial glow behind avatar on hover */}
      <div
        className="absolute left-1/2 top-12 h-40 w-40 -translate-x-1/2 rounded-full opacity-0 blur-3xl transition-opacity duration-700 group-hover:opacity-100"
        style={{ background: `${leader.accent}18` }}
      />

      {/* Avatar */}
      <Avatar
        initials={leader.initials}
        accent={leader.accent}
        size={104}
        photo={leader.photo}
        name={name}
      />

      {/* Name */}
      <h3
        className="mt-6 text-2xl font-normal text-[#f4edde]"
        style={{ fontFamily: 'var(--font-display)' }}
      >
        {name}
      </h3>

      {/* Primary title */}
      <p
        className="mt-2 text-[11px] font-semibold uppercase tracking-[0.14em]"
        style={{ color: leader.accent }}
      >
        {title1}
      </p>

      {/* Secondary title */}
      {title2 && (
        <p className="mt-1 text-[12px] italic text-[#7d745f]">{title2}</p>
      )}

      {/* Accent divider */}
      <div className="mx-auto my-5 h-px w-10" style={{ background: leader.accent, opacity: 0.3 }} />

      {/* Bio */}
      <p className="text-[14px] leading-[1.8] text-[#b7ac97]">{bio}</p>

      {/* Personal quote */}
      {quote && (
        <div className="relative mt-6 w-full rounded-2xl border border-[#c8a86b20] bg-[#c8a86b08] px-6 py-5">
          <span
            className="absolute -top-3 left-4 select-none text-4xl leading-none text-[#c8a86b] opacity-30"
            style={{ fontFamily: 'var(--font-display)' }}
            aria-hidden="true"
          >
            &ldquo;
          </span>
          <blockquote
            className="text-[13px] leading-[1.9] text-[#d8ccb4] italic"
            style={{ fontFamily: '"Cormorant Garamond", var(--font-display)' }}
          >
            {quote}
          </blockquote>
          <p className="mt-3 text-[10px] font-semibold uppercase tracking-[0.15em] text-[#8a7e68]">
            — {name}
          </p>
        </div>
      )}

      {/* Badges */}
      <div className="mt-6 flex flex-wrap justify-center gap-2">
        {badges.map((badge) => (
          <Badge key={badge} text={badge} accent={leader.accent} />
        ))}
      </div>
    </motion.article>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════ */
/*  CINEMATIC HERO                                                           */
/* ═══════════════════════════════════════════════════════════════════════════ */

function CinematicHero({ t }: { t: ReturnType<typeof useTranslations> }) {
  const sectionRef = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '12%']);
  const titleOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  const TITLE_WORD_1 = t('titleLine1');
  const TITLE_WORD_2 = t('titleLine2');
  const line1Reveal = getTitleRevealUnits(TITLE_WORD_1);
  const line2Reveal = getTitleRevealUnits(TITLE_WORD_2);

  return (
    <section
      ref={sectionRef}
      className="relative flex min-h-[70vh] flex-col items-center justify-center overflow-hidden py-28 sm:min-h-[80vh] sm:py-36"
    >
      {/* Ambient radial glow */}
      <motion.div
        className="absolute inset-0"
        style={{ y: reduceMotion ? 0 : bgY }}
      >
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(60% 50% at 50% 40%, rgba(200, 168, 107, 0.09) 0%, transparent 70%)',
          }}
        />
      </motion.div>

      <AmbientParticles />

      <motion.div
        className="relative z-10 flex flex-col items-center px-6 text-center"
        style={{ opacity: reduceMotion ? 1 : titleOpacity }}
      >
        {/* Eyebrow */}
        <motion.p
          className="text-[11px] font-medium uppercase tracking-[0.28em] text-[#b59f75]"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: MOTION_EASE }}
        >
          {t('eyebrow')}
        </motion.p>

        {/* Title line 1 — character-by-character reveal */}
        <motion.h1
          className="mt-6 overflow-hidden"
          style={{ fontFamily: 'var(--font-display)' }}
        >
          <span className={`flex flex-wrap justify-center ${line1Reveal.gapClassName}`}>
            {line1Reveal.units.map((unit, i) => (
              <motion.span
                key={`l1-${i}`}
                className="inline-block text-5xl font-normal text-[#f4edde] sm:text-7xl lg:text-8xl"
                initial={{ opacity: 0, y: 40, filter: 'blur(8px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                transition={{
                  duration: 0.5,
                  delay: reduceMotion ? 0 : 0.25 + i * 0.04,
                  ease: MOTION_EASE,
                }}
              >
                {line1Reveal.renderUnit(unit)}
              </motion.span>
            ))}
          </span>
          {/* Line 2 — gold gradient text */}
          <span className={`mt-1 flex flex-wrap justify-center ${line2Reveal.gapClassName} sm:mt-2`}>
            {line2Reveal.units.map((unit, i) => (
              <motion.span
                key={`l2-${i}`}
                className="inline-block text-5xl font-normal sm:text-7xl lg:text-8xl"
                style={{
                  background: 'linear-gradient(135deg, #f1ddb4, #c8a86b, #a78549)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
                initial={{ opacity: 0, y: 40, filter: 'blur(8px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                transition={{
                  duration: 0.5,
                  delay: reduceMotion ? 0 : 0.6 + i * 0.04,
                  ease: MOTION_EASE,
                }}
              >
                {line2Reveal.renderUnit(unit)}
              </motion.span>
            ))}
          </span>
        </motion.h1>

        {/* Gold line */}
        <motion.div
          className="mt-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.1, duration: 0.6 }}
        >
          <GoldLineDraw width={140} />
        </motion.div>

        {/* Subtitle */}
        <motion.p
          className="mx-auto mt-7 max-w-[52ch] text-sm leading-relaxed text-[#b8ad96] sm:text-base lg:text-lg"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: reduceMotion ? 0 : 1.3, ease: MOTION_EASE }}
        >
          {t('subtitle')}
        </motion.p>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
      >
        <motion.div
          className="flex flex-col items-center gap-2"
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        >
          <span className="text-[10px] uppercase tracking-[0.2em] text-[#8a7e68]">Scroll</span>
          <svg width="16" height="24" viewBox="0 0 16 24" fill="none" aria-hidden="true">
            <rect x="1" y="1" width="14" height="22" rx="7" stroke="#8a7e68" strokeWidth="1.5" />
            <motion.circle
              cx="8"
              cy="8"
              r="2.5"
              fill="#c8a86b"
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            />
          </svg>
        </motion.div>
      </motion.div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════ */
/*  FOUNDER SPOTLIGHT — CINEMATIC                                            */
/* ═══════════════════════════════════════════════════════════════════════════ */

function FounderSpotlight({ t }: { t: ReturnType<typeof useTranslations> }) {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const reduceMotion = useReducedMotion();

  return (
    <section ref={ref} className="fe-panel overflow-hidden p-0">
      <div className="relative">
        {/* Gold edge accent */}
        <div
          className="absolute bottom-0 left-0 top-0 w-[3px]"
          style={{
            background: 'linear-gradient(180deg, transparent, #c8a86b, transparent)',
          }}
        />

        <div className="flex flex-col items-center gap-10 p-7 sm:p-10 md:flex-row md:items-center md:gap-16 lg:p-14">
          {/* Left: Avatar — cinematic reveal */}
          <motion.div
            className="flex flex-col items-center gap-5"
            initial={{ opacity: 0, scale: 0.85 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.9, ease: MOTION_EASE }}
          >
            <div className="relative">
              {/* Animated glow ring */}
              <div
                className="absolute rounded-full"
                style={{
                  inset: -12,
                  border: '2px solid rgba(200, 168, 107, 0.2)',
                  animation: reduceMotion ? 'none' : 'founderRing 4s ease-in-out infinite',
                }}
              />
              <div
                className="absolute rounded-full"
                style={{
                  inset: -6,
                  border: '1px solid rgba(200, 168, 107, 0.15)',
                  animation: reduceMotion ? 'none' : 'founderRing 4s ease-in-out infinite 0.5s',
                }}
              />
              <Avatar initials="SB" accent="#c8a86b" size={180} name="Sithic Basha" glow />
            </div>
            <motion.span
              className="inline-block rounded-full px-5 py-2 text-[11px] font-semibold uppercase tracking-[0.16em]"
              style={{
                background: 'linear-gradient(135deg, #c8a86b, #a78549)',
                color: '#22190d',
              }}
              initial={{ opacity: 0, y: 10 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.5, duration: 0.5 }}
            >
              {t('founderEstablished')}
            </motion.span>
          </motion.div>

          {/* Right: Content */}
          <div className="flex-1 text-center md:text-left">
            <motion.p
              className="text-[11px] font-medium uppercase tracking-[0.2em] text-[#b59f75]"
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, ease: MOTION_EASE }}
            >
              {t('founderEyebrow')}
            </motion.p>

            <motion.h2
              className="mt-3 text-4xl font-normal text-[#f4edde] sm:text-5xl"
              style={{ fontFamily: 'var(--font-display)' }}
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.1, ease: MOTION_EASE }}
            >
              {t('founderName')}
            </motion.h2>

            {/* Animated gold underline */}
            <motion.div
              className="mx-auto mt-4 h-[2px] rounded-full bg-[#c8a86b] md:mx-0"
              initial={{ width: 0 }}
              animate={isInView ? { width: 60 } : {}}
              transition={{ duration: 0.8, delay: 0.3, ease: MOTION_EASE }}
            />

            {/* Quote */}
            <motion.div
              className="relative mt-8"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.4, ease: MOTION_EASE }}
            >
              <span
                className="absolute -left-1 -top-5 select-none text-7xl leading-none text-[#c8a86b] opacity-20"
                style={{ fontFamily: 'var(--font-display)' }}
                aria-hidden="true"
              >
                &ldquo;
              </span>
              <blockquote
                className="pl-6 text-base leading-[1.9] text-[#d8ccb4] italic sm:text-lg"
                style={{ fontFamily: 'var(--font-display)' }}
              >
                {t('founderQuote')}
              </blockquote>
              <p className="mt-5 pl-6 text-xs font-medium tracking-wide text-[#8a7e68]">
                — {t('founderAttribution')}
              </p>
            </motion.div>

            {/* Chips */}
            <motion.div
              className="mt-7 flex flex-wrap justify-center gap-3 md:justify-start"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.7 }}
            >
              <span className="fe-badge">📍 {t('founderLocation')}</span>
              <span className="fe-badge">🏭 {t('founderMsme')}</span>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════ */
/*  CLOSING BLOCK — CINEMATIC                                                */
/* ═══════════════════════════════════════════════════════════════════════════ */

function ClosingBlock({ t }: { t: ReturnType<typeof useTranslations> }) {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section ref={ref} className="fe-panel-strong overflow-hidden p-7 text-center sm:p-10 lg:p-16">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, ease: MOTION_EASE }}
      >
        <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-[#b59f75]">
          {t('closingEyebrow')}
        </p>

        <h2
          className="mt-6 text-3xl font-normal text-[#f4edde] italic sm:text-4xl lg:text-5xl"
          style={{ fontFamily: '"Cormorant Garamond", var(--font-display)' }}
        >
          {t('closingTitle')}
        </h2>

        <GoldLineDraw width={100} className="mx-auto mt-6" />

        <p className="mx-auto mt-6 max-w-[560px] text-sm leading-relaxed text-[#b8ad96] sm:text-base">
          {t('closingBody')}
        </p>

        <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
          <Link href="/brands" className="fe-btn-primary">
            {t('btnDivisions')} →
          </Link>
          <Link href="/business-with-us" className="fe-link-chip">
            {t('btnBusiness')} →
          </Link>
        </div>
      </motion.div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════ */
/*  MAIN EXPORT                                                              */
/* ═══════════════════════════════════════════════════════════════════════════ */

export default function LeadershipSection() {
  const t = useTranslations('leadershipPage');

  return (
    <div className="relative">
      {/* ── Cinematic Hero ───────────────────────────────────────────── */}
      <CinematicHero t={t} />

      {/* ── Content body ─────────────────────────────────────────────── */}
      <div className="fe-main fe-ambient-drift">
        {/* Founder Spotlight */}
        <FounderSpotlight t={t} />

        {/* Leader cards */}
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {LEADERS.map((leader, i) => (
            <LeaderCard key={leader.nameKey} leader={leader} t={t} index={i} />
          ))}
        </div>

        {/* Closing */}
        <ClosingBlock t={t} />
      </div>

      {/* Global CSS for this section */}
      <style>{`
        @keyframes founderRing {
          0%, 100% { opacity: 0.2; transform: scale(1); }
          50% { opacity: 0.6; transform: scale(1.06); }
        }
      `}</style>
    </div>
  );
}
