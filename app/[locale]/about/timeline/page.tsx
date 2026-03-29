import type { Metadata } from 'next';
import Link from 'next/link';
import MotionWrapper from '@/app/components/motion/MotionWrapper';

export const metadata: Metadata = {
  title: 'Company Timeline',
  description:
    'Explore the journey of Firose Enterprises from its founding in 1980 to its current position as a diversified enterprise group.',
};

type Milestone = Readonly<{
  year: string;
  title: string;
  description: string;
}>;

const MILESTONES: Milestone[] = [
  {
    year: '1980',
    title: 'Foundation',
    description: 'Firose Enterprises is founded in Chennai, India, establishing the first consumer product operations that would grow into a multi-division enterprise.',
  },
  /* PLACEHOLDER: COPY - 1980s–1990s milestone details (owner to provide specific events) */
  {
    year: '1990s',
    title: 'Category Expansion',
    description: 'The group expands into new consumer categories including personal care, baby nutrition, and hygiene products, building a diversified product portfolio.',
  },
  /* PLACEHOLDER: COPY - 2000s milestone details (owner to provide specific events) */
  {
    year: '2000s',
    title: 'Distribution Growth',
    description: 'Firose strengthens its distribution network across India, partnering with retailers, institutions, and modern trade channels to expand market reach.',
  },
  {
    year: '2020',
    title: 'Digital Transformation Begins',
    description: 'The current generation initiates a strategic transformation, modernizing brand identities and establishing a corporate-grade digital presence.',
  },
  {
    year: '2024',
    title: 'Future Beyond Technology Launches',
    description: 'FBT is established as the AI engineering and cybersecurity division, marking Firose\'s expansion from consumer brands into enterprise technology.',
  },
  {
    year: '2025–2026',
    title: 'Corporate Integration',
    description: 'Firose Enterprises launches its unified corporate platform, connecting all divisions under one digital identity with dedicated brand experiences.',
  },
];

export default function TimelinePage() {
  return (
    <main id="main-content" className="fe-main fe-ambient-drift">
      <MotionWrapper delay={0.04}>
        <section className="fe-panel-strong p-5 sm:p-7 lg:p-8">
          <header className="grid gap-2">
            <p className="text-[11px] uppercase tracking-[0.2em] text-[#b59f75]">Heritage</p>
            <h1 className="text-4xl font-normal text-[#f8f1e3] sm:text-5xl">Our Journey Since 1980</h1>
            <p className="max-w-[72ch] text-[#b7ac97]">
              Over four decades, Firose Enterprises has grown from a single operation in Chennai to a diversified group spanning consumer brands and enterprise technology.
            </p>
          </header>
        </section>
      </MotionWrapper>

      <MotionWrapper delay={0.1}>
        <section className="fe-panel p-5 sm:p-7 lg:p-8">
          <div className="relative">
            {/* Vertical timeline line */}
            <div className="absolute left-4 top-0 bottom-0 w-px bg-gradient-to-b from-[#c8a86b44] via-[#c8a86b22] to-transparent lg:left-1/2 lg:-translate-x-px" aria-hidden="true" />

            <ol className="grid gap-8" role="list">
              {MILESTONES.map((milestone, index) => {
                const isEven = index % 2 === 0;
                return (
                  <li key={milestone.year} className="relative pl-12 lg:pl-0">
                    {/* Year badge (mobile: left side, desktop: center) */}
                    <div className={`absolute left-0 top-0 lg:left-1/2 lg:-translate-x-1/2 flex h-9 w-9 items-center justify-center rounded-full border border-[#e0c89355] bg-[#1d1813] text-xs font-medium text-[#c8a86b] lg:h-auto lg:w-auto lg:px-3 lg:py-1.5`}>
                      <span className="hidden lg:inline">{milestone.year}</span>
                      <span className="lg:hidden text-[10px]">{milestone.year.slice(-2)}</span>
                    </div>

                    {/* Content card */}
                    <div className={`rounded-2xl border border-[#e0c89331] bg-[#15120eb5] p-4 transition duration-500 hover:-translate-y-0.5 hover:border-[#e0c8937a] lg:w-[calc(50%-2rem)] ${isEven ? 'lg:mr-auto' : 'lg:ml-auto'}`}>
                      <p className="text-[11px] uppercase tracking-[0.16em] text-[#c9ad76] lg:hidden">{milestone.year}</p>
                      <h3 className="mt-1 text-xl font-normal text-[#f2e7cf] lg:mt-0" style={{ fontFamily: 'var(--font-display)' }}>
                        {milestone.title}
                      </h3>
                      <p className="mt-1.5 text-sm leading-relaxed text-[#b7ac97]">{milestone.description}</p>
                    </div>
                  </li>
                );
              })}
            </ol>
          </div>
        </section>
      </MotionWrapper>

      <MotionWrapper delay={0.16}>
        <section className="fe-panel p-5 sm:p-7">
          <h2 className="text-3xl font-normal text-[#f8f1e3] sm:text-4xl">Continue Exploring</h2>
          <p className="mt-2 max-w-[72ch] text-[#b7ac97]">
            Learn more about our leadership, values, and the divisions that define Firose Enterprises.
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            <Link href="/about" className="fe-link-chip">About Overview</Link>
            <Link href="/about/leadership" className="fe-link-chip">Leadership</Link>
            <Link href="/brands" className="fe-btn-primary">Explore Divisions</Link>
          </div>
        </section>
      </MotionWrapper>
    </main>
  );
}
