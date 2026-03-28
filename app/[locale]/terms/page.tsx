import type { Metadata } from 'next';
import Link from 'next/link';
import MotionWrapper from '@/app/components/motion/MotionWrapper';

export const metadata: Metadata = {
  title: 'Terms of Service',
  description: 'Terms of service for Firose Enterprises — conditions governing the use of our website.',
};

export default function TermsPage() {
  return (
    <main id="main-content" className="fe-main fe-ambient-drift">
      <MotionWrapper delay={0.04}>
        <section className="fe-panel-strong p-5 sm:p-7 lg:p-8">
          <header className="grid gap-2">
            <p className="text-[11px] uppercase tracking-[0.2em] text-[#b59f75]">Legal</p>
            <h1 className="text-4xl font-normal text-[#f8f1e3] sm:text-5xl">Terms of Service</h1>
            <p className="text-sm text-[#b7ac97]">Last updated: March 2026</p>
          </header>
        </section>
      </MotionWrapper>

      <MotionWrapper delay={0.1}>
        <section className="fe-panel grid gap-6 p-5 sm:p-7 lg:p-8">
          <div className="grid gap-3">
            <h2 className="text-2xl font-normal text-[#f2e7cf]">Acceptance of Terms</h2>
            <p className="text-sm leading-relaxed text-[#b7ac97]">
              By accessing and using the Firose Enterprises website, you accept and agree to be bound by these Terms of Service. If you do not agree with any part of these terms, please discontinue use of the website immediately.
            </p>
          </div>

          <div className="grid gap-3">
            <h2 className="text-2xl font-normal text-[#f2e7cf]">Use of Website</h2>
            <p className="text-sm leading-relaxed text-[#b7ac97]">
              This website is provided for informational and business inquiry purposes only. The content presented — including descriptions of our divisions, products, and services — is intended to offer a general overview of Firose Enterprises and its operations. While we strive to keep information accurate and up to date, we make no warranties regarding the completeness or accuracy of the content.
            </p>
          </div>

          <div className="grid gap-3">
            <h2 className="text-2xl font-normal text-[#f2e7cf]">Intellectual Property</h2>
            <p className="text-sm leading-relaxed text-[#b7ac97]">
              All content on this website — including text, graphics, logos, images, brand names, and design elements — is the property of Firose Enterprises or its respective divisions (AR Perfumes, Femison, Neat & Fresh, Future Beyond Technology) and is protected by applicable intellectual property laws. Reproduction, distribution, or use of any materials without prior written consent is strictly prohibited.
            </p>
          </div>

          <div className="grid gap-3">
            <h2 className="text-2xl font-normal text-[#f2e7cf]">External Links</h2>
            <p className="text-sm leading-relaxed text-[#b7ac97]">
              Our website may contain links to external websites operated by our divisions or third-party platforms such as IndiaMART and WhatsApp. These links are provided for convenience only. Firose Enterprises does not control and is not responsible for the content, privacy policies, or practices of any third-party websites. Accessing external links is at your own risk.
            </p>
          </div>

          <div className="grid gap-3">
            <h2 className="text-2xl font-normal text-[#f2e7cf]">Limitation of Liability</h2>
            <p className="text-sm leading-relaxed text-[#b7ac97]">
              Firose Enterprises shall not be held liable for any direct, indirect, incidental, or consequential damages arising from the use or inability to use this website, or from any information, products, or services obtained through this website. This includes, without limitation, damages for loss of profits, data, or other intangible losses.
            </p>
          </div>

          <div className="grid gap-3">
            <h2 className="text-2xl font-normal text-[#f2e7cf]">Governing Law</h2>
            <p className="text-sm leading-relaxed text-[#b7ac97]">
              These terms shall be governed by and construed in accordance with the laws of India. Any disputes arising from the use of this website shall be subject to the exclusive jurisdiction of the courts in India.
            </p>
          </div>

          <div className="grid gap-3">
            <h2 className="text-2xl font-normal text-[#f2e7cf]">Changes to Terms</h2>
            <p className="text-sm leading-relaxed text-[#b7ac97]">
              Firose Enterprises reserves the right to modify these Terms of Service at any time without prior notice. Continued use of the website following any changes constitutes acceptance of those changes. We encourage you to review this page periodically.
            </p>
          </div>

          <div className="grid gap-3">
            <h2 className="text-2xl font-normal text-[#f2e7cf]">Contact Us</h2>
            <p className="text-sm leading-relaxed text-[#b7ac97]">
              If you have questions about these terms, please contact us at{' '}
              <a href="mailto:corporate@firoseenterprises.com" className="text-[#c8a86b] underline underline-offset-2">
                corporate@firoseenterprises.com
              </a>.
            </p>
          </div>

          <div className="mt-2 flex flex-wrap gap-2">
            <Link href="/privacy" className="fe-link-chip">Privacy Policy</Link>
            <Link href="/contact" className="fe-link-chip">Contact Us</Link>
            <Link href="/" className="fe-link-chip">Back to Home</Link>
          </div>
        </section>
      </MotionWrapper>
    </main>
  );
}
