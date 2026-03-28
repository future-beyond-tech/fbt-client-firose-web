'use client';

import { useCallback, useEffect, useState } from 'react';
import Link from 'next/link';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { MOTION_EASE } from '@/lib/motion';

const SESSION_KEY = 'fe-hasSeenGreeting';

const FIROSE_LETTERS = 'FIROSE'.split('');

/* ─── Multi-language greetings (cycle through these) ────────────────────── */

type GreetingEntry = {
  line1: string;
  line2: string;
  lang: string;
};

function getTimeGreetings(): GreetingEntry[] {
  const hour = new Date().getHours();

  if (hour >= 5 && hour < 12) {
    return [
      { line1: 'Good Morning', line2: 'A fresh day begins with trust.', lang: 'English' },
      { line1: '\u0B89\u0B99\u0BCD\u0B95\u0BB3\u0BC1\u0B95\u0BCD\u0B95\u0BC1 \u0B89\u0BB0\u0BBF\u0BAF \u0BA8\u0BB2\u0BCD \u0B95\u0BBE\u0BB2\u0BC8', line2: '\u0BA8\u0BAE\u0BCD\u0BAA\u0BBF\u0B95\u0BCD\u0B95\u0BC8\u0BAF\u0BC1\u0B9F\u0BA9\u0BCD \u0BAA\u0BC1\u0BA4\u0BBF\u0BAF \u0BA8\u0BBE\u0BB3\u0BCD.', lang: 'Tamil' },
      { line1: '\u0C36\u0C41\u0C2D\u0C4B\u0C26\u0C2F\u0C02', line2: '\u0C28\u0C2E\u0C4D\u0C2E\u0C15\u0C02\u0C24\u0C4B \u0C15\u0C4A\u0C24\u0C4D\u0C24 \u0C30\u0C4B\u0C1C\u0C41 \u0C2E\u0C4A\u0C26\u0C32\u0C35\u0C41\u0C24\u0C41\u0C02\u0C26\u0C3F.', lang: '\u0C24\u0C46\u0C32\u0C41\u0C17\u0C41' },
      { line1: '\u0CB6\u0CC1\u0CAD\u0CCB\u0CA6\u0CAF', line2: '\u0CA8\u0C82\u0CAC\u0CBF\u0C95\u0CC6\u0CAF\u0CC6\u0C82\u0CA6\u0CB0\u0CC6 \u0CB9\u0CCA\u0CB8 \u0CA6\u0CBF\u0CA8 \u0CAA\u0CCD\u0CB0\u0CBE\u0CB0\u0C82\u0CAD\u0CB5\u0CBE\u0C97\u0CC1\u0CA4\u0CCD\u0CA4\u0CA6\u0CC6.', lang: '\u0C95\u0CA8\u0CCD\u0CA8\u0CA1' },
      { line1: '\u0938\u0941\u092A\u094D\u0930\u092D\u093E\u0924', line2: '\u0935\u093F\u0936\u094D\u0935\u093E\u0938 \u0915\u0947 \u0938\u093E\u0925 \u090F\u0915 \u0928\u092F\u093E \u0926\u093F\u0928 \u0936\u0941\u0930\u0942 \u0939\u094B\u0924\u093E \u0939\u0948\u0964', lang: 'Hindi' },
      { line1: '\u0635\u0628\u0627\u062D \u0627\u0644\u062E\u064A\u0631', line2: '\u064A\u0648\u0645 \u062C\u062F\u064A\u062F \u064A\u0628\u062F\u0623 \u0628\u0627\u0644\u062B\u0642\u0629.', lang: '\u0627\u0644\u0639\u0631\u0628\u064A\u0629' },
      { line1: 'Bonjour', line2: 'Une nouvelle journ\u00E9e commence avec confiance.', lang: 'Fran\u00E7ais' },
    ];
  }

  if (hour >= 12 && hour < 17) {
    return [
      { line1: 'Good Afternoon', line2: 'Thank you for choosing to be here.', lang: 'English' },
      { line1: '\u0BAE\u0BA4\u0BBF\u0BAF \u0BB5\u0BA3\u0B95\u0BCD\u0B95\u0BAE\u0BCD', line2: '\u0BA8\u0BC0\u0B99\u0BCD\u0B95\u0BB3\u0BCD \u0B87\u0B99\u0BCD\u0B95\u0BC7 \u0B87\u0BB0\u0BC1\u0BAA\u0BCD\u0BAA\u0BA4\u0BBF\u0BB2\u0BCD \u0BA8\u0BA9\u0BCD\u0BB1\u0BBF.', lang: 'Tamil' },
      { line1: '\u0C36\u0C41\u0C2D \u0C2E\u0C27\u0C4D\u0C2F\u0C3E\u0C39\u0C4D\u0C28\u0C02', line2: '\u0C2E\u0C40\u0C30\u0C41 \u0C07\u0C15\u0C4D\u0C15\u0C21 \u0C09\u0C28\u0C4D\u0C28\u0C02\u0C26\u0C41\u0C15\u0C41 \u0C27\u0C28\u0C4D\u0C2F\u0C35\u0C3E\u0C26\u0C3E\u0C32\u0C41.', lang: '\u0C24\u0C46\u0C32\u0C41\u0C17\u0C41' },
      { line1: '\u0CB6\u0CC1\u0CAD \u0CAE\u0CA7\u0CCD\u0CAF\u0CBE\u0CB9\u0CCD\u0CA8', line2: '\u0CA8\u0CC0\u0CB5\u0CC1 \u0C87\u0CB2\u0CCD\u0CB2\u0CBF \u0C87\u0CB0\u0CC1\u0CB5\u0CC1\u0CA6\u0C95\u0CCD\u0C95\u0CC6 \u0CA7\u0CA8\u0CCD\u0CAF\u0CB5\u0CBE\u0CA6\u0C97\u0CB3\u0CC1.', lang: '\u0C95\u0CA8\u0CCD\u0CA8\u0CA1' },
      { line1: '\u0928\u092E\u0938\u094D\u0915\u093E\u0930', line2: '\u092F\u0939\u093E\u0901 \u0906\u0928\u0947 \u0915\u0947 \u0932\u093F\u090F \u0927\u0928\u094D\u092F\u0935\u093E\u0926\u0964', lang: 'Hindi' },
      { line1: '\u0645\u0633\u0627\u0621 \u0627\u0644\u062E\u064A\u0631', line2: '\u0634\u0643\u0631\u0627\u064B \u0644\u0627\u062E\u062A\u064A\u0627\u0631\u0643\u0645 \u0627\u0644\u062A\u0648\u0627\u062C\u062F \u0647\u0646\u0627.', lang: '\u0627\u0644\u0639\u0631\u0628\u064A\u0629' },
      { line1: 'Bon Apr\u00E8s-midi', line2: 'Merci d\u2019\u00EAtre ici avec nous.', lang: 'Fran\u00E7ais' },
    ];
  }

  if (hour >= 17 && hour < 21) {
    return [
      { line1: 'Good Evening', line2: 'We are glad you found us.', lang: 'English' },
      { line1: '\u0BAE\u0BA3\u0BBF \u0BB5\u0BA3\u0B95\u0BCD\u0B95\u0BAE\u0BCD', line2: '\u0BA8\u0BC0\u0B99\u0BCD\u0B95\u0BB3\u0BCD \u0B8E\u0B99\u0BCD\u0B95\u0BB3\u0BC8 \u0B95\u0BA3\u0BCD\u0B9F\u0BC1\u0BAA\u0BBF\u0B9F\u0BBF\u0BA4\u0BCD\u0BA4\u0BC0\u0BB0\u0BCD\u0B95\u0BB3\u0BCD.', lang: 'Tamil' },
      { line1: '\u0C36\u0C41\u0C2D \u0C38\u0C3E\u0C2F\u0C02\u0C24\u0C4D\u0C30\u0C02', line2: '\u0C2E\u0C40\u0C30\u0C41 \u0C2E\u0C3E\u0C15\u0C41 \u0C26\u0C17\u0C4D\u0C17\u0C30\u0C15\u0C41 \u0C35\u0C1A\u0C4D\u0C1A\u0C3F\u0C28\u0C02\u0C26\u0C41\u0C15\u0C41 \u0C38\u0C02\u0C24\u0C4B\u0C37\u0C02.', lang: '\u0C24\u0C46\u0C32\u0C41\u0C17\u0C41' },
      { line1: '\u0CB6\u0CC1\u0CAD \u0CB8\u0C82\u0CA7\u0CCD\u0CAF\u0CBE', line2: '\u0CA8\u0CC0\u0CB5\u0CC1 \u0CA8\u0CAE\u0CCD\u0CAE\u0CA8\u0CCD\u0CA8\u0CC1 \u0C95\u0C82\u0CA1\u0CC1\u0CB9\u0CBF\u0CA1\u0CBF\u0CA6\u0CA6\u0CCD\u0CA6\u0C95\u0CCD\u0C95\u0CC6 \u0CB8\u0C82\u0CA4\u0CCB\u0CB7.', lang: '\u0C95\u0CA8\u0CCD\u0CA8\u0CA1' },
      { line1: '\u0936\u0941\u092D \u0938\u0902\u0927\u094D\u092F\u093E', line2: '\u0939\u092E\u0947\u0902 \u0916\u0941\u0936\u0940 \u0939\u0948 \u0915\u093F \u0906\u092A \u092F\u0939\u093E\u0901 \u0906\u090F\u0964', lang: 'Hindi' },
      { line1: '\u0645\u0633\u0627\u0621 \u0627\u0644\u0646\u0648\u0631', line2: '\u0633\u0639\u062F\u0627\u0621 \u0628\u0632\u064A\u0627\u0631\u062A\u0643\u0645.', lang: '\u0627\u0644\u0639\u0631\u0628\u064A\u0629' },
      { line1: 'Bonsoir', line2: 'Nous sommes heureux de vous accueillir.', lang: 'Fran\u00E7ais' },
    ];
  }

  return [
    { line1: 'Welcome', line2: 'You are always welcome here.', lang: 'English' },
    { line1: '\u0BB5\u0BB0\u0BB5\u0BC7\u0BB1\u0BCD\u0BAA\u0BC1', line2: '\u0BA8\u0BC0\u0B99\u0BCD\u0B95\u0BB3\u0BCD \u0B8E\u0BAA\u0BCD\u0BAA\u0BCB\u0BA4\u0BC1\u0BAE\u0BCD \u0BB5\u0BB0\u0BB5\u0BC7\u0BB1\u0BCD\u0B95\u0BAA\u0BCD\u0BAA\u0B9F\u0BC1\u0B95\u0BBF\u0BB1\u0BC0\u0BB0\u0BCD\u0B95\u0BB3\u0BCD.', lang: 'Tamil' },
    { line1: '\u0C38\u0C4D\u0C35\u0C3E\u0C17\u0C24\u0C02', line2: '\u0C2E\u0C40\u0C30\u0C41 \u0C0E\u0C2A\u0C4D\u0C2A\u0C41\u0C21\u0C42 \u0C38\u0C4D\u0C35\u0C3E\u0C17\u0C24\u0C02.', lang: '\u0C24\u0C46\u0C32\u0C41\u0C17\u0C41' },
    { line1: '\u0CB8\u0CCD\u0CB5\u0CBE\u0C97\u0CA4', line2: '\u0CA8\u0CC0\u0CB5\u0CC1 \u0CAF\u0CBE\u0CB5\u0CBE\u0C97\u0CB2\u0CC2 \u0CB8\u0CCD\u0CB5\u0CBE\u0C97\u0CA4.', lang: '\u0C95\u0CA8\u0CCD\u0CA8\u0CA1' },
    { line1: '\u0938\u094D\u0935\u093E\u0917\u0924', line2: '\u0906\u092A\u0915\u093E \u092F\u0939\u093E\u0901 \u0938\u0926\u093E \u0938\u094D\u0935\u093E\u0917\u0924 \u0939\u0948\u0964', lang: 'Hindi' },
    { line1: '\u0623\u0647\u0644\u0627\u064B \u0648\u0633\u0647\u0644\u0627\u064B', line2: '\u0623\u0646\u062A\u0645 \u0645\u0631\u062D\u0628 \u0628\u0643\u0645 \u062F\u0627\u0626\u0645\u0627\u064B.', lang: '\u0627\u0644\u0639\u0631\u0628\u064A\u0629' },
    { line1: 'Bienvenue', line2: 'Vous \u00EAtes toujours les bienvenus.', lang: 'Fran\u00E7ais' },
  ];
}

/* ─── Component ───────────────────────────────────────────────────────────── */

export default function WelcomeOverlay() {
  const [show, setShow] = useState(false);
  const [phase, setPhase] = useState<'intro' | 'message' | 'cta' | 'exit'>('intro');
  const [greetingIndex, setGreetingIndex] = useState(0);
  const reduceMotion = useReducedMotion();
  const greetings = getTimeGreetings();
  const greeting = greetings[greetingIndex];

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const seen = sessionStorage.getItem(SESSION_KEY);
    if (!seen) {
      setShow(true);
      sessionStorage.setItem(SESSION_KEY, 'true');
    }
  }, []);

  // Cycle through languages during 'message' phase
  useEffect(() => {
    if (!show || phase !== 'message' && phase !== 'cta') return;

    const interval = window.setInterval(() => {
      setGreetingIndex((prev) => (prev + 1) % greetings.length);
    }, reduceMotion ? 1200 : 2000);

    return () => window.clearInterval(interval);
  }, [show, phase, greetings.length, reduceMotion]);

  // Phase progression timers
  useEffect(() => {
    if (!show || phase === 'exit') return;

    const timings: Record<string, number> = {
      intro: reduceMotion ? 800 : 1800,
      message: reduceMotion ? 2400 : 6000,
      cta: reduceMotion ? 2000 : 5000,
    };

    const delay = timings[phase] ?? 2000;
    const timer = window.setTimeout(() => {
      if (phase === 'intro') setPhase('message');
      else if (phase === 'message') setPhase('cta');
      else if (phase === 'cta') setPhase('exit');
    }, delay);

    return () => window.clearTimeout(timer);
  }, [show, phase, reduceMotion]);

  const handleDismiss = useCallback(() => {
    setPhase('exit');
  }, []);

  if (!show) return null;

  const dur = reduceMotion ? 0.12 : undefined;

  return (
    <AnimatePresence>
      {phase !== 'exit' && (
        <motion.div
          className="fixed inset-0 z-[9999] flex cursor-pointer items-center justify-center overflow-hidden"
          onClick={handleDismiss}
          onKeyDown={(e) => {
            if (e.key === 'Escape' || e.key === 'Enter') handleDismiss();
          }}
          role="button"
          tabIndex={0}
          aria-label="Dismiss welcome overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: dur ?? 0.55, ease: MOTION_EASE }}
        >
          {/* Deep background */}
          <motion.div
            className="absolute inset-0"
            style={{
              background:
                'linear-gradient(160deg, #060504 0%, #0b0908 40%, #0d0a07 100%)',
            }}
            exit={{
              clipPath: reduceMotion
                ? 'inset(0% 0% 0% 0%)'
                : 'inset(0% 0% 100% 0%)',
            }}
            transition={{ duration: dur ?? 0.75, ease: MOTION_EASE }}
          />

          {/* Gold radial warmth */}
          <motion.div
            className="absolute inset-0"
            style={{
              background:
                'radial-gradient(55% 45% at 50% 48%, rgba(200, 168, 107, 0.14) 0%, transparent 68%)',
            }}
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.3 }}
            transition={{ duration: dur ?? 0.7, ease: MOTION_EASE }}
          />

          {/* Shimmer particles */}
          {!reduceMotion &&
            [...Array(8)].map((_, i) => (
              <motion.span
                key={i}
                className="absolute rounded-full"
                style={{
                  width: i % 2 === 0 ? 3 : 2,
                  height: i % 2 === 0 ? 3 : 2,
                  background: `rgba(200, 168, 107, ${0.4 + (i % 3) * 0.15})`,
                  left: `${12 + i * 10}%`,
                  top: `${25 + (i % 4) * 14}%`,
                }}
                initial={{ opacity: 0, scale: 0 }}
                animate={{
                  opacity: [0, 0.8, 0],
                  scale: [0, 1.4, 0],
                  y: [0, -30, -55],
                }}
                transition={{
                  duration: 2.5,
                  delay: 0.4 + i * 0.2,
                  repeat: Infinity,
                  repeatDelay: 1.2,
                }}
              />
            ))}

          {/* ── Content ─────────────────────────────────────────────────── */}
          <div className="relative z-10 flex flex-col items-center gap-5 px-6 text-center">

            {/* Phase 1: FIROSE brand reveal */}
            <motion.div
              className="flex items-center gap-[0.12em]"
              initial="hidden"
              animate="visible"
            >
              {FIROSE_LETTERS.map((letter, i) => (
                <motion.span
                  key={i}
                  className="text-4xl font-medium tracking-[0.26em] sm:text-5xl lg:text-6xl"
                  style={{
                    fontFamily: '"Cinzel", "Iowan Old Style", "Palatino Linotype", "Georgia", serif',
                    color: '#c8a86b',
                    textShadow: '0 0 40px rgba(200,168,107,0.3)',
                  }}
                  variants={{
                    hidden: { opacity: 0, y: 14, filter: 'blur(6px)' },
                    visible: {
                      opacity: 1,
                      y: 0,
                      filter: 'blur(0px)',
                      transition: {
                        duration: dur ?? 0.45,
                        delay: reduceMotion ? 0 : 0.15 + i * 0.09,
                        ease: MOTION_EASE,
                      },
                    },
                  }}
                >
                  {letter}
                </motion.span>
              ))}
            </motion.div>

            {/* "Enterprises" */}
            <motion.p
              className="text-sm uppercase tracking-[0.32em] sm:text-base"
              style={{ color: '#b8ad96' }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: dur ?? 0.5, delay: reduceMotion ? 0 : 0.85, ease: MOTION_EASE }}
            >
              Enterprises
            </motion.p>

            {/* Decorative gold line */}
            <motion.div
              className="h-px bg-gradient-to-r from-transparent via-[#c8a86b] to-transparent"
              style={{ width: 80 }}
              initial={{ opacity: 0, scaleX: 0 }}
              animate={{ opacity: 1, scaleX: 1 }}
              transition={{ duration: dur ?? 0.5, delay: reduceMotion ? 0 : 1.0, ease: MOTION_EASE }}
            />

            {/* Phase 2: Multi-language emotional greeting */}
            <AnimatePresence mode="wait">
              {(phase === 'message' || phase === 'cta') && (
                <motion.div
                  key={greetingIndex}
                  className="flex flex-col items-center gap-3"
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: dur ?? 0.4, ease: MOTION_EASE }}
                >
                  <p
                    className="text-2xl sm:text-3xl lg:text-4xl"
                    style={{
                      fontFamily: '"Cinzel", "Iowan Old Style", "Palatino Linotype", "Georgia", serif',
                      color: '#f4edde',
                      lineHeight: 1.25,
                    }}
                  >
                    {greeting.line1}
                  </p>

                  <p
                    className="max-w-[36ch] text-base leading-relaxed sm:text-lg"
                    style={{ color: '#a99d87' }}
                  >
                    {greeting.line2}
                  </p>

                  <span
                    className="text-[10px] uppercase tracking-[0.22em]"
                    style={{ color: '#7d745f' }}
                  >
                    {greeting.lang}
                  </span>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Emotional tagline (shows during message phase) */}
            <AnimatePresence>
              {(phase === 'message' || phase === 'cta') && (
                <motion.p
                  className="mt-1 max-w-[44ch] text-sm leading-relaxed sm:text-base"
                  style={{
                    fontFamily: '"Cinzel", "Iowan Old Style", "Palatino Linotype", "Georgia", serif',
                    color: '#d7c9a8',
                    fontStyle: 'italic',
                  }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: dur ?? 0.6, delay: reduceMotion ? 0 : 0.3, ease: MOTION_EASE }}
                >
                  We built this company with one belief — that every home in India deserves products made with honesty, care, and pride.
                </motion.p>
              )}
            </AnimatePresence>

            {/* Chennai line */}
            <AnimatePresence>
              {(phase === 'message' || phase === 'cta') && (
                <motion.p
                  className="text-[11px] uppercase tracking-[0.18em]"
                  style={{ color: '#8a7e68' }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: dur ?? 0.5, delay: reduceMotion ? 0 : 0.5, ease: MOTION_EASE }}
                >
                  From Chennai, With Pride
                </motion.p>
              )}
            </AnimatePresence>

            {/* Phase 3: CTA — Brochure link + Enter site */}
            <AnimatePresence>
              {phase === 'cta' && (
                <motion.div
                  className="mt-2 flex flex-col items-center gap-3"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: dur ?? 0.5, ease: MOTION_EASE }}
                >
                  <div className="flex flex-col items-center gap-2 sm:flex-row sm:gap-3">
                    <Link
                      href="/brands"
                      onClick={(e) => e.stopPropagation()}
                      className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-full border border-[#e0c89366] bg-gradient-to-r from-[#4f3c228a] to-[#2f251996] px-6 py-2.5 text-xs font-medium uppercase tracking-[0.14em] text-[#f4e6c8] transition hover:border-[#e0c893aa] hover:from-[#5a4528aa] hover:to-[#3a2d1eaa]"
                    >
                      Explore Our Products
                    </Link>
                    <Link
                      href="/brochure"
                      onClick={(e) => e.stopPropagation()}
                      className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-full border border-[#e0c89342] px-6 py-2.5 text-xs font-medium uppercase tracking-[0.14em] text-[#c8a86b] transition hover:border-[#e0c89377] hover:bg-[#2a22160a]"
                    >
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
                        <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
                      </svg>
                      View Our Digital Brochure
                    </Link>
                  </div>

                  <button
                    type="button"
                    onClick={handleDismiss}
                    className="inline-flex min-h-[44px] items-center justify-center rounded-full px-5 py-2 text-[11px] uppercase tracking-[0.16em] text-[#968a74] transition hover:text-[#c8a86b]"
                  >
                    Enter Site
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Split curtain exit */}
          <motion.div
            className="pointer-events-none absolute inset-0"
            exit={{
              clipPath: reduceMotion
                ? 'inset(0% 0% 0% 0%)'
                : 'inset(0% 50% 0% 0%)',
            }}
            transition={{ duration: dur ?? 0.7, ease: MOTION_EASE }}
            style={{
              background: 'linear-gradient(135deg, #060504 0%, rgba(6,5,4,0.92) 100%)',
              clipPath: 'inset(0% 0% 0% 0%)',
            }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
