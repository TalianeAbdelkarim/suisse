import type { Metadata } from 'next';
import { NextIntlClientProvider, useMessages } from 'next-intl';
import { getMessages, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import { SITE_CONFIG } from '@/lib/constants';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import WhatsAppButton from '@/components/ui/WhatsAppButton';
import CrispChat from '@/components/ui/CrispChat';
import GoogleAnalytics from '@/components/ui/GoogleAnalytics';

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const messages = await getMessages({ locale });
  const meta = (messages as Record<string, Record<string, string>>).metadata;

  return {
    metadataBase: new URL(SITE_CONFIG.url),
    title: {
      default: meta.title,
      template: `%s | ${SITE_CONFIG.name}`,
    },
    description: meta.description,
    keywords: locale === 'fr'
      ? ['IPTV Suisse', 'abonnement IPTV', 'IPTV premium', 'chaînes suisses', 'streaming TV Suisse', 'meilleur IPTV Suisse']
      : ['IPTV Schweiz', 'IPTV Abo', 'IPTV Premium', 'Schweizer Kanäle', 'TV Streaming Schweiz', 'bestes IPTV Schweiz'],
    authors: [{ name: SITE_CONFIG.name }],
    creator: SITE_CONFIG.name,
    openGraph: {
      title: meta.title,
      description: meta.description,
      url: `${SITE_CONFIG.url}/${locale}`,
      siteName: SITE_CONFIG.name,
      locale: locale === 'fr' ? 'fr_CH' : 'de_CH',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: meta.title,
      description: meta.description,
    },
    alternates: {
      canonical: `${SITE_CONFIG.url}/${locale}`,
      languages: {
        'fr-CH': `${SITE_CONFIG.url}/fr`,
        'de-CH': `${SITE_CONFIG.url}/de`,
        'x-default': `${SITE_CONFIG.url}/fr`,
      },
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  };
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as 'fr' | 'de')) {
    notFound();
  }

  setRequestLocale(locale);
  const messages = await getMessages();

  return (
    <NextIntlClientProvider messages={messages}>
      <GoogleAnalytics />
      <Header />
      <main className="min-h-screen bg-bg text-text">
        {children}
      </main>
      <Footer />
      <WhatsAppButton />
      <CrispChat />
    </NextIntlClientProvider>
  );
}
