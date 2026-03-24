'use client';

import { useEffect, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { MOTION_EASE, buttonPress } from '@/lib/motion';
import { ArrowUp } from 'lucide-react';

const SCROLL_THRESHOLD = 400;

export default function FloatingBackToTop() {
  const [visible, setVisible] = useState(false);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    let ticking = false;

    function onScroll() {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(() => {
        setVisible(window.scrollY > SCROLL_THRESHOLD);
        ticking = false;
      });
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  function scrollToTop() {
    window.scrollTo({ top: 0, behavior: reduceMotion ? 'instant' : 'smooth' });
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 z-50 flex h-11 w-11 items-center justify-center rounded-full border border-[#e0c89352] bg-[linear-gradient(140deg,#f1ddb4_0%,#d8b372_49%,#b98e4a_100%)] shadow-[0_10px_30px_rgba(0,0,0,0.46),0_0_0_1px_rgba(224,200,147,0.48)_inset] transition-colors"
          aria-label="Scroll to top"
          initial={{ opacity: 0, y: 20, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.9 }}
          transition={{ duration: reduceMotion ? 0.1 : 0.3, ease: MOTION_EASE }}
          whileHover={reduceMotion ? undefined : { y: -3, transition: { duration: 0.2, ease: MOTION_EASE } }}
          whileTap={reduceMotion ? undefined : buttonPress}
        >
          <ArrowUp className="h-5 w-5 text-[#22190d]" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
