import { setRequestLocale } from 'next-intl/server';
import { getTranslations } from 'next-intl/server';
import FAQ from '@/components/sections/FAQ';
import { SITE_CONFIG } from '@/lib/constants';
import type { Metadata } from 'next';

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'faq' });

  return {
    title: t('title') + ' ' + t('titleHighlight'),
    description: t('subtitle'),
    alternates: {
      canonical: `${SITE_CONFIG.url}/${locale}/faq`,
      languages: {
        'fr-CH': `${SITE_CONFIG.url}/fr/faq`,
        'de-CH': `${SITE_CONFIG.url}/de/faq`,
      },
    },
  };
}

export default async function FAQPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <div className="pt-20">
      <FAQ showAll />
    </div>
  );
}
