import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import MotionWrapper from '@/app/components/motion/MotionWrapper';
import { corporateVisuals } from '@/app/lib/brandVisuals';
import { FBT_WEBSITE_URL } from '@/app/lib/divisions';

export const metadata: Metadata = {
  title: 'Our Story',
  description:
    'Learn the corporate history and legacy of Firose Enterprises, a multi-division manufacturing, distribution, and technology group since 1980.',
};

const storyMilestones = [
  {
    year: '1980',
    title: 'Foundation',
    text: 'Firose Enterprises began as a focused entrepreneurial venture driven by integrity, craftsmanship, and disciplined execution.',
  },
  {
    year: '1990s - 2000s',
    title: 'Category Expansion',
    text: 'Manufacturing strength and market understanding expanded across fragrance, hygiene, and healthcare categories.',
  },
  {
    year: '2020s',
    title: 'Technology Division Launch',
    text: 'Future Beyond Technology (FBT) was launched to lead AI-driven software engineering and cybersecurity capabilities.',
  },
  {
    year: 'Today',
    title: 'Integrated Enterprise Platform',
    text: 'FIROSE now runs a diversified platform with quality-led products, scalable distribution, and enterprise-grade technology systems.',
  },
] as const;

const storyPrinciples = [
  {
    title: 'Quality Above Convenience',
    text: 'We prioritize reliability and product integrity over short-term shortcuts.',
  },
  {
    title: 'Measured Expansion',
    text: 'We scale divisions through clear category strategy and responsible market execution.',
  },
  {
    title: 'Future-Ready Thinking',
    text: 'We combine legacy manufacturing discipline with modern AI and cybersecurity capability.',
  },
] as const;

function ExternalLinkIcon({ className }: Readonly<{ className?: string }>) {
  return (
    <svg
      viewBox="0 0 20 20"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      aria-hidden="true"
      className={className}
    >
      <path d="M8 4h8v8" />
      <path d="M7 13l9-9" />
      <path d="M16 11v5H4V4h5" />
    </svg>
  );
}

export default function CorporateStory() {
  return (
    <>
      <MotionWrapper delay={0.04}>
        <section className="fe-panel-strong relative isolate overflow-hidden p-0">
        <div className="absolute inset-0">
          <Image
            src={corporateVisuals.storyHeroImage}
            alt="Firose enterprise legacy and growth"
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#050403f3] via-[#090806d6] to-[#090806b0]" />
          <div className="absolute inset-0 bg-[radial-gradient(64%_52%_at_66%_18%,rgba(201,169,108,0.24)_0%,rgba(201,169,108,0)_72%)]" />
        </div>

        <div className="relative grid gap-8 p-5 sm:p-7 lg:grid-cols-[1.14fr_0.86fr] lg:gap-10 lg:p-10">
          <header className="grid content-start gap-4">
            <p className="inline-flex w-fit items-center rounded-full border border-[#e0c8935a] bg-[#3c301f4d] px-3 py-1 text-[11px] font-medium uppercase tracking-[0.2em] text-[#d7bb85]">
              Legacy Since 1980
            </p>

            <h1 className="max-w-[18ch] text-balance text-4xl font-normal leading-[1.05] text-[#f8f1e3] sm:text-5xl lg:text-6xl">
              Our Story
            </h1>

            <p className="max-w-[66ch] text-sm leading-relaxed text-[#b9ad96] sm:text-base">
              From a modest entrepreneurial beginning to a diversified multi-division enterprise, FIROSE has grown
              through consistency, quality discipline, and long-term trust.
            </p>

            <div className="flex flex-wrap gap-2 pt-1">
              <Link href="/about" className="fe-link-chip">
                Back to About
              </Link>
              <Link href="/brands" className="fe-link-chip">
                Explore Divisions
              </Link>
              <a
                href={FBT_WEBSITE_URL}
                target="_self"
                rel="noopener noreferrer"
                className="fe-btn-primary inline-flex items-center gap-1.5"
                aria-label="Visit Future Beyond Technology website"
              >
                Visit FBT
                <ExternalLinkIcon className="h-4 w-4" />
              </a>
            </div>
          </header>

          <div className="grid gap-2 self-end">
            <article className="rounded-2xl border border-[#e0c89333] bg-[#110f0cce] px-4 py-3 backdrop-blur-sm">
              <p className="text-[11px] uppercase tracking-[0.18em] text-[#c9ad76]">Enterprise Position</p>
              <p className="mt-1 text-base font-medium text-[#f3e8d1]">Multi-Division Group</p>
            </article>
            <article className="rounded-2xl border border-[#e0c89333] bg-[#110f0cce] px-4 py-3 backdrop-blur-sm">
              <p className="text-[11px] uppercase tracking-[0.18em] text-[#c9ad76]">Operating Strength</p>
              <p className="mt-1 text-base font-medium text-[#f3e8d1]">Manufacturing + Technology</p>
            </article>
            <article className="rounded-2xl border border-[#e0c89333] bg-[#110f0cce] px-4 py-3 backdrop-blur-sm">
              <p className="text-[11px] uppercase tracking-[0.18em] text-[#c9ad76]">Growth Lens</p>
              <p className="mt-1 text-base font-medium text-[#f3e8d1]">Quality-Led Expansion</p>
            </article>
          </div>
        </div>
        </section>
      </MotionWrapper>

      <MotionWrapper delay={0.1}>
        <section className="fe-panel p-5 sm:p-7">
        <header className="grid gap-2">
          <p className="text-[11px] uppercase tracking-[0.2em] text-[#b59f75]">Timeline</p>
          <h2 className="text-3xl font-normal text-[#f8f1e3] sm:text-4xl">The FIROSE Evolution</h2>
          <p className="max-w-[72ch] text-[#b7ac97]">
            Every chapter strengthened our ability to serve markets with confidence, consistency, and category precision.
          </p>
        </header>

        <ol className="mt-5 grid gap-3 lg:grid-cols-4">
          {storyMilestones.map((milestone) => (
            <li key={milestone.year}>
              <article className="group h-full rounded-2xl border border-[#e0c89331] bg-[#15120eb5] p-4 transition duration-500 hover:-translate-y-0.5 hover:border-[#e0c8937a] hover:bg-[#1d1813d6]">
                <p className="text-[11px] uppercase tracking-[0.18em] text-[#c9ad76]">{milestone.year}</p>
                <h3 className="mt-2 text-2xl font-normal text-[#f2e7cf]">{milestone.title}</h3>
                <p className="mt-2 text-sm text-[#b7ac97]">{milestone.text}</p>
              </article>
            </li>
          ))}
        </ol>
        </section>
      </MotionWrapper>

      <MotionWrapper delay={0.16}>
        <section className="fe-panel p-5 sm:p-7 lg:p-8">
        <div className="grid gap-5 lg:grid-cols-[1.02fr_0.98fr] lg:items-center">
          <div className="fe-interactive-media fe-shine relative overflow-hidden rounded-3xl border border-[#e0c8933d]">
            <div className="relative h-[300px] sm:h-[360px]">
              <Image
                src={corporateVisuals.storyOperationsImage}
                alt="Firose operations and process discipline"
                fill
                className="object-cover"
                sizes="(max-width: 1023px) 100vw, 46vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#090807ea] via-[#090807a8] to-transparent" />
            </div>
            <p className="absolute bottom-3 left-3 rounded-full border border-[#e0c89355] bg-[#3a2d1e7f] px-3 py-1 text-[11px] uppercase tracking-[0.16em] text-[#ecd2a0]">
              Built on Process Discipline
            </p>
          </div>

          <article className="rounded-3xl border border-[#e0c89331] bg-[#14110eb5] p-5 sm:p-6">
            <h2 className="text-3xl font-normal text-[#f8f1e3] sm:text-4xl">From Product to Platform</h2>
            <p className="mt-3 text-sm leading-relaxed text-[#b7ac97] sm:text-base">
              FIROSE is not just a brand owner. We are a systems-driven enterprise that designs category-focused product
              experiences while building durable operating capability behind every division.
            </p>
            <p className="mt-3 text-sm leading-relaxed text-[#b7ac97] sm:text-base">
              This is how we balance heritage and innovation: disciplined manufacturing, resilient distribution, and
              enterprise technology under one strategic umbrella.
            </p>

            <div className="mt-5 grid gap-2 sm:grid-cols-3">
              {storyPrinciples.map((item) => (
                <article key={item.title} className="rounded-2xl border border-[#e0c8932f] bg-[#1a1510ca] p-3">
                  <h3 className="text-xl font-normal text-[#f2e7cf]">{item.title}</h3>
                  <p className="mt-1 text-sm text-[#b7ac97]">{item.text}</p>
                </article>
              ))}
            </div>
          </article>
        </div>
        </section>
      </MotionWrapper>

      <MotionWrapper delay={0.24}>
        <section className="fe-panel p-5 sm:p-7 lg:p-8">
        <div className="grid gap-5 lg:grid-cols-[0.96fr_1.04fr] lg:items-center">
          <article className="rounded-3xl border border-[#e0c89331] bg-[#14110eb5] p-5 sm:p-6">
            <h2 className="text-3xl font-normal text-[#f8f1e3] sm:text-4xl">Looking Ahead</h2>
            <p className="mt-3 text-sm leading-relaxed text-[#b7ac97] sm:text-base">
              With stronger category depth and technology leadership through FBT, FIROSE is building a global-standard
              enterprise with long-term strategic intent.
            </p>
            <p className="mt-3 text-sm leading-relaxed text-[#b7ac97] sm:text-base">
              We continue to scale responsibly while preserving the core values that shaped our journey from day one.
            </p>

            <div className="mt-5 flex flex-wrap gap-2">
              <a
                href="https://www.indiamart.com/firose-enterpriseschennai/"
                target="_blank"
                rel="noopener noreferrer"
                className="fe-btn-primary"
              >
                Visit IndiaMART
              </a>
              <Link href="/contact" className="fe-link-chip">
                Contact Corporate Team
              </Link>
            </div>
          </article>

          <div className="fe-interactive-media fe-shine relative overflow-hidden rounded-3xl border border-[#e0c8933d]">
            <div className="relative h-[300px] sm:h-[360px]">
              <Image
                src={corporateVisuals.storyQualityImage}
                alt="Firose quality and safety standards"
                fill
                className="object-cover"
                sizes="(max-width: 1023px) 100vw, 46vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#090807ea] via-[#090807a8] to-transparent" />
            </div>
            <p className="absolute bottom-3 left-3 rounded-full border border-[#e0c89355] bg-[#3a2d1e7f] px-3 py-1 text-[11px] uppercase tracking-[0.16em] text-[#ecd2a0]">
              Future-Ready Enterprise Mindset
            </p>
          </div>
        </div>
        </section>
      </MotionWrapper>
    </>
  );
}
