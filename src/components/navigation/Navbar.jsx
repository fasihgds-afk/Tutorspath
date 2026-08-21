import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="w-full bg-white shadow-sm border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Left: Logo */}
          <div className="flex items-center space-x-3">
            <Link to="/" className="flex items-center space-x-2.5 group">
              {/* Logo Icon */}
              <div className="w-10 h-10 flex items-center justify-center">
                <svg className="w-full h-full" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M20 5L30 10L20 15L10 10L20 5Z" fill="url(#paint0_linear)"/>
                  <path d="M12 16.5V23C12 27.5 15.5 31 20 31C24.5 31 28 27.5 28 23V16.5" stroke="url(#paint1_linear)" strokeWidth="2.5" strokeLinecap="round"/>
                  <path d="M16 20L20 23L24 20" stroke="url(#paint2_linear)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <circle cx="31" cy="7" r="2" fill="var(--color-brand-end, #8B5CF6)"/>
                  <defs>
                    <linearGradient id="paint0_linear" x1="10" y1="5" x2="30" y2="15" gradientUnits="userSpaceOnUse">
                      <stop stopColor="var(--color-brand-start, #6366F1)"/>
                      <stop offset="1" stopColor="var(--color-brand-end, #A855F7)"/>
                    </linearGradient>
                    <linearGradient id="paint1_linear" x1="12" y1="16.5" x2="28" y2="31" gradientUnits="userSpaceOnUse">
                      <stop stopColor="var(--color-brand-start, #6366F1)"/>
                      <stop offset="1" stopColor="var(--color-brand-end, #A855F7)"/>
                    </linearGradient>
                    <linearGradient id="paint2_linear" x1="16" y1="20" x2="24" y2="23" gradientUnits="userSpaceOnUse">
                      <stop stopColor="var(--color-brand-start, #6366F1)"/>
                      <stop offset="1" stopColor="var(--color-brand-end, #A855F7)"/>
                    </linearGradient>
                  </defs>
                </svg>
              </div>
              {/* Logo Text */}
              <span className="text-2xl font-bold tracking-tight text-gray-900">
                Tutors<span className="text-primary">fy</span>
              </span>
            </Link>
          </div>

          {/* Center Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-8">
            <Link to="/#top-writers" className="text-gray-900 font-medium hover:text-primary transition-colors">
              Top Writers
            </Link>
            <Link to="/#how-it-works" className="text-gray-900 font-medium hover:text-primary transition-colors">
              How It Works
            </Link>
            <Link to="/#reviews" className="text-gray-900 font-medium hover:text-primary transition-colors">
              Reviews
            </Link>
            <Link to="/#services" className="text-gray-900 font-medium hover:text-primary transition-colors">
              Services
            </Link>
            <Link to="/#faqs" className="text-gray-900 font-medium hover:text-primary transition-colors">
              FAQs
            </Link>
          </nav>

          {/* Right Actions: Phone & Login */}
          <div className="hidden md:flex items-center space-x-6">
            {/* Phone Number */}
            <a 
              href="tel:+442033185601" 
              className="flex items-center space-x-2 text-primary font-semibold hover:text-primary-hover transition-colors"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
              </svg>
              <span className="text-base tracking-wide">+44 (203) 318-5601</span>
            </a>

            {/* Place New Order / Register Button */}
            <Link
              to="/account/register"
              className="flex items-center gap-2 bg-primary hover:bg-primary-hover text-white font-semibold px-5 py-2 rounded-full transition-all shadow-sm"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
              </svg>
              <span>Place New Order</span>
            </Link>

            {/* Login Button */}
            <Link 
              to="/login" 
              className="flex items-center border border-primary rounded-full px-5 py-2 text-primary font-semibold hover:bg-primary-light transition-all space-x-3"
            >
              <span>Login</span>
              <span className="inline-block w-px h-4 bg-primary-border"></span>
              <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
              </svg>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex lg:hidden items-center">
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
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16"></path>
                </svg>
              )}
            </button>
          </div>

        </div>

        {/* Mobile Dropdown Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden border-t border-gray-100 py-4 space-y-3">
            <Link 
              to="/#top-writers" 
              onClick={() => setIsMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-900 hover:text-primary hover:bg-gray-50"
            >
              Top Writers
            </Link>
            <Link 
              to="/#how-it-works" 
              onClick={() => setIsMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-900 hover:text-primary hover:bg-gray-50"
            >
              How It Works
            </Link>
            <Link 
              to="/#reviews" 
              onClick={() => setIsMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-900 hover:text-primary hover:bg-gray-50"
            >
              Reviews
            </Link>
            <Link 
              to="/#services" 
              onClick={() => setIsMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-900 hover:text-primary hover:bg-gray-50"
            >
              Services
            </Link>
            <Link 
              to="/#faqs" 
              onClick={() => setIsMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-900 hover:text-primary hover:bg-gray-50"
            >
              FAQs
            </Link>
            <div className="pt-4 border-t border-gray-100 flex flex-col gap-3 px-3">
              <a 
                href="tel:+442033185601" 
                className="flex items-center space-x-2 text-primary font-semibold"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.45.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
                </svg>
                <span>+44 (203) 318-5601</span>
              </a>
              {/* Place New Order / Register */}
              <Link
                to="/account/register"
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center justify-center gap-2 bg-primary hover:bg-primary-hover text-white font-semibold px-5 py-2.5 rounded-full transition-all"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                </svg>
                <span>Place New Order</span>
              </Link>
              <Link 
                to="/login" 
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
