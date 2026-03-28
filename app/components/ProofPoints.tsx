'use client';

import CountUp from './CountUp';
import MotionWrapper from './motion/MotionWrapper';

type ProofPoint = Readonly<{
  value: number | null;
  suffix: string;
  label: string;
  placeholder?: boolean;
}>;

const PROOF_POINTS: ProofPoint[] = [
  { value: 46, suffix: '+', label: 'Years of Heritage & Legacy' },
  { value: 4, suffix: '', label: 'Operating Divisions' },
  { value: 50, suffix: '+', label: 'Distribution Cities' },
  { value: 200, suffix: '+', label: 'Retail & Institutional Partners' },
];

export default function ProofPoints() {
  return (
    <section className="grid grid-cols-2 gap-3 lg:grid-cols-4" aria-label="Company statistics">
      {PROOF_POINTS.map((point, index) => (
        <MotionWrapper key={point.label} delay={0.06 + index * 0.06}>
          <article className="rounded-2xl border border-[#e0c89331] bg-[#15120eb5] p-4 text-center transition duration-500 hover:-translate-y-0.5 hover:border-[#e0c8937a]">
            <p
              className="text-3xl font-medium text-[#f8f1e3] sm:text-4xl"
              style={{ fontFamily: '"Iowan Old Style", "Palatino Linotype", serif' }}
            >
              {point.placeholder ? (
                <span className="text-[#7d745f]">X{point.suffix}</span>
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
