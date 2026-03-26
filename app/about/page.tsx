import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import BreadcrumbSchema from '@/app/components/BreadcrumbSchema';
import LeadershipCard from '@/app/components/LeadershipCard';
import MeaningBehindFirose from '@/app/components/MeaningBehindFirose';
import MotionWrapper from '@/app/components/motion/MotionWrapper';
import { corporateVisuals } from '@/app/lib/brandVisuals';
import { divisionCatalog, getDivisionPageHref, getDivisionWebsiteHref } from '@/app/lib/divisions';

export const metadata: Metadata = {
  title: 'About',
  description:
    'Learn about Firose Enterprises, its mission, values, leadership direction, and multi-division growth strategy including Future Beyond Technology (FBT).',
};

type AboutSignal = {
  label: string;
  value: string;
};

const aboutSignals: AboutSignal[] = [
  { label: 'Established', value: 'Since 1980' },
  { label: 'Operating Model', value: 'Multi-Division' },
  { label: 'Core Discipline', value: 'Quality-Led' },
  { label: 'Expansion Lens', value: 'Category + Technology' },
];

const differentiators = [
  {
    title: 'Corporate Precision',
    text: 'Every division follows a clear operating standard with controlled quality and measurable delivery discipline.',
  },
  {
    title: 'Visual Brand Clarity',
    text: 'Each business has a distinct identity while staying anchored to one unified FIROSE enterprise system.',
  },
  {
    title: 'Future-Ready Execution',
    text: 'From consumer products to AI engineering, we build long-horizon capacity for market relevance and scale.',
  },
];

export default function AboutPage() {
  return (
    <main id="main-content" className="fe-main fe-ambient-drift">
      <BreadcrumbSchema items={[{ name: 'Home', href: '/' }, { name: 'About', href: '/about' }]} />
      <MotionWrapper delay={0.04}>
        <section className="fe-panel-strong relative isolate overflow-hidden p-0">
        <div className="absolute inset-0">
          <Image
            src={corporateVisuals.aboutHeroImage}
            alt="Firose corporate growth vision"
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#060504f2] via-[#090806d4] to-[#090806b0]" />
          <div className="absolute inset-0 bg-[radial-gradient(66%_52%_at_62%_18%,rgba(201,169,108,0.26)_0%,rgba(201,169,108,0)_70%)]" />
        </div>

        <div className="relative grid gap-8 p-5 sm:p-7 lg:grid-cols-[1.15fr_0.85fr] lg:gap-10 lg:p-10">
          <header className="grid content-start gap-4">
            <p className="inline-flex w-fit items-center rounded-full border border-[#e0c8935a] bg-[#3c301f4d] px-3 py-1 text-[11px] font-medium uppercase tracking-[0.2em] text-[#d7bb85]">
              Company Overview
            </p>

            <h1 className="max-w-[20ch] text-balance text-4xl font-normal leading-[1.05] text-[#f8f1e3] sm:text-5xl lg:text-6xl">
              About Firose Enterprises
            </h1>

            <p className="max-w-[64ch] text-sm leading-relaxed text-[#b9ad96] sm:text-base">
              Firose Enterprises is a diversified parent group where consumer brands and technology operations run through
              a single philosophy: trust, discipline, and sustained market relevance.
            </p>

            <div className="flex flex-wrap gap-2 pt-1">
              <Link href="/about/story" className="fe-btn-primary">
                Read Full Story
              </Link>
              <Link href="/brands" className="fe-link-chip">
                Explore Divisions
              </Link>
              <Link href="/brands/future-beyond-technology" className="fe-link-chip">
                FBT Division
              </Link>
            </div>
          </header>

          <div className="grid gap-2 self-end">
            {aboutSignals.map((signal, index) => (
              <article
                key={signal.label}
                className="rounded-2xl border border-[#e0c89333] bg-[#110f0cce] px-4 py-3 backdrop-blur-sm transition duration-500 hover:-translate-y-0.5 hover:border-[#e0c89377]"
                style={{ animationDelay: `${index * 80}ms` }}
              >
                <p className="text-[11px] uppercase tracking-[0.18em] text-[#c9ad76]">{signal.label}</p>
                <p className="mt-1 text-base font-medium text-[#f3e8d1]">{signal.value}</p>
              </article>
            ))}
          </div>
        </div>
        </section>
      </MotionWrapper>

      <MotionWrapper delay={0.1}>
        <section className="fe-panel p-5 sm:p-7">
        <header className="grid gap-2">
          <p className="text-[11px] uppercase tracking-[0.2em] text-[#b59f75]">What Defines Us</p>
          <h2 className="text-3xl font-normal text-[#f8f1e3] sm:text-4xl">A Cleaner Corporate Experience</h2>
          <p className="max-w-[72ch] text-[#b7ac97]">
            We designed FIROSE to be understood quickly, remembered clearly, and experienced with confidence across every
            stakeholder interaction.
          </p>
        </header>

        <div className="mt-4 grid gap-3 lg:grid-cols-3">
          {differentiators.map((item) => (
            <article
              key={item.title}
              className="group rounded-2xl border border-[#e0c89331] bg-[#15120eb5] p-4 transition duration-500 hover:-translate-y-0.5 hover:border-[#e0c8937a] hover:bg-[#1d1813d6]"
            >
              <h3 className="text-2xl font-normal text-[#f2e7cf]">{item.title}</h3>
              <p className="mt-2 text-sm text-[#b7ac97]">{item.text}</p>
            </article>
          ))}
        </div>
        </section>
      </MotionWrapper>

      <MotionWrapper delay={0.16}>
        <section className="fe-panel p-5 sm:p-7 lg:p-8">
        <div className="grid gap-5 lg:grid-cols-[1.03fr_0.97fr] lg:items-center">
          <div className="fe-interactive-media fe-shine relative overflow-hidden rounded-3xl border border-[#e0c8933d]">
            <div className="relative h-[300px] sm:h-[360px]">
              <Image
                src={corporateVisuals.aboutValuesImage}
                alt="Firose leadership and strategic collaboration"
                fill
                className="object-cover"
                sizes="(max-width: 1023px) 100vw, 46vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#090807e8] via-[#0908079e] to-transparent" />
            </div>

            <p className="absolute bottom-3 left-3 rounded-full border border-[#e0c89355] bg-[#3a2d1e7f] px-3 py-1 text-[11px] uppercase tracking-[0.16em] text-[#ecd2a0]">
              Built for Long-Horizon Growth
            </p>
          </div>

          <article className="rounded-3xl border border-[#e0c89331] bg-[#14110eb5] p-5 sm:p-6">
            <h2 className="text-3xl font-normal text-[#f8f1e3] sm:text-4xl">Leadership Message</h2>
            <p className="mt-3 text-sm leading-relaxed text-[#b7ac97] sm:text-base">
              We are shaping FIROSE as a long-term enterprise where every division earns trust through product quality,
              clear positioning, and consistent delivery.
            </p>
            <p className="mt-3 text-sm leading-relaxed text-[#b7ac97] sm:text-base">
              Our objective is simple: create durable brand value through responsible expansion and corporate-grade
              execution.
            </p>

            <div className="mt-5 flex flex-wrap gap-2">
              <Link href="/contact" className="fe-btn-primary">
                Contact Corporate Team
              </Link>
              <Link href="/business-with-us" className="fe-link-chip">
                Business With Us
              </Link>
            </div>
          </article>
        </div>
        </section>
      </MotionWrapper>

      <MotionWrapper delay={0.22}>
        <MeaningBehindFirose />
      </MotionWrapper>

      <MotionWrapper delay={0.25}>
        <section className="fe-panel p-5 sm:p-7">
          <header className="grid gap-2">
            <p className="text-[11px] uppercase tracking-[0.2em] text-[#b59f75]">Leadership</p>
            <h2 className="text-3xl font-normal text-[#f8f1e3] sm:text-4xl">The People Behind Firose</h2>
            <p className="max-w-[72ch] text-[#b7ac97]">
              A leadership team committed to building durable brand value through disciplined execution and technology-driven transformation.
            </p>
          </header>

          <div className="mt-4 grid gap-4 lg:grid-cols-2">
            <LeadershipCard
              name="Feroze"
              title="Founder & Lead Software Engineer, Future Beyond Technology"
              bio="Leading the vision of transforming a heritage enterprise into a modern, technology-enabled conglomerate."
            />
            <LeadershipCard
              name="Gorantla Srikanth"
              title="CTO, Future Beyond Technology"
              bio="Driving technology architecture and engineering execution with a focus on AI automation and enterprise security."
            />
          </div>

          <div className="mt-4">
            <Link href="/about/leadership" className="fe-link-chip">
              View Full Leadership Team
            </Link>
          </div>
        </section>
      </MotionWrapper>

      <MotionWrapper delay={0.27}>
        <section className="fe-panel p-5 sm:p-7">
          <header className="grid gap-2">
            <p className="text-[11px] uppercase tracking-[0.2em] text-[#b59f75]">Heritage</p>
            <h2 className="text-3xl font-normal text-[#f8f1e3] sm:text-4xl">Since 1980</h2>
            <p className="max-w-[72ch] text-[#b7ac97]">
              Over four decades of building consumer trust and expanding into new categories — from fragrance and baby care to AI engineering.
            </p>
          </header>

          <div className="mt-4 grid gap-3 sm:grid-cols-3">
            <article className="rounded-2xl border border-[#e0c89331] bg-[#15120eb5] p-4 transition duration-500 hover:-translate-y-0.5 hover:border-[#e0c8937a]">
              <p className="text-[11px] uppercase tracking-[0.16em] text-[#c9ad76]">1980</p>
              <h3 className="mt-1 text-xl font-normal text-[#f2e7cf]" style={{ fontFamily: '"Iowan Old Style", "Palatino Linotype", serif' }}>Foundation</h3>
              <p className="mt-1.5 text-sm text-[#b7ac97]">Established in Chennai with a focus on consumer product operations.</p>
            </article>
            <article className="rounded-2xl border border-[#e0c89331] bg-[#15120eb5] p-4 transition duration-500 hover:-translate-y-0.5 hover:border-[#e0c8937a]">
              <p className="text-[11px] uppercase tracking-[0.16em] text-[#c9ad76]">2024</p>
              <h3 className="mt-1 text-xl font-normal text-[#f2e7cf]" style={{ fontFamily: '"Iowan Old Style", "Palatino Linotype", serif' }}>FBT Launches</h3>
              <p className="mt-1.5 text-sm text-[#b7ac97]">Future Beyond Technology established as the AI and cybersecurity division.</p>
            </article>
            <article className="rounded-2xl border border-[#e0c89331] bg-[#15120eb5] p-4 transition duration-500 hover:-translate-y-0.5 hover:border-[#e0c8937a]">
              <p className="text-[11px] uppercase tracking-[0.16em] text-[#c9ad76]">2025–2026</p>
              <h3 className="mt-1 text-xl font-normal text-[#f2e7cf]" style={{ fontFamily: '"Iowan Old Style", "Palatino Linotype", serif' }}>Integration</h3>
              <p className="mt-1.5 text-sm text-[#b7ac97]">Unified corporate platform connecting all divisions under one digital identity.</p>
            </article>
          </div>

          <div className="mt-4">
            <Link href="/about/timeline" className="fe-link-chip">
              View Full Timeline
            </Link>
          </div>
        </section>
      </MotionWrapper>

      <MotionWrapper delay={0.32}>
        <section className="fe-panel p-5 sm:p-7">
        <header className="grid gap-2">
          <p className="text-[11px] uppercase tracking-[0.2em] text-[#b59f75]">Group Divisions</p>
          <h2 className="text-3xl font-normal text-[#f8f1e3] sm:text-4xl">Continue Your Journey</h2>
          <p className="max-w-[72ch] text-[#b7ac97]">
            Explore each FIROSE division through dedicated experiences, while staying connected to one integrated group
            standard.
          </p>
        </header>

        <div className="mt-4 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
          {divisionCatalog.map((division) => {
            const divisionPageHref = getDivisionPageHref(division);
            const divisionWebsiteHref = getDivisionWebsiteHref(division);

            return (
            <article
              key={division.id}
              className="group overflow-hidden rounded-2xl border border-[#e0c89331] bg-[#15120eb5] transition duration-500 hover:-translate-y-0.5 hover:border-[#e0c89372]"
            >
              <Link href={divisionPageHref} aria-label={`Open ${division.name} division page`}>
                <div className="relative h-36 overflow-hidden">
                  <Image
                    src={division.image}
                    alt={division.imageAlt}
                    fill
                    className="object-cover transition duration-700 group-hover:scale-[1.04]"
                    sizes="(max-width: 767px) 100vw, (max-width: 1279px) 50vw, 25vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#090807e2] to-transparent" />
                  <p className="absolute bottom-2 left-2 rounded-full border border-[#e0c89355] bg-[#3a2d1e7f] px-2.5 py-1 text-[10px] uppercase tracking-[0.16em] text-[#ecd2a0]">
                    {division.category}
                  </p>
                </div>
              </Link>

              <div className="grid gap-2 p-4">
                <h3 className="text-2xl font-normal text-[#f2e7cf]">{division.name}</h3>
                <p className="text-sm text-[#b7ac97]">{division.description}</p>

                <a
                  href={divisionWebsiteHref}
                  target="_self"
                  rel="noopener noreferrer"
                  className="fe-link-chip w-fit"
                  aria-label={`Visit ${division.name} website`}
                >
                  Visit Website
                </a>
              </div>
            </article>
            );
          })}
        </div>
        </section>
      </MotionWrapper>
    </main>
  );
}
