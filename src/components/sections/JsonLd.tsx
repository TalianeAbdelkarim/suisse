import { SITE_CONFIG, PLANS, STATS } from '@/lib/constants';

interface JsonLdProps {
  locale: string;
}

export default function JsonLd({ locale }: JsonLdProps) {
  const isFr = locale === 'fr';

  // Organization Schema
  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: SITE_CONFIG.name,
    url: SITE_CONFIG.url,
    logo: `${SITE_CONFIG.url}/logo.svg`,
    description: isFr
      ? 'Fournisseur de services IPTV premium en Suisse avec plus de 15\'000 chaînes HD et 4K.'
      : 'Premium IPTV-Dienstleister in der Schweiz mit über 15\'000 HD- und 4K-Kanälen.',
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: SITE_CONFIG.phone,
      contactType: 'customer service',
      availableLanguage: ['French', 'German'],
      areaServed: 'CH',
    },
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'CH',
    },
    sameAs: [],
  };

  // WebSite Schema for sitelinks searchbox
  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SITE_CONFIG.name,
    url: SITE_CONFIG.url,
    inLanguage: isFr ? 'fr-CH' : 'de-CH',
    potentialAction: {
      '@type': 'SearchAction',
      target: `${SITE_CONFIG.url}/${locale}/search?q={search_term_string}`,
      'query-input': 'required name=search_term_string',
    },
  };

  // Product schemas for each plan
  const priceValidUntil = new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];

  const productSchemas = PLANS.map((plan) => ({
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: isFr ? plan.name_fr : plan.name_de,
    description: isFr ? plan.description_fr : plan.description_de,
    image: `${SITE_CONFIG.url}${plan.image}`,
    brand: {
      '@type': 'Brand',
      name: SITE_CONFIG.name,
    },
    offers: {
      '@type': 'Offer',
      price: plan.price,
      priceCurrency: 'CHF',
      availability: 'https://schema.org/InStock',
      priceValidUntil,
      seller: {
        '@type': 'Organization',
        name: SITE_CONFIG.name,
      },
      url: `${SITE_CONFIG.url}/${locale}/plans/${plan.slug}`,
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.8',
      reviewCount: '2847',
      bestRating: '5',
      worstRating: '1',
    },
    review: {
      '@type': 'Review',
      reviewRating: {
        '@type': 'Rating',
        ratingValue: '5',
        bestRating: '5',
      },
      author: {
        '@type': 'Person',
        name: 'Marc D.',
      },
      reviewBody: isFr
        ? 'Excellent service ! La qualité d\'image est incroyable et le choix de chaînes est impressionnant.'
        : 'Hervorragender Service! Die Bildqualität ist unglaublich und die Kanalauswahl beeindruckend.',
    },
  }));

  // FAQ Schema
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: (isFr
      ? [
          { q: 'Qu\'est-ce que IPTV Suisse ?', a: 'IPTV Suisse est un service de télévision par internet qui vous donne accès à plus de 15\'000 chaînes TV en direct, 40\'000+ films et 17\'000+ séries en streaming HD et 4K.' },
          { q: 'Quels appareils sont compatibles ?', a: 'Notre service est compatible avec tous les appareils : Smart TV, Android, iOS, Windows, Mac, Fire Stick et MAG.' },
          { q: 'Combien de temps prend l\'activation ?', a: 'L\'activation se fait en moins de 2 heures après confirmation du paiement.' },
          { q: 'Est-ce que le replay est inclus ?', a: 'Oui, la fonction replay est incluse dans tous nos abonnements jusqu\'à 7 jours en arrière.' },
          { q: 'Comment contacter le support ?', a: 'Notre équipe est disponible 24/7 par WhatsApp, email et téléphone avec réponse garantie en moins de 2 heures.' },
        ]
      : [
          { q: 'Was ist IPTV Schweiz?', a: 'IPTV Schweiz ist ein Internet-TV-Service mit über 15\'000 Live-Kanälen, 40\'000+ Filmen und 17\'000+ Serien in HD und 4K.' },
          { q: 'Welche Geräte sind kompatibel?', a: 'Unser Service ist mit allen Geräten kompatibel: Smart TV, Android, iOS, Windows, Mac, Fire Stick und MAG.' },
          { q: 'Wie lange dauert die Aktivierung?', a: 'Die Aktivierung erfolgt in weniger als 2 Stunden nach Zahlungsbestätigung.' },
          { q: 'Ist Replay enthalten?', a: 'Ja, die Replay-Funktion ist in allen Abonnements bis zu 7 Tage zurück enthalten.' },
          { q: 'Wie erreiche ich den Support?', a: 'Unser Team ist 24/7 per WhatsApp, E-Mail und Telefon erreichbar mit garantierter Antwort in 2 Stunden.' },
        ]
    ).map(({ q, a }) => ({
      '@type': 'Question',
      name: q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: a,
      },
    })),
  };

  // LocalBusiness Schema
  const localBusinessSchema = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: SITE_CONFIG.name,
    url: SITE_CONFIG.url,
    telephone: SITE_CONFIG.phone,
    email: SITE_CONFIG.email,
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'CH',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: '46.9480',
      longitude: '7.4474',
    },
    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
      opens: '00:00',
      closes: '23:59',
    },
    priceRange: 'CHF 35.99 - CHF 179.99',
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.8',
      reviewCount: '2847',
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      {productSchemas.map((schema, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
    </>
  );
}
