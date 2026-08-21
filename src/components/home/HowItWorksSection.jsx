import React from 'react';

const steps = [
  {
    id: 1, title: 'Place Your Order',
    description: 'Share your requirements, upload files, and provide instructions.',
    icon: (
      <svg className="w-9 h-9" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m3.75 9v6m3-3H9m1.5-12H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
      </svg>
    ),
  },
  {
    id: 2, title: 'We Assign the Best Tutors',
    description: 'We match your guidelines with the most suitable expert in your subject.',
    icon: (
      <svg className="w-9 h-9" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.715m12 0a5.97 5.97 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
      </svg>
    ),
  },
  {
    id: 3, title: 'Tutoring in Progress',
    description: 'A dedicated tutor will connect with you until you grasp the concept.',
    icon: (
      <svg className="w-9 h-9" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385c.132.555-.47 1.016-.946.72l-4.735-2.84a.563.563 0 00-.586 0L6.982 20.54c-.476.297-1.078-.165-.946-.72l1.285-5.385a.562.562 0 00-.182-.557l-4.204-3.602c-.38-.325-.178-.948.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
      </svg>
    ),
  },
  {
    id: 4, title: 'Quality Check',
    description: 'Our quality assurance team reviews the tutoring session for accuracy and quality.',
    icon: (
      <svg className="w-9 h-9" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  }
];

const HowItWorksSection = () => {
  return (
    <section className="w-full bg-surface-alt py-10 px-4 sm:px-10 lg:px-16 xl:px-20" id="how-it-works">
      <div className="w-full max-w-[1040px] mx-auto flex flex-col items-center">

        {/* Pill Badge */}
        <div className="inline-flex items-center gap-1.5 bg-primary-soft text-brand-purple px-3.5 py-1 rounded-full text-[13px] font-semibold mb-4 shadow-xs border border-primary-border hover:scale-105 transition-transform duration-300 cursor-default">
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          OUR SIMPLE PROCESS
        </div>

        {/* Heading */}
        <h2 className="text-[26px] sm:text-[34px] lg:text-[38px] font-bold text-text-dark text-center tracking-tight leading-snug max-w-[800px] mb-2.5">
          How It{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-start to-brand-end">Works</span>
        </h2>

        <p className="text-[14px] sm:text-[15px] text-text-body text-center max-w-[500px] mb-10 font-medium opacity-70">
          Get high-quality academic content in just 5 easy steps.
        </p>

        <div className="relative w-full">
          {/* Dashed connector — desktop only */}
          <div className="hidden lg:block absolute top-[44px] left-[12%] right-[12%] h-[2px] border-t-2 border-dashed border-primary-border z-0" />

          {/* Mobile: vertical cards */}
          <div className="flex flex-col gap-4 lg:hidden">
            {steps.map((step) => (
              <div key={step.id}
                className="group flex items-start gap-4 bg-surface rounded-2xl border border-card-border shadow-sm px-4 py-4 hover:-translate-y-1 hover:shadow-md transition-all duration-300">
                <div className="relative shrink-0">
                  <span className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-primary text-surface text-[10px] font-bold flex items-center justify-center shadow-sm z-10">
                    {step.id}
                  </span>
                  <div className="w-[60px] h-[60px] rounded-full bg-surface-alt border border-card-border flex items-center justify-center text-brand-purple group-hover:bg-primary group-hover:text-surface group-hover:scale-110 transition-all duration-300">
                    {step.icon}
                  </div>
                </div>
                <div className="flex flex-col justify-center pt-1">
                  <h3 className="text-[14px] font-bold text-text-dark leading-snug">{step.title}</h3>
                  <p className="text-text-body text-[12px] leading-relaxed mt-1 opacity-70">{step.description}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Desktop: 4-col grid */}
          <div className="hidden lg:grid grid-cols-4 gap-8 relative z-10">
            {steps.map((step) => (
              <div key={step.id}
                className="group flex flex-col items-center text-center hover:-translate-y-2 transition-transform duration-300 cursor-default">
                <div className="relative mb-5">
                  <span className="absolute -top-2 -right-1 w-6 h-6 rounded-full bg-brand-purple text-white text-[11px] font-bold flex items-center justify-center shadow-sm z-10">
                    {step.id}
                  </span>
                  <div className="w-[84px] h-[84px] rounded-full bg-surface shadow-[0_4px_20px_rgba(0,0,0,0.08)] border border-card-border flex items-center justify-center text-brand-purple group-hover:bg-primary group-hover:text-surface group-hover:shadow-[0_8px_30px_rgba(5,150,105,0.3)] transition-all duration-300">
                    {step.icon}
                  </div>
                </div>
                <h3 className="text-[15px] font-bold text-text-dark mb-1.5 leading-snug">{step.title}</h3>
                <p className="text-text-body text-[12px] leading-relaxed max-w-[180px] opacity-70">{step.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Button */}
        <div className="mt-10 w-full flex justify-center">
          <a href="#"
            className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-brand-start to-brand-end text-surface font-semibold text-[14px] py-3 px-8 rounded-[12px] shadow-[0_4px_16px_rgba(5,150,105,0.3)] hover:scale-[1.04] hover:shadow-[0_8px_28px_rgba(5,150,105,0.4)] active:scale-[0.97] transition-all duration-200 w-full max-w-xs lg:w-auto">
            Get Started Now <span className="text-base leading-none">&rarr;</span>
          </a>
        </div>

      </div>
    </section>
  );
};

export default HowItWorksSection;
