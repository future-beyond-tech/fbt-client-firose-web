import { getTranslations } from 'next-intl/server';

export default async function SkipLink() {
  const t = await getTranslations('common');

  return (
    <a
      href="#main-content"
      className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:inline-flex focus:items-center focus:rounded-full focus:border focus:border-[rgba(224,200,147,0.5)] focus:bg-[#1a1510] focus:px-5 focus:py-2.5 focus:text-sm focus:font-medium focus:text-[#c8a86b] focus:shadow-lg focus:outline-none"
      style={{ minHeight: 44 }}
    >
      {t('skipToMain')}
    </a>
  );
}
