import React from 'react';

const perks = [
  {
    svg: (
      <>
        <path d="M12 14l9-5-9-5-9 5 9 5z" />
        <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 14v7" />
      </>
    ),
    title: 'Verified Experts',
    sub: 'PhD & Master Level Tutors',
  },
  {
    svg: (
      <>
        <circle cx="12" cy="12" r="9" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 7v5l3 3" />
      </>
    ),
    title: 'On Time Delivery',
    sub: 'Always meeting deadlines',
  },
  {
    svg: (
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
    ),
    title: '100% Confidential',
    sub: 'Your information and tutoring sessions are always protected.',
  },
  {
    svg: (
      <path strokeLinecap="round" strokeLinejoin="round" d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
    ),
    title: '24/7 Support',
    sub: "We're always here for you",
  },
];

const RegisterPerks = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-3.5 w-full">
      {perks.map((f) => (
        <div key={f.title} className="group flex items-start gap-3 bg-white/70 backdrop-blur-xs p-2.5 sm:p-3 rounded-xl border border-slate-200/60 shadow-xs hover:shadow-md hover:border-emerald-200 transition-all duration-300">
          <div className="w-9 h-9 lg:w-10 lg:h-10 rounded-xl bg-primary-soft flex items-center justify-center shrink-0 text-brand-purple group-hover:bg-primary group-hover:text-surface group-hover:scale-105 transition-all duration-300">
            <svg className="w-4 h-4 lg:w-5 lg:h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              {f.svg}
            </svg>
          </div>
          <div className="text-left min-w-0">
            <h3 className="text-[13px] lg:text-[14px] font-bold text-text-dark leading-tight">{f.title}</h3>
            <p className="text-[11px] text-text-body mt-0.5 leading-snug opacity-70">{f.sub}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default RegisterPerks;