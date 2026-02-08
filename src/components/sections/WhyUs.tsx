'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';

const ITEMS = [
  { key: 'swiss', emoji: '🇨🇭' },
  { key: 'fast', emoji: '⚡' },
  { key: 'quality', emoji: '🏆' },
] as const;

export default function WhyUs() {
  const t = useTranslations('whyUs');

  return (
    <section className="py-20 lg:py-28 bg-white">
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <h2 className="text-3xl sm:text-4xl font-extrabold text-text tracking-tight mb-3">
            {t('title')} <span className="text-swiss-red">{t('titleHighlight')}</span>
          </h2>
          <p className="text-text-secondary max-w-xl mx-auto">{t('subtitle')}</p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          {ITEMS.map(({ key, emoji }, i) => (
            <motion.div
              key={key}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="text-center"
            >
              <div className="text-4xl mb-4">{emoji}</div>
              <h3 className="text-lg font-bold text-text mb-2">{t(`${key}.title`)}</h3>
              <p className="text-sm text-text-muted leading-relaxed">{t(`${key}.description`)}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
