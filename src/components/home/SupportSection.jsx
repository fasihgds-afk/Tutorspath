import React from 'react';

const features = [
  {
    id: 1,
    title: '24/7 Live Support',
    description: 'Our support team is available around the clock to assist you at any time.',
    badge: '24/7',
    badgeLabel: 'Always Here to Help',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
      </svg>
    ),
  },
  {
    id: 2,
    title: '100% Confidentiality',
    description: 'Your personal information and sessions are kept completely secure with us.',
    badge: 'Secure',
    badgeLabel: 'Your Privacy Matters',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
  },
  {
    id: 3,
    title: 'Unlimited Revisions',
    description: 'We offer unlimited revisions until you are 100% satisfied with our tutoring.',
    badge: 'Free',
    badgeLabel: 'Your Satisfaction',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
      </svg>
    ),
  },
  {
    id: 4,
    title: '100% Satisfaction Guarantee',
    description: "Not happy? We'll make it right. Your success is 100% guaranteed.",
    badge: 'Top Rated',
    badgeLabel: 'Guaranteed Results',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
      </svg>
    ),
  },
];

const SupportSection = () => {
  return (
    <section className="w-full bg-surface-alt py-10 lg:py-14 px-4 sm:px-10 lg:px-16 xl:px-20">
      <div className="w-full max-w-[1040px] mx-auto flex flex-col items-center">

        {/* Top Badge */}
        <div className="inline-flex items-center gap-2 bg-primary-soft text-brand-purple px-4 py-1.5 rounded-full text-[12px] lg:text-[13px] font-semibold mb-4 shadow-xs border border-primary-border hover:scale-105 transition-transform duration-300 cursor-default">
          <svg className="w-4 h-4 shrink-0" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2l2.4 7.4h7.6l-6 4.6 2.3 7.4-6.3-4.6-6.3 4.6 2.3-7.4-6-4.6h7.6z" />
          </svg>
          <span>WE'VE GOT YOUR BACK</span>
        </div>

        {/* Heading */}
        <h2 className="text-[26px] sm:text-[32px] lg:text-[38px] font-bold text-text-dark text-center tracking-tight leading-tight max-w-[600px] mb-2.5">
          We Support{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-start to-brand-end">
            Your Success
          </span>
        </h2>

        {/* Subtitle */}
        <p className="text-[13px] sm:text-[14px] text-text-body text-center max-w-[480px] mb-10 font-medium opacity-70 leading-relaxed">
          Our dedicated support team and resources ensure a smooth experience from start to finish.
        </p>

        {/* Main Grid */}
        <div className="w-full bg-surface rounded-[20px] border border-card-border shadow-[0_4px_24px_rgba(0,0,0,0.03)] p-5 lg:p-8 mb-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">

            {/* Left: Feature Cards */}
            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {features.map((f) => (
                <div
                  key={f.id}
                  className="group bg-surface-alt rounded-[16px] p-5 border border-card-border shadow-sm flex flex-col justify-between hover:-translate-y-1 hover:shadow-md hover:border-primary-border transition-all duration-300"
                >
                  <div className="flex items-start gap-3 mb-4">
                    <div className="w-10 h-10 rounded-[12px] bg-primary-soft border border-primary-border flex items-center justify-center shrink-0 text-brand-purple group-hover:bg-primary group-hover:text-surface group-hover:scale-110 transition-all duration-300">
                      {f.icon}
                    </div>
                    <div>
                      <h3 className="text-text-dark font-bold text-[14px] mb-1 leading-tight">{f.title}</h3>
                      <p className="text-text-body text-[12px] leading-relaxed opacity-70">{f.description}</p>
                    </div>
                  </div>
                  <div className="pt-3 border-t border-card-border flex items-center justify-between">
                    <span className="text-[11px] text-brand-purple font-semibold">{f.badgeLabel}</span>
                    <span className="text-[10px] bg-primary-soft text-brand-purple border border-primary-border px-2 py-0.5 rounded font-bold">
                      {f.badge}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Right: Agent Illustration */}
         {/* Right: Agent Illustration */}
<div className="lg:col-span-5 flex justify-center items-center">
  <img
    src="/images/CTA-3.png"
    alt="Academic specialist"
    className="w-full max-w-[400px] h-auto object-contain"
  />
</div>

          </div>
        </div>

        {/* Bottom Contact Banner */}
        <div className="relative w-full bg-gradient-to-r from-brand-start to-brand-end rounded-[20px] px-6 sm:px-10 py-7 overflow-hidden shadow-[0_12px_40px_rgba(5,150,105,0.25)] hover:shadow-[0_20px_50px_rgba(5,150,105,0.35)] transition-shadow duration-300">

          {/* Dot pattern */}
          <div
            className="absolute inset-0 opacity-10 pointer-events-none"
            style={{ backgroundImage: 'radial-gradient(#fff 1.5px, transparent 1.5px)', backgroundSize: '24px 24px' }}
          />

          <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-6">

            {/* Left */}
            <div className="flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left">
              <div className="relative shrink-0">
                <div className="w-[56px] h-[56px] rounded-full bg-surface flex items-center justify-center shadow-md hover:scale-110 transition-transform duration-300">
                  <svg className="w-7 h-7 text-brand-purple" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z" />
                  </svg>
                </div>
                <div className="absolute bottom-0.5 right-0.5 w-4 h-4 bg-primary-200 border-2 border-brand-start rounded-full" />
              </div>
              <div>
                <h3 className="text-surface text-[18px] sm:text-[20px] font-extrabold tracking-tight leading-tight mb-1">
                  Have Questions? We're Here to Help!
                </h3>
                <p className="text-surface text-[13px] opacity-85">
                  Reach out to our support team anytime. We're just a click away.
                </p>
              </div>
            </div>

            {/* Right: Buttons + Trust */}
            <div className="flex flex-col items-center lg:items-end gap-3 w-full lg:w-auto">

              {/* Buttons */}
              <div className="flex flex-col sm:flex-row flex-wrap items-center justify-center gap-3 w-full sm:w-auto">
              

                <a href="tel:+442033185601"
                  className="group inline-flex items-center justify-center gap-2 bg-surface/15 hover:bg-surface/25 text-surface border border-surface/30 hover:border-surface/60 text-[13.5px] font-bold px-5 py-2.5 rounded-[12px] hover:scale-[1.03] active:scale-[0.97] transition-all duration-200 w-full sm:w-auto whitespace-nowrap">
                  <svg className="w-4 h-4 group-hover:scale-110 transition-transform duration-200" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  +92-329-5128671
                </a>

                <a href="mailto:care@@tutorspath.com"
                  className="group inline-flex items-center justify-center gap-2 bg-surface/15 hover:bg-surface/25 text-surface border border-surface/30 hover:border-surface/60 text-[13.5px] font-bold px-5 py-2.5 rounded-[12px] hover:scale-[1.03] active:scale-[0.97] transition-all duration-200 w-full sm:w-auto whitespace-nowrap">
                  <svg className="w-4 h-4 group-hover:scale-110 transition-transform duration-200" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  care@tutorspath.com
                </a>
              </div>

              {/* Trust meta */}
              <div className="flex flex-wrap items-center justify-center lg:justify-end gap-4 text-surface text-[12px] font-semibold opacity-90">
                <div className="flex items-center gap-1.5">
                  <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <circle cx="12" cy="12" r="10" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6l4 2" />
                  </svg>
                  Average Response: 2 Min
                </div>
                <div className="flex items-center gap-1.5">
                  <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                  100% Confidential
                </div>
                <div className="flex items-center gap-1.5">
                  <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <circle cx="12" cy="12" r="9" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4" />
                  </svg>
                  No Obligation
                </div>
              </div>

            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default SupportSection;
