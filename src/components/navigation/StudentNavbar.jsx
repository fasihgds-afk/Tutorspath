import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { SITE_CONFIG } from '../../config/siteConfig';
import tokenManager from '../../services/auth/tokenManager';
import authApi from '../../features/auth/api/authApi';

const StudentNavbar = () => {
  const navigate  = useNavigate();
  const location  = useLocation();
  const [dropdownOpen, setDropdownOpen]     = useState(false);
  const [mobileOpen,   setMobileOpen]       = useState(false);
  const dropdownRef = useRef(null);

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

  // Close dropdown on outside click
  useEffect(() => {
    const handler = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  // Close mobile menu on route change
  useEffect(() => { setMobileOpen(false); }, [location.pathname]);

  const handleLogout = () => {
    setDropdownOpen(false);
    authApi.logout();
    navigate('/');
  };

  const navLinks = [
    { label: 'My Orders',  to: '/student/dashboard' },
    { label: 'Place Order', to: '/order/place-order' },
  ];

  const isActive = (to) => location.pathname === to;

  return (
    <header className="w-full bg-white border-b border-slate-200 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          {/* ── Logo ──────────────────────────────────────────────────── */}
          <Link to="/student/dashboard" className="flex items-center gap-2.5 shrink-0 group">
            <div className="w-8 h-8">
              <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
                <path d="M20 5L30 10L20 15L10 10L20 5Z" fill="url(#snav_a)" />
                <path d="M12 16.5V23C12 27.5 15.5 31 20 31C24.5 31 28 27.5 28 23V16.5"
                      stroke="url(#snav_b)" strokeWidth="2.5" strokeLinecap="round" />
                <path d="M16 20L20 23L24 20" stroke="url(#snav_c)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <defs>
                  <linearGradient id="snav_a" x1="10" y1="5" x2="30" y2="15" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#059669"/><stop offset="1" stopColor="#34D399"/>
                  </linearGradient>
                  <linearGradient id="snav_b" x1="12" y1="16.5" x2="28" y2="31" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#059669"/><stop offset="1" stopColor="#34D399"/>
                  </linearGradient>
                  <linearGradient id="snav_c" x1="16" y1="20" x2="24" y2="23" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#059669"/><stop offset="1" stopColor="#34D399"/>
                  </linearGradient>
                </defs>
              </svg>
            </div>
            <span className="text-xl font-bold tracking-tight text-slate-900 group-hover:text-primary transition-colors">
              Tutors<span className="text-primary">Path</span>
            </span>
          </Link>

          {/* ── Center Nav Links (desktop) ────────────────────────────── */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map(({ label, to }) => (
              <Link
                key={to}
                to={to}
                className={`px-4 py-2 rounded-lg text-sm font-semibold transition-colors ${
                  isActive(to)
                    ? 'bg-primary/10 text-primary'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                {label}
              </Link>
            ))}
          </nav>

          {/* ── Right: Phone + Place Order CTA + User menu ───────────── */}
          <div className="hidden md:flex items-center gap-3">

            {/* Phone */}
            <a href={phone.href}
               className="flex items-center gap-1.5 text-slate-500 hover:text-primary transition-colors text-xs font-medium">
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

            {/* User Avatar Dropdown */}
            <div className="relative" ref={dropdownRef}>
              <button
                type="button"
                onClick={() => setDropdownOpen((p) => !p)}
                className="flex items-center gap-2 pl-1 pr-3 py-1 rounded-xl hover:bg-slate-100 transition-colors cursor-pointer"
              >
                {/* Avatar circle */}
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-emerald-400 flex items-center justify-center text-white text-xs font-black shrink-0 shadow-sm">
                  {initials || '?'}
                </div>
                <div className="flex flex-col items-start leading-none">
                  <span className="text-xs font-bold text-slate-800">{name}</span>
                  {email && <span className="text-[10px] text-slate-400 mt-0.5 max-w-[120px] truncate">{email}</span>}
                </div>
                <svg className={`w-3.5 h-3.5 text-slate-400 transition-transform ${dropdownOpen ? 'rotate-180' : ''}`}
                     fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                </svg>
              </button>

              {/* Dropdown Menu */}
              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-white border border-slate-200 rounded-xl shadow-lg py-1.5 z-50">

                  {/* User info header */}
                  <div className="px-4 py-3 border-b border-slate-100">
                    <div className="flex items-center gap-2.5">
                      <div className="w-9 h-9 rounded-full bg-gradient-to-br from-primary to-emerald-400 flex items-center justify-center text-white text-sm font-black shrink-0">
                        {initials || '?'}
                      </div>
                      <div className="overflow-hidden">
                        <p className="text-sm font-bold text-slate-800 truncate">{name}</p>
                        {email && <p className="text-xs text-slate-400 truncate">{email}</p>}
                      </div>
                    </div>
                  </div>

                  {/* Menu items */}
                  <div className="py-1">
                    <Link
                      to="/student/dashboard"
                      onClick={() => setDropdownOpen(false)}
                      className="flex items-center gap-3 px-4 py-2.5 text-sm text-slate-700 hover:bg-slate-50 hover:text-primary transition-colors"
                    >
                      <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z" />
                      </svg>
                      <span className="font-medium">My Dashboard</span>
                    </Link>

                    <Link
                      to="/order/place-order"
                      onClick={() => setDropdownOpen(false)}
                      className="flex items-center gap-3 px-4 py-2.5 text-sm text-slate-700 hover:bg-slate-50 hover:text-primary transition-colors"
                    >
                      <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span className="font-medium">Place New Order</span>
                    </Link>

                    <a
                      href={phone.href}
                      onClick={() => setDropdownOpen(false)}
                      className="flex items-center gap-3 px-4 py-2.5 text-sm text-slate-700 hover:bg-slate-50 hover:text-primary transition-colors"
                    >
                      <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                      </svg>
                      <span className="font-medium">Contact Support</span>
                    </a>
                  </div>

                  {/* Logout */}
                  <div className="border-t border-slate-100 pt-1">
                    <button
                      type="button"
                      onClick={handleLogout}
                      className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors cursor-pointer"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" />
                      </svg>
                      <span className="font-bold">Sign Out</span>
                    </button>
                  </div>

                </div>
              )}
            </div>

          </div>

          {/* ── Mobile hamburger ──────────────────────────────────────── */}
          <button
            type="button"
            onClick={() => setMobileOpen((p) => !p)}
            className="md:hidden p-2 rounded-lg text-slate-600 hover:bg-slate-100 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              {mobileOpen
                ? <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                : <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />}
            </svg>
          </button>

        </div>
      </div>

      {/* ── Mobile Menu ─────────────────────────────────────────────── */}
      {mobileOpen && (
        <div className="md:hidden border-t border-slate-100 bg-white px-4 py-4 flex flex-col gap-2">

          {/* User info */}
          <div className="flex items-center gap-3 px-3 py-3 bg-slate-50 rounded-xl mb-1">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-emerald-400 flex items-center justify-center text-white font-black text-sm shrink-0">
              {initials || '?'}
            </div>
            <div className="overflow-hidden">
              <p className="text-sm font-bold text-slate-800 truncate">{name}</p>
              {email && <p className="text-xs text-slate-400 truncate">{email}</p>}
            </div>
          </div>

          {navLinks.map(({ label, to }) => (
            <Link
              key={to}
              to={to}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold transition-colors ${
                isActive(to)
                  ? 'bg-primary/10 text-primary'
                  : 'text-slate-700 hover:bg-slate-100'
              }`}
            >
              {label}
            </Link>
          ))}

          <a href={phone.href}
             className="flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold text-slate-700 hover:bg-slate-100 transition-colors">
            <svg className="w-4 h-4 text-primary" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
            </svg>
            {phone.display}
          </a>

          <div className="border-t border-slate-100 mt-1 pt-2">
            <button
              type="button"
              onClick={handleLogout}
              className="w-full flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-bold text-red-600 hover:bg-red-50 transition-colors cursor-pointer"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" />
              </svg>
              Sign Out
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

export default StudentNavbar;
