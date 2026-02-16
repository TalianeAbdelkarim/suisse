'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { Tv, Smartphone, Monitor, Flame, TabletSmartphone, Box } from 'lucide-react';

const DEVICES = [
  { key: 'smarttv', icon: Tv },
  { key: 'android', icon: Smartphone },
  { key: 'ios', icon: TabletSmartphone },
  { key: 'windows', icon: Monitor },
  { key: 'firetv', icon: Flame },
  { key: 'iptv_box', icon: Box },
] as const;

export default function DeviceCompatibility() {
  const t = useTranslations('devices');

  return (
    <section className="py-20 lg:py-28 bg-surface-dark">
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-3">
            {t('title')}
          </h2>
          <p className="text-gray-400 max-w-xl mx-auto">{t('subtitle')}</p>
        </motion.div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {DEVICES.map(({ key, icon: Icon }, i) => (
            <motion.div
              key={key}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06 }}
              className="group flex flex-col items-center gap-4 rounded-xl bg-white/5 border border-white/10 p-6 hover:bg-white/10 hover:border-swiss-red/30 transition-all"
            >
              <div className="w-14 h-14 rounded-full bg-swiss-red/10 flex items-center justify-center group-hover:bg-swiss-red/20 transition-colors">
                <Icon className="w-7 h-7 text-swiss-red" />
              </div>
              <span className="text-sm font-semibold text-white">{t(key)}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
