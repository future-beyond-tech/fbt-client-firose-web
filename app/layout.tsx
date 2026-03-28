import type { ReactNode } from 'react';

/**
 * Minimal root layout — locale-specific rendering happens in app/[locale]/layout.tsx.
 * next-intl requires the html lang attribute to be set per locale in the nested layout.
 */
export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return children;
}
