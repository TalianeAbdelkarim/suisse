import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');

const nextConfig: NextConfig = {
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.supabase.co',
      },
    ],
  },

  // ─── Caching Headers (equivalent to .htaccess) ───────────
  async headers() {
    return [
      {
        // Static assets — long cache
        source: '/:all*(svg|jpg|jpeg|png|gif|ico|webp|avif|woff|woff2)',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
        ],
      },
      {
        // JS/CSS — versioned by Next.js, safe to cache long
        source: '/_next/static/:path*',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
        ],
      },
      {
        // HTML pages — short cache with revalidation
        source: '/:path*',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'X-XSS-Protection', value: '1; mode=block' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
        ],
      },
    ];
  },

  // ─── Redirects ───────────────────────────────────────────
  async redirects() {
    return [
      // Old WordPress URL patterns → new routes
      { source: '/abonnement-iptv-suisse', destination: '/fr/#pricing', permanent: true },
      { source: '/iptv-plan/:slug', destination: '/fr/plans/:slug', permanent: true },
      { source: '/guide-dinstallation-iptv', destination: '/fr/installation', permanent: true },
      { source: '/a-propos', destination: '/fr/about', permanent: true },
      { source: '/politique-de-confidentialite', destination: '/fr/privacy', permanent: true },
      { source: '/conditions-dutilisation', destination: '/fr/terms', permanent: true },
      { source: '/faq', destination: '/fr/faq', permanent: true },
      { source: '/contact', destination: '/fr/contact', permanent: true },
      { source: '/merci', destination: '/fr/merci', permanent: true },
      // Trailing slash normalization
      { source: '/:locale(fr|de)/:path+/', destination: '/:locale/:path+', permanent: true },
    ];
  },
};

export default withNextIntl(nextConfig);
