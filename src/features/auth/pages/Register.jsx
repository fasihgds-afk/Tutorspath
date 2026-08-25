import React from 'react';
import RegisterForm from '../components/RegisterForm';
import RegisterPerks from '../components/RegisterPerks';
import RegisterTrustBadge from '../components/RegisterTrustBadge';

const Register = () => {
  const handleRegister = async (payload) => {
    // Calls backend signup API: POST /api/v1/auth/signup
    const response = await authApi.signup(payload);
    console.log('Registration successful:', response);
    // No redirect — errors are surfaced by RegisterForm
  };

  return (
    <section className="w-full min-h-[calc(100vh-64px)] bg-surface-alt py-8 sm:py-12 px-4 sm:px-6 lg:px-8 flex items-center justify-center relative overflow-hidden">
      <div className="w-full max-w-6xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">

          {/* ── Left Column: info + perks (Matches Hero Section font & style) ── */}
          <div className="lg:col-span-7 flex flex-col space-y-4 lg:space-y-5 order-2 lg:order-1 text-center lg:text-left items-center lg:items-start">

            {/* Trust Badge */}
            <div className="inline-flex items-center gap-2 bg-primary-soft text-brand-purple px-4 py-1.5 rounded-full text-[12px] lg:text-[13px] font-semibold w-fit shadow-xs hover:scale-105 transition-transform duration-300 cursor-default">
              <svg className="w-4 h-4 text-brand-purple shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 1.944A11.954 11.954 0 012.166 5C2.056 5.649 2 6.319 2 7c0 5.225 3.34 9.67 8 11.317C14.66 16.67 18 12.225 18 7c0-.682-.057-1.35-.166-2.001A11.954 11.954 0 0110 1.944zM11 14a1 1 0 11-2 0 1 1 0 012 0zm0-7a1 1 0 10-2 0v3a1 1 0 102 0V7z" clipRule="evenodd" />
              </svg>
              <span>Trusted by 8,000+ Students Worldwide</span>
            </div>

            {/* Main Heading */}
            <h1 className="text-[28px] sm:text-[32px] lg:text-[36px] font-bold text-text-dark leading-tight tracking-tight">
              Create Your Account &amp; Connect With{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-start to-brand-end">
                Top Tutors
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-[15px] sm:text-[16px] text-text-body font-medium opacity-70 max-w-[460px] leading-relaxed -mt-1 tracking-tight">
              Join thousands of students who trust TutorsPath for high-quality tutoring services.
            </p>

            {/* Subheading bullet points */}
            <div className="flex items-center justify-center lg:justify-start gap-2.5 sm:gap-3 text-[14px] sm:text-[15px] font-bold text-text-body">
              <span>Fast</span>
              <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0"></span>
              <span>No AI Tutors</span>
              <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0"></span>
              <span>One to One Sessions</span>
            </div>

            {/* Perks 2x2 grid */}
            <div className="w-full pt-1">
              <RegisterPerks />
            </div>

            {/* Rating / Trustpilot social proof */}
            <div className="w-full pt-1">
              <RegisterTrustBadge />
            </div>
          </div>

          {/* ── Right Column: Register Form (Matches Login Form design) ──────── */}
          <div className="lg:col-span-5 order-1 lg:order-2 w-full max-w-md mx-auto lg:max-w-none">
            <RegisterForm onSubmit={handleRegister} />
          </div>

        </div>
      </div>
    </section>
  );
};

export default Register;