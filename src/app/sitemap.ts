import { MetadataRoute } from 'next';
import { SITE_CONFIG, PLANS } from '@/lib/constants';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = SITE_CONFIG.url;
  const locales = SITE_CONFIG.locales;
  const now = new Date();

  // Static pages
  const staticPages = [
    { path: '', priority: 1.0, changeFrequency: 'weekly' as const },
    { path: '/faq', priority: 0.8, changeFrequency: 'monthly' as const },
    { path: '/installation', priority: 0.8, changeFrequency: 'monthly' as const },
    { path: '/about', priority: 0.6, changeFrequency: 'monthly' as const },
    { path: '/contact', priority: 0.7, changeFrequency: 'monthly' as const },
    { path: '/privacy', priority: 0.3, changeFrequency: 'yearly' as const },
    { path: '/terms', priority: 0.3, changeFrequency: 'yearly' as const },
  ];

  // City landing pages for local SEO
  const cities = ['geneve', 'zurich', 'lausanne', 'bern', 'basel'];

  const entries: MetadataRoute.Sitemap = [];

  // Generate entries for each locale
  for (const locale of locales) {
    // Static pages
    for (const page of staticPages) {
      entries.push({
        url: `${baseUrl}/${locale}${page.path}`,
        lastModified: now,
        changeFrequency: page.changeFrequency,
        priority: page.priority,
        alternates: {
          languages: {
            'fr-CH': `${baseUrl}/fr${page.path}`,
            'de-CH': `${baseUrl}/de${page.path}`,
          },
        },
      });
    }

    // Plan pages
    for (const plan of PLANS) {
      entries.push({
        url: `${baseUrl}/${locale}/plans/${plan.slug}`,
        lastModified: now,
        changeFrequency: 'weekly',
        priority: 0.9,
        alternates: {
          languages: {
            'fr-CH': `${baseUrl}/fr/plans/${plan.slug}`,
            'de-CH': `${baseUrl}/de/plans/${plan.slug}`,
          },
        },
      });
    }

    // City landing pages
    for (const city of cities) {
      entries.push({
        url: `${baseUrl}/${locale}/iptv-${city}`,
        lastModified: now,
        changeFrequency: 'monthly',
        priority: 0.85,
        alternates: {
          languages: {
            'fr-CH': `${baseUrl}/fr/iptv-${city}`,
            'de-CH': `${baseUrl}/de/iptv-${city}`,
          },
        },
      });
    }
  }

  return entries;
}
