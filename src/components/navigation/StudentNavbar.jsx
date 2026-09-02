import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { SITE_CONFIG } from '../../config/siteConfig';
import tokenManager from '../../services/auth/tokenManager';
import authApi from '../../features/auth/api/authApi';

const StudentNavbar = () => {
  const navigate  = useNavigate();
  const location  = useLocation();
  const [mobileOpen,   setMobileOpen]   = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close desktop dropdown on outside click
  useEffect(() => {
    const handler = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const phone = SITE_CONFIG.phoneHome1 || SITE_CONFIG.phone;
  const user  = tokenManager.getUser();
  const name  = user?.fullName || user?.name || 'Student';
  const email = user?.email || '';
  
  // Initials for avatar
  const initials = name
    .split(' ')
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase() || '')
    .join('');

  // Close mobile menu on route change
  useEffect(() => { 
    setMobileOpen(false); 
  }, [location.pathname]);

  // Close mobile menu on Escape key press or screen resize >= md
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setMobileOpen(false);
        setDropdownOpen(false);
      }
    };
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setMobileOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleLogout = () => {
    setDropdownOpen(false);
    setMobileOpen(false);
    authApi.logout();
    navigate('/');
  };

  const isCurrent = (to) => location.pathname === to;

  return (
    <header className="w-full bg-white border-b border-slate-200 sticky top-0 z-50 shadow-sm relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          {/* ── Logo ──────────────────────────────────────────────────── */}
          <Link to="/student/dashboard" className="flex items-center shrink-0">
            <img
              src="/TutorsPath Logo.svg"
              alt="TutorsPath"
              className="h-5 w-auto"
            />
          </Link>

          {/* ── Desktop Nav Right: Phone + Place Order CTA + User menu ─ */}
          <div className="hidden md:flex items-center gap-3">

            {/* Phone */}
            <a
              href={phone.href}
              className="flex items-center gap-1.5 text-slate-500 hover:text-primary transition-colors text-xs font-medium"
            >
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
              </svg>
              <span>{phone.display}</span>
            </a>

            <div className="h-5 w-px bg-slate-200" />

            {/* Place Order CTA */}
            <Link
              to="/order/place-order"
              className="flex items-center gap-1.5 bg-primary hover:bg-primary-hover text-white text-sm font-bold px-4 py-2 rounded-lg transition-colors shadow-sm"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
              </svg>
              Place Order
            </Link>

            {/* User Area button */}
            <Link
              to="/student/dashboard"
              className="flex items-center gap-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-sm font-bold px-4 py-2 rounded-lg transition-colors"
            >
              <svg className="w-4 h-4 text-slate-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
              </svg>
              User Area
            </Link>

            {/* User chip — click to open dropdown with logout */}
            <div className="relative" ref={dropdownRef}>
              <button
                type="button"
                onClick={() => setDropdownOpen((p) => !p)}
                className="flex items-center gap-2 pl-2 pr-3 py-1.5 rounded-xl bg-slate-50 border border-slate-200 hover:bg-slate-100 transition-colors cursor-pointer"
              >
                <div className="w-7 h-7 rounded-full bg-gradient-to-br from-primary to-emerald-400 flex items-center justify-center text-white text-xs font-black shrink-0">
                  {initials || '?'}
                </div>
                <div className="flex flex-col items-start leading-none">
                  <span className="text-xs font-bold text-slate-800">{name}</span>
                  {email && <span className="text-[10px] text-slate-400 mt-0.5 max-w-[110px] truncate">{email}</span>}
                </div>
                <svg className={`w-3 h-3 text-slate-400 transition-transform ml-0.5 ${dropdownOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                </svg>
              </button>

              {/* Dropdown — logout only */}
              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-44 bg-white border border-slate-200 rounded-xl shadow-lg py-1.5 z-50">
                  <button
                    type="button"
                    onClick={handleLogout}
                    className="w-full flex items-center gap-2.5 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors cursor-pointer"
                  >
                    <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" />
                    </svg>
                    <span className="font-bold">Sign Out</span>
                  </button>
                </div>
              )}
            </div>

          </div>

          {/* ── Mobile header right: Avatar quick pill + Animated toggle button ─ */}
          <div className="flex md:hidden items-center gap-2">
            <button
              type="button"
              onClick={() => setMobileOpen((p) => !p)}
              className="flex items-center gap-1.5 py-1 px-2 rounded-full bg-slate-50 border border-slate-200/80 hover:bg-slate-100 transition-colors cursor-pointer"
              aria-label="Toggle user menu"
            >
              <div className="w-7 h-7 rounded-full bg-gradient-to-br from-primary to-emerald-400 flex items-center justify-center text-white text-xs font-bold shadow-xs">
                {initials || '?'}
              </div>
              <span className="text-xs font-bold text-slate-700 max-w-[75px] truncate">
                {name.split(' ')[0]}
              </span>
            </button>

            <button
              type="button"
              onClick={() => setMobileOpen((p) => !p)}
              className="p-2 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100 active:bg-slate-200 transition-colors focus:outline-none cursor-pointer"
              aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={mobileOpen}
            >
              <div className="w-5 h-5 flex flex-col justify-center items-center relative">
                <span
                  className={`block h-0.5 w-5 bg-current rounded-full transition-all duration-300 ease-out ${
                    mobileOpen ? 'rotate-45 translate-y-0.5' : '-translate-y-1.5'
                  }`}
                />
                <span
                  className={`block h-0.5 w-5 bg-current rounded-full transition-all duration-200 ease-out ${
                    mobileOpen ? 'opacity-0 scale-x-0' : 'opacity-100'
                  }`}
                />
                <span
                  className={`block h-0.5 w-5 bg-current rounded-full transition-all duration-300 ease-out ${
                    mobileOpen ? '-rotate-45 -translate-y-0.5' : 'translate-y-1.5'
                  }`}
                />
              </div>
            </button>
          </div>

        </div>
      </div>

      {/* ── Mobile Overlay & Compact Dropdown Card ─────────────────────── */}
      {mobileOpen && (
        <>
          {/* Subtle backdrop overlay */}
          <div
            className="fixed inset-0 top-16 bg-slate-900/20 backdrop-blur-[1px] z-40 md:hidden transition-opacity"
            onClick={() => setMobileOpen(false)}
            aria-hidden="true"
          />

          {/* Sleek, compact floating dropdown card */}
          <div className="absolute top-full right-3 left-3 sm:left-auto sm:right-4 sm:w-72 mt-2 z-50 md:hidden bg-white rounded-2xl border border-slate-200/90 shadow-xl overflow-hidden animate-in fade-in slide-in-from-top-2 duration-150">
            {/* User Profile Header (Compact & Crisp) */}
            <div className="px-3.5 py-2.5 bg-slate-50/90 border-b border-slate-100 flex items-center justify-between gap-3">
              <div className="flex items-center gap-2.5 min-w-0">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-emerald-400 flex items-center justify-center text-white text-xs font-bold shadow-xs shrink-0">
                  {initials || '?'}
                </div>
                <div className="min-w-0">
                  <p className="text-xs font-bold text-slate-800 truncate leading-tight">{name}</p>
                  {email && <p className="text-[11px] text-slate-400 truncate leading-tight mt-0.5">{email}</p>}
                </div>
              </div>
              <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100/70 px-2 py-0.5 rounded-full shrink-0">
                Student
              </span>
            </div>

            {/* Menu Items (Compact & Normal Proportions) */}
            <div className="p-2 space-y-1">
              {/* Place Order CTA Button */}
              <Link
                to="/order/place-order"
                onClick={() => setMobileOpen(false)}
                className="flex items-center justify-center gap-1.5 w-full py-2 px-3 rounded-xl bg-primary hover:bg-primary-hover active:bg-primary-hover text-white text-xs font-bold shadow-sm transition-all"
              >
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                </svg>
                <span>Place New Order</span>
              </Link>

              {/* My Orders */}
              <Link
                to="/student/dashboard"
                onClick={() => setMobileOpen(false)}
                className={`flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold transition-colors ${
                  isCurrent('/student/dashboard') || isCurrent('/student/orders') || isCurrent('/student/user-area')
                    ? 'bg-emerald-50 text-primary font-bold'
                    : 'text-slate-700 hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <svg className="w-4 h-4 text-slate-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z" />
                  </svg>
                  <span>My Orders</span>
                </div>
                {(isCurrent('/student/dashboard') || isCurrent('/student/orders') || isCurrent('/student/user-area')) && (
                  <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                )}
              </Link>

              {/* Phone Support */}
              <a
                href={phone.href}
                className="flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium text-slate-600 hover:bg-slate-50 transition-colors"
              >
                <div className="flex items-center gap-2.5">
                  <svg className="w-4 h-4 text-primary" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                  </svg>
                  <span>{phone.display}</span>
                </div>
                <span className="text-[10px] font-semibold text-primary">Call</span>
              </a>

              <div className="h-px bg-slate-100 my-1" />

              {/* Sign Out */}
              <button
                type="button"
                onClick={handleLogout}
                className="flex items-center gap-2.5 w-full px-3 py-2 rounded-xl text-xs font-bold text-red-600 hover:bg-red-50 active:bg-red-100 transition-colors cursor-pointer"
              >
                <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" />
                </svg>
                <span>Sign Out</span>
              </button>
            </div>
          </div>
        </>
      )}
    </header>
  );
};

export default StudentNavbar;
