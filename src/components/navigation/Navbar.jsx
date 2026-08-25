import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { SITE_CONFIG } from '../../config/siteConfig';

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const activeHomeVal = String(SITE_CONFIG.activeHome || '').trim().toLowerCase();
  const isHome1 =
    location.pathname.startsWith('/home-1') ||
    location.pathname.startsWith('/home1') ||
    (location.pathname === '/' && (activeHomeVal === 'home-1' || activeHomeVal === 'home1' || activeHomeVal === '1'));

  const currentPhone = isHome1 ? (SITE_CONFIG.phoneHome1 || SITE_CONFIG.phone) : (SITE_CONFIG.phoneHome || SITE_CONFIG.phone);

  /**
   * For hash links: if already on home, scroll directly.
   * If on another page, navigate to /#hash and ScrollToHash handles the rest.
   */
  const handleHashLink = (e, hash) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);
    if (location.pathname === '/' || location.pathname === '/home' || location.pathname === '/home-1' || location.pathname === '/home1') {
      const el = document.getElementById(hash);
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else {
      const targetHome = isHome1 ? '/home-1' : '/';
      navigate(`${targetHome}#${hash}`);
    }
  };

  return (
    <header className="w-full bg-white shadow-sm border-b border-gray-100 sticky top-0 z-50">
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

          {/* Right: Phone + Actions */}
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

            {/* Hire A Writer / Tutor — hidden on Home-1 */}
            {!isHome1 && (
              <Link
                to={SITE_CONFIG.routes.register}
                className="flex items-center gap-1.5 bg-primary hover:bg-primary-hover text-white text-sm font-semibold px-4 py-2 rounded-full transition-all shadow-sm whitespace-nowrap"
              >
                <svg className="w-3.5 h-3.5 shrink-0" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                </svg>
                <span>{isHome1 ? 'Hire A Tutor' : 'Hire A Writer'}</span>
              </Link>
            )}

            {/* Login */}
            <Link
              to={SITE_CONFIG.routes.login}
              className="flex items-center gap-2 border border-primary rounded-full px-4 py-2 text-sm text-primary font-semibold hover:bg-primary-light transition-all whitespace-nowrap"
            >
              <span>Login</span>
              <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center">
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-gray-700 hover:text-gray-900 focus:outline-none p-2"
              aria-label="Toggle mobile menu"
            >
              {isMobileMenuOpen ? (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>

        </div>

        {/* Mobile Dropdown Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-gray-100 py-4 space-y-1">
            <a
              href="/#top-writers"
              onClick={(e) => handleHashLink(e, 'top-writers')}
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-900 hover:text-primary hover:bg-gray-50 cursor-pointer"
            >
              {isHome1 ? 'Top Tutors' : 'Top Writers'}
            </a>
            <a
              href="/#how-it-works"
              onClick={(e) => handleHashLink(e, 'how-it-works')}
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-900 hover:text-primary hover:bg-gray-50 cursor-pointer"
            >
              How It Works
            </a>
            <Link
              to="/reviews"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-900 hover:text-primary hover:bg-gray-50"
            >
              Reviews
            </Link>
            <a
              href="/#services"
              onClick={(e) => handleHashLink(e, 'services')}
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-900 hover:text-primary hover:bg-gray-50 cursor-pointer"
            >
              Services
            </a>
            <a
              href="/#faqs"
              onClick={(e) => handleHashLink(e, 'faqs')}
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-900 hover:text-primary hover:bg-gray-50 cursor-pointer"
            >
              FAQs
            </a>
            <div className="pt-4 border-t border-gray-100 flex flex-col gap-3 px-3">
              <a
                href={currentPhone.href}
                className="flex items-center space-x-2 text-primary font-semibold"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
                </svg>
                <span>{currentPhone.display}</span>
              </a>
              {/* Hire A Writer / Tutor — hidden on Home-1 */}
              {!isHome1 && (
                <Link
                  to={SITE_CONFIG.routes.register}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center justify-center gap-2 bg-primary hover:bg-primary-hover text-white font-semibold px-5 py-2.5 rounded-full transition-all"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                  </svg>
                  <span>{isHome1 ? 'Hire A Tutor' : 'Hire A Writer'}</span>
                </Link>
              )}
              <Link
                to={SITE_CONFIG.routes.login}
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center justify-center border border-primary rounded-full px-5 py-2 text-primary font-semibold hover:bg-primary-light transition-all space-x-2"
              >
                <span>Login</span>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                </svg>
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;
