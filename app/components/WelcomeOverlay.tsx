'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { MOTION_EASE } from '@/lib/motion';

const SESSION_KEY = 'fe-hasSeenGreeting';

const FIROSE_LETTERS = 'FIROSE'.split('');

/* ─── Time-aware greeting ─────────────────────────────────────────────────── */

function getGreeting(): { line1: string; line2: string; emoji: string } {
  const hour = new Date().getHours();

  if (hour >= 5 && hour < 12) {
    return {
      line1: 'Good Morning',
      line2: 'A fresh day begins with trust.',
      emoji: '\u2600\uFE0F',
    };
  }

  if (hour >= 12 && hour < 17) {
    return {
      line1: 'Good Afternoon',
      line2: 'Thank you for choosing to be here.',
      emoji: '\u{1F31E}',
    };
  }

  if (hour >= 17 && hour < 21) {
    return {
      line1: 'Good Evening',
      line2: 'We are glad you found us.',
      emoji: '\u{1F305}',
    };
  }

  return {
    line1: 'Welcome',
    line2: 'You are always welcome here.',
    emoji: '\u2728',
  };
}

/* ─── Component ───────────────────────────────────────────────────────────── */

export default function WelcomeOverlay() {
  const [show, setShow] = useState(false);
  const [phase, setPhase] = useState<'intro' | 'message' | 'cta' | 'exit'>('intro');
  const reduceMotion = useReducedMotion();
  const greeting = getGreeting();

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const seen = sessionStorage.getItem(SESSION_KEY);
    if (!seen) {
      setShow(true);
      sessionStorage.setItem(SESSION_KEY, 'true');
    }
  }, []);

  useEffect(() => {
    if (!show || phase === 'exit') return;

    const timings: Record<string, number> = {
      intro: reduceMotion ? 800 : 1800,
      message: reduceMotion ? 800 : 2400,
      cta: reduceMotion ? 1200 : 3000,
    };

    const delay = timings[phase] ?? 2000;
    const timer = window.setTimeout(() => {
      if (phase === 'intro') setPhase('message');
      else if (phase === 'message') setPhase('cta');
      else if (phase === 'cta') setPhase('exit');
    }, delay);

    return () => window.clearTimeout(timer);
  }, [show, phase, reduceMotion]);

  function handleDismiss() {
    setPhase('exit');
  }

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
                    fontFamily: '"Iowan Old Style", "Palatino Linotype", "Georgia", serif',
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

            {/* Phase 2: Emotional greeting */}
            <AnimatePresence>
              {(phase === 'message' || phase === 'cta') && (
                <motion.div
                  className="flex flex-col items-center gap-3"
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: dur ?? 0.55, ease: MOTION_EASE }}
                >
                  <p
                    className="text-2xl sm:text-3xl lg:text-4xl"
                    style={{
                      fontFamily: '"Iowan Old Style", "Palatino Linotype", "Georgia", serif',
                      color: '#f4edde',
                      lineHeight: 1.25,
                    }}
                  >
                    {greeting.line1}{greeting.emoji ? ` ${greeting.emoji}` : ''}
                  </p>

                  <p
                    className="max-w-[36ch] text-base leading-relaxed sm:text-lg"
                    style={{ color: '#a99d87' }}
                  >
                    {greeting.line2}
                  </p>

                  <motion.p
                    className="mt-1 max-w-[44ch] text-sm leading-relaxed sm:text-base"
                    style={{
                      fontFamily: '"Iowan Old Style", "Palatino Linotype", "Georgia", serif',
                      color: '#d7c9a8',
                      fontStyle: 'italic',
                    }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: dur ?? 0.6, delay: reduceMotion ? 0 : 0.3, ease: MOTION_EASE }}
                  >
                    We built this company with one belief — that every home in India deserves products made with honesty, care, and pride.
                  </motion.p>
                </motion.div>
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
                  <Link
                    href="/brochure"
                    onClick={(e) => e.stopPropagation()}
                    className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-full border border-[#e0c89366] bg-gradient-to-r from-[#4f3c228a] to-[#2f251996] px-6 py-2.5 text-xs font-medium uppercase tracking-[0.14em] text-[#f4e6c8] transition hover:border-[#e0c893aa] hover:from-[#5a4528aa] hover:to-[#3a2d1eaa]"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
                      <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
                    </svg>
                    Explore Our Product Catalogue
                  </Link>

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
