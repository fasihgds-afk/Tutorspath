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
} from '../../components/home';

const Home = () => {
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

      {/* 5. HOW IT WORKS */}
      <HowItWorksSection />

      {/* 6. SERVICES */}
      <ServicesSection />

      {/* 7. CTA BANNER */}
      <CTABannerSection />

      {/* 8. GUARANTEE */}
      <GuaranteeSection />

      {/* 9. TRUSTED BY */}
      <TrustedBySection />

      {/* 10. TESTIMONIALS */}
      <TestimonialsSection />

      {/* 11. SUPPORT BANNER */}
      <SupportBannerSection />

      {/* 12. HELP BANNER */}
      <HelpBannerSection />

      {/* 13. SUPPORT (Features + Contact Bar) */}
      <SupportSection />

      {/* 14. FAQ */}
      <FAQSection />

    </main>
  );
};

export default Home;
