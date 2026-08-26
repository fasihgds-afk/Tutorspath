import React from 'react';

const warnings = [
  {
    id: 1,
    title: 'Flagged by Detection Tools',
    description:
      'Institutions use Turnitin & GPTZero to detect AI patterns. Submissions can trigger flags and academic review.',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
      </svg>
    ),
  },
  {
    id: 2,
    title: 'Misconduct Investigations',
    description:
      'Submitting AI-generated content can violate academic honesty policies, leading to penalties or hearings.',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
      </svg>
    ),
  },
  {
    id: 3,
    title: 'Defense & Oral Explanations',
    description:
      'Professors often require students to orally defend their thesis, explain methods, and justify cited arguments.',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 9.75a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375m-13.5 3.01c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.184-4.183a1.14 1.14 0 01.778-.332 48.294 48.294 0 005.83-.498c1.585-.233 2.708-1.626 2.708-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z" />
      </svg>
    ),
  },
  {
    id: 4,
    title: 'Hallucinated Sources & Errors',
    description:
      'AI models fabricate citations and output factual inaccuracies, putting your academic grading in jeopardy.',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
      </svg>
    ),
  },
];

const AIWarningSection = () => {
  return (
    <section
      id="ai-warning"
      className="w-full bg-surface-alt py-7 sm:py-9 px-4 sm:px-6 lg:px-8 relative overflow-hidden"
    >
      {/* Background decorations matching site theme */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-gradient-to-br from-primary/5 to-transparent rounded-full blur-3xl -translate-y-1/2 -translate-x-1/3 pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-72 h-72 bg-gradient-to-tl from-brand-end/5 to-transparent rounded-full blur-3xl translate-y-1/2 translate-x-1/3 pointer-events-none" />

      <div className="w-full max-w-7xl mx-auto flex flex-col items-center relative z-10">

        {/* Top Badge */}
        <div className="inline-flex items-center gap-1.5 bg-surface text-primary px-3 py-1 rounded-full text-[12px] font-semibold mb-2 shadow-xs border border-card-border">
          <span className="w-3.5 h-3.5 rounded-full bg-gradient-to-br from-primary to-brand-end flex items-center justify-center text-white text-[9px]">
            <svg className="w-2 h-2" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m0 3.75h.008v.008H12v-.008z" />
            </svg>
          </span>
          IMPORTANT NOTICE
        </div>

        {/* Heading */}
        <h2 className="text-[22px] sm:text-[26px] lg:text-[30px] font-bold text-text-dark text-center tracking-tight leading-snug max-w-[700px] mb-1.5">
          What Happens When You Submit{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-start to-brand-end">
            AI-Generated Work?
          </span>
        </h2>

        {/* Subtitle */}
        <p className="text-[13px] sm:text-[14px] text-text-body/80 text-center max-w-[560px] mb-6 font-medium">
          Using AI-generated content puts your academic standing at serious risk. Here is what you should know.
        </p>

        {/* Compact Cards Grid - 4 Columns on Desktop */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-4 w-full max-w-[1100px]">
          {warnings.map((item, index) => (
            <div
              key={item.id}
              className="group bg-surface rounded-xl sm:rounded-2xl p-4 sm:p-5 shadow-xs hover:shadow-md transition-all duration-300 border border-card-border hover:border-primary/40 flex flex-col justify-start relative hover:-translate-y-1"
              style={{ transitionDelay: `${index * 40}ms` }}
            >
              {/* Subtle hover gradient overlay */}
              <div className="absolute inset-0 rounded-xl sm:rounded-2xl bg-gradient-to-br from-primary/[0.03] to-brand-end/[0.02] opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

              {/* Icon */}
              <div className="shrink-0 w-10 h-10 rounded-xl bg-primary-soft/80 border border-primary-border/60 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white group-hover:scale-105 transition-all duration-300 mb-3">
                {item.icon}
              </div>

              {/* Title */}
              <h3 className="text-[14px] font-bold text-text-dark mb-1 leading-snug group-hover:text-primary transition-colors duration-300">
                {item.title}
              </h3>

              {/* Decorative gradient line */}
              <div className="w-8 h-[2px] bg-gradient-to-r from-brand-start to-brand-end mb-2 rounded-full group-hover:w-12 transition-all duration-300" />

              {/* Description */}
              <p className="text-text-body/75 text-[12px] leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>

        {/* Bottom reference note */}
        <p className="mt-4 text-[11px] text-text-body/50 text-center font-medium">
          Academic sources & references available upon request.
        </p>

      </div>
    </section>
  );
};

export default AIWarningSection;
