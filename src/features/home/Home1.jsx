import React from 'react';
import {
  HeroSection,
  StatsSection,
  TopWritersSection,
  FeaturesSection,
  HowItWorksSection,
  CTABannerSection,
  GuaranteeSection,
  TrustedBySection,
  TestimonialsSection,
  SupportBannerSection,
  ServicesSection,
  HelpBannerSection,
  SupportSection,
  FAQSection,
} from '../../components/home-1';

const Home1 = () => {
  return (
    <main className="w-full min-h-screen bg-gray-50 flex flex-col">

      {/* 1. HERO */}
      <HeroSection />

      {/* 2. STATS */}
      <StatsSection />

      {/* 3. TOP WRITERS */}
      <TopWritersSection />

      {/* 4. FEATURES */}
      <FeaturesSection />
      <GuaranteeSection />

      {/* 5. HOW IT WORKS */}
      <HowItWorksSection />

      {/* 6. SERVICES */}
      <ServicesSection />

      {/* CTA SECTIONS */}
      <CTABannerSection />
      <HelpBannerSection />

      {/* REMAINING SECTIONS */}
      <TrustedBySection />
      <TestimonialsSection />
      <SupportBannerSection />
      <SupportSection />
      <FAQSection />

    </main>
  );
};

export default Home1;
