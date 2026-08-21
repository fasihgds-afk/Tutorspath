import React from 'react';

const perks = [
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
    title: 'Verified Experts',
    desc: 'Work with qualified professionals with advanced degrees.',
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
      </svg>
    ),
    title: '100% Confidential',
    desc: 'Your information and projects are always protected.',
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
    title: 'Fast & Easy Process',
    desc: 'Get matched with the right expert in just a few minutes.',
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
      </svg>
    ),
    title: '24/7 Support',
    desc: 'Our support team is always here to help you.',
  },
];

const RegisterPerks = () => {
  return (
    <div className="w-full">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {perks.map((perk, index) => (
          <div
            key={perk.title}
            className="bg-white rounded-2xl p-4 border border-slate-100 shadow-sm hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 group"
            style={{
              transitionDelay: `${index * 50}ms`,
            }}
          >
            <div className="flex items-start gap-3.5">
              {/* Icon with gradient background */}
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-50 to-emerald-100/50 group-hover:from-emerald-100 group-hover:to-emerald-200/50 flex items-center justify-center text-emerald-600 flex-shrink-0 transition-all duration-300 group-hover:scale-105 group-hover:shadow-md">
                {perk.icon}
              </div>

              <div className="flex-1 min-w-0">
                <h3 className="text-slate-800 font-bold text-sm leading-tight mb-0.5 group-hover:text-emerald-700 transition-colors duration-200">
                  {perk.title}
                </h3>
                <p className="text-slate-400 text-xs leading-relaxed">
                  {perk.desc}
                </p>
              </div>
            </div>

            {/* Subtle bottom accent line */}
            <div className="mt-3 h-0.5 w-8 bg-gradient-to-r from-emerald-400/40 to-transparent rounded-full group-hover:w-12 transition-all duration-300"></div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RegisterPerks;