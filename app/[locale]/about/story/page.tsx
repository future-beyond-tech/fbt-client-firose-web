import type { Metadata } from 'next';
import CorporateStory from '../CorporateStory';
import { createPageMetadata } from '@/app/lib/seo';

type PageProps = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  return createPageMetadata({
    title: 'Our Story',
    description: 'Learn how FIROSE Enterprises, established in 2018, builds on business and product heritage dating back to 1980.',
    path: '/about/story',
    locale,
  });
}

export default function CorporateStoryPage() {
  return (
    <main id="main-content" className="fe-main fe-ambient-drift">
      <CorporateStory />
    </main>
  );
}
