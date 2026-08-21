import React from 'react';

const CTABannerSection = () => {
  return (
    <section className="w-full bg-surface py-10 px-4 sm:px-10 lg:px-16 xl:px-20">
      <div className="w-full max-w-[1040px] mx-auto">

        <div className="relative bg-surface-alt rounded-[20px] shadow-xs border border-card-border overflow-hidden flex flex-col lg:flex-row items-center justify-between px-5 lg:px-10 py-6 lg:py-7 gap-5 lg:gap-0 hover:shadow-md transition-shadow duration-300">

          {/* Image — desktop only */}
          <div className="hidden lg:flex relative w-full lg:w-[30%] justify-center items-end min-h-[190px] lg:min-h-[210px]">
            <div className="absolute left-4 bottom-0 w-[160px] h-[160px] bg-primary rounded-full opacity-20 z-0"></div>
            <img
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80"
              alt="Student giving thumbs up"
              className="relative z-10 max-h-[210px] object-contain drop-shadow-sm hover:scale-105 transition-transform duration-500"
            />
          </div>

          {/* Middle Content */}
          <div className="w-full lg:w-[40%] flex flex-col justify-center lg:px-6 text-center lg:text-left">
            <h2 className="text-[20px] lg:text-[22px] font-bold text-text-dark leading-snug tracking-tight">
              Maximize Your Writing Impact with{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-start to-brand-end">
                Exceptional Academic Assistance!
              </span>
            </h2>
            <p className="text-text-body text-[13px] lg:text-[13.5px] mt-2.5 leading-relaxed font-normal opacity-70">
              From essays to research papers, we help you achieve top grades with high-quality, original, and timely content.
            </p>
          </div>

          {/* Divider — desktop only */}
          <div className="hidden lg:block w-[1px] h-[110px] bg-gray-200 self-center shrink-0"></div>

          {/* Right: Checklist + CTA */}
          <div className="w-full lg:w-[26%] flex flex-col justify-center lg:pl-6">
            <ul className="space-y-2.5 mb-5">
              {['Top Quality Work', 'Affordable Pricing', 'Total Satisfaction Guaranteed'].map((item) => (
                <li key={item} className="group flex items-center gap-2.5">
                  <span className="w-4 h-4 rounded-full bg-primary flex items-center justify-center text-surface shrink-0 group-hover:scale-125 transition-transform duration-200">
                    <svg className="w-2.5 h-2.5" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </span>
                  <span className="text-[13.5px] font-bold text-text-dark">{item}</span>
                </li>
              ))}
            </ul>

            <a href="#"
              className="w-full inline-flex items-center justify-center gap-2 bg-gradient-to-r from-brand-start to-brand-end text-surface font-semibold text-[13.5px] py-3 px-5 rounded-[10px] shadow-[0_4px_12px_rgba(5,150,105,0.3)] hover:scale-[1.03] hover:shadow-[0_8px_24px_rgba(5,150,105,0.4)] active:scale-[0.97] transition-all duration-200">
              Place Your Order Now <span className="text-base leading-none">&rarr;</span>
            </a>
          </div>

        </div>
      </div>
    </section>
  );
};

export default CTABannerSection;
