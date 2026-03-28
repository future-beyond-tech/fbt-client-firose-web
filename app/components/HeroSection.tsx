'use client';

import Image from 'next/image';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { MOTION_EASE, buttonPress, fadeIn, staggerContainer } from '@/lib/motion';
import { corporateVisuals } from '@/app/lib/brandVisuals';

type HeroSectionProps = {
  title: string;
  subtitle: string;
  primaryCtaLabel: string;
  primaryCtaHref: string;
  secondaryCtaLabel: string;
  secondaryCtaHref: string;
};

function buildWordVariants(delayStep: number) {
  return {
    hidden: { opacity: 0, y: 18 },
    visible: (index: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.42,
        delay: index * delayStep,
        ease: MOTION_EASE,
      },
    }),
  };
}

export default function HeroSection({
  title,
  subtitle,
  primaryCtaLabel,
  primaryCtaHref,
  secondaryCtaLabel,
  secondaryCtaHref,
}: Readonly<HeroSectionProps>) {
  const words = title.split(' ');
  const reduceMotion = useReducedMotion();
  const t = useTranslations('heroSection');
  const wordVariants = buildWordVariants(0.04);
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });
  const parallaxY = useTransform(scrollYProgress, [0, 1], ['0%', '5%']);

  return (
    <section ref={sectionRef} aria-labelledby="hero-title" className="relative isolate min-h-[calc(100vh-74px)] overflow-hidden">
      <motion.div
        className="absolute inset-0"
        style={{ y: reduceMotion ? 0 : parallaxY }}
      >
        <Image
          src={corporateVisuals.heroImage}
          alt="Firose Enterprises luxury corporate direction"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
      </motion.div>

      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-[#060504f0] via-[#090806cf] to-[#090806a8]"
        initial={{ opacity: 0.74 }}
        animate={reduceMotion ? { opacity: 0.86 } : { opacity: [0.74, 0.86, 0.8] }}
        transition={
          reduceMotion
            ? { duration: 0.2 }
            : { duration: 8, repeat: Infinity, repeatType: 'mirror', ease: MOTION_EASE }
        }
      />
      <motion.div
        className="absolute inset-0 bg-[radial-gradient(58%_48%_at_62%_20%,rgba(201,169,108,0.25)_0%,rgba(201,169,108,0)_68%)]"
        initial={{ opacity: 0.72, y: 0 }}
        animate={reduceMotion ? { opacity: 0.78 } : { opacity: [0.66, 0.84, 0.72], y: [0, -10, 0] }}
        transition={
          reduceMotion
            ? { duration: 0.2 }
            : { duration: 10, repeat: Infinity, repeatType: 'mirror', ease: MOTION_EASE }
        }
      />
      <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-b from-transparent to-[#090807]" />

      <div className="relative mx-auto flex min-h-[calc(100vh-74px)] w-[min(1240px,calc(100%_-_1.25rem))] items-end py-14 sm:py-16 md:w-[min(1240px,calc(100%_-_2rem))] lg:items-center lg:py-20">
        <motion.div
          className="max-w-[760px] rounded-[28px] border border-[#e0c8933b] bg-[linear-gradient(165deg,rgba(19,16,12,0.72),rgba(8,7,6,0.84))] p-6 backdrop-blur-[2px] sm:p-8 lg:p-10"
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
        >
          <motion.p
            variants={fadeIn}
            className="inline-flex items-center rounded-full border border-[#e0c89352] bg-[#3c301f42] px-3 py-1 text-[11px] font-medium uppercase tracking-[0.24em] text-[#d6b983] sm:text-xs"
          >
            Firose Enterprises
          </motion.p>

          <motion.h1
            id="hero-title"
            className="mt-5 max-w-[18ch] text-balance text-4xl font-normal leading-[1.05] tracking-[0.01em] text-[#f8f1e3] sm:text-5xl lg:text-6xl"
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
          >
            {words.map((word, index) => (
              <motion.span
                key={`${word}-${index}`}
                custom={index}
                variants={wordVariants}
                className="inline-block pr-[0.34ch]"
              >
                {word}
              </motion.span>
            ))}
          </motion.h1>

          <motion.p variants={fadeIn} className="mt-4 max-w-[62ch] text-pretty text-sm leading-relaxed text-[#b9ad96] sm:text-base">
            {subtitle}
          </motion.p>

          <motion.div variants={fadeIn} className="mt-8 flex w-full max-w-md flex-col justify-center gap-3 sm:max-w-none sm:flex-row sm:justify-start">
            <motion.div whileTap={buttonPress} whileHover={{ y: -2, transition: { duration: 0.2, ease: MOTION_EASE } }}>
              <Link href={primaryCtaHref} className="fe-btn-primary w-full sm:w-auto">
                {primaryCtaLabel}
              </Link>
            </motion.div>
            <motion.div whileTap={buttonPress} whileHover={{ y: -2, transition: { duration: 0.2, ease: MOTION_EASE } }}>
              <Link href={secondaryCtaHref} className="fe-link-chip w-full sm:w-auto">
                {secondaryCtaLabel}
              </Link>
            </motion.div>
          </motion.div>

          <motion.div variants={fadeIn} className="mt-8 flex flex-wrap gap-4 text-[11px] uppercase tracking-[0.2em] text-[#9e927b] sm:text-xs">
            <p>{t('establishedLegacy')}</p>
            <p>{t('luxuryStandards')}</p>
            <p>{t('globalScale')}</p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
