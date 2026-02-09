'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { Monitor, ArrowRight, Users, Tv, Smartphone, Laptop, Tablet } from 'lucide-react';
import { Link } from '@/i18n/navigation';
import Image from 'next/image';

export default function MultiScreenBanner() {
  const t = useTranslations('multiScreenBanner');

  const screenOptions = [
    { num: 2, icon: Monitor, fromPrice: '53.99' },
    { num: 3, icon: Tv, fromPrice: '80.99' },
    { num: 4, icon: Laptop, fromPrice: '107.99' },
  ];

  return (
    <section className="py-20 bg-white relative overflow-hidden">
      {/* Background accent */}
      <div className="absolute -top-40 -right-40 w-[500px] h-[500px] bg-swiss-red/[0.03] rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative rounded-2xl overflow-hidden"
        >
          {/* Dark premium card */}
          <div className="bg-gradient-to-br from-[#1a0a0a] via-[#2d0f0f] to-[#1a0a0a] rounded-2xl p-8 sm:p-10 lg:p-14 relative overflow-hidden">
            {/* Subtle pattern overlay */}
            <div className="absolute inset-0 opacity-[0.04]" style={{
              backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)',
              backgroundSize: '40px 40px',
            }} />

            {/* Red glow accent */}
            <div className="absolute -top-20 -right-20 w-80 h-80 bg-swiss-red/20 rounded-full blur-[100px] pointer-events-none" />
            <div className="absolute -bottom-20 -left-20 w-60 h-60 bg-swiss-red/10 rounded-full blur-[80px] pointer-events-none" />

            <div className="relative z-10 flex flex-col lg:flex-row items-center gap-10 lg:gap-14">
              {/* Left: Image + Visual */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="flex-1 w-full lg:w-auto"
              >
                {/* Badge */}
                <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/10 backdrop-blur-sm rounded-full border border-white/10 mb-6">
                  <Users className="w-3.5 h-3.5 text-swiss-red" />
                  <span className="text-xs font-semibold text-white/90 uppercase tracking-wider">
                    {t('badge')}
                  </span>
                </div>

                {/* Title */}
                <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-extrabold text-white tracking-tight leading-[1.1] mb-4">
                  {t('title')}{' '}
                  <span className="text-swiss-red">{t('titleHighlight')}</span>
                </h2>

                {/* Description */}
                <p className="text-white/60 text-sm sm:text-base leading-relaxed max-w-lg mb-8">
                  {t('description')}
                </p>

                {/* Device icons row */}
                <div className="flex items-center gap-3 mb-8">
                  {[
                    { icon: Tv, label: 'Smart TV' },
                    { icon: Smartphone, label: 'Mobile' },
                    { icon: Tablet, label: 'Tablet' },
                    { icon: Laptop, label: 'PC' },
                  ].map(({ icon: Icon, label }) => (
                    <div key={label} className="flex flex-col items-center gap-1.5">
                      <div className="w-10 h-10 rounded-lg bg-white/[0.08] border border-white/[0.08] flex items-center justify-center hover:bg-white/[0.12] transition-colors">
                        <Icon className="w-4.5 h-4.5 text-white/70" />
                      </div>
                      <span className="text-[10px] text-white/40 font-medium">{label}</span>
                    </div>
                  ))}
                </div>

                {/* CTA */}
                <Link
                  href="/multi-ecrans"
                  className="inline-flex items-center gap-2.5 px-7 py-3.5 bg-swiss-red text-white font-semibold text-sm rounded-xl hover:bg-swiss-red-dark transition-all hover:shadow-lg hover:shadow-swiss-red/25 group"
                >
                  {t('cta')}
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                </Link>
              </motion.div>

              {/* Right: Screen count cards */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="flex flex-row lg:flex-col gap-3 sm:gap-4 shrink-0 w-full lg:w-auto"
              >
                {screenOptions.map(({ num, icon: Icon, fromPrice }, i) => (
                  <Link
                    key={num}
                    href="/multi-ecrans"
                    className="flex-1 lg:flex-initial"
                  >
                    <motion.div
                      initial={{ opacity: 0, y: 12 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.25 + i * 0.08 }}
                      className="group relative flex flex-col sm:flex-row items-center gap-3 sm:gap-4 p-4 sm:p-5 bg-white/[0.06] backdrop-blur-sm rounded-xl border border-white/[0.08] hover:bg-white/[0.10] hover:border-swiss-red/30 transition-all duration-300 cursor-pointer"
                    >
                      {/* Icon */}
                      <div className="w-12 h-12 rounded-xl bg-swiss-red/15 flex items-center justify-center shrink-0 group-hover:bg-swiss-red/25 transition-colors">
                        <Icon className="w-5 h-5 text-swiss-red" />
                      </div>

                      {/* Text */}
                      <div className="text-center sm:text-left flex-1">
                        <div className="flex items-baseline gap-1.5 justify-center sm:justify-start">
                          <span className="text-2xl font-extrabold text-white">{num}</span>
                          <span className="text-sm font-medium text-white/50">
                            {t('screenOption', { count: num })}
                          </span>
                        </div>
                        <div className="text-xs text-white/40 mt-0.5">
                          dès <span className="text-swiss-red font-semibold">{fromPrice} CHF</span>
                        </div>
                      </div>

                      {/* Arrow */}
                      <ArrowRight className="w-4 h-4 text-white/20 group-hover:text-swiss-red shrink-0 hidden sm:block transition-colors" />
                    </motion.div>
                  </Link>
                ))}

                {/* Family benefit note */}
                <div className="hidden lg:flex items-center gap-2 px-4 py-3 rounded-lg bg-white/[0.04] border border-white/[0.06] mt-1">
                  <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse shrink-0" />
                  <span className="text-[11px] text-white/40 leading-tight">
                    {t('familyNote')}
                  </span>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
