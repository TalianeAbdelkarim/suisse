import { setRequestLocale } from 'next-intl/server';
import Hero from '@/components/sections/Hero';
import Features from '@/components/sections/Features';
import WhyUs from '@/components/sections/WhyUs';
import Pricing from '@/components/sections/Pricing';
import Testimonials from '@/components/sections/Testimonials';
import FAQ from '@/components/sections/FAQ';
import CTA from '@/components/sections/CTA';
import JsonLd from '@/components/sections/JsonLd';

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function HomePage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <JsonLd locale={locale} />
      <Hero />
      <Features />
      <WhyUs />
      <Pricing />
      <Testimonials />
      <FAQ />
      <CTA />
    </>
  );
}
