const createNextIntlPlugin = require('next-intl/plugin');

const withNextIntl = createNextIntlPlugin('./i18n/request.ts');

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },
  async redirects() {
    return [
      {
        source: '/index.html',
        destination: '/',
        permanent: true,
      },
      {
        source: '/collection.html',
        destination: '/brands/ar-perfumes',
        permanent: true,
      },
      {
        source: '/about.html',
        destination: '/about',
        permanent: true,
      },
      {
        source: '/contact.html',
        destination: '/contact',
        permanent: true,
      },
      {
        source: '/product.html',
        destination: '/brands/ar-perfumes',
        permanent: true,
      },
      {
        source: '/',
        has: [
          {
            type: 'query',
            key: 'brand',
            value: 'ar',
          },
        ],
        destination: '/brands/ar-perfumes',
        permanent: true,
      },
      {
        source: '/old-ar-home',
        destination: '/brands/ar-perfumes',
        permanent: true,
      },
      {
        source: '/products',
        destination: '/brands/ar-perfumes',
        permanent: true,
      },
      {
        source: '/products/:path*',
        destination: '/brands/ar-perfumes',
        permanent: true,
      },
      {
        source: '/product',
        destination: '/brands/ar-perfumes',
        permanent: true,
      },
    ];
  },
};

module.exports = withNextIntl(nextConfig);
