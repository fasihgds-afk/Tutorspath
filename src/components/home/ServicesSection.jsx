import React from 'react';
import { Link } from 'react-router-dom';
import { SITE_CONFIG } from '../../config/siteConfig';

const ServicesSection = () => {
  const phone = SITE_CONFIG.phoneHome || SITE_CONFIG.phone;

  const documentTypes = [
    { label: 'Essays', href: SITE_CONFIG.routes.register },
    { label: 'Assignments', href: SITE_CONFIG.routes.register },
    { label: 'Research Papers', href: SITE_CONFIG.routes.register },
    { label: 'Term Papers', href: SITE_CONFIG.routes.register },
    { label: 'Homework', href: SITE_CONFIG.routes.register },
    { label: 'Thesis', href: SITE_CONFIG.routes.register },
    { label: 'Dissertation', href: SITE_CONFIG.routes.register },
    { label: 'and many more…', href: SITE_CONFIG.routes.register },
  ];

  const handleLiveChat = (e) => {
    e.preventDefault();
    if (window.Tawk_API?.maximize) {
      window.Tawk_API.maximize();
    } else if (window.Tawk_API?.toggle) {
      window.Tawk_API.toggle();
    } else {
      window.location.href = SITE_CONFIG.whatsapp?.href || '#';
    }
  };

  return (
    <section className="w-full bg-surface py-10 lg:py-14 px-4 sm:px-6 lg:px-8" id="services">
      <div className="w-full max-w-[1040px] mx-auto">

        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-8">
          <div className="inline-flex items-center gap-2 text-primary text-[12px] font-bold uppercase tracking-[0.12em] mb-2.5">
            <span className="w-6 h-[2px] bg-primary inline-block"></span>
            WHAT WE OFFER
            <span className="w-6 h-[2px] bg-primary inline-block"></span>
          </div>

          <h2 className="text-[26px] sm:text-[32px] lg:text-[38px] font-bold text-text-dark tracking-tight leading-tight mb-2.5">
            Expert Help for{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-start to-brand-end">
              Every SUBJECT
            </span>
          </h2>

          <p className="text-[13.5px] sm:text-[14.5px] text-text-body max-w-[620px] leading-relaxed opacity-80 font-medium">
            From mathematics to aerospace engineering, we provide expert help in every academic writing area you need.
          </p>
        </div>

        {/* Main Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">

          {/* Left Column: Academic Document Types & CTAs (Less height & Vertically centered) */}
          <div className="lg:col-span-7 bg-surface-alt rounded-[20px] p-5 sm:p-6 lg:p-7 border border-card-border shadow-xs flex flex-col justify-center hover:shadow-md transition-shadow duration-300">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <span className="w-2.5 h-2.5 rounded-full bg-primary animate-pulse shrink-0" />
                <h3 className="text-[16px] sm:text-[17px] font-bold text-text-dark">
                  Academic Documents We Help With
                </h3>
              </div>

              {/* Document Type Tags / Badges */}
              <div className="flex flex-wrap gap-2 mb-5">
                {documentTypes.map((doc, index) => (
                  <Link
                    key={index}
                    to={doc.href}
                    className="inline-flex items-center gap-1.5 bg-white hover:bg-primary hover:text-white text-text-dark text-[13px] font-semibold px-3.5 py-1.5 rounded-lg border border-card-border shadow-2xs hover:shadow-xs hover:scale-[1.02] active:scale-[0.98] transition-all duration-200"
                  >
                    <svg className="w-3.5 h-3.5 text-primary group-hover:text-white shrink-0" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>{doc.label}</span>
                  </Link>
                ))}
              </div>
            </div>

            {/* Quick Action CTA Bar */}
            <div className="pt-4 border-t border-card-border flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
              <Link
                to={SITE_CONFIG.routes.register}
                className="inline-flex items-center justify-center gap-1.5 bg-gradient-to-r from-brand-start to-brand-end text-white font-semibold text-[13.5px] py-2.5 px-5 rounded-lg shadow-[0_3px_10px_rgba(5,150,105,0.3)] hover:scale-[1.02] hover:shadow-[0_5px_15px_rgba(5,150,105,0.4)] active:scale-[0.98] transition-all duration-200"
              >
                <span>Order Now</span>
                <span className="text-sm">&rarr;</span>
              </Link>

              <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs font-semibold text-text-body">
                <a
                  href={phone.href}
                  className="flex items-center gap-1.5 hover:text-primary transition-colors py-0.5"
                >
                  <svg className="w-3.5 h-3.5 text-primary shrink-0" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
                  </svg>
                  <span>Call us at: {phone.display}</span>
                </a>

                <span className="hidden sm:inline text-gray-300">|</span>

                <button
                  type="button"
                  onClick={handleLiveChat}
                  className="inline-flex items-center gap-1 text-primary hover:text-primary-hover underline underline-offset-2 transition-colors cursor-pointer py-0.5"
                >
                  <svg className="w-3.5 h-3.5 shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a.75.75 0 01-.874-.913 4.47 4.47 0 00.75-1.528A8.04 8.04 0 013 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z" />
                  </svg>
                  <span>Click here to Start Live Chat</span>
                </button>
              </div>
            </div>
          </div>

          {/* Right Column: Dedicated "Writing" Card */}
          <div className="lg:col-span-5 bg-gradient-to-br from-brand-start via-emerald-600 to-primary-700 rounded-[20px] p-5 sm:p-6 lg:p-7 text-white relative overflow-hidden flex flex-col justify-between shadow-md hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300">
            {/* Background Glows */}
            <div className="absolute -top-12 -right-12 w-36 h-36 bg-white/10 rounded-full blur-2xl pointer-events-none" />
            <div className="absolute -bottom-12 -left-12 w-36 h-36 bg-white/10 rounded-full blur-2xl pointer-events-none" />

            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur-md flex items-center justify-center shadow-inner shrink-0">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                  </svg>
                </div>
                <h3 className="text-[22px] sm:text-[24px] font-bold leading-tight">
                  Writing
                </h3>
              </div>

              {/* Description */}
              <p className="text-white/90 text-[13.5px] sm:text-[14px] leading-relaxed font-normal mb-4">
                Hire a qualified writer belonging to your subject area to get 100% plagiarism-free writing at affordable prices.
              </p>

              {/* Feature Highlights */}
              <div className="space-y-2">
                {[
                  '100% Plagiarism-Free Guarantee',
                  'Affordable Student-Friendly Rates',
                  'Subject-Specific PhD & Master Writers',
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-white/95 text-[12.5px] font-medium">
                    <svg className="w-3.5 h-3.5 text-emerald-200 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom Button */}
            <div className="relative z-10 pt-4 mt-4 border-t border-white/20">
              <Link
                to={SITE_CONFIG.routes.register}
                className="w-full inline-flex items-center justify-center gap-2 bg-white text-primary-700 hover:bg-slate-100 font-bold text-[13.5px] py-2.5 px-5 rounded-lg shadow-sm hover:scale-[1.02] active:scale-[0.98] transition-all duration-200"
              >
                <span>Hire a Writer</span>
                <span className="text-sm">&rarr;</span>
              </Link>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};

export default ServicesSection;
