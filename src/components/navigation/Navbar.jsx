import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { SITE_CONFIG } from '../../config/siteConfig';
import { useAppConfig } from '../../context/AppConfigContext';
import { isReservedPath, getHomeVariant, HOME_VARIANT } from '../../constants/routeConfig';

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { landingIsHome1Override, activeRoutesLoaded, checkIsLandingPath } = useAppConfig();

  // Use dynamic routing if available, otherwise fall back to static config
  const isHome1 = landingIsHome1Override !== undefined 
    ? landingIsHome1Override 
    : false; // fallback default
  const currentPhone = isHome1 ? (SITE_CONFIG.phoneHome1 || SITE_CONFIG.phone) : (SITE_CONFIG.phoneHome || SITE_CONFIG.phone);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  // Close mobile menu on Escape key press or screen resize >= md
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMobileMenuOpen(false);
      }
    };
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  /**
   * For hash links: if already on home or landing page, scroll directly.
   * If on another page, navigate to target home and ScrollToHash handles the rest.
   */
  const handleHashLink = (e, hash) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);
    if (checkIsLandingPath && checkIsLandingPath(location.pathname)) {
      const el = document.getElementById(hash);
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else {
      const targetHome = isHome1 ? '/home-1' : '/';
      navigate(`${targetHome}#${hash}`);
    }
  };

  // Show loading state while determining which header to show
  if (!activeRoutesLoaded) {
    return (
      <header className="w-full bg-white shadow-sm border-b border-gray-100 sticky top-0 z-50 relative">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Left: Logo */}
            <Link to="/" className="flex items-center shrink-0">
              <img
                src="/TutorsPath Logo.svg"
                alt="TutorsPath"
                className="h-5 w-auto"
              />
            </Link>
            {/* Loading placeholder */}
            <div className="flex items-center gap-3">
              <div className="w-24 h-8 bg-gray-100 rounded-full animate-pulse" />
              <div className="w-16 h-8 bg-gray-100 rounded-full animate-pulse" />
            </div>
          </div>
        </div>
      </header>
    );
  }

  return (
    <header className="w-full bg-white shadow-sm border-b border-gray-100 sticky top-0 z-50 relative">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          {/* Left: Logo */}
          <Link to="/" className="flex items-center shrink-0">
            <img
              src="/TutorsPath Logo.svg"
              alt="TutorsPath"
              className="h-5 w-auto"
            />
          </Link>

          {/* Center: Nav Links — only on xl+ */}
          <nav className="hidden xl:flex items-center gap-6">
            <a
              href="/#top-writers"
              onClick={(e) => handleHashLink(e, 'top-writers')}
              className="text-sm text-gray-700 font-medium hover:text-primary transition-colors whitespace-nowrap"
            >
              {isHome1 ? 'Top Tutors' : 'Top Writers'}
            </a>
            <a
              href="/#how-it-works"
              onClick={(e) => handleHashLink(e, 'how-it-works')}
              className="text-sm text-gray-700 font-medium hover:text-primary transition-colors whitespace-nowrap"
            >
              How It Works
            </a>
            <Link to="/reviews" className="text-sm text-gray-700 font-medium hover:text-primary transition-colors whitespace-nowrap">
              Reviews
            </Link>
            <a
              href="/#services"
              onClick={(e) => handleHashLink(e, 'services')}
              className="text-sm text-gray-700 font-medium hover:text-primary transition-colors whitespace-nowrap"
            >
              Services
            </a>
            <a
              href="/#faqs"
              onClick={(e) => handleHashLink(e, 'faqs')}
              className="text-sm text-gray-700 font-medium hover:text-primary transition-colors whitespace-nowrap"
            >
              FAQs
            </a>
          </nav>

          {/* Right: Desktop Actions */}
          <div className="hidden md:flex items-center gap-3">
            {/* Phone — only show on xl */}
            <a
              href={currentPhone.href}
              className="hidden xl:flex items-center gap-1.5 text-primary font-medium text-sm hover:text-primary-hover transition-colors whitespace-nowrap"
            >
              <svg className="w-4 h-4 shrink-0" fill="currentColor" viewBox="0 0 24 24">
                <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
              </svg>
              <span>{currentPhone.display}</span>
            </a>

            {isHome1 ? (
              <>
                {/* Home-1 (Tutoring): show only Hire A Tutor scroll button */}
                <a
                  href="/#hero-order-form"
                  onClick={(e) => handleHashLink(e, 'hero-order-form')}
                  className="flex items-center gap-1.5 bg-primary hover:bg-primary-hover text-white text-sm font-semibold px-4 py-2 rounded-full transition-all shadow-sm whitespace-nowrap cursor-pointer"
                >
                  <svg className="w-3.5 h-3.5 shrink-0" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                  </svg>
                  <span>Hire A Tutor</span>
                </a>
              </>
            ) : (
              <>
                {/* Home (Writing) only: show Hire A Writer + Login */}
                <Link
                  to={SITE_CONFIG.routes.register}
                  className="flex items-center gap-1.5 bg-primary hover:bg-primary-hover text-white text-sm font-semibold px-4 py-2 rounded-full transition-all shadow-sm whitespace-nowrap"
                >
                  <svg className="w-3.5 h-3.5 shrink-0" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                  </svg>
                  <span>Hire A Writer</span>
                </Link>

                <Link
                  to={SITE_CONFIG.routes.login}
                  className="flex items-center gap-2 border border-primary rounded-full px-4 py-2 text-sm text-primary font-semibold hover:bg-primary-light transition-all whitespace-nowrap"
                >
                  <span>Login</span>
                  <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </Link>
              </>
            )}
          </div>

          {/* ── Mobile header right: Login button + Animated toggle button ─ */}
          <div className="flex md:hidden items-center gap-2">
            <Link
              to={SITE_CONFIG.routes.login}
              className="text-xs font-bold text-primary px-3 py-1.5 rounded-full bg-primary/10 hover:bg-primary/20 transition-colors"
            >
              Login
            </Link>

            <button
              type="button"
              onClick={() => setIsMobileMenuOpen((p) => !p)}
              className="p-2 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100 active:bg-slate-200 transition-colors focus:outline-none cursor-pointer"
              aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={isMobileMenuOpen}
            >
              <div className="w-5 h-5 flex flex-col justify-center items-center relative">
                <span
                  className={`block h-0.5 w-5 bg-current rounded-full transition-all duration-300 ease-out ${
                    isMobileMenuOpen ? 'rotate-45 translate-y-0.5' : '-translate-y-1.5'
                  }`}
                />
                <span
                  className={`block h-0.5 w-5 bg-current rounded-full transition-all duration-200 ease-out ${
                    isMobileMenuOpen ? 'opacity-0 scale-x-0' : 'opacity-100'
                  }`}
                />
                <span
                  className={`block h-0.5 w-5 bg-current rounded-full transition-all duration-300 ease-out ${
                    isMobileMenuOpen ? '-rotate-45 -translate-y-0.5' : 'translate-y-1.5'
                  }`}
                />
              </div>
            </button>
          </div>

        </div>
      </div>

      {/* ── Mobile Overlay & Compact Dropdown Card ─────────────────────── */}
      {isMobileMenuOpen && (
        <>
          {/* Subtle backdrop overlay */}
          <div
            className="fixed inset-0 top-16 bg-slate-900/20 backdrop-blur-[1px] z-40 md:hidden transition-opacity"
            onClick={() => setIsMobileMenuOpen(false)}
            aria-hidden="true"
          />

          {/* Sleek, compact floating dropdown card */}
          <div className="absolute top-full right-3 left-3 sm:left-auto sm:right-4 sm:w-72 mt-2 z-50 md:hidden bg-white rounded-2xl border border-slate-200/90 shadow-xl overflow-hidden animate-in fade-in slide-in-from-top-2 duration-150">
            {/* Top header */}
            <div className="px-3.5 py-2 bg-gradient-to-r from-emerald-50/60 to-slate-50 border-b border-slate-100 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                <span className="text-xs font-bold text-slate-800">
                  {isHome1 ? 'TutorsPath Academic' : 'TutorsPath Writing'}
                </span>
              </div>
              <span className="text-[10px] font-bold text-primary bg-primary/10 px-2 py-0.5 rounded-full">
                Online
              </span>
            </div>

            {/* Menu Items */}
            <div className="p-2 space-y-1">
              {/* Primary Call to Action */}
              {isHome1 ? (
                <a
                  href="/home-1#hero-order-form"
                  onClick={(e) => handleHashLink(e, 'hero-order-form')}
                  className="flex items-center justify-center gap-1.5 w-full py-2 px-3 rounded-xl bg-primary hover:bg-primary-hover active:bg-primary-hover text-white text-xs font-bold shadow-sm transition-all cursor-pointer"
                >
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                  </svg>
                  <span>Hire A Tutor</span>
                </a>
              ) : (
                <Link
                  to={SITE_CONFIG.routes.register}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center justify-center gap-1.5 w-full py-2 px-3 rounded-xl bg-primary hover:bg-primary-hover active:bg-primary-hover text-white text-xs font-bold shadow-sm transition-all"
                >
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                  </svg>
                  <span>Hire A Writer</span>
                </Link>
              )}

              {/* Navigation Links */}
              <a
                href="/#top-writers"
                onClick={(e) => handleHashLink(e, 'top-writers')}
                className="flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors cursor-pointer"
              >
                <span>{isHome1 ? 'Top Tutors' : 'Top Writers'}</span>
                <span className="text-slate-400 text-[10px]">#</span>
              </a>

              <a
                href="/#how-it-works"
                onClick={(e) => handleHashLink(e, 'how-it-works')}
                className="flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors cursor-pointer"
              >
                <span>How It Works</span>
                <span className="text-slate-400 text-[10px]">#</span>
              </a>

              <Link
                to="/reviews"
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors"
              >
                <span>Reviews</span>
                <span className="text-[10px] font-bold text-amber-500 bg-amber-50 px-1.5 py-0.5 rounded">4.9★</span>
              </Link>

              <a
                href="/#services"
                onClick={(e) => handleHashLink(e, 'services')}
                className="flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors cursor-pointer"
              >
                <span>Services</span>
                <span className="text-slate-400 text-[10px]">#</span>
              </a>

              <a
                href="/#faqs"
                onClick={(e) => handleHashLink(e, 'faqs')}
                className="flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors cursor-pointer"
              >
                <span>FAQs</span>
                <span className="text-slate-400 text-[10px]">#</span>
              </a>

              {/* Phone Support */}
              <a
                href={currentPhone.href}
                className="flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium text-slate-600 hover:bg-slate-50 transition-colors"
              >
                <div className="flex items-center gap-2.5">
                  <svg className="w-4 h-4 text-primary" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                  </svg>
                  <span>{currentPhone.display}</span>
                </div>
                <span className="text-[10px] font-semibold text-primary">Call</span>
              </a>

              <div className="h-px bg-slate-100 my-1" />

              {/* Auth Buttons */}
              <div className="grid grid-cols-2 gap-2 pt-1">
                <Link
                  to={SITE_CONFIG.routes.login}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center justify-center py-2 px-3 rounded-xl border border-primary text-primary hover:bg-primary-light text-xs font-bold transition-all text-center"
                >
                  Login
                </Link>
                <Link
                  to={SITE_CONFIG.routes.register}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center justify-center py-2 px-3 rounded-xl bg-primary hover:bg-primary-hover text-white text-xs font-bold shadow-xs transition-all text-center"
                >
                  Sign Up
                </Link>
              </div>
            </div>
          </div>
        </>
      )}
    </header>
  );
};

export default Navbar;
