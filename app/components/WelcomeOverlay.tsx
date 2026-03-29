'use client';

import { useCallback, useEffect, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { Link } from '@/i18n/navigation';
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
      { line1: 'உங்களுக்கு உரிய நல் காலை', line2: 'நம்பிக்கையுடன் புதிய நாள்.', lang: 'Tamil' },
      { line1: 'శుభోదయం', line2: 'నమ్మకంతో కొత్త రోజు మొదలవుతుంది.', lang: 'తెలుగు' },
      { line1: 'ಶುಭೋದಯ', line2: 'ನಂಬಿಕೆಯೆಂದರೆ ಹೊಸ ದಿನ ಪ್ರಾರಂಭವಾಗುತ್ತದೆ.', lang: 'ಕನ್ನಡ' },
      { line1: 'सुप्रभात', line2: 'विश्वास के साथ एक नया दिन शुरू होता है।', lang: 'Hindi' },
      { line1: 'صباح الخير', line2: 'يوم جديد يبدأ بالثقة.', lang: 'العربية' },
      { line1: 'Bonjour', line2: 'Une nouvelle journée commence avec confiance.', lang: 'Français' },
    ];
  }

  if (hour >= 12 && hour < 17) {
    return [
      { line1: 'Good Afternoon', line2: 'Thank you for choosing to be here.', lang: 'English' },
      { line1: 'மதிய வணக்கம்', line2: 'நீங்கள் இங்கே இருப்பதில் நன்றி.', lang: 'Tamil' },
      { line1: 'శుభ మధ్యాహ్నం', line2: 'మీరు ఇక్కడ ఉన్నందుకు ధన్యవాదాలు.', lang: 'తెలుగు' },
      { line1: 'ಶುಭ ಮಧ್ಯಾಹ್ನ', line2: 'ನೀವು ಇಲ್ಲಿ ಇರುವುದಕ್ಕೆ ಧನ್ಯವಾದಗಳು.', lang: 'ಕನ್ನಡ' },
      { line1: 'नमस्कार', line2: 'यहाँ आने के लिए धन्यवाद।', lang: 'Hindi' },
      { line1: 'مساء الخير', line2: 'شكراً لاختياركم التواجد هنا.', lang: 'العربية' },
      { line1: 'Bon Après-midi', line2: 'Merci d\u2019être ici avec nous.', lang: 'Français' },
    ];
  }

  if (hour >= 17 && hour < 21) {
    return [
      { line1: 'Good Evening', line2: 'We are glad you found us.', lang: 'English' },
      { line1: 'மணி வணக்கம்', line2: 'நீங்கள் எங்களை கண்டுபிடித்தீர்கள்.', lang: 'Tamil' },
      { line1: 'శుభ సాయంత్రం', line2: 'మీరు మాకు దగ్గరకు వచ్చినందుకు సంతోషం.', lang: 'తెలుగు' },
      { line1: 'ಶುಭ ಸಂಧ್ಯಾ', line2: 'ನೀವು ನಮ್ಮನ್ನು ಕಂಡುಹಿಡಿದದ್ದಕ್ಕೆ ಸಂತೋಷ.', lang: 'ಕನ್ನಡ' },
      { line1: 'शुभ संध्या', line2: 'हमें खुशी है कि आप यहाँ आए।', lang: 'Hindi' },
      { line1: 'مساء النور', line2: 'سعداء بزيارتكم.', lang: 'العربية' },
      { line1: 'Bonsoir', line2: 'Nous sommes heureux de vous accueillir.', lang: 'Français' },
    ];
  }

  return [
    { line1: 'Welcome', line2: 'You are always welcome here.', lang: 'English' },
    { line1: 'வரவேற்பு', line2: 'நீங்கள் எப்போதும் வரவேற்கப்படுகிறீர்கள்.', lang: 'Tamil' },
    { line1: 'స్వాగతం', line2: 'మీరు ఎప్పుడూ స్వాగతం.', lang: 'తెలుగు' },
    { line1: 'ಸ್ವಾಗತ', line2: 'ನೀವು ಯಾವಾಗಲೂ ಸ್ವಾಗತ.', lang: 'ಕನ್ನಡ' },
    { line1: 'स्वागत', line2: 'आपका यहाँ सदा स्वागत है।', lang: 'Hindi' },
    { line1: 'أهلاً وسهلاً', line2: 'أنتم مرحب بكم دائماً.', lang: 'العربية' },
    { line1: 'Bienvenue', line2: 'Vous êtes toujours les bienvenus.', lang: 'Français' },
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
                    fontFamily: 'var(--font-display)',
                    color: 'var(--fe-primary)',
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
              className="h-px from-transparent to-transparent"
              style={{ width: 80, background: 'linear-gradient(90deg, transparent, var(--fe-primary), transparent)' }}
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
                      fontFamily: 'var(--font-display)',
                      color: 'var(--fe-ink)',
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
                    style={{ color: '#9e927b' }}
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
                    fontFamily: 'var(--font-display)',
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
                  style={{ color: '#968a74' }}
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
