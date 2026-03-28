import type { Metadata } from 'next';
import LeadershipSection from '@/app/components/LeadershipSection';

export const metadata: Metadata = {
  title: 'Leadership | FIROSE Enterprises',
  description:
    'Meet the founders and leaders of FIROSE Enterprises — Sithic Basha, Feroze, Abdul Razak, and Srikanth — the team building India\'s next great consumer group.',
};

export default function LeadershipPage() {
  return (
    <main id="main-content">
      <LeadershipSection />
    </main>
  );
}
