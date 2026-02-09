'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { Monitor, ArrowRight, Users } from 'lucide-react';
import { Link } from '@/i18n/navigation';

export default function MultiScreenBanner() {
  const t = useTranslations('multiScreenBanner');

  return (
    <section className="py-16 bg-white">
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-bg rounded-xl border border-border p-8 sm:p-10 lg:p-12"
        >
          <div className="flex flex-col lg:flex-row items-center gap-8">
            {/* Left: text */}
            <div className="flex-1 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-swiss-red/8 rounded-full border border-swiss-red/15 mb-4">
                <Users className="w-3.5 h-3.5 text-swiss-red" />
                <span className="text-xs font-semibold text-swiss-red uppercase tracking-wide">
                  {t('badge')}
                </span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-extrabold text-text tracking-tight mb-3">
                {t('title')} <span className="text-swiss-red">{t('titleHighlight')}</span>
              </h2>

              <p className="text-text-secondary text-sm sm:text-base leading-relaxed max-w-lg mb-6">
                {t('description')}
              </p>

              <Link
                href="/multi-ecrans"
                className="inline-flex items-center gap-2 px-6 py-3 bg-swiss-red text-white font-semibold text-sm rounded-lg hover:bg-swiss-red-dark transition-colors"
              >
                {t('cta')}
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            {/* Right: screen count options */}
            <div className="flex gap-4 shrink-0">
              {[2, 3, 4].map((num) => (
                <motion.div
                  key={num}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: num * 0.08 }}
                  className="flex flex-col items-center gap-2 p-5 bg-white rounded-xl border border-border hover:border-swiss-red/20 transition-all"
                >
                  <div className="w-12 h-12 rounded-full bg-swiss-red/8 flex items-center justify-center">
                    <Monitor className="w-5 h-5 text-swiss-red" />
                  </div>
                  <span className="text-2xl font-extrabold text-text">{num}</span>
                  <span className="text-[11px] text-text-muted font-medium">
                    {t('screenOption', { count: num })}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
