import React from 'react';

const FeaturesSection = () => {
  const features = [
    {
      id: 1,
      title: 'Expert Tutors',
      description: 'Advanced degree holders with subject-matter expertise and years of academic tutoring experience.',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385c.132.555-.47 1.016-.946.72l-4.735-2.84a.563.563 0 00-.586 0L6.982 20.54c-.476.297-1.078-.165-.946-.72l1.285-5.385a.562.562 0 00-.182-.557l-4.204-3.602c-.38-.325-.178-.948.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
        </svg>
      ),
    },
    {
      id: 2,
      title: '100% Personalized & Results-Focused',
      description: 'Every session is tailored to your goals and learning needs to help you truly understand and excel.',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
        </svg>
      ),
    },
    {
      id: 3,
      title: 'Personalized Learning Always',
      description: 'We value your time. Get focused, engaging tutoring tailored to your learning needs, every time.',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
    },
    {
      id: 4,
      title: 'Personalized Support',
      description: 'Your progress is our priority. Get personalized guidance, feedback, and support tailored to your learning goals.',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
        </svg>
      ),
    },
    {
      id: 5,
      title: 'Secure & Confidential',
      description: 'Your personal information and live sessions are 100% secure and confidential.',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
        </svg>
      ),
    },
    {
      id: 6,
      title: '24/7 Live Support',
      description: 'Friendly customer support available around the clock to assist you with any questions.',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M19.114 5.636a9 9 0 010 12.728M16.463 8.288a5.25 5.25 0 010 7.424M6.75 8.25l4.72-4.72a.75.75 0 011.28.53v15.88a.75.75 0 01-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.009 9.009 0 012.25 12c0-.83.112-1.633.322-2.396C2.806 8.758 3.63 8.25 4.51 8.25H6.75z" />
        </svg>
      ),
    },
  ];

  return (
    <section className="w-full bg-[#f8f9fc] py-14 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Subtle background decoration */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-brand-purple/5 to-transparent rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-gradient-to-tr from-primary/5 to-transparent rounded-full blur-3xl translate-y-1/2 -translate-x-1/3 pointer-events-none"></div>

      <div className="w-full max-w-7xl mx-auto flex flex-col items-center relative z-10">

        {/* Top Pill Badge - Enhanced */}
        <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm text-brand-purple px-4 py-1.5 rounded-full text-[13px] font-semibold mb-4 shadow-sm border border-primary-border/60">
          <span className="w-4 h-4 rounded-full bg-gradient-to-br from-brand-purple to-primary flex items-center justify-center text-white text-[10px]">
            <svg className="w-2.5 h-2.5" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </span>
          WHY CHOOSE TUTORSPATH
        </div>

        {/* Main Heading - Enhanced with subtle underline */}
        <div className="relative mb-2.5">
          <h2 className="text-[28px] sm:text-[34px] lg:text-[38px] font-bold text-gray-900 text-center tracking-tight leading-snug max-w-[800px]">
            What{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-purple to-primary">
              Sets Us
            </span>{' '}
            Apart
          </h2>
          {/* Decorative underline */}
          <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-20 h-1 bg-gradient-to-r from-brand-purple/40 to-primary/40 rounded-full"></div>
        </div>

        {/* Subtitle */}
        <p className="text-[14px] sm:text-[15px] text-gray-600 text-center max-w-[600px] mb-9 font-medium mt-1">
          We go beyond tutoring. We deliver excellence, every time.
        </p>

        {/* Cards Grid - Modernized */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-[1040px]">
          {features.map((feature, index) => (
            <div
              key={feature.id}
              className="group bg-white rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100/80 hover:border-brand-purple/20 flex flex-col items-start gap-4 relative hover:-translate-y-1"
              style={{
                transitionDelay: `${index * 50}ms`,
              }}
            >
              {/* Subtle gradient overlay on hover */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-brand-purple/[0.03] to-primary/[0.02] opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>

              {/* Icon - Enhanced with gradient and glow */}
              <div className="shrink-0 w-12 h-12 rounded-xl bg-primary-soft border border-brand-purple/10 flex items-center justify-center text-brand-purple group-hover:bg-primary group-hover:text-white group-hover:border-transparent group-hover:shadow-md group-hover:shadow-brand-purple/20 transition-all duration-300">
                {feature.icon}
              </div>

              {/* Content */}
              <div className="flex-grow min-w-0">
                {/* Title */}
                <h3 className="text-[15px] font-bold text-gray-900 mb-1.5 leading-snug group-hover:text-brand-purple transition-colors duration-300">
                  {feature.title}
                </h3>

                {/* Decorative gradient line */}
                <div className="w-10 h-[2.5px] bg-gradient-to-r from-brand-purple to-primary mb-2.5 rounded-full group-hover:w-14 transition-all duration-300"></div>

                {/* Description */}
                <p className="text-gray-500 text-[12px] leading-relaxed mb-3.5">
                  {feature.description}
                </p>

                {/* Link - Enhanced with arrow animation */}
                <button
                  type="button"
                  onClick={() => { if (window.Tawk_API?.maximize) window.Tawk_API.maximize(); }}
                  className="inline-flex items-center text-[12px] font-semibold text-brand-purple gap-1.5 group/link cursor-pointer"
                >
                  <span className="relative">
                    Learn more
                    <span className="absolute -bottom-0.5 left-0 w-0 h-[1.5px] bg-brand-purple group-hover/link:w-full transition-all duration-300"></span>
                  </span>
                  <span className="text-[14px] group-hover/link:translate-x-1 group-hover/link:-translate-y-0.5 transition-transform duration-300">&rarr;</span>
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default FeaturesSection;