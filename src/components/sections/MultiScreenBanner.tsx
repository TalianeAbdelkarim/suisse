'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { Monitor, Smartphone, Tablet, Laptop, ArrowRight } from 'lucide-react';
import { Link } from '@/i18n/navigation';

export default function MultiScreenBanner() {
  const t = useTranslations('multiScreenBanner');

  const devices = [
    { icon: Monitor, label: 'Smart TV' },
    { icon: Smartphone, label: 'Smartphone' },
    { icon: Tablet, label: 'Tablette' },
    { icon: Laptop, label: 'PC / Mac' },
  ];

  return (
    <section className="py-16 bg-white">
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-8 sm:p-12 lg:p-16"
        >
          {/* Background decorations */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-swiss-red/10 rounded-full blur-[100px] pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-60 h-60 bg-swiss-red/5 rounded-full blur-[80px] pointer-events-none" />

          <div className="relative z-10 flex flex-col lg:flex-row items-center gap-10">
            {/* Text content */}
            <div className="flex-1 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-swiss-red/20 rounded-full border border-swiss-red/30 mb-5">
                <div className="w-2 h-2 rounded-full bg-swiss-red animate-pulse" />
                <span className="text-xs font-semibold text-swiss-red uppercase tracking-wide">
                  {t('badge')}
                </span>
              </div>

              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white leading-tight mb-4">
                {t('title')} <span className="text-swiss-red">{t('titleHighlight')}</span>
              </h2>

              <p className="text-gray-400 text-sm sm:text-base leading-relaxed max-w-lg mb-8">
                {t('description')}
              </p>

              <Link
                href="/multi-ecrans"
                className="inline-flex items-center gap-2 px-7 py-3.5 bg-swiss-red text-white font-bold text-sm rounded-lg hover:bg-swiss-red-dark transition-colors shadow-lg shadow-swiss-red/25"
              >
                {t('cta')}
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            {/* Device icons grid */}
            <div className="grid grid-cols-2 gap-4 sm:gap-5 shrink-0">
              {devices.map((device, i) => (
                <motion.div
                  key={device.label}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 + i * 0.1 }}
                  className="flex flex-col items-center gap-2 p-5 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 hover:border-swiss-red/30 hover:bg-white/10 transition-all"
                >
                  <device.icon className="w-8 h-8 text-swiss-red" />
                  <span className="text-white/80 text-xs font-medium">{device.label}</span>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Bottom info bar */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="relative z-10 flex flex-wrap justify-center lg:justify-start gap-6 mt-8 pt-8 border-t border-white/10"
          >
            {['2', '3', '4'].map((num) => (
              <div key={num} className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-swiss-red/20 flex items-center justify-center">
                  <span className="text-swiss-red font-bold text-sm">{num}</span>
                </div>
                <span className="text-white/60 text-xs">
                  {t('screenOption', { count: Number(num) })}
                </span>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
