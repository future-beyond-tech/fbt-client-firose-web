import type { Metadata } from 'next';
import Image from 'next/image';
import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import BrandNavigation from '@/app/components/BrandNavigation';
import DivisionCard from '@/app/components/DivisionCard';
import HeroSection from '@/app/components/HeroSection';
import ProofPoints from '@/app/components/ProofPoints';
import MotionWrapper from '@/app/components/motion/MotionWrapper';
import { FBT_WEBSITE_URL, divisionCatalog } from '@/app/lib/divisions';
import { corporateVisuals } from '@/app/lib/brandVisuals';

type PageProps = {
  params: Promise<{ locale: string }>;
};

const CORPORATE_WHATSAPP =
  'https://wa.me/919790600220?text=Hello%20FiroseEnterprises%2C%20I%20would%20like%20to%20connect.';
const CORPORATE_INDIAMART = 'https://www.indiamart.com/firose-enterpriseschennai/';

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'home' });

  return {
    title: t('title'),
    description: t('description'),
  };
}

export default async function Home() {
  const tHome = await getTranslations('home');
  const tCommon = await getTranslations('common');

  const industries = Array.from({ length: 8 }, (_, index) => tHome(`industry${index + 1}`));

  return (
    <>
      <HeroSection
        title={tHome('heroTitle')}
        subtitle={tHome('heroSubtitle')}
        primaryCtaLabel={tHome('exploreOurDivisions')}
        primaryCtaHref="/brands"
        secondaryCtaLabel={tHome('ourStory')}
        secondaryCtaHref="/about/story"
      />

      <main id="main-content" className="fe-main fe-ambient-drift">
        <MotionWrapper delay={0.02}>
          <ProofPoints />
        </MotionWrapper>

        <MotionWrapper delay={0.04}>
          <section className="fe-panel p-5 sm:p-7 lg:p-8">
            <header className="grid gap-2">
              <p className="text-[11px] uppercase tracking-[0.2em] text-[#b59f75]">{tHome('divisionArchitecture')}</p>
              <h2 className="text-3xl font-normal text-[#f8f1e3] sm:text-4xl">{tHome('deliberatePortfolio')}</h2>
              <p className="max-w-[72ch] text-[#b7ac97]">{tHome('portfolioDescription')}</p>
            </header>

            <div className="mt-5 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              {divisionCatalog.map((division, index) => (
                <DivisionCard key={division.id} division={division} animationDelayMs={120 + index * 90} />
              ))}
            </div>
          </section>
        </MotionWrapper>

        <MotionWrapper delay={0.1}>
          <section className="fe-panel-strong overflow-hidden p-5 sm:p-7 lg:p-8">
            <div className="grid gap-5 lg:grid-cols-[1.02fr_0.98fr] lg:items-center">
              <div className="grid gap-3">
                <p className="inline-flex w-fit items-center rounded-full border border-[#e0c89352] bg-[#3c301f42] px-3 py-1 text-[11px] font-medium uppercase tracking-[0.2em] text-[#d6b983]">
                  {tHome('featuredDivision')}
                </p>
                <h2 className="text-3xl font-normal text-[#f8f1e3] sm:text-4xl">{tHome('fbtTitle')}</h2>
                <p className="max-w-[74ch] text-[#b7ac97]">{tHome('fbtDescription')}</p>
                <div className="flex flex-wrap gap-2">
                  <Link
                    href="/brands/future-beyond-technology"
                    className="fe-btn-primary"
                    aria-label={tHome('exploreFbt')}
                  >
                    {tHome('exploreFbt')}
                  </Link>
                  <a
                    href={FBT_WEBSITE_URL}
                    target="_self"
                    rel="noopener noreferrer"
                    className="fe-link-chip"
                    aria-label={tHome('visitFbt')}
                  >
                    {tHome('visitFbt')}
                  </a>
                </div>
              </div>

              <div className="fe-interactive-media fe-shine relative overflow-hidden rounded-3xl border border-[#e0c8933e]">
                <div className="relative h-[260px] sm:h-[320px]">
                  <Image
                    src="https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1800&q=80"
                    alt="Future Beyond Technology secure AI engineering environment"
                    fill
                    className="object-cover"
                    sizes="(max-width: 1023px) 100vw, 42vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#070605ef] via-[#0b0907bf] to-transparent" />
                </div>

                <div className="absolute bottom-3 left-3 right-3 rounded-2xl border border-[#e0c8933f] bg-[#100e0cd1] px-3 py-3 text-[#dfcfb2] backdrop-blur-sm">
                  <p className="text-[11px] font-medium uppercase tracking-[0.17em] text-[#c9ad76]">{tHome('aiEngineering')}</p>
                  <p className="mt-1 text-sm">{tHome('aiEngineeringDesc')}</p>
                </div>
              </div>
            </div>
          </section>
        </MotionWrapper>

        <MotionWrapper delay={0.16}>
          <section className="fe-panel grid gap-5 p-5 sm:p-7 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
            <div className="fe-interactive-media fe-shine relative overflow-hidden rounded-3xl border border-[#e0c8933c]">
              <div className="relative h-[260px] sm:h-[320px]">
                <Image
                  src={corporateVisuals.supportImage}
                  alt="Firose product and operations support"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1023px) 100vw, 42vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#080705ec] to-transparent" />
              </div>
              <p className="absolute bottom-3 left-3 rounded-full border border-[#e0c8934d] bg-[#2f24167b] px-3 py-1 text-[11px] font-medium uppercase tracking-[0.14em] text-[#ecd2a0]">
                {tHome('processLed')}
              </p>
            </div>

            <div className="grid gap-3">
              <h2 className="text-3xl font-normal text-[#f8f1e3] sm:text-4xl">{tHome('firoseStandard')}</h2>
              <p className="max-w-[72ch] text-[#b7ac97]">{tHome('firoseStandardDesc')}</p>
              <div className="grid gap-2 sm:grid-cols-2">
                <p className="rounded-2xl border border-[#e0c89331] bg-[#15120eb3] px-4 py-3 text-sm text-[#c0b59f]">
                  {tHome('qualityCard1')}
                </p>
                <p className="rounded-2xl border border-[#e0c89331] bg-[#15120eb3] px-4 py-3 text-sm text-[#c0b59f]">
                  {tHome('qualityCard2')}
                </p>
                <p className="rounded-2xl border border-[#e0c89331] bg-[#15120eb3] px-4 py-3 text-sm text-[#c0b59f]">
                  {tHome('qualityCard3')}
                </p>
                <p className="rounded-2xl border border-[#e0c89331] bg-[#15120eb3] px-4 py-3 text-sm text-[#c0b59f]">
                  {tHome('qualityCard4')}
                </p>
              </div>
            </div>
          </section>
        </MotionWrapper>

        <MotionWrapper delay={0.2}>
          <section className="fe-panel overflow-hidden p-5 sm:p-7" style={{ borderLeftWidth: 3, borderLeftColor: '#c8a86b' }}>
            <div className="grid gap-4 lg:grid-cols-[1fr_auto] lg:items-center">
              <div className="grid gap-3">
                <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-[#b59f75]">
                  {tHome('swachhBharatEyebrow')}
                </p>
                <h2
                  className="text-2xl font-normal text-[#f8f1e3] italic sm:text-3xl"
                  style={{ fontFamily: '"Cormorant Garamond", "Iowan Old Style", "Palatino Linotype", serif' }}
                >
                  {tHome('swachhBharatTitle')}
                </h2>
                <p className="max-w-[68ch] text-sm leading-relaxed text-[#b7ac97]">
                  {tHome('swachhBharatBody')}
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="rounded-full border border-[#e0c89340] bg-[#29211538] px-3 py-1.5 text-[11px] font-medium text-[#d7bb85]">
                    {tHome('swachhBharatChip1')}
                  </span>
                  <span className="rounded-full border border-[#e0c89340] bg-[#29211538] px-3 py-1.5 text-[11px] font-medium text-[#d7bb85]">
                    {tHome('swachhBharatChip2')}
                  </span>
                  <span className="rounded-full border border-[#e0c89340] bg-[#29211538] px-3 py-1.5 text-[11px] font-medium text-[#d7bb85]">
                    {tHome('swachhBharatChip3')}
                  </span>
                </div>
              </div>
              <div className="hidden text-center lg:block" aria-hidden="true">
                <div className="inline-flex h-[100px] w-[100px] items-center justify-center rounded-full border border-[#e0c89328] bg-[#15120ea0]">
                  <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
                    <circle cx="24" cy="24" r="20" stroke="#c8a86b" strokeWidth="1.5" strokeDasharray="4 3" opacity="0.5" />
                    <path d="M18 24.5L22 28.5L30 19.5" stroke="#c8a86b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
              </div>
            </div>
          </section>
        </MotionWrapper>

        <MotionWrapper delay={0.26}>
          <section className="fe-panel p-5 sm:p-7">
            <h2 className="text-3xl font-normal text-[#f8f1e3] sm:text-4xl">{tHome('industriesServed')}</h2>
            <div className="mt-4 grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
              {industries.map((item) => (
                <p
                  key={item}
                  className="rounded-full border border-[#e0c89334] bg-[#15120eb0] px-4 py-2 text-center text-sm text-[#c0b59f]"
                >
                  {item}
                </p>
              ))}
            </div>
          </section>
        </MotionWrapper>

        <MotionWrapper delay={0.28}>
          <section className="fe-panel p-5 sm:p-7">
            <BrandNavigation />
          </section>
        </MotionWrapper>

        <MotionWrapper delay={0.34}>
          <section className="fe-panel-strong p-5 sm:p-7 lg:p-8">
            <h2 className="text-3xl font-normal text-[#f8f1e3] sm:text-4xl">{tHome('startConversation')}</h2>
            <p className="mt-2 max-w-[72ch] text-[#b7ac97]">{tHome('conversationDesc')}</p>

            <div className="mt-4 grid grid-cols-1 gap-2 sm:flex sm:flex-wrap">
              <Link href="/business-with-us" className="fe-btn-primary">
                {tCommon('businessWithUs')}
              </Link>
              <Link href="/contact" className="fe-link-chip">
                {tCommon('contactUs')}
              </Link>
              <a href={CORPORATE_INDIAMART} target="_blank" rel="noopener noreferrer" className="fe-link-chip">
                {tHome('indiamartProfile')}
              </a>
              <a href={CORPORATE_WHATSAPP} target="_blank" rel="noopener noreferrer" className="fe-link-chip">
                {tCommon('whatsApp')}
              </a>
            </div>
          </section>
        </MotionWrapper>
      </main>
    </>
  );
}
