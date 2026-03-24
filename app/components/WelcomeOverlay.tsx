'use client';

import { useEffect, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { MOTION_EASE } from '@/lib/motion';

const SESSION_KEY = 'fe-hasSeenGreeting';

const LETTERS = 'FIROSE'.split('');
const TAGLINE_WORDS = 'One Group. Multiple Trusted Divisions.'.split(' ');

export default function WelcomeOverlay() {
  const [show, setShow] = useState(false);
  const [exiting, setExiting] = useState(false);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const seen = sessionStorage.getItem(SESSION_KEY);
    if (!seen) {
      setShow(true);
      sessionStorage.setItem(SESSION_KEY, 'true');
    }
  }, []);

  useEffect(() => {
    if (!show || exiting) return;

    const timer = window.setTimeout(() => {
      setExiting(true);
    }, 2500);

    return () => window.clearTimeout(timer);
  }, [show, exiting]);

  function handleDismiss() {
    setExiting(true);
  }

  if (!show) return null;

  return (
    <AnimatePresence>
      {!exiting && (
        <motion.div
          className="fixed inset-0 z-[9999] flex cursor-pointer items-center justify-center overflow-hidden"
          onClick={handleDismiss}
          onKeyDown={(e) => { if (e.key === 'Escape' || e.key === 'Enter') handleDismiss(); }}
          role="button"
          tabIndex={0}
          aria-label="Dismiss welcome overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: reduceMotion ? 0.15 : 0.5, ease: MOTION_EASE }}
        >
          {/* Background layers */}
          <motion.div
            className="absolute inset-0 bg-[#060504]"
            exit={{
              clipPath: reduceMotion
                ? 'inset(0% 0% 0% 0%)'
                : 'inset(0% 0% 100% 0%)',
            }}
            transition={{ duration: reduceMotion ? 0.15 : 0.7, ease: MOTION_EASE }}
          />

          {/* Gold ambient glow */}
          <motion.div
            className="absolute inset-0"
            style={{
              background:
                'radial-gradient(60% 50% at 50% 50%, rgba(200, 168, 107, 0.15) 0%, transparent 70%)',
            }}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.2 }}
            transition={{ duration: reduceMotion ? 0.15 : 0.6, ease: MOTION_EASE }}
          />

          {/* Shimmer particles */}
          {!reduceMotion && (
            <>
              {[...Array(6)].map((_, i) => (
                <motion.span
                  key={i}
                  className="absolute h-1 w-1 rounded-full bg-[#c8a86b]"
                  style={{
                    left: `${20 + i * 12}%`,
                    top: `${30 + (i % 3) * 15}%`,
                  }}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{
                    opacity: [0, 0.7, 0],
                    scale: [0, 1.2, 0],
                    y: [0, -20, -40],
                  }}
                  transition={{
                    duration: 2,
                    delay: 0.3 + i * 0.15,
                    repeat: Infinity,
                    repeatDelay: 1,
                  }}
                />
              ))}
            </>
          )}

          {/* Content */}
          <div className="relative z-10 flex flex-col items-center gap-6 px-6 text-center">
            {/* FIROSE letter-by-letter gold reveal */}
            <motion.div
              className="flex items-center gap-[0.15em]"
              initial="hidden"
              animate="visible"
            >
              {LETTERS.map((letter, i) => (
                <motion.span
                  key={i}
                  className="text-4xl font-medium tracking-[0.24em] sm:text-5xl lg:text-6xl"
                  style={{
                    fontFamily: '"Iowan Old Style", "Palatino Linotype", serif',
                    color: '#c8a86b',
                  }}
                  variants={{
                    hidden: { opacity: 0, y: 12, filter: 'blur(4px)' },
                    visible: {
                      opacity: 1,
                      y: 0,
                      filter: 'blur(0px)',
                      transition: {
                        duration: reduceMotion ? 0.1 : 0.4,
                        delay: reduceMotion ? 0 : 0.2 + i * 0.08,
                        ease: MOTION_EASE,
                      },
                    },
                  }}
                >
                  {letter}
                </motion.span>
              ))}
            </motion.div>

            {/* "Enterprises" subtitle */}
            <motion.p
              className="text-sm uppercase tracking-[0.3em] text-[#b8ad96] sm:text-base"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{
                duration: reduceMotion ? 0.1 : 0.5,
                delay: reduceMotion ? 0 : 0.8,
                ease: MOTION_EASE,
              }}
            >
              Enterprises
            </motion.p>

            {/* Welcome text */}
            <motion.p
              className="text-lg text-[#f4edde] sm:text-xl lg:text-2xl"
              style={{ fontFamily: '"Iowan Old Style", "Palatino Linotype", serif' }}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: reduceMotion ? 0.1 : 0.5,
                delay: reduceMotion ? 0 : 1.1,
                ease: MOTION_EASE,
              }}
            >
              Welcome to Firose Enterprises
            </motion.p>

            {/* Tagline word-by-word */}
            <motion.p
              className="flex flex-wrap justify-center gap-[0.35em] text-sm text-[#9e927b] sm:text-base"
              initial="hidden"
              animate="visible"
            >
              {TAGLINE_WORDS.map((word, i) => (
                <motion.span
                  key={i}
                  variants={{
                    hidden: { opacity: 0 },
                    visible: {
                      opacity: 1,
                      transition: {
                        duration: reduceMotion ? 0.1 : 0.35,
                        delay: reduceMotion ? 0 : 1.4 + i * 0.06,
                        ease: MOTION_EASE,
                      },
                    },
                  }}
                >
                  {word}
                </motion.span>
              ))}
            </motion.p>

            {/* Decorative gold line */}
            <motion.div
              className="h-px w-16 bg-gradient-to-r from-transparent via-[#c8a86b] to-transparent"
              initial={{ opacity: 0, scaleX: 0 }}
              animate={{ opacity: 1, scaleX: 1 }}
              transition={{
                duration: reduceMotion ? 0.1 : 0.5,
                delay: reduceMotion ? 0 : 1.8,
                ease: MOTION_EASE,
              }}
            />
          </div>

          {/* Split curtain exit overlays */}
          <motion.div
            className="pointer-events-none absolute inset-0"
            exit={{
              clipPath: reduceMotion
                ? 'inset(0% 0% 0% 0%)'
                : 'inset(0% 50% 0% 0%)',
            }}
            transition={{ duration: reduceMotion ? 0.15 : 0.65, ease: MOTION_EASE }}
            style={{
              background:
                'linear-gradient(135deg, #060504 0%, rgba(6,5,4,0.92) 100%)',
              clipPath: 'inset(0% 0% 0% 0%)',
            }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
