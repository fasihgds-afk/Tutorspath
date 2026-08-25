import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { SITE_CONFIG } from '../../config/siteConfig';

const StudentNavbar = () => {
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const phone = SITE_CONFIG.phoneHome1 || SITE_CONFIG.phone;

  const handleLogout = () => {
    // Clear tokens/session if needed
    localStorage.removeItem('authToken');
    navigate('/login');
  };

  return (
    <header className="w-full bg-white shadow-xs border-b border-slate-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">

          {/* Left: Logo */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2.5 group">
              {/* Logo Icon */}
              <div className="w-10 h-10 flex items-center justify-center">
                <svg className="w-full h-full" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M20 5L30 10L20 15L10 10L20 5Z" fill="url(#paint0_linear_student)" />
                  <path d="M12 16.5V23C12 27.5 15.5 31 20 31C24.5 31 28 27.5 28 23V16.5" stroke="url(#paint1_linear_student)" strokeWidth="2.5" strokeLinecap="round" />
                  <path d="M16 20L20 23L24 20" stroke="url(#paint2_linear_student)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  <circle cx="31" cy="7" r="2" fill="var(--color-brand-end, #34D399)" />
                  <defs>
                    <linearGradient id="paint0_linear_student" x1="10" y1="5" x2="30" y2="15" gradientUnits="userSpaceOnUse">
                      <stop stopColor="var(--color-brand-start, #059669)" />
                      <stop offset="1" stopColor="var(--color-brand-end, #34D399)" />
                    </linearGradient>
                    <linearGradient id="paint1_linear_student" x1="12" y1="16.5" x2="28" y2="31" gradientUnits="userSpaceOnUse">
                      <stop stopColor="var(--color-brand-start, #059669)" />
                      <stop offset="1" stopColor="var(--color-brand-end, #34D399)" />
                    </linearGradient>
                    <linearGradient id="paint2_linear_student" x1="16" y1="20" x2="24" y2="23" gradientUnits="userSpaceOnUse">
                      <stop stopColor="var(--color-brand-start, #059669)" />
                      <stop offset="1" stopColor="var(--color-brand-end, #34D399)" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>

              {/* Logo Text */}
              <span className="text-2xl font-bold tracking-tight text-slate-900">
                Tutors<span className="text-primary">fy</span>
              </span>
            </Link>
          </div>

          {/* Right: Phone, User Area & Logout (Desktop) */}
          <div className="hidden md:flex items-center space-x-5">
            {/* Phone Number */}
            <a
              href={phone.href}
              className="flex items-center gap-2 text-slate-700 hover:text-primary transition-colors text-sm font-semibold py-2 px-3 rounded-xl hover:bg-slate-50"
            >
              <div className="w-8 h-8 rounded-full bg-emerald-50 text-primary flex items-center justify-center">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                </svg>
              </div>
              <span>{phone.display}</span>
            </a>

            {/* Divider */}
            <div className="h-6 w-px bg-slate-200" />

            {/* User Area Button */}
            <Link
              to="/student/dashboard"
              className="flex items-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-sm px-4 py-2.5 rounded-xl transition-all"
            >
              <svg className="w-4 h-4 text-slate-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
              </svg>
              <span>User Area</span>
            </Link>

            {/* Logout Button */}
            <button
              type="button"
              onClick={handleLogout}
              className="flex items-center gap-1.5 text-slate-600 hover:text-red-600 hover:bg-red-50 font-bold text-sm px-3.5 py-2.5 rounded-xl transition-colors cursor-pointer"
              title="Logout from account"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" />
              </svg>
              <span>Logout</span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center md:hidden">
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100 focus:outline-none"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                {isMobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>

        </div>

        {/* Mobile Dropdown */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-slate-100 flex flex-col gap-3">
            <a
              href={phone.href}
              className="flex items-center gap-2 text-slate-800 font-semibold text-sm py-2 px-3 rounded-lg bg-slate-50"
            >
              <svg className="w-4 h-4 text-primary" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
              </svg>
              <span>Call Support: {phone.display}</span>
            </a>

            <div className="flex items-center gap-2 pt-2">
              <Link
                to="/student/dashboard"
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex-1 text-center bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-sm py-2.5 rounded-xl"
              >
                User Area
              </Link>

              <button
                type="button"
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  handleLogout();
                }}
                className="flex-1 text-center bg-red-50 text-red-600 font-bold text-sm py-2.5 rounded-xl cursor-pointer"
              >
                Logout
              </button>
            </div>
          </div>
        )}

      </div>
    </header>
  );
};

export default StudentNavbar;
