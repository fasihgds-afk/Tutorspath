import React from 'react';
import RegisterForm from '../components/RegisterForm';
import RegisterPerks from '../components/RegisterPerks';
import RegisterTrustBadge from '../components/RegisterTrustBadge';
import SessionActiveBanner from '../components/SessionActiveBanner';
import authApi from '../api/authApi';
import tokenManager from '../../../services/auth/tokenManager';
import useSmartRedirect from '../hooks/useSmartRedirect';

const Register = () => {
  const smartRedirect = useSmartRedirect();
  const isLoggedIn = tokenManager.isAuthenticated();

  const handleRegister = async (payload) => {
    await authApi.signup(payload);
    await smartRedirect();
  };

  return (
    <section className="w-full min-h-[calc(100vh-64px)] bg-surface-alt py-8 sm:py-12 px-4 sm:px-6 lg:px-8 flex items-center justify-center relative overflow-hidden">
      <div className="w-full max-w-5xl mx-auto relative z-10">

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-center">

          {/* ── Left Column: info + perks ── */}
          <div className="lg:col-span-7 flex flex-col space-y-4 lg:space-y-5 order-2 lg:order-1 text-center lg:text-left items-center lg:items-start">

            {/* Trust Badge */}
            <div className="inline-flex items-center gap-2 bg-primary-soft text-brand-purple px-4 py-1.5 rounded-full text-[12px] lg:text-[13px] font-semibold w-fit shadow-xs hover:scale-105 transition-transform duration-300 cursor-default">
              <svg className="w-4 h-4 text-brand-purple shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 1.944A11.954 11.954 0 012.166 5C2.056 5.649 2 6.319 2 7c0 5.225 3.34 9.67 8 11.317C14.66 16.67 18 12.225 18 7c0-.682-.057-1.35-.166-2.001A11.954 11.954 0 0110 1.944zM11 14a1 1 0 11-2 0 1 1 0 012 0zm0-7a1 1 0 10-2 0v3a1 1 0 102 0V7z" clipRule="evenodd" />
              </svg>
              <span>Trusted by 8,000+ Students Worldwide</span>
            </div>

            {/* Main Heading */}
            <h1 className="text-[26px] sm:text-[30px] lg:text-[34px] font-bold text-text-dark leading-tight tracking-tight">
              Create Your Account &amp; Connect With{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-start to-brand-end">
                Top Tutors
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-[14px] sm:text-[15px] text-text-body font-medium opacity-70 max-w-[420px] leading-relaxed -mt-1 tracking-tight">
              Join thousands of students who trust TutorsPath for high-quality tutoring services.
            </p>

            {/* Bullets */}
            <div className="flex items-center justify-center lg:justify-start gap-2.5 sm:gap-3 text-[13px] sm:text-[14px] font-bold text-text-body">
              <span>Fast</span>
              <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0"></span>
              <span>No AI Tutors</span>
              <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0"></span>
              <span>One to One Sessions</span>
            </div>

            {/* Perks */}
            <div className="w-full pt-1">
              <RegisterPerks />
            </div>

            {/* Trust badge */}
            <div className="w-full pt-1">
              <RegisterTrustBadge />
            </div>
          </div>

          {/* ── Right Column: Register Form or Active Session Card ── */}
          <div className="lg:col-span-5 order-1 lg:order-2 w-full max-w-sm sm:max-w-md mx-auto lg:max-w-none">
            {isLoggedIn ? (
              <SessionActiveBanner />
            ) : (
              <RegisterForm onSubmit={handleRegister} />
            )}
          </div>

        </div>
      </div>
    </section>
  );
};

export default Register;
