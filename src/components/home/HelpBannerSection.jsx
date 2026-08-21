import React from 'react';

const HelpBannerSection = () => {
  return (
    <section className="w-full bg-surface py-10 px-4 sm:px-10 lg:px-16 xl:px-20">
      <div className="w-full max-w-[1040px] mx-auto">

        {/* Banner Card */}
        <div className="relative bg-gradient-to-r from-brand-start to-brand-end rounded-[20px] px-6 sm:px-10 py-8 overflow-hidden shadow-[0_12px_40px_rgba(5,150,105,0.25)] hover:shadow-[0_20px_50px_rgba(5,150,105,0.35)] transition-shadow duration-300">

          {/* Dot pattern overlay */}
          <div
            className="absolute inset-0 opacity-10 pointer-events-none"
            style={{ backgroundImage: 'radial-gradient(#fff 1.5px, transparent 1.5px)', backgroundSize: '24px 24px' }}
          />

          {/* Content */}
          <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8">

            {/* Left: Illustration + Text */}
            <div className="flex flex-col sm:flex-row items-center gap-5 sm:gap-6">

              {/* Books + Cap SVG Illustration */}
              <div className="shrink-0 w-[90px] h-[90px] lg:w-[110px] lg:h-[105px] flex items-center justify-center hover:scale-110 transition-transform duration-500">
                <svg viewBox="0 0 120 110" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full drop-shadow-lg">
                  {/* Graduation Cap */}
                  <path d="M60 15L95 28L60 41L25 28L60 15Z" fill="rgba(255,255,255,0.25)" />
                  <path d="M60 15L95 28L60 41L25 28L60 15Z" stroke="rgba(255,255,255,0.5)" strokeWidth="1.5" />
                  <path d="M43 33.5V44C43 47.5 50.5 50 60 50C69.5 50 77 47.5 77 44V33.5" fill="rgba(255,255,255,0.15)" />
                  {/* Tassel */}
                  <path d="M78 30L85 42L84 46" stroke="rgba(255,255,255,0.8)" strokeWidth="2.5" strokeLinecap="round" />
                  <circle cx="84" cy="47" r="1.5" fill="rgba(255,255,255,0.8)" />
                  {/* Book 1 */}
                  <path d="M35 44C35 44 48 48 68 45C88 42 102 38 102 38V54C102 54 88 58 68 61C48 64 35 60 35 60V44Z" fill="rgba(255,255,255,0.2)" />
                  <path d="M35 45L68 61L102 39" stroke="rgba(255,255,255,0.4)" strokeWidth="1.5" />
                  <text x="68" y="53" fill="white" fontSize="7" fontWeight="bold" textAnchor="middle" letterSpacing="0.5">RESEARCH</text>
                  {/* Book 2 */}
                  <path d="M35 57C35 57 48 61 68 58C88 55 102 51 102 51V67C102 67 88 71 68 74C48 77 35 73 35 73V57Z" fill="rgba(255,255,255,0.15)" />
                  <path d="M35 58L68 74L102 52" stroke="rgba(255,255,255,0.3)" strokeWidth="1.5" />
                  <text x="68" y="66" fill="white" fontSize="7" fontWeight="bold" textAnchor="middle" letterSpacing="0.5">ANALYSIS</text>
                  {/* Book 3 */}
                  <path d="M35 70C35 70 48 74 68 71C88 68 102 64 102 64V80C102 80 88 84 68 87C48 90 35 86 35 86V70Z" fill="rgba(255,255,255,0.1)" />
                  <path d="M35 71L68 87L102 65" stroke="rgba(255,255,255,0.25)" strokeWidth="1.5" />
                  <text x="68" y="79" fill="white" fontSize="7" fontWeight="bold" textAnchor="middle" letterSpacing="0.5">SUCCESS</text>
                  {/* Plant pot */}
                  <path d="M22 68C22 62 27 57 33 57C39 57 44 62 44 68H22Z" fill="rgba(255,255,255,0.3)" />
                  <ellipse cx="33" cy="57" rx="5.5" ry="2" fill="rgba(255,255,255,0.2)" />
                  {/* Leaves */}
                  <path d="M33 57C33 50 26 42 22 38C26 44 31 48 33 57Z" fill="rgba(255,255,255,0.5)" />
                  <path d="M33 57C33 48 40 40 45 35C41 43 36 47 33 57Z" fill="rgba(255,255,255,0.4)" />
                  <path d="M33 57C33 45 33 33 33 28C33 35 33 45 33 57Z" fill="rgba(255,255,255,0.6)" />
                </svg>
              </div>

              {/* Text */}
              <div className="flex flex-col text-center sm:text-left">
                <h3 className="text-surface text-[20px] sm:text-[22px] lg:text-[24px] font-extrabold tracking-tight leading-tight mb-1.5">
                  Not sure what you need?
                </h3>
                <p className="text-surface text-[13px] lg:text-[14px] font-normal opacity-85 max-w-[340px] leading-relaxed">
                  Our experts are here to help you choose the right solution for your tutoring success.
                </p>
              </div>
            </div>

            {/* Vertical divider — desktop only */}
            <div className="hidden lg:block w-[1px] h-16 bg-surface/20 shrink-0" />

            {/* Right: Buttons + Trust badges */}
            <div className="flex flex-col items-center lg:items-end gap-4">

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
                <a
                  href="#"
                  className="group inline-flex items-center justify-center gap-2 bg-surface hover:bg-primary-50 text-brand-purple text-[14px] font-bold px-5 py-3 rounded-[12px] shadow-sm hover:scale-[1.03] hover:shadow-md active:scale-[0.97] transition-all duration-200 w-full sm:w-auto whitespace-nowrap"
                >
                  <svg className="w-4 h-4 group-hover:scale-110 transition-transform duration-200" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                  Talk to an Expert
                </a>

                <a
                  href="#"
                  className="group inline-flex items-center justify-center gap-2 bg-surface/15 hover:bg-surface/25 text-surface border border-surface/30 hover:border-surface/60 text-[14px] font-bold px-5 py-3 rounded-[12px] hover:scale-[1.03] active:scale-[0.97] transition-all duration-200 w-full sm:w-auto whitespace-nowrap"
                >
                  <svg className="w-4 h-4 group-hover:scale-110 transition-transform duration-200" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  Call Now
                </a>
              </div>

              {/* Trust features */}
              <div className="flex flex-wrap items-center justify-center lg:justify-end gap-4 text-surface text-[12px] font-semibold opacity-90">
                <div className="flex items-center gap-1.5">
                  <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                  Quick Response
                </div>
                <div className="flex items-center gap-1.5">
                  <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                  100% Confidential
                </div>
                <div className="flex items-center gap-1.5">
                  <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
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

export default HelpBannerSection;
