import type { Metadata } from 'next';
import Link from 'next/link';
import LeadershipCard from '@/app/components/LeadershipCard';
import MotionWrapper from '@/app/components/motion/MotionWrapper';

export const metadata: Metadata = {
  title: 'Leadership',
  description:
    'Meet the leadership team behind Firose Enterprises — driving heritage consumer brands and future-focused technology divisions.',
};

const LEADERS = [
  {
    name: 'Feroze',
    title: 'Founder & Lead Software Engineer, Future Beyond Technology',
    bio: 'Feroze leads the vision of transforming a heritage enterprise into a modern, technology-enabled conglomerate. As the founder of Future Beyond Technology, he bridges decades of consumer brand experience with cutting-edge AI engineering and cybersecurity capability.',
    /* PLACEHOLDER: IMAGE - Feroze professional portrait, 1:1 aspect */
  },
  {
    name: 'Gorantla Srikanth',
    title: 'CTO, Future Beyond Technology',
    bio: 'Gorantla Srikanth leads the technology architecture and engineering execution at FBT. His focus is on building production-grade systems that combine AI automation with enterprise-level security and scalability.',
    /* PLACEHOLDER: IMAGE - Gorantla Srikanth professional portrait, 1:1 aspect */
  },
];

export default function LeadershipPage() {
  return (
    <main id="main-content" className="fe-main fe-ambient-drift">
      <MotionWrapper delay={0.04}>
        <section className="fe-panel-strong p-5 sm:p-7 lg:p-8">
          <header className="grid gap-2">
            <p className="text-[11px] uppercase tracking-[0.2em] text-[#b59f75]">Leadership</p>
            <h1 className="text-4xl font-normal text-[#f8f1e3] sm:text-5xl">The People Behind Firose</h1>
            <p className="max-w-[72ch] text-[#b7ac97]">
              A leadership team committed to building durable brand value through disciplined execution, responsible expansion, and technology-driven transformation.
            </p>
          </header>
        </section>
      </MotionWrapper>

      <MotionWrapper delay={0.1}>
        <section className="fe-panel p-5 sm:p-7">
          <div className="grid gap-4 lg:grid-cols-2">
            {LEADERS.map((leader) => (
              <LeadershipCard key={leader.name} name={leader.name} title={leader.title} bio={leader.bio} />
            ))}
          </div>
        </section>
      </MotionWrapper>

      <MotionWrapper delay={0.16}>
        <section className="fe-panel p-5 sm:p-7">
          <h2 className="text-3xl font-normal text-[#f8f1e3] sm:text-4xl">Leadership Philosophy</h2>
          <p className="mt-2 max-w-[72ch] text-[#b7ac97]">
            At Firose Enterprises, leadership is not about hierarchy — it is about accountability. Every division operates with clear ownership, measurable outcomes, and a shared commitment to the FIROSE standard of quality and trust.
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            <Link href="/about" className="fe-link-chip">About Firose</Link>
            <Link href="/about/story" className="fe-link-chip">Our Story</Link>
            <Link href="/contact" className="fe-btn-primary">Contact Us</Link>
          </div>
        </section>
      </MotionWrapper>
    </main>
  );
}
