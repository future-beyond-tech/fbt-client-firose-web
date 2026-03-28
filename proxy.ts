import createMiddleware from 'next-intl/middleware';
import { type NextRequest, NextResponse } from 'next/server';
import { routing } from './i18n/routing';

const intlMiddleware = createMiddleware(routing);

// Header used by next-intl to communicate the resolved locale
const LOCALE_HEADER = 'X-NEXT-INTL-LOCALE';

export default function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // ── Guard: never process static / internal paths ──────────────────
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname === '/favicon.ico' ||
    pathname === '/robots.txt' ||
    pathname === '/sitemap.xml' ||
    /\.(?:png|jpg|jpeg|gif|svg|ico|webp|css|js|woff|woff2)$/.test(pathname)
  ) {
    return NextResponse.next();
  }

  // ── Already processed by middleware (rewrite re-entry in Next.js 16) ──
  if (request.headers.get(LOCALE_HEADER)) {
    return NextResponse.next();
  }

  // ── Check if path has a non-default locale prefix (/ta, /hi, /te, /kn) ─
  const nonDefaultLocales = ['ta', 'hi', 'te', 'kn'];
  const hasNonDefaultLocalePrefix = nonDefaultLocales.some(
    (l) => pathname === `/${l}` || pathname.startsWith(`/${l}/`)
  );

  if (hasNonDefaultLocalePrefix) {
    // Non-default locales: let next-intl handle normally
    return intlMiddleware(request);
  }

  // ── /en or /en/* → strip prefix, redirect to clean URL ────────────
  //    With as-needed, English should never show /en in the URL
  if (pathname === '/en' || pathname.startsWith('/en/')) {
    const stripped = pathname.replace(/^\/en/, '') || '/';
    const url = request.nextUrl.clone();
    url.pathname = stripped;
    return NextResponse.redirect(url, 308);
  }

  // ── Default locale (English, unprefixed) ──────────────────────────
  //    Manually rewrite to /en/... and set the locale header.
  //    We do NOT call intlMiddleware here to avoid rewrite loops
  //    in Next.js 16 where proxy re-runs on rewrites.
  const rewriteUrl = request.nextUrl.clone();
  rewriteUrl.pathname = `/en${pathname === '/' ? '' : pathname}`;

  const headers = new Headers(request.headers);
  headers.set(LOCALE_HEADER, 'en');

  return NextResponse.rewrite(rewriteUrl, {
    request: { headers },
  });
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon\\.ico|robots\\.txt|sitemap\\.xml|.*\\.(?:png|jpg|jpeg|gif|svg|ico|webp|css|js|woff|woff2)$).*)',
  ],
};
