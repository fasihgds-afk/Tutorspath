import React, { useState } from 'react';

const testimonials = [
  {
    id: 1,
    text: 'I used TutorsFy for my business essay, and the quality exceeded my expectations. The writer followed all instructions, included proper references, and delivered everything before the deadline.',
    rating: 5,
    name: 'William B.',
    university: 'University of Birmingham, UK',
    subject: 'Essay Writing',
    avatarColor: 'bg-primary-200',
    avatarTextColor: 'text-primary-700',
  },
  {
    id: 2,
    text: 'I ordered a research paper for my nursing course and the final document was very detailed and professionally written. My professor specifically appreciated the structure and referencing.',
    rating: 5,
    name: 'James R.',
    university: 'University of Leeds, UK',
    subject: 'Research Paper',
    avatarColor: 'bg-primary-soft',
    avatarTextColor: 'text-primary-700',
  },
  {
    id: 3,
    text: "I've used their assignment writing assistance multiple times now and the experience has always been smooth. Communication was fast, delivery was on time, and the work quality remained consistent.",
    rating: 5,
    name: 'Ethan K.',
    university: 'University of Toronto, Canada',
    subject: 'Assignment Help',
    avatarColor: 'bg-primary-200',
    avatarTextColor: 'text-primary-700',
  },
];

const CARDS_PER_PAGE_DESKTOP = 3;
const CARDS_PER_PAGE_MOBILE = 1;

const TestimonialsSection = () => {
  const [page, setPage] = useState(0);

  const totalPagesDesktop = Math.ceil(testimonials.length / CARDS_PER_PAGE_DESKTOP);
  const totalPagesMobile = testimonials.length;

  const prevDesktop = () => setPage((p) => (p - 1 + totalPagesDesktop) % totalPagesDesktop);
  const nextDesktop = () => setPage((p) => (p + 1) % totalPagesDesktop);

  const prevMobile = () => setPage((p) => (p - 1 + totalPagesMobile) % totalPagesMobile);
  const nextMobile = () => setPage((p) => (p + 1) % totalPagesMobile);

  const visibleDesktop = testimonials.slice(
    page * CARDS_PER_PAGE_DESKTOP,
    page * CARDS_PER_PAGE_DESKTOP + CARDS_PER_PAGE_DESKTOP
  );
  const visibleMobile = [testimonials[page % totalPagesMobile]];

  return (
    <section className="w-full bg-surface py-10 lg:py-14 px-4 sm:px-10 lg:px-16 xl:px-20">
      <div className="w-full max-w-[1040px] mx-auto flex flex-col items-center">

        {/* Top Badge */}
        <div className="inline-flex items-center gap-2 bg-primary-soft text-brand-purple px-4 py-1.5 rounded-full text-[12px] lg:text-[13px] font-semibold mb-4 shadow-xs border border-primary-border hover:scale-105 transition-transform duration-300 cursor-default">
          <svg className="w-4 h-4 shrink-0" fill="currentColor" viewBox="0 0 24 24">
            <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z" />
          </svg>
          <span>STUDENT SUCCESS STORIES</span>
        </div>

        {/* Heading */}
        <h2 className="text-[26px] sm:text-[32px] lg:text-[38px] font-bold text-text-dark text-center tracking-tight leading-tight max-w-[700px] mb-2.5">
          Hear Success Stories From Our{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-start to-brand-end">
            Happy Students
          </span>
        </h2>

        {/* Subtitle */}
        <p className="text-[13px] sm:text-[14px] text-text-body text-center max-w-[480px] mb-10 font-medium opacity-70">
          Real feedback from students who achieved top grades with TutorsFy.
        </p>

        {/* ── DESKTOP CAROUSEL ── */}
        <div className="hidden md:flex w-full relative items-center justify-center">

          {/* Prev */}
          <button onClick={prevDesktop}
            className="absolute -left-5 z-10 w-10 h-10 rounded-full bg-surface shadow-[0_4px_16px_rgba(0,0,0,0.08)] border border-card-border flex items-center justify-center text-text-body hover:text-brand-purple hover:border-primary-border hover:scale-110 transition-all duration-200">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          {/* Cards */}
          <div className="grid grid-cols-3 gap-5 w-full">
            {visibleDesktop.map((t) => (
              <TestimonialCard key={t.id} t={t} />
            ))}
          </div>

          {/* Next */}
          <button onClick={nextDesktop}
            className="absolute -right-5 z-10 w-10 h-10 rounded-full bg-surface shadow-[0_4px_16px_rgba(0,0,0,0.08)] border border-card-border flex items-center justify-center text-text-body hover:text-brand-purple hover:border-primary-border hover:scale-110 transition-all duration-200">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        {/* ── MOBILE CAROUSEL ── */}
        <div className="flex md:hidden w-full relative items-center justify-center">

          {/* Prev */}
          <button onClick={prevMobile}
            className="absolute -left-1 z-10 w-9 h-9 rounded-full bg-surface shadow-[0_4px_16px_rgba(0,0,0,0.08)] border border-card-border flex items-center justify-center text-text-body hover:text-brand-purple hover:scale-110 transition-all duration-200">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          {/* Single Card */}
          <div className="w-full px-8">
            {visibleMobile.map((t) => (
              <TestimonialCard key={t.id} t={t} />
            ))}
          </div>

          {/* Next */}
          <button onClick={nextMobile}
            className="absolute -right-1 z-10 w-9 h-9 rounded-full bg-surface shadow-[0_4px_16px_rgba(0,0,0,0.08)] border border-card-border flex items-center justify-center text-text-body hover:text-brand-purple hover:scale-110 transition-all duration-200">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        {/* Dot indicators — mobile */}
        <div className="flex md:hidden items-center gap-2 mt-5">
          {testimonials.map((_, i) => (
            <button key={i} onClick={() => setPage(i)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${i === page % totalPagesMobile ? 'bg-primary w-5' : 'bg-primary-soft'}`} />
          ))}
        </div>

        {/* CTA Button */}
        <div className="mt-10">
          <a href="#"
            className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-brand-start to-brand-end text-surface font-semibold text-[14px] py-3 px-8 rounded-[12px] shadow-[0_4px_16px_rgba(5,150,105,0.3)] hover:scale-[1.04] hover:shadow-[0_8px_28px_rgba(5,150,105,0.4)] active:scale-[0.97] transition-all duration-200 w-full max-w-xs md:w-auto text-center justify-center">
            View More Reviews
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </a>
        </div>

      </div>
    </section>
  );
};

const TestimonialCard = ({ t }) => (
  <div className="group bg-surface rounded-[20px] p-5 lg:p-7 border border-card-border shadow-[0_4px_20px_rgba(0,0,0,0.04)] flex flex-col justify-between hover:-translate-y-1 hover:shadow-[0_12px_32px_rgba(5,150,105,0.1)] hover:border-primary-border transition-all duration-300">

    {/* Quote icon */}
    <svg className="w-7 h-7 text-primary-soft mb-3 group-hover:text-primary-200 transition-colors duration-300" fill="currentColor" viewBox="0 0 24 24">
      <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.996v10h-9.996z" />
    </svg>

    {/* Review text */}
    <p className="text-text-body text-[13.5px] lg:text-[14px] leading-relaxed mb-5 flex-1 opacity-80">
      {t.text}
    </p>

    {/* Stars */}
    <div className="flex items-center gap-2 mb-5">
      <div className="flex text-primary-200 gap-0.5 text-[14px]">
        {'★'.repeat(t.rating)}
      </div>
      <span className="text-text-dark font-bold text-[13px]">{t.rating}.0</span>
    </div>

    {/* Footer */}
    <div className="flex items-center justify-between pt-4 border-t border-card-border">
      <div className="flex items-center gap-3">
        {/* Avatar */}
        <div className={`w-10 h-10 rounded-full ${t.avatarColor} flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-300`}>
          <svg className={`w-6 h-6 ${t.avatarTextColor}`} fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
          </svg>
        </div>
        <div>
          <div className="flex items-center gap-1">
            <h4 className="text-text-dark font-bold text-[13px]">{t.name}</h4>
            {/* Verified */}
            <svg className="w-3.5 h-3.5 text-primary" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
            </svg>
          </div>
          <p className="text-text-body text-[11px] opacity-60">{t.university}</p>
        </div>
      </div>

      {/* Subject Badge */}
      <span className="bg-primary-soft text-brand-purple text-[10.5px] font-bold px-2.5 py-1 rounded-lg border border-primary-border whitespace-nowrap">
        {t.subject}
      </span>
    </div>
  </div>
);

export default TestimonialsSection;
