'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { Monitor, ArrowRight, Users } from 'lucide-react';
import { Link } from '@/i18n/navigation';

export default function MultiScreenBanner() {
  const t = useTranslations('multiScreenBanner');

  const screenOptions = [
    { num: 2, fromPrice: '53.99' },
    { num: 3, fromPrice: '80.99' },
    { num: 4, fromPrice: '107.99' },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          {/* Section header */}
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-text tracking-tight mb-3">
              {t('title')} <span className="text-swiss-red">{t('titleHighlight')}</span>
            </h2>
            <p className="text-text-secondary max-w-xl mx-auto">
              {t('description')}
            </p>
          </div>

          {/* Screen option cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-10">
            {screenOptions.map(({ num, fromPrice }, i) => (
              <motion.div
                key={num}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
              >
                <Link href="/multi-ecrans" className="block group">
                  <div className="bg-bg rounded-xl border border-border p-6 text-center hover:border-swiss-red/20 hover:shadow-sm transition-all">
                    {/* Icon */}
                    <div className="w-12 h-12 rounded-full bg-swiss-red/8 flex items-center justify-center mx-auto mb-4 group-hover:bg-swiss-red/12 transition-colors">
                      <Monitor className="w-5 h-5 text-swiss-red" />
                    </div>

                    {/* Number + label */}
                    <div className="text-3xl font-extrabold text-text mb-1">{num}</div>
                    <div className="text-sm text-text-muted mb-3">
                      {t('screenOption', { count: num })}
                    </div>

                    {/* Price */}
                    <div className="text-xs text-text-muted">
                      dès <span className="text-swiss-red font-bold text-sm">{fromPrice} CHF</span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>

          {/* CTA */}
          <div className="text-center">
            <Link
              href="/multi-ecrans"
              className="inline-flex items-center gap-2 px-7 py-3.5 bg-swiss-red text-white font-semibold text-sm rounded-lg hover:bg-swiss-red-dark transition-colors"
            >
              {t('cta')}
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
