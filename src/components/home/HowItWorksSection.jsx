import React from 'react';
import { Link } from 'react-router-dom';
import { SITE_CONFIG } from '../../config/siteConfig';

const steps = [
  {
    id: 1,
    title: 'Place Your Order',
    description:
      'Share your requirements, upload files, and provide instructions.',
    icon: (
      <svg
        className="w-8 h-8"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m3.75 9v6m3-3H9m1.5-12H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
        />
      </svg>
    ),
  },

  {
    id: 2,
    title: 'We Assign the Best Writer',
    description:
      'We match your order with the most suitable expert in your subject.',
    icon: (
      <svg
        className="w-8 h-8"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.715m12 0a5.97 5.97 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z"
        />
      </svg>
    ),
  },

  {
    id: 3,
    title: 'Writing in Progress',
    description:
      'Your writer researches, writes, and follows all your instructions.',
    icon: (
      <svg
        className="w-8 h-8"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
        />
      </svg>
    ),
  },

  {
    id: 4,
    title: 'Quality Check',
    description:
      'Our quality assurance team reviews the paper for accuracy and quality.',
    icon: (
      <svg
        className="w-8 h-8"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    ),
  },

  {
    id: 5,
    title: 'On-Time Delivery',
    description:
      'Receive your completed paper on time and review with confidence.',
    icon: (
      <svg
        className="w-8 h-8"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M3 16.5V6.75A2.25 2.25 0 015.25 4.5h10.5A2.25 2.25 0 0118 6.75v3.75m-15 6h15m-15 0l3-3m-3 3l3 3m15-6.75h1.5a1.5 1.5 0 011.5 1.5v3.75a1.5 1.5 0 01-1.5 1.5H18m0 0a3 3 0 11-6 0m6 0a3 3 0 11-6 0m-3-9h6m-3-3v6"
        />
      </svg>
    ),
  },
];

const HowItWorksSection = () => {
  return (
    <section className="w-full bg-surface-alt py-10 px-4 sm:px-6 lg:px-8 xl:px-12" id="how-it-works">
      <div className="w-full max-w-7xl mx-auto flex flex-col items-center">

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
          Get high-quality writing in just 5 easy steps.
        </p>

        <div className="relative w-full">
          {/* Dashed connector line — desktop only */}
          <div className="hidden lg:block absolute top-[38px] left-[10%] right-[10%] h-[2px] border-t-2 border-dashed border-primary-border z-0" />

          {/* Mobile: vertical cards */}
          <div className="flex flex-col gap-3.5 lg:hidden">
            {steps.map((step) => (
              <div
                key={step.id}
                className="group flex items-start gap-3.5 bg-surface rounded-2xl border border-card-border shadow-xs px-4 py-3.5 hover:-translate-y-0.5 hover:shadow-sm transition-all duration-300"
              >
                <div className="relative shrink-0">
                  <span className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-primary text-white text-[10px] font-bold flex items-center justify-center shadow-xs z-10">
                    {step.id}
                  </span>
                  <div className="w-[52px] h-[52px] rounded-full bg-surface-alt border border-card-border flex items-center justify-center text-brand-purple group-hover:bg-primary group-hover:text-white group-hover:scale-105 transition-all duration-300">
                    {step.icon}
                  </div>
                </div>
                <div className="flex flex-col justify-center pt-0.5">
                  <h3 className="text-[14px] font-bold text-text-dark leading-snug">{step.title}</h3>
                  <p className="text-text-body text-[12px] leading-relaxed mt-0.5 opacity-70">{step.description}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Desktop: all 5 steps in 1 row (grid-cols-5) */}
          <div className="hidden lg:grid grid-cols-5 gap-4 xl:gap-6 relative z-10">
            {steps.map((step) => (
              <div
                key={step.id}
                className="group flex flex-col items-center text-center hover:-translate-y-1.5 transition-transform duration-300 cursor-default px-1"
              >
                <div className="relative mb-4">
                  <span className="absolute -top-1.5 -right-1 w-6 h-6 rounded-full bg-brand-purple text-white text-[11px] font-bold flex items-center justify-center shadow-xs z-10">
                    {step.id}
                  </span>
                  <div className="w-[76px] h-[76px] rounded-full bg-surface shadow-[0_4px_18px_rgba(0,0,0,0.06)] border border-card-border flex items-center justify-center text-brand-purple group-hover:bg-primary group-hover:text-white group-hover:shadow-[0_6px_24px_rgba(5,150,105,0.3)] transition-all duration-300">
                    {step.icon}
                  </div>
                </div>
                <h3 className="text-[14.5px] font-bold text-text-dark mb-1 leading-snug">{step.title}</h3>
                <p className="text-text-body text-[12px] leading-relaxed opacity-70">{step.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Button */}
        <div className="mt-10 w-full flex justify-center">
          <Link
            to={SITE_CONFIG.routes.register}
            className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-brand-start to-brand-end text-white font-semibold text-[14px] py-3 px-8 rounded-xl shadow-[0_4px_16px_rgba(5,150,105,0.3)] hover:scale-[1.03] hover:shadow-[0_8px_28px_rgba(5,150,105,0.4)] active:scale-[0.97] transition-all duration-200 w-full max-w-xs lg:w-auto"
          >
            Get Started Now <span className="text-base leading-none">&rarr;</span>
          </Link>
        </div>

      </div>
    </section>
  );
};

export default HowItWorksSection;
