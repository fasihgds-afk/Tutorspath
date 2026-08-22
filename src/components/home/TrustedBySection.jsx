import React from 'react';

const stats = [
  {
    id: 1, number: '500+', title: 'Expert Tutors', subtitle: "PhD & Master's Level Experts",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.715m12 0a5.97 5.97 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
      </svg>
    ),
  },
  {
    id: 2, number: '125+', title: 'Subjects Covered', subtitle: 'From Business to Engineering & More',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385c.132.555-.47 1.016-.946.72l-4.735-2.84a.563.563 0 00-.586 0L6.982 20.54c-.476.297-1.078-.165-.946-.72l1.285-5.385a.562.562 0 00-.182-.557l-4.204-3.602c-.38-.325-.178-.948.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
      </svg>
    ),
  },
  {
    id: 3, number: '8.3K+', title: 'Sessions Completed', subtitle: 'High Quality Tutoring Delivered',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
        <path d="M12 14l9-5-9-5-9 5 9 5z" />
        <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0112 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
      </svg>
    ),
  },
  {
    id: 4, number: '99%', title: 'Client Satisfaction', subtitle: 'Students Love Our Work & Support',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.182 15.182a4.5 4.5 0 01-6.364 0M21 12a9 9 0 11-18 0 9 9 0 0118 0zM9 10.5h.008v.008H9V10.5zm6 0h.008v.008H15V10.5z" />
      </svg>
    ),
  },
];

const TrustedBySection = () => {
  return (
    <section className="w-full bg-surface py-10 px-4 sm:px-10 lg:px-16 xl:px-20">
      <div className="w-full max-w-[1040px] mx-auto">

        <div className="bg-surface rounded-[20px] shadow-xs border border-card-border flex flex-col lg:flex-row items-center justify-between px-5 sm:px-8 lg:px-10 py-7 gap-6 lg:gap-4 overflow-hidden hover:shadow-md transition-shadow duration-300">

          {/* Left: Badge + Heading */}
          <div className="w-full lg:w-[27%] flex flex-col justify-center shrink-0 text-center lg:text-left">
            <div className="inline-flex items-center gap-1.5 bg-primary-soft text-brand-purple px-3 py-1 rounded-full text-[11px] font-bold tracking-wide w-fit mb-3 border border-primary-border mx-auto lg:mx-0 hover:scale-105 transition-transform duration-300 cursor-default">
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
              </svg>
              RESULTS THAT MATTER
            </div>

            <h2 className="text-[15px] lg:text-[16px] font-semibold text-text-dark leading-snug tracking-tight mb-2.5">
              Trusted by{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-start to-brand-end">Thousands.</span>
              <br />
              Proven by{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-start to-brand-end">Results.</span>
            </h2>

            <p className="text-text-body text-[13px] leading-relaxed font-normal opacity-70">
              We're proud to be a top choice for students worldwide. Your success is our mission.
            </p>
          </div>

          {/* Stats — 2×2 mobile, 4-col desktop */}
          <div className="w-full lg:w-[52%] grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-0 lg:divide-x divide-gray-100">
            {stats.map((stat) => (
              <div key={stat.id}
                className="group flex flex-col items-center text-center px-2 lg:px-3 py-3 lg:py-0 bg-surface-alt lg:bg-transparent rounded-xl lg:rounded-none border border-card-border lg:border-0 hover:-translate-y-1 lg:hover:translate-y-0 hover:shadow-sm lg:hover:shadow-none transition-all duration-300 cursor-default">
                <div className="w-[44px] h-[44px] lg:w-[48px] lg:h-[48px] rounded-full bg-primary-soft border border-primary-border flex items-center justify-center text-brand-purple mb-2 group-hover:bg-primary group-hover:text-surface group-hover:scale-110 transition-all duration-300">
                  {stat.icon}
                </div>
                <h3 className="text-[17px] lg:text-[18px] font-semibold text-text-dark leading-tight">{stat.number}</h3>
                <h4 className="text-[11px] lg:text-[12px] font-bold text-text-dark mt-0.5">{stat.title}</h4>
                <p className="text-[10px] lg:text-[10.5px] text-text-body mt-0.5 leading-tight opacity-60">{stat.subtitle}</p>
              </div>
            ))}
          </div>

          {/* Student image — desktop only */}
          <div className="hidden lg:flex relative w-full lg:w-[18%] justify-end items-end min-h-[180px] shrink-0">
            {/* <div className="absolute right-0 bottom-0 w-[10px] h-[140px] bg-primary-soft rounded-full z-0" /> */}
            <img
              src="/images/CTA-2.png"
              alt="Student typing on laptop"
              className="relative z-10 max-h-[200px] object-contain drop-shadow-sm hover:scale-105 transition-transform duration-500"
            />
          </div>

        </div>
      </div>
    </section>
  );
};

export default TrustedBySection;
