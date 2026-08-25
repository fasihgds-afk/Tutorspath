import React from 'react';

const guarantees = [
  {
    id: 1, title: '100% Money Back', description: 'Not satisfied? Get a full refund.',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
      </svg>
    ),
  },
  {
    id: 2, title: '100% Satisfaction', description: 'We ensure top quality work every single time.',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385c.132.555-.47 1.016-.946.72l-4.735-2.84a.563.563 0 00-.586 0L6.982 20.54c-.476.297-1.078-.165-.946-.72l1.285-5.385a.562.562 0 00-.182-.557l-4.204-3.602c-.38-.325-.178-.948.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
      </svg>
    ),
  },
  {
    id: 3, title: 'Your Privacy', description: 'Your information is always kept secure.',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
      </svg>
    ),
  },
  {
    id: 4, title: 'No Hidden Charges', description: 'What you see is what you pay. No surprises.',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
];

const GuaranteeSection = () => {
  return (
    <section className="w-full bg-surface py-10 px-4 sm:px-10 lg:px-16 xl:px-20">
      <div className="w-full max-w-[1040px] mx-auto">

        <div className="bg-surface rounded-[20px] shadow-xs border border-card-border flex flex-col lg:flex-row items-center justify-between px-5 sm:px-7 lg:px-9 py-5 gap-5 lg:gap-2 hover:shadow-md transition-shadow duration-300">

          {/* Left: Shield + Title */}
          <div className="w-full lg:w-[22%] flex items-center gap-3 shrink-0">
            <div className="w-[44px] h-[44px] bg-primary rounded-[12px] flex items-center justify-center text-surface shrink-0 shadow-[0_4px_12px_rgba(5,150,105,0.3)] hover:scale-110 hover:shadow-[0_6px_20px_rgba(5,150,105,0.4)] transition-all duration-300">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
              </svg>
            </div>
            <h2 className="text-[15px] lg:text-[16px] font-extrabold text-text-dark leading-tight">
              Our Guarantee,<br />Your{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-start to-brand-end">Success</span>
            </h2>
          </div>

          {/* Divider — desktop only */}
          <div className="hidden lg:block w-[1px] h-[50px] bg-gray-200 shrink-0 mx-3" />

          {/* 2×2 on mobile, 4-col on desktop */}
          <div className="w-full lg:w-[74%] grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-3">
            {guarantees.map((item) => (
              <div key={item.id}
                className="group flex items-start gap-2.5 bg-surface-alt lg:bg-transparent rounded-xl lg:rounded-none border border-card-border lg:border-0 p-3 lg:p-0 hover:-translate-y-1 hover:shadow-sm lg:hover:shadow-none lg:hover:translate-y-0 transition-all duration-300">
                <div className="text-brand-purple shrink-0 mt-0.5 group-hover:scale-125 transition-transform duration-300">
                  {item.icon}
                </div>
                <div>
                  <h3 className="text-[12px] font-bold text-text-dark mb-0.5 leading-snug">{item.title}</h3>
                  <p className="text-text-body text-[11px] leading-relaxed opacity-70">{item.description}</p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
};

export default GuaranteeSection;
