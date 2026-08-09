import { absoluteCompanyUrl } from '@/app/lib/company';

type BreadcrumbItem = Readonly<{
  name: string;
  href: string;
}>;

type BreadcrumbSchemaProps = Readonly<{
  items: BreadcrumbItem[];
}>;

export default function BreadcrumbSchema({ items }: BreadcrumbSchemaProps) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: absoluteCompanyUrl(item.href),
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
