import React, { useState } from 'react';

const faqs = [
  {
    id: 1,
    question: 'What subjects do TutorsPath tutors teach?',
    answer:
      'We offer tutoring across a wide range of subjects, including Mathematics, Science, English, Computer Science, Economics, and more, from school level through university.',
  },
  {
    id: 2,
    question: 'Are the tutoring sessions conducted online?',
    answer:
      'Yes. TutorsPath provides convenient online tutoring sessions, allowing students to learn from qualified tutors from anywhere in the world.',
  },
  {
    id: 3,
    question: 'Can I choose my own tutor?',
    answer:
      'Yes. You can explore available tutors based on their subject expertise, academic level, experience, and availability, then choose the tutor who best fits your needs.',
  },
  {
    id: 4,
    question: 'How long is each tutoring session?',
    answer:
      "Session length can vary depending on the student's requirements. You can select the duration that works best for your learning goals when booking your session.",
  },
  {
    id: 5,
    question: 'Can tutoring help me prepare for exams?',
    answer:
      'Absolutely. Our tutors can provide personalized exam preparation, help identify areas where you need improvement, explain difficult concepts, and develop a focused study plan.',
  },
];

const FAQSection = () => {
  const [openId, setOpenId] = useState(1);

  const toggle = (id) => setOpenId(openId === id ? null : id);

  return (
    <section id="faqs" className="w-full bg-surface py-10 lg:py-14 px-4 sm:px-10 lg:px-16 xl:px-20">
      <div className="w-full max-w-[1040px] mx-auto flex flex-col items-center">

        {/* Top Badge */}
        <div className="inline-flex items-center gap-2 bg-primary-soft text-brand-purple px-4 py-1.5 rounded-full text-[12px] lg:text-[13px] font-semibold mb-4 shadow-xs border border-primary-border hover:scale-105 transition-transform duration-300 cursor-default">
          <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span>FAQS</span>
        </div>

        {/* Heading */}
        <h2 className="text-[26px] sm:text-[32px] lg:text-[38px] font-bold text-text-dark text-center tracking-tight leading-tight max-w-[600px] mb-2.5">
          Frequently Asked{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-start to-brand-end">
            Questions
          </span>
        </h2>

        {/* Subtitle */}
        <p className="text-[13px] sm:text-[14px] text-text-body text-center max-w-[480px] mb-10 font-medium opacity-70 leading-relaxed">
          Find answers to common questions about TutorsPath and our academic writing services.
        </p>

        {/* Main Grid */}
        <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">

          {/* Left: Support Box */}
          <div className="lg:col-span-4 bg-surface-alt rounded-[20px] border border-card-border shadow-[0_4px_20px_rgba(0,0,0,0.03)] p-6 flex flex-col justify-between hover:shadow-md transition-shadow duration-300">

            {/* Icon */}
            <div className="flex justify-center mb-5">
              <div className="relative w-[64px] h-[64px] rounded-full bg-primary-soft border border-primary-border flex items-center justify-center text-brand-purple hover:scale-110 transition-transform duration-300">
                <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <div className="absolute bottom-0.5 right-0.5 w-5 h-5 bg-primary rounded-full border-2 border-surface flex items-center justify-center text-surface text-[9px] font-bold">
                  ?
                </div>
              </div>
            </div>

            {/* Title */}
            <div className="text-center mb-6">
              <h3 className="text-text-dark text-[18px] font-extrabold tracking-tight mb-2">
                Still have questions?
              </h3>
              <p className="text-text-body text-[13px] leading-relaxed opacity-70 max-w-[260px] mx-auto">
                Our support team is here 24/7 to help you with anything you need.
              </p>
            </div>

            {/* Buttons */}
            <div className="flex flex-col gap-3 mb-6">
              <button
                type="button"
                onClick={() => { if (window.Tawk_API?.maximize) window.Tawk_API.maximize(); }}
                className="group w-full flex items-center justify-center gap-2 bg-gradient-to-r from-brand-start to-brand-end text-surface text-[13.5px] font-bold py-3 px-4 rounded-[14px] shadow-[0_4px_12px_rgba(5,150,105,0.25)] hover:scale-[1.02] hover:shadow-[0_8px_20px_rgba(5,150,105,0.35)] active:scale-[0.97] transition-all duration-200 cursor-pointer"
              >
                <svg className="w-4 h-4 group-hover:scale-110 transition-transform duration-200" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
                Chat with Us Now
                <svg className="w-4 h-4 group-hover:translate-x-0.5 transition-transform duration-200" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </button>

              <a
                href="mailto:care@tutorspath.com"
                className="group w-full flex items-center justify-center gap-2 bg-surface hover:bg-primary-soft text-text-body border border-card-border hover:border-primary-border text-[13.5px] font-bold py-3 px-4 rounded-[14px] shadow-sm hover:scale-[1.02] active:scale-[0.97] transition-all duration-200"
              >
                <svg className="w-4 h-4 text-brand-purple group-hover:scale-110 transition-transform duration-200" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                Email Us
                <span className="text-text-body font-normal text-[12px] opacity-60">care@tutorspath.com</span>
              </a>
            </div>

            {/* Footer trust */}
            <div className="pt-5 border-t border-card-border">
              <span className="text-text-dark font-bold text-[13px] block mb-1">We're Here 24/7</span>
              <p className="text-text-body text-[11px] opacity-60 mb-4">Quick responses. Real people. Real support.</p>
              <div className="flex items-center justify-between">
                <div className="flex -space-x-2">
                  {[
                    'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80',
                    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80',
                    'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=100&q=80',
                    'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=100&q=80',
                  ].map((src, i) => (
                    <img key={i} src={src} alt="User" className="w-7 h-7 rounded-full ring-2 ring-surface object-cover" />
                  ))}
                </div>
                <span className="bg-primary text-surface text-[11px] font-bold px-2.5 py-1 rounded-full">8K+</span>
              </div>
              <p className="text-text-body text-[11px] opacity-60 font-medium mt-2">
                Trusted by <strong className="text-text-dark opacity-100">8K+</strong> Students Worldwide
              </p>
            </div>
          </div>

          {/* Right: Accordion */}
          <div className="lg:col-span-8 flex flex-col gap-3">
            {faqs.map((faq) => {
              const isOpen = openId === faq.id;
              return (
                <div
                  key={faq.id}
                  className={`rounded-[16px] border overflow-hidden transition-all duration-300 ${
                    isOpen
                      ? 'border-primary-border shadow-[0_4px_20px_rgba(5,150,105,0.08)]'
                      : 'border-card-border shadow-sm hover:border-primary-border hover:shadow-md'
                  } bg-surface`}
                >
                  <button
                    onClick={() => toggle(faq.id)}
                    className="w-full flex items-center justify-between p-5 text-left focus:outline-none group"
                  >
                    <span className={`font-bold text-[14px] lg:text-[15px] leading-snug pr-4 transition-colors duration-200 ${isOpen ? 'text-brand-purple' : 'text-text-dark group-hover:text-brand-purple'}`}>
                      {faq.question}
                    </span>
                    <div className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 transition-all duration-300 ${isOpen ? 'bg-primary-soft border border-primary-border text-brand-purple' : 'bg-surface-alt border border-card-border text-text-body group-hover:border-primary-border group-hover:text-brand-purple'}`}>
                      <svg
                        className={`w-4 h-4 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
                        fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </button>

                  {/* Answer — smooth expand */}
                  <div className={`overflow-hidden transition-all duration-300 ${isOpen ? 'max-h-[400px] opacity-100' : 'max-h-0 opacity-0'}`}>
                    <div className="px-5 pb-5 pt-0">
                      <p className="text-text-body text-[13px] lg:text-[14px] leading-relaxed opacity-80">
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </div>
    </section>
  );
};

export default FAQSection;
