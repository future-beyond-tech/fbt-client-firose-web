import type { Metadata } from 'next';
import Link from 'next/link';
import MotionWrapper from '@/app/components/motion/MotionWrapper';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'Privacy policy for Firose Enterprises — how we collect, use, and protect your information.',
};

export default function PrivacyPage() {
  return (
    <main id="main-content" className="fe-main fe-ambient-drift">
      <MotionWrapper delay={0.04}>
        <section className="fe-panel-strong p-5 sm:p-7 lg:p-8">
          <header className="grid gap-2">
            <p className="text-[11px] uppercase tracking-[0.2em] text-[#b59f75]">Legal</p>
            <h1 className="text-4xl font-normal text-[#f8f1e3] sm:text-5xl">Privacy Policy</h1>
            <p className="text-sm text-[#b7ac97]">Last updated: March 2026</p>
          </header>
        </section>
      </MotionWrapper>

      <MotionWrapper delay={0.1}>
        <section className="fe-panel grid gap-6 p-5 sm:p-7 lg:p-8">
          <div className="grid gap-3">
            <h2 className="text-2xl font-normal text-[#f2e7cf]">Information We Collect</h2>
            <p className="text-sm leading-relaxed text-[#b7ac97]">
              When you use our contact forms or business inquiry forms, we may collect the following information: your name, email address, phone number, company name, and the content of your message. This information is provided voluntarily by you and is used solely to respond to your inquiry.
            </p>
          </div>

          <div className="grid gap-3">
            <h2 className="text-2xl font-normal text-[#f2e7cf]">How We Use Your Information</h2>
            <p className="text-sm leading-relaxed text-[#b7ac97]">
              Information submitted through our forms is used exclusively to respond to your business or general inquiry. We do not store form submissions on our servers — our contact forms generate mailto: links that open your email client directly, or redirect to WhatsApp for messaging. Your data remains in your own email or messaging application.
            </p>
          </div>

          <div className="grid gap-3">
            <h2 className="text-2xl font-normal text-[#f2e7cf]">Third-Party Services</h2>
            <p className="text-sm leading-relaxed text-[#b7ac97]">
              We do not sell, trade, or transfer your personal information to third parties. Our website may contain links to external division websites (arperfumes.in, femison.in, neatfresh.online, futurebeyondtech.com) and third-party platforms (IndiaMART, WhatsApp). These services have their own privacy policies, and we encourage you to review them.
            </p>
          </div>

          <div className="grid gap-3">
            <h2 className="text-2xl font-normal text-[#f2e7cf]">Cookies & Tracking</h2>
            <p className="text-sm leading-relaxed text-[#b7ac97]">
              This website uses minimal cookies required for functionality, such as session storage for user experience preferences. We do not currently use third-party analytics cookies or tracking pixels. If this changes in the future, this policy will be updated accordingly.
            </p>
          </div>

          <div className="grid gap-3">
            <h2 className="text-2xl font-normal text-[#f2e7cf]">Data Security</h2>
            <p className="text-sm leading-relaxed text-[#b7ac97]">
              We implement appropriate security measures to protect any information transmitted through our website. However, no method of electronic transmission is 100% secure, and we cannot guarantee absolute security.
            </p>
          </div>

          <div className="grid gap-3">
            <h2 className="text-2xl font-normal text-[#f2e7cf]">Contact Us</h2>
            <p className="text-sm leading-relaxed text-[#b7ac97]">
              If you have questions about this privacy policy or wish to exercise your data rights, please contact us at{' '}
              <a href="mailto:corporate@firoseenterprises.com" className="text-[#c8a86b] underline underline-offset-2">
                corporate@firoseenterprises.com
              </a>.
            </p>
          </div>

          <div className="mt-2 flex flex-wrap gap-2">
            <Link href="/terms" className="fe-link-chip">Terms of Service</Link>
            <Link href="/contact" className="fe-link-chip">Contact Us</Link>
            <Link href="/" className="fe-link-chip">Back to Home</Link>
          </div>
        </section>
      </MotionWrapper>
    </main>
  );
}
