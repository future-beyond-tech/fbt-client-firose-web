import type { Metadata } from 'next';
import { Link } from '@/i18n/navigation';
import MotionWrapper from '@/app/components/motion/MotionWrapper';
import { createPageMetadata } from '@/app/lib/seo';

type PageProps = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  return createPageMetadata({
    title: 'Company Timeline',
    description: 'Explore FIROSE Enterprises since its establishment in 2018 and the business heritage dating back to 1980.',
    path: '/about/timeline',
    locale,
  });
}

type Milestone = Readonly<{
  year: string;
  title: string;
  description: string;
}>;

const MILESTONES: Milestone[] = [
  {
    year: '1980',
    title: 'Business Heritage',
    description: 'The business and product heritage that later informed FIROSE Enterprises dates back to 1980.',
  },
  {
    year: '2018',
    title: 'FIROSE Enterprises Established',
    description: 'FIROSE Enterprises was established in Chennai, Tamil Nadu, India.',
  },
  {
    year: 'Today',
    title: 'Four Operating Divisions',
    description: 'FIROSE Enterprises operates AR Perfumes, Femison, Neat & Fresh, and Future Beyond Technology (FBT).',
  },
];

export default function TimelinePage() {
  return (
    <main id="main-content" className="fe-main fe-ambient-drift">
      <MotionWrapper delay={0.04}>
        <section className="fe-panel-strong p-5 sm:p-7 lg:p-8">
          <header className="grid gap-2">
            <p className="text-[11px] uppercase tracking-[0.2em] text-[#b59f75]">Heritage</p>
            <h1 className="text-4xl font-normal text-[#f8f1e3] sm:text-5xl">Established 2018 · Roots Since 1980</h1>
            <p className="max-w-[72ch] text-[#b7ac97]">
              The business and product heritage dates back to 1980. FIROSE Enterprises was established in 2018 and now operates four divisions.
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
                      <span className="lg:hidden text-[9px]">{milestone.year}</span>
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
            <Link href="/leadership" className="fe-link-chip">Leadership</Link>
            <Link href="/brands" className="fe-btn-primary">Explore Divisions</Link>
          </div>
        </section>
      </MotionWrapper>
    </main>
  );
}
