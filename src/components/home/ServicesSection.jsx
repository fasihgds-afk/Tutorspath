import React from 'react';

const services = [
  {
    id: 1,
    title: 'Essays',
    description: 'Well-structured, original essays crafted to meet your requirements.',
    items: ['Argumentative Essays', 'Narrative Essays', 'Compare & Contrast Essays'],
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
      </svg>
    ),
  },
  {
    id: 2,
    title: 'Research Papers',
    description: 'In-depth research with credible sources and proper citations.',
    items: ['APA, MLA, Chicago, Harvard', 'Thorough Research', 'Plagiarism-Free Content'],
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    ),
  },
  {
    id: 3,
    title: 'Dissertations',
    description: 'High-quality dissertations that meet academic standards.',
    items: ['Topic Selection & Proposal', 'Chapter Writing', 'Editing & Proofreading'],
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 14l9-5-9-5-9 5 9 5z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0112 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
      </svg>
    ),
  },
  {
    id: 4,
    title: 'Assignments',
    description: 'Well-researched assignments delivered on time, every time.',
    items: ['All Subjects & Topics', 'Detailed & Original Content', 'Formatting as Per Guidelines'],
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
      </svg>
    ),
  },
  {
    id: 5,
    title: 'Case Studies',
    description: 'Insightful case studies with clear analysis and recommendations.',
    items: ['Harvard & APA Format', 'SWOT / PESTLE Analysis', 'Industry-Specific Solutions'],
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
      </svg>
    ),
  },
  {
    id: 6,
    title: 'Reports & More',
    description: 'Professional reports and custom academic content.',
    items: ['Business Reports', 'Lab Reports', 'And Much More'],
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    ),
  },
];

const ServiceCard = ({ service, showItems }) => (
  <div className="group bg-surface-alt rounded-[16px] p-4 border border-card-border hover:border-primary-border hover:shadow-md hover:-translate-y-1 transition-all duration-300">
    <div className="flex items-start gap-3 mb-3">
      <div className="w-10 h-10 rounded-xl bg-surface border border-card-border flex items-center justify-center text-brand-purple shrink-0 group-hover:bg-primary group-hover:text-surface group-hover:border-primary transition-all duration-300">
        {service.icon}
      </div>
      <div className="flex-1 min-w-0">
        <h3 className="text-text-dark font-bold text-[13px] mb-0.5 group-hover:text-brand-purple transition-colors duration-200">
          {service.title}
        </h3>
        <p className="text-text-body text-[11px] leading-relaxed opacity-70 line-clamp-2">
          {service.description}
        </p>
      </div>
    </div>
    <ul className="space-y-1.5 mb-3">
      {service.items.slice(0, showItems).map((item) => (
        <li key={item} className="flex items-center gap-2 text-text-body text-[11px]">
          <span className="w-3.5 h-3.5 rounded-full bg-primary-soft border border-primary-border flex items-center justify-center text-brand-purple shrink-0 group-hover:bg-primary group-hover:text-surface transition-all duration-300">
            <svg className="w-2 h-2" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </span>
          {item}
        </li>
      ))}
    </ul>
    <a href="#" className="text-brand-purple text-[11px] font-bold hover:text-primary hover:underline transition-colors duration-200">
      Learn more →
    </a>
  </div>
);

const ServicesSection = () => {
  return (
    <section className="w-full bg-surface py-10 lg:py-14 px-4 sm:px-10 lg:px-16 xl:px-20" id="services">
      <div className="w-full max-w-[1040px] mx-auto">

        {/* Header */}
        <div className="flex flex-col items-center text-center mb-8">
          <div className="inline-flex items-center gap-2 text-brand-purple text-[12px] font-bold uppercase tracking-[0.12em] mb-3">
            <span className="w-6 h-[2px] bg-primary inline-block"></span>
            What We Offer
            <span className="w-6 h-[2px] bg-primary inline-block"></span>
          </div>
          <h2 className="text-[26px] sm:text-[32px] lg:text-[38px] font-bold text-text-dark tracking-tight leading-tight mb-2.5">
            Expert Help for{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-start to-brand-end">
              Every Need
            </span>
          </h2>
          <p className="text-[13px] sm:text-[14px] text-text-body max-w-[480px] leading-relaxed opacity-70 font-medium">
            From essays to research papers, we provide expert help in every academic writing area you need.
          </p>
        </div>

        {/* Top row: Featured card + 2×2 service cards */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">

          {/* Featured Card */}
          <div className="lg:col-span-2">
            <div className="group bg-gradient-to-br from-brand-start to-primary-700 rounded-[20px] p-6 h-full text-surface relative overflow-hidden hover:shadow-[0_12px_32px_rgba(5,150,105,0.3)] hover:-translate-y-1 transition-all duration-300">
              <div className="absolute -top-16 -right-16 w-48 h-48 bg-surface/5 rounded-full blur-2xl" />
              <div className="absolute -bottom-16 -left-16 w-48 h-48 bg-surface/5 rounded-full blur-2xl" />
              <div className="relative z-10 flex flex-col h-full">
                <div className="mb-5">
                  <div className="w-12 h-12 bg-surface/20 rounded-xl flex items-center justify-center mb-4 backdrop-blur-sm group-hover:scale-110 transition-transform duration-300">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                  </div>
                  <h3 className="text-[18px] font-bold mb-2">Custom Writing</h3>
                  <p className="text-surface/80 text-[13px] leading-relaxed">
                    Get personalized academic writing tailored to your specific requirements and deadline.
                  </p>
                </div>
                <div className="mt-auto pt-4 border-t border-surface/20">
                  <a href="#" className="group/link inline-flex items-center gap-2 text-surface font-semibold text-[13px] hover:gap-3 transition-all duration-300">
                    Explore All Services
                    <svg className="w-4 h-4 group-hover/link:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* 2×2 Service Cards */}
          <div className="lg:col-span-3">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 h-full">
              {services.slice(0, 4).map((service) => (
                <ServiceCard key={service.id} service={service} showItems={2} />
              ))}
            </div>
          </div>
        </div>

        {/* Bottom row: 2 more cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
          {services.slice(4, 6).map((service) => (
            <ServiceCard key={service.id} service={service} showItems={3} />
          ))}
        </div>

      </div>
    </section>
  );
};

export default ServicesSection;
