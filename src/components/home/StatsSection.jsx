import React from 'react';

const StatsSection = () => {
  const stats = [
    {
      id: 1, number: '500+', label: 'Expert Tutors',
      icon: (
        <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 20 20">
          <path d="M13 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" /><path d="M18 8a2 2 0 1 1-4 0 2 2 0 0 1 4 0Z" />
          <path d="M14 15a4 4 0 0 0-8 0v3h8v-3Z" /><path d="M6 8a2 2 0 1 1-4 0 2 2 0 0 1 4 0Z" />
          <path d="M16 18v-3a5.97 5.97 0 0 0-.75-2.91A3.01 3.01 0 0 1 19 15v3h-3Z" />
          <path d="M4.75 12.09A5.97 5.97 0 0 0 4 15v3H1v-3a3 3 0 0 1 3.75-2.91Z" />
        </svg>
      ),
    },
    {
      id: 2, number: '125+', label: 'Subjects Covered',
      icon: (
        <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24">
          <path d="M19 3h-4.18C14.4 1.84 13.3 1 12 1s-2.4.84-2.82 2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2zm-7 0a1 1 0 0 1 0 2 1 1 0 0 1 0-2zm0 18c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5z" />
          <path d="M12 12c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3zm0 4c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1z" />
        </svg>
      ),
    },
    {
      id: 3, number: '8.3K+', label: 'Sessions Completed',
      icon: (
        <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 3L1 9l4 2.18v6L12 21l7-3.82v-6l2-1.09V17h2V9L12 3zm6 10.55l-6 3.27-6-3.27v-4.9L12 10.8l6-3.15v4.9z" />
        </svg>
      ),
    },
    {
      id: 4, number: '99%', label: 'Student Satisfaction',
      icon: (
        <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" />
          <path d="M8.5 11a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3zm7 0a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3zm-3 6c-2.21 0-4-1.79-4-4h8c0 2.21-1.79 4-4 4z" />
        </svg>
      ),
    },
  ];

  return (
    <section className="w-full bg-surface-alt pb-10 pt-2 px-4 sm:px-10 lg:px-16 xl:px-20">
      <div className="w-full max-w-[1040px] mx-auto">

        {/* Mobile: 2×2 grid */}
        <div className="grid grid-cols-2 gap-3 md:hidden">
          {stats.map((stat) => (
            <div key={stat.id}
              className="group bg-surface rounded-2xl border border-card-border shadow-sm px-4 py-4 flex items-center gap-3 hover:-translate-y-1 hover:shadow-md transition-all duration-300 cursor-default">
              <div className="w-11 h-11 rounded-xl bg-primary-soft border border-primary-border flex items-center justify-center shrink-0 text-brand-purple group-hover:bg-primary group-hover:text-white group-hover:scale-110 transition-all duration-300">
                {stat.icon}
              </div>
              <div className="flex flex-col min-w-0">
                <span className="text-[18px] font-bold text-text-dark leading-tight tracking-tight">{stat.number}</span>
                <span className="text-[11px] font-medium text-text-body opacity-70 leading-tight mt-0.5">{stat.label}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Desktop: single row */}
        <div className="hidden md:flex bg-surface rounded-[20px] shadow-xs border border-card-border px-6 sm:px-10 lg:px-12 py-7 items-center justify-between gap-0 divide-x divide-gray-100 hover:shadow-md transition-shadow duration-300">
          {stats.map((stat, idx) => (
            <div key={stat.id}
              className={`group flex items-center gap-4 flex-1 justify-center cursor-default ${idx !== 0 ? 'pl-6 lg:pl-10' : ''} ${idx !== stats.length - 1 ? 'pr-6 lg:pr-10' : ''}`}>
              <div className="w-12 h-12 rounded-xl bg-primary-soft border border-primary-border flex items-center justify-center shrink-0 text-brand-purple group-hover:bg-primary group-hover:text-white group-hover:scale-110 transition-all duration-300">
                {stat.icon}
              </div>
              <div className="flex flex-col">
                <span className="text-[20px] lg:text-[22px] font-bold text-text-dark leading-tight tracking-tight">{stat.number}</span>
                <span className="text-[13px] sm:text-[14px] font-medium text-text-body opacity-70 mt-0.5 whitespace-nowrap">{stat.label}</span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default StatsSection;
