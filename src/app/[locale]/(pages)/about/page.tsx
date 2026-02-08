import { setRequestLocale, getTranslations } from 'next-intl/server';
import { SITE_CONFIG } from '@/lib/constants';
import { Shield, Users, Headphones, Award } from 'lucide-react';
import type { Metadata } from 'next';

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'about' });
  return { title: t('title'), description: t('subtitle'), alternates: { canonical: `${SITE_CONFIG.url}/${locale}/about`, languages: { 'fr-CH': `${SITE_CONFIG.url}/fr/about`, 'de-CH': `${SITE_CONFIG.url}/de/about` } } };
}

export default async function AboutPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: 'about' });
  const isFr = locale === 'fr';

  const values = [
    { icon: Shield, title: isFr ? 'Fiabilité' : 'Zuverlässigkeit', desc: isFr ? 'Une infrastructure premium avec 99.9% de disponibilité garantie.' : 'Premium-Infrastruktur mit 99.9% garantierter Verfügbarkeit.' },
    { icon: Users, title: isFr ? 'Communauté' : 'Gemeinschaft', desc: isFr ? 'Plus de 15\'000 clients satisfaits à travers la Suisse.' : 'Über 15\'000 zufriedene Kunden in der ganzen Schweiz.' },
    { icon: Headphones, title: isFr ? 'Support Dédié' : 'Engagierter Support', desc: isFr ? 'Équipe bilingue disponible 24/7 pour vous accompagner.' : 'Zweisprachiges Team 24/7 für Sie verfügbar.' },
    { icon: Award, title: isFr ? 'Excellence' : 'Exzellenz', desc: isFr ? 'La meilleure qualité d\'image HD et 4K disponible en Suisse.' : 'Die beste HD- und 4K-Bildqualität, verfügbar in der Schweiz.' },
  ];

  return (
    <div className="pt-28 pb-20 bg-white">
      <div className="max-w-3xl mx-auto px-5 sm:px-8">
        <div className="text-center mb-14">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-text tracking-tight mb-3">{t('title')}</h1>
          <p className="text-text-secondary">{t('subtitle')}</p>
        </div>

        <div className="bg-bg rounded-xl border border-border p-6 sm:p-8 mb-10">
          <p className="text-text-secondary leading-relaxed text-sm">
            {isFr ? 'IPTV Suisse est né d\'une vision simple : offrir aux résidents suisses le meilleur service de streaming TV disponible. Depuis notre lancement en 2020, nous avons grandi pour devenir le fournisseur IPTV #1 en Suisse, servant plus de 15\'000 clients satisfaits avec un service de qualité premium.' : 'IPTV Schweiz entstand aus einer einfachen Vision: Schweizer Einwohnern den besten verfügbaren TV-Streaming-Service zu bieten. Seit unserem Start 2020 sind wir zum #1 IPTV-Anbieter der Schweiz gewachsen und bedienen über 15\'000 zufriedene Kunden mit Premium-Qualität.'}
          </p>
        </div>

        <div className="grid sm:grid-cols-2 gap-5">
          {values.map(({ icon: Icon, title, desc }) => (
            <div key={title} className="bg-bg rounded-xl border border-border p-5 hover:border-swiss-red/20 transition-colors">
              <div className="w-9 h-9 rounded-lg bg-swiss-red/8 flex items-center justify-center mb-3">
                <Icon className="w-5 h-5 text-swiss-red" />
              </div>
              <h3 className="text-base font-bold text-text mb-1">{title}</h3>
              <p className="text-sm text-text-muted leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
