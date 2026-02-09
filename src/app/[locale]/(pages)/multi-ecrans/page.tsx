'use client';

import { useState } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Check,
  Monitor,
  Users,
  Home,
  ArrowRight,
  Tv,
  Film,
  Headphones,
  Clock,
  Shield,
  Zap,
  Star,
  ChevronDown,
} from 'lucide-react';
import { PLANS } from '@/lib/constants';
import { formatPrice, getMonthlyPrice, getDiscount, cn } from '@/lib/utils';
import { Link } from '@/i18n/navigation';
import LeadForm from '@/components/ui/LeadForm';

// ─── FAQ Accordion ─────────────────────────────────────────
function FAQItem({
  question,
  answer,
  isOpen,
  onClick,
}: {
  question: string;
  answer: string;
  isOpen: boolean;
  onClick: () => void;
}) {
  return (
    <div className="bg-white rounded-xl border border-border overflow-hidden transition-all duration-300 hover:border-swiss-red/20">
      <button
        onClick={onClick}
        className="w-full text-left p-5 font-medium flex justify-between items-center"
      >
        <span className={`text-sm sm:text-base transition-colors ${isOpen ? 'text-swiss-red' : 'text-text'}`}>
          {question}
        </span>
        <ChevronDown
          className={`w-5 h-5 text-swiss-red transition-transform duration-300 shrink-0 ml-4 ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="px-5 pb-5 pt-0 text-sm text-text-secondary leading-relaxed border-t border-border/50 bg-bg">
              <div className="pt-4">{answer}</div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ─── Device Tab Data ───────────────────────────────────────
const DEVICE_TABS = [
  { devices: 2, icon: Users },
  { devices: 3, icon: Home },
  { devices: 4, icon: Monitor },
] as const;

const DURATION_OPTIONS = [3, 6, 12] as const;

// ─── Main Page ─────────────────────────────────────────────
export default function MultiEcransPage() {
  const t = useTranslations('multiEcrans');
  const pt = useTranslations('pricing');
  const locale = useLocale();
  const [selectedDevices, setSelectedDevices] = useState(2);
  const [selectedDuration, setSelectedDuration] = useState<number>(12);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [isLeadFormOpen, setIsLeadFormOpen] = useState(false);
  const [selectedPlanForForm, setSelectedPlanForForm] = useState<{ id: string; name: string } | null>(null);

  // Get all multi-device plans for current selection
  const filteredPlans = PLANS.filter((p) => p.devices === selectedDevices);
  const selectedPlan = filteredPlans.find((p) => p.duration === selectedDuration);

  // All multi-screen plans for the comparison table
  const allMultiPlans = PLANS.filter((p) => p.devices > 1);

  const openLeadForm = (planId: string, planName: string) => {
    setSelectedPlanForForm({ id: planId, name: planName });
    setIsLeadFormOpen(true);
  };

  const features = [
    { icon: Tv, title: t('feat1Title'), desc: t('feat1Desc') },
    { icon: Film, title: t('feat2Title'), desc: t('feat2Desc') },
    { icon: Headphones, title: t('feat3Title'), desc: t('feat3Desc') },
  ];

  const faqs = [
    { q: t('faq1Q'), a: t('faq1A') },
    { q: t('faq2Q'), a: t('faq2A') },
    { q: t('faq3Q'), a: t('faq3A') },
  ];

  return (
    <>
      {/* ═══════════════════════════════════════════════════════
          1. HERO
      ═══════════════════════════════════════════════════════ */}
      <section className="pt-28 pb-16 bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 relative overflow-hidden">
        {/* Decorative blurs */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-swiss-red/10 rounded-full blur-[150px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-swiss-red/5 rounded-full blur-[120px] pointer-events-none" />

        <div className="max-w-6xl mx-auto px-5 sm:px-8 relative z-10">
          <Link
            href="/#pricing"
            className="inline-flex items-center gap-1.5 text-sm text-gray-400 hover:text-white transition-colors mb-8"
          >
            ← {t('backToPlans')}
          </Link>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-swiss-red/20 rounded-full border border-swiss-red/30 mb-6">
              <div className="w-2 h-2 rounded-full bg-swiss-red animate-pulse" />
              <span className="text-xs font-semibold text-swiss-red uppercase tracking-wide">
                {t('badge')}
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white leading-tight tracking-tight mb-4">
              {t('heroTitle')} <span className="text-swiss-red">{t('heroTitleHighlight')}</span>
            </h1>
            <p className="text-gray-400 text-base sm:text-lg max-w-2xl mx-auto mb-10">
              {t('heroSubtitle')}
            </p>

            {/* Trust indicators */}
            <div className="flex flex-wrap justify-center gap-6 sm:gap-8">
              {[
                { icon: Shield, text: t('trustGuarantee') },
                { icon: Zap, text: t('trustActivation') },
                { icon: Headphones, text: t('trustSupport') },
              ].map((item) => (
                <div key={item.text} className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-swiss-red/20 flex items-center justify-center">
                    <item.icon className="w-4 h-4 text-swiss-red" />
                  </div>
                  <span className="text-sm text-gray-300">{item.text}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          2. FEATURES INTRO
      ═══════════════════════════════════════════════════════ */}
      <section className="py-16 bg-white">
        <div className="max-w-5xl mx-auto px-5 sm:px-8">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-2xl sm:text-3xl font-extrabold text-text mb-3">
              {t('featuresTitle')} <span className="text-swiss-red">{t('featuresTitleHighlight')}</span>
            </h2>
            <p className="text-text-secondary max-w-2xl mx-auto">{t('featuresSubtitle')}</p>
          </motion.div>

          <div className="grid sm:grid-cols-3 gap-6">
            {features.map((feat, i) => (
              <motion.div
                key={feat.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-bg rounded-xl border border-border p-6 text-center hover:border-swiss-red/20 hover:-translate-y-1 transition-all duration-300"
              >
                <div className="w-14 h-14 rounded-full bg-swiss-red/8 flex items-center justify-center mx-auto mb-4">
                  <feat.icon className="w-6 h-6 text-swiss-red" />
                </div>
                <h3 className="text-base font-bold text-text mb-2">{feat.title}</h3>
                <p className="text-sm text-text-secondary leading-relaxed">{feat.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          3. PLAN SELECTOR (Device Tabs + Duration Selector)
      ═══════════════════════════════════════════════════════ */}
      <section id="plans" className="py-16 bg-bg">
        <div className="max-w-5xl mx-auto px-5 sm:px-8">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-10"
          >
            <h2 className="text-2xl sm:text-3xl font-extrabold text-text mb-3">
              {t('pricingTitle')} <span className="text-swiss-red">{t('pricingTitleHighlight')}</span>
            </h2>
            <p className="text-text-secondary max-w-xl mx-auto">{t('pricingSubtitle')}</p>
          </motion.div>

          {/* Device count tabs */}
          <div className="flex justify-center mb-8">
            <div className="inline-flex bg-white border border-border rounded-xl p-1.5 shadow-sm">
              {DEVICE_TABS.map((tab) => {
                const isActive = selectedDevices === tab.devices;
                const TabIcon = tab.icon;

                return (
                  <button
                    key={tab.devices}
                    onClick={() => setSelectedDevices(tab.devices)}
                    className={cn(
                      'relative flex items-center gap-2 px-5 sm:px-8 py-3 rounded-lg text-sm font-semibold transition-all duration-200',
                      isActive
                        ? 'bg-swiss-red text-white shadow-md shadow-swiss-red/20'
                        : 'text-text-muted hover:text-text hover:bg-bg'
                    )}
                  >
                    <TabIcon className="w-4 h-4" />
                    <span>{t(`tab${tab.devices}`)}</span>
                    {tab.devices === 3 && (
                      <span
                        className={cn(
                          'text-[10px] px-1.5 py-0.5 rounded font-bold uppercase',
                          isActive ? 'bg-white/20 text-white' : 'bg-swiss-red/10 text-swiss-red'
                        )}
                      >
                        {t('tabPopular')}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Duration selector */}
          <div className="flex justify-center mb-10">
            <div className="inline-flex bg-white border border-border rounded-lg p-1 shadow-sm">
              {DURATION_OPTIONS.map((dur) => {
                const isActive = selectedDuration === dur;
                return (
                  <button
                    key={dur}
                    onClick={() => setSelectedDuration(dur)}
                    className={cn(
                      'relative px-5 sm:px-6 py-2 rounded-md text-sm font-medium transition-all duration-200',
                      isActive
                        ? 'bg-text text-white shadow-sm'
                        : 'text-text-muted hover:text-text'
                    )}
                  >
                    {dur} {t('months')}
                    {dur === 12 && (
                      <span
                        className={cn(
                          'absolute -top-2 -right-2 text-[9px] px-1.5 py-0.5 rounded font-bold',
                          isActive ? 'bg-swiss-red text-white' : 'bg-success/10 text-success'
                        )}
                      >
                        {t('bestPrice')}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Selected plan card */}
          <AnimatePresence mode="wait">
            {selectedPlan && (
              <motion.div
                key={`${selectedDevices}-${selectedDuration}`}
                initial={{ opacity: 0, y: 16, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -16, scale: 0.98 }}
                transition={{ duration: 0.3 }}
                className="max-w-lg mx-auto"
              >
                <div className="bg-white rounded-2xl border-2 border-swiss-red shadow-xl shadow-swiss-red/10 overflow-hidden">
                  {/* Card header */}
                  <div className="bg-swiss-red px-6 py-4 text-center">
                    <h3 className="text-white font-bold text-lg">
                      {locale === 'fr' ? selectedPlan.name_fr : selectedPlan.name_de}
                    </h3>
                    <p className="text-white/70 text-sm">
                      {selectedPlan.devices} {t('simultaneousScreens')}
                    </p>
                  </div>

                  {/* Card body */}
                  <div className="p-6 sm:p-8">
                    {/* Price */}
                    <div className="text-center mb-6">
                      {selectedPlan.original_price && (
                        <div className="text-text-muted line-through text-base mb-1">
                          {formatPrice(selectedPlan.original_price)} CHF
                        </div>
                      )}
                      <div className="flex items-baseline justify-center gap-2">
                        <span className="text-5xl font-extrabold text-text">
                          {formatPrice(selectedPlan.price)}
                        </span>
                        <span className="text-lg font-bold text-text-muted">CHF</span>
                      </div>
                      <div className="flex items-center justify-center gap-3 mt-2">
                        <span className="text-sm text-text-muted">
                          {getMonthlyPrice(selectedPlan.price, selectedPlan.duration)} CHF{pt('perMonth')}
                        </span>
                        {selectedPlan.original_price && (
                          <span className="bg-success/10 text-success text-xs font-bold px-2 py-0.5 rounded">
                            -{getDiscount(selectedPlan.original_price, selectedPlan.price)}%
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Features */}
                    <ul className="space-y-3 mb-8">
                      <li className="flex items-center gap-3">
                        <div className="w-6 h-6 rounded-full bg-swiss-red/10 flex items-center justify-center shrink-0">
                          <Check className="w-3.5 h-3.5 text-swiss-red" />
                        </div>
                        <span className="text-sm text-text font-medium">
                          {selectedPlan.devices} {t('simultaneousScreens')}
                        </span>
                      </li>
                      {selectedPlan.features.map((f) => (
                        <li key={f} className="flex items-center gap-3">
                          <div className="w-6 h-6 rounded-full bg-swiss-red/10 flex items-center justify-center shrink-0">
                            <Check className="w-3.5 h-3.5 text-swiss-red" />
                          </div>
                          <span className="text-sm text-text-secondary">{pt(`features.${f}`)}</span>
                        </li>
                      ))}
                    </ul>

                    {/* CTA buttons */}
                    <div className="space-y-3">
                      <button
                        onClick={() =>
                          openLeadForm(
                            selectedPlan.id,
                            locale === 'fr' ? selectedPlan.name_fr : selectedPlan.name_de
                          )
                        }
                        className="w-full py-3.5 bg-swiss-red text-white font-bold text-sm rounded-lg hover:bg-swiss-red-dark transition-colors shadow-lg shadow-swiss-red/20"
                      >
                        {t('choosePlan')}
                      </button>
                      <Link
                        href={`/plans/${selectedPlan.slug}`}
                        className="block w-full py-3 text-center text-swiss-red font-semibold text-sm rounded-lg border border-swiss-red/20 hover:bg-swiss-red/5 transition-colors"
                      >
                        {t('viewDetails')} →
                      </Link>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          4. ALL PLANS COMPARISON TABLE
      ═══════════════════════════════════════════════════════ */}
      <section className="py-16 bg-white">
        <div className="max-w-5xl mx-auto px-5 sm:px-8">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-10"
          >
            <h2 className="text-2xl sm:text-3xl font-extrabold text-text mb-3">
              {t('allPlansTitle')}
            </h2>
            <p className="text-text-secondary">{t('allPlansSubtitle')}</p>
          </motion.div>

          {/* Responsive table */}
          <div className="overflow-x-auto rounded-xl border border-border">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-bg border-b border-border">
                  <th className="text-left py-3 px-4 font-semibold text-text">{t('tablePlan')}</th>
                  <th className="text-center py-3 px-4 font-semibold text-text">{t('tableScreens')}</th>
                  <th className="text-center py-3 px-4 font-semibold text-text">{t('tableDuration')}</th>
                  <th className="text-center py-3 px-4 font-semibold text-text">{t('tablePrice')}</th>
                  <th className="text-center py-3 px-4 font-semibold text-text">{t('tableMonthly')}</th>
                  <th className="py-3 px-4"></th>
                </tr>
              </thead>
              <tbody>
                {allMultiPlans.map((plan) => {
                  const name = locale === 'fr' ? plan.name_fr : plan.name_de;
                  return (
                    <tr key={plan.id} className="border-b border-border/50 hover:bg-bg/50 transition-colors">
                      <td className="py-3 px-4 font-medium text-text whitespace-nowrap">{name}</td>
                      <td className="py-3 px-4 text-center">
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-blue-50 rounded text-xs font-semibold text-blue-700">
                          <Monitor className="w-3 h-3" />
                          {plan.devices}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-center text-text-secondary">{plan.duration} {t('months')}</td>
                      <td className="py-3 px-4 text-center font-bold text-text">{formatPrice(plan.price)} CHF</td>
                      <td className="py-3 px-4 text-center text-text-muted">
                        {getMonthlyPrice(plan.price, plan.duration)} CHF
                      </td>
                      <td className="py-3 px-4 text-center">
                        <Link
                          href={`/plans/${plan.slug}`}
                          className="inline-flex items-center gap-1 px-3 py-1.5 bg-swiss-red text-white text-xs font-semibold rounded-md hover:bg-swiss-red-dark transition-colors"
                        >
                          {t('tableSelect')}
                          <ArrowRight className="w-3 h-3" />
                        </Link>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          5. FAQ
      ═══════════════════════════════════════════════════════ */}
      <section className="py-16 bg-bg">
        <div className="max-w-3xl mx-auto px-5 sm:px-8">
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-text mb-3">
              {t('faqTitle')} <span className="text-swiss-red">{t('faqTitleHighlight')}</span>
            </h2>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <FAQItem
                key={i}
                question={faq.q}
                answer={faq.a}
                isOpen={openFaq === i}
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          6. INSTALLATION CTA
      ═══════════════════════════════════════════════════════ */}
      <section className="py-16 bg-white">
        <div className="max-w-3xl mx-auto px-5 sm:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-bg rounded-2xl border border-border p-8 sm:p-12"
          >
            <div className="w-16 h-16 rounded-full bg-swiss-red/8 flex items-center justify-center mx-auto mb-6">
              <Star className="w-7 h-7 text-swiss-red" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-text mb-3">
              {t('ctaTitle')}
            </h2>
            <p className="text-text-secondary mb-8 max-w-lg mx-auto">
              {t('ctaDescription')}
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-3">
              <Link
                href="/installation"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-bg border border-border text-text font-semibold rounded-lg text-sm hover:border-swiss-red/20 transition-colors"
              >
                <Clock className="w-4 h-4 text-swiss-red" />
                {t('ctaInstallation')}
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-swiss-red text-white font-semibold rounded-lg text-sm hover:bg-swiss-red-dark transition-colors"
              >
                <Headphones className="w-4 h-4" />
                {t('ctaContact')}
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Lead Form Modal */}
      {selectedPlanForForm && (
        <LeadForm
          planId={selectedPlanForForm.id}
          planName={selectedPlanForForm.name}
          isOpen={isLeadFormOpen}
          onClose={() => setIsLeadFormOpen(false)}
        />
      )}
    </>
  );
}
