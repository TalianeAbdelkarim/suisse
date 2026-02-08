'use client';

import { useState } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, Monitor, Users, Home, Building } from 'lucide-react';
import { PLANS } from '@/lib/constants';
import { formatPrice, getMonthlyPrice, getDiscount, cn } from '@/lib/utils';
import { Link } from '@/i18n/navigation';

const DEVICE_TABS = [
  { devices: 1, icon: Monitor },
  { devices: 2, icon: Users },
  { devices: 3, icon: Home },
  { devices: 4, icon: Building },
] as const;

export default function Pricing() {
  const t = useTranslations('pricing');
  const locale = useLocale();
  const [selectedDevices, setSelectedDevices] = useState(1);

  // Filter plans by selected device count and sort by duration
  const filteredPlans = PLANS
    .filter((p) => p.devices === selectedDevices)
    .sort((a, b) => a.duration - b.duration);

  // Mark the 12-month plan as the best value within each group
  const bestValueSlug = filteredPlans.find((p) => p.duration === 12)?.slug;

  return (
    <section id="pricing" className="py-20 lg:py-28 bg-bg">
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <h2 className="text-3xl sm:text-4xl font-extrabold text-text tracking-tight mb-3">
            {t('title')} <span className="text-swiss-red">{t('titleHighlight')}</span>
          </h2>
          <p className="text-text-secondary max-w-xl mx-auto">{t('subtitle')}</p>
        </motion.div>

        {/* Device selector tabs */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex justify-center mb-10"
        >
          <div className="inline-flex bg-white border border-border rounded-xl p-1.5 shadow-sm">
            {DEVICE_TABS.map((tab) => {
              const isActive = selectedDevices === tab.devices;
              const TabIcon = tab.icon;
              const tabKey = `screenTab${tab.devices}` as const;
              const descKey = `screenDesc${tab.devices}` as const;

              return (
                <button
                  key={tab.devices}
                  onClick={() => setSelectedDevices(tab.devices)}
                  className={cn(
                    'relative flex flex-col items-center px-4 sm:px-6 py-2.5 rounded-lg text-sm font-medium transition-all duration-200',
                    isActive
                      ? 'bg-swiss-red text-white shadow-md shadow-swiss-red/20'
                      : 'text-text-muted hover:text-text hover:bg-bg'
                  )}
                >
                  <div className="flex items-center gap-1.5 mb-0.5">
                    <TabIcon className="w-4 h-4" />
                    <span className="font-semibold text-xs sm:text-sm">{t(tabKey)}</span>
                  </div>
                  <span
                    className={cn(
                      'text-[10px] hidden sm:block',
                      isActive ? 'text-white/70' : 'text-text-muted'
                    )}
                  >
                    {t(descKey)}
                  </span>
                </button>
              );
            })}
          </div>
        </motion.div>

        {/* Plan cards grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedDevices}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25 }}
            className="grid md:grid-cols-3 gap-5 max-w-4xl mx-auto items-stretch"
          >
            {filteredPlans.map((plan, i) => {
              const name = locale === 'fr' ? plan.name_fr : plan.name_de;
              const discount = plan.original_price
                ? getDiscount(plan.original_price, plan.price)
                : 0;
              const isBestValue = plan.slug === bestValueSlug;
              const isPopular = plan.is_popular;
              const isHighlighted = isPopular || isBestValue;

              return (
                <motion.div
                  key={plan.id}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.08 }}
                  className={cn(
                    'relative rounded-xl p-6 flex flex-col',
                    isHighlighted
                      ? 'bg-swiss-red text-white ring-2 ring-swiss-red shadow-lg shadow-swiss-red/15 md:scale-[1.04]'
                      : 'bg-white border border-border'
                  )}
                >
                  {/* Tag */}
                  {isHighlighted && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                      <span className="px-3 py-1 bg-white text-swiss-red text-[11px] font-bold rounded-full uppercase tracking-wide shadow-sm whitespace-nowrap">
                        {isPopular ? t('popular') : t('bestValue')}
                      </span>
                    </div>
                  )}

                  <div className="mb-5">
                    <h3
                      className={cn(
                        'text-base font-bold mb-0.5',
                        isHighlighted ? 'text-white' : 'text-text'
                      )}
                    >
                      {name}
                    </h3>
                    <p
                      className={cn(
                        'text-xs',
                        isHighlighted ? 'text-white/70' : 'text-text-muted'
                      )}
                    >
                      {t('duration', { count: plan.duration })}
                    </p>
                  </div>

                  {/* Price */}
                  <div className="mb-5">
                    {/* Original price */}
                    {plan.original_price && (
                      <div className="mb-0.5">
                        <span
                          className={cn(
                            'text-sm line-through',
                            isHighlighted ? 'text-white/50' : 'text-text-muted'
                          )}
                        >
                          {formatPrice(plan.original_price)} CHF
                        </span>
                      </div>
                    )}
                    <div className="flex items-baseline gap-1.5">
                      <span
                        className={cn(
                          'text-4xl font-extrabold',
                          isHighlighted ? 'text-white' : 'text-text'
                        )}
                      >
                        {formatPrice(plan.price)}
                      </span>
                      <span
                        className={cn(
                          'text-sm font-medium',
                          isHighlighted ? 'text-white/70' : 'text-text-muted'
                        )}
                      >
                        CHF
                      </span>
                    </div>
                    <div className="flex items-center gap-2 mt-1">
                      <span
                        className={cn(
                          'text-xs',
                          isHighlighted ? 'text-white/60' : 'text-text-muted'
                        )}
                      >
                        {getMonthlyPrice(plan.price, plan.duration)} CHF{t('perMonth')}
                      </span>
                      {discount > 0 && (
                        <span
                          className={cn(
                            'text-[10px] font-bold px-1.5 py-0.5 rounded',
                            isHighlighted
                              ? 'bg-white/20 text-white'
                              : 'bg-success/10 text-success'
                          )}
                        >
                          -{discount}%
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Features */}
                  <ul className="space-y-2.5 mb-6 flex-grow">
                    {plan.features.map((f) => (
                      <li key={f} className="flex items-start gap-2.5">
                        <Check
                          className={cn(
                            'w-4 h-4 mt-0.5 shrink-0',
                            isHighlighted ? 'text-white/80' : 'text-swiss-red'
                          )}
                        />
                        <span
                          className={cn(
                            'text-sm',
                            isHighlighted ? 'text-white/90' : 'text-text-secondary'
                          )}
                        >
                          {t(`features.${f}`)}
                        </span>
                      </li>
                    ))}
                  </ul>

                  {/* CTA */}
                  <Link
                    href={`/plans/${plan.slug}`}
                    className={cn(
                      'block text-center py-3 rounded-lg font-semibold text-sm transition-colors',
                      isHighlighted
                        ? 'bg-white text-swiss-red hover:bg-white/90'
                        : 'bg-swiss-red text-white hover:bg-swiss-red-dark'
                    )}
                  >
                    {t('cta')}
                  </Link>
                </motion.div>
              );
            })}
          </motion.div>
        </AnimatePresence>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center text-sm text-text-muted mt-8"
        >
          🔒 {t('guarantee')}
        </motion.p>
      </div>
    </section>
  );
}
