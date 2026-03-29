'use client';

import { useTranslations } from 'next-intl';
import CountUp from './CountUp';
import MotionWrapper from './motion/MotionWrapper';

type ProofPoint = Readonly<{
  value: number | null;
  suffix: string;
  label: string;
  placeholder?: boolean;
}>;

export default function ProofPoints() {
  const t = useTranslations('proofPoints');
  const proofPoints: ProofPoint[] = [
    { value: 46, suffix: '+', label: t('yearsHeritage') },
    { value: 4, suffix: '', label: t('operatingDivisions') },
    { value: 50, suffix: '+', label: t('distributionCities') },
    { value: 200, suffix: '+', label: t('retailPartners') },
  ];

  return (
    <section className="grid grid-cols-2 gap-3 lg:grid-cols-4" aria-label={t('operatingDivisions')}>
      {proofPoints.map((point, index) => (
        <MotionWrapper key={point.label} delay={0.06 + index * 0.06}>
          <article className="rounded-2xl border border-[#e0c89331] bg-[#15120eb5] p-4 text-center transition duration-500 hover:-translate-y-0.5 hover:border-[#e0c8937a]">
            <p
              className="text-3xl font-medium text-[#f8f1e3] sm:text-4xl"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              {point.placeholder ? (
                <span className="text-[#9e927b]">X{point.suffix}</span>
              ) : (
                <CountUp end={point.value!} suffix={point.suffix} />
              )}
            </p>
            <p className="mt-1.5 text-sm text-[#b7ac97]">{point.label}</p>
          </article>
        </MotionWrapper>
      ))}
    </section>
  );
}
