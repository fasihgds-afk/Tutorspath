import React from 'react';

const SupportBannerSection = () => {
  return (
    <section className="w-full bg-surface py-10 px-4 sm:px-10 lg:px-16 xl:px-20">
      <div className="w-full max-w-[1040px] mx-auto">

        {/* Banner Card */}
        <div className="relative bg-gradient-to-r from-brand-start to-brand-end rounded-[20px] px-6 sm:px-10 py-8 overflow-hidden shadow-[0_12px_40px_rgba(5,150,105,0.25)] hover:shadow-[0_20px_50px_rgba(5,150,105,0.35)] transition-shadow duration-300">

          {/* Subtle dot pattern overlay */}
          <div
            className="absolute inset-0 opacity-10 pointer-events-none"
            style={{ backgroundImage: 'radial-gradient(#fff 1.5px, transparent 1.5px)', backgroundSize: '24px 24px' }}
          />

          {/* Content */}
          <div className="relative z-10 flex flex-col sm:flex-row items-center justify-between gap-6">

            {/* Left: Icon + Text */}
            <div className="flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-5">

              {/* Support Avatar */}
              <div className="relative shrink-0">
                <div className="w-[64px] h-[64px] rounded-full bg-surface flex items-center justify-center shadow-md hover:scale-110 transition-transform duration-300">
                  <svg className="w-8 h-8 text-brand-purple" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 100-6 3 3 0 000 6z" />
                  </svg>
                </div>
                {/* Online badge */}
                <div className="absolute bottom-0 right-0 w-5 h-5 rounded-full bg-primary-200 border-2 border-brand-start flex items-center justify-center">
                  <svg className="w-2.5 h-2.5 text-surface" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                  </svg>
                </div>
              </div>

              {/* Heading + Subtitle */}
              <div className="flex flex-col justify-center">
                <h3 className="text-surface text-[20px] sm:text-[22px] lg:text-[24px] font-extrabold tracking-tight leading-tight mb-1.5">
                  Have Questions? We're Here to Help!
                </h3>
                <p className="text-surface text-[13px] lg:text-[14px] font-normal opacity-85">
                  Our support team is available 24/7 to assist you at any stage.
                </p>
              </div>
            </div>

            {/* Right: Buttons */}
            <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">

              {/* Chat with Us */}
              <a
                href="#"
                className="group inline-flex items-center justify-center gap-2.5 bg-surface hover:bg-primary-50 text-brand-purple text-[14px] font-bold px-6 py-3 rounded-[12px] shadow-sm hover:scale-[1.03] hover:shadow-md active:scale-[0.97] transition-all duration-200 w-full sm:w-auto whitespace-nowrap"
              >
                <svg className="w-5 h-5 group-hover:scale-110 transition-transform duration-200" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
                Chat with Us
              </a>

              {/* Phone Number */}
              <a
                href="tel:+442033185601"
                className="group inline-flex items-center justify-center gap-2.5 bg-transparent hover:bg-surface/10 text-surface border border-surface/40 hover:border-surface/70 text-[14px] font-bold px-6 py-3 rounded-[12px] hover:scale-[1.03] active:scale-[0.97] transition-all duration-200 w-full sm:w-auto whitespace-nowrap"
              >
                <svg className="w-5 h-5 group-hover:scale-110 transition-transform duration-200" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                +44 (203) 318-5601
              </a>

            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default SupportBannerSection;
