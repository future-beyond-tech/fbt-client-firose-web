import type { Metadata } from 'next';
import LeadershipSection from '@/app/components/LeadershipSection';
import { createPageMetadata } from '@/app/lib/seo';

type PageProps = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  return createPageMetadata({
    title: 'Leadership',
    description:
      'Meet the leadership team guiding FIROSE Enterprises and its four operating divisions.',
    path: '/leadership',
    locale,
  });
}

export default function LeadershipPage() {
  return (
    <main id="main-content">
      <LeadershipSection />
    </main>
  );
}
