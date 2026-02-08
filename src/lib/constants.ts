// ============================================================
// IPTV Suisse - Constants & Configuration
// ============================================================

export const SITE_CONFIG = {
  name: 'IPTV Suisse',
  domain: 'iptvsuisse.co',
  url: 'https://iptvsuisse.co',
  email: 'contact@iptvsuisse.co',
  // TODO: Replace with real phone number before go-live
  phone: '+41 XX XXX XX XX',
  // TODO: Replace with real WhatsApp number before go-live
  whatsapp: 'https://wa.me/41XXXXXXXXX',
  defaultLocale: 'fr' as const,
  locales: ['fr', 'de'] as const,
} as const;

// City pages for internal linking & SEO
export const CITIES = ['geneve', 'zurich', 'lausanne', 'bern', 'basel'] as const;

export const STATS = {
  channels: '15,000+',
  movies: '40,000+',
  series: '17,000+',
  uptime: '99.9%',
  customers: '15,000+',
  supportHours: '24/7',
  activationTime: '2h',
} as const;

// Plans data (will be replaced by Supabase later)
export const PLANS = [
  {
    id: '1',
    slug: 'abonnement-iptv-3-mois',
    duration: 3,
    price: 25,
    original_price: 45,
    devices: 1,
    is_popular: false,
    is_active: true,
    payment_link: '#',
    name_fr: 'Abonnement IPTV 3 Mois',
    name_de: 'IPTV Abo 3 Monate',
    description_fr: 'Idéal pour découvrir notre service premium',
    description_de: 'Ideal zum Entdecken unseres Premium-Service',
    features: [
      'premium_server',
      'all_channels',
      'hd_4k',
      'replay_vod',
      'all_devices',
      'support_24_7',
    ],
    created_at: new Date().toISOString(),
  },
  {
    id: '2',
    slug: 'abonnement-iptv-12-mois',
    duration: 12,
    price: 59.99,
    original_price: 119.99,
    devices: 1,
    is_popular: true,
    is_active: true,
    payment_link: '#',
    name_fr: 'Abonnement IPTV 12 Mois',
    name_de: 'IPTV Abo 12 Monate',
    description_fr: 'Notre meilleur rapport qualité-prix',
    description_de: 'Unser bestes Preis-Leistungs-Verhältnis',
    features: [
      'premium_server',
      'all_channels',
      'hd_4k',
      'replay_vod',
      'all_devices',
      'support_24_7',
      'free_updates',
    ],
    created_at: new Date().toISOString(),
  },
  {
    id: '3',
    slug: 'abonnement-iptv-6-mois',
    duration: 6,
    price: 35,
    original_price: 70,
    devices: 1,
    is_popular: false,
    is_active: true,
    payment_link: '#',
    name_fr: 'Abonnement IPTV 6 Mois',
    name_de: 'IPTV Abo 6 Monate',
    description_fr: 'L\'équilibre parfait entre durée et prix',
    description_de: 'Die perfekte Balance zwischen Dauer und Preis',
    features: [
      'premium_server',
      'all_channels',
      'hd_4k',
      'replay_vod',
      'all_devices',
      'support_24_7',
    ],
    created_at: new Date().toISOString(),
  },
] as const;
