import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { SITE_CONFIG } from '../../config/siteConfig';

const Footer = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const homePhone = SITE_CONFIG.phoneHome || SITE_CONFIG.phone;

  const handleHashLink = (e, hash) => {
    e.preventDefault();
    if (location.pathname === '/' || location.pathname === '/home') {
      const el = document.getElementById(hash);
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else {
      navigate(`/#${hash}`);
    }
  };
  return (
    <footer className="w-full bg-slate-950 font-sans antialiased text-slate-300 pt-16 pb-10 border-t border-slate-800/80 relative overflow-hidden">
      {/* Subtle emerald ambient glow in background */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-32 bg-emerald-500/5 blur-3xl pointer-events-none" />

      <div className="max-w-[1320px] mx-auto px-6 lg:px-12 w-full relative z-10">

        {/* Top Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8 pb-14 border-b border-slate-800/80">

          {/* Column 1: Logo & Description (Span 2 on lg) */}
          <div className="lg:col-span-2 flex flex-col pr-0 lg:pr-8">
            {/* Brand Logo */}
            <Link to="/" className="flex items-center mb-5 group w-fit">
              <img
                src="/TutorsPath Logo White.svg"
                alt="TutorsPath"
                className="h-5 w-auto"
              />
            </Link>

            {/* Tagline */}
            <p className="text-slate-400 text-sm leading-relaxed max-w-[340px] mb-6">
              Your trusted partner for high-quality academic writing and coursework help. We're here to support your academic success at every step.
            </p>

          </div>

          {/* Column 2: Our Services */}
          <div className="flex flex-col">
            <h3 className="text-white font-bold text-sm uppercase tracking-wider mb-5">Our Services</h3>
            <ul className="space-y-3">
              <li><a href="/#services" onClick={(e) => handleHashLink(e, 'services')} className="text-slate-400 hover:text-emerald-400 text-sm transition-colors cursor-pointer">Essay Writing</a></li>
              <li><a href="/#services" onClick={(e) => handleHashLink(e, 'services')} className="text-slate-400 hover:text-emerald-400 text-sm transition-colors cursor-pointer">Research Paper Writing</a></li>
              <li><a href="/#services" onClick={(e) => handleHashLink(e, 'services')} className="text-slate-400 hover:text-emerald-400 text-sm transition-colors cursor-pointer">Assignment Help</a></li>
              <li><a href="/#services" onClick={(e) => handleHashLink(e, 'services')} className="text-slate-400 hover:text-emerald-400 text-sm transition-colors cursor-pointer">Coursework Help</a></li>
              <li><a href="/#services" onClick={(e) => handleHashLink(e, 'services')} className="text-slate-400 hover:text-emerald-400 text-sm transition-colors cursor-pointer">Dissertation & Thesis</a></li>
              <li><a href="/#services" onClick={(e) => handleHashLink(e, 'services')} className="text-slate-400 hover:text-emerald-400 text-sm transition-colors cursor-pointer">Case Study Writing</a></li>
            </ul>
          </div>

          {/* Column 3: Quick Links */}
          <div className="flex flex-col">
            <h3 className="text-white font-bold text-sm uppercase tracking-wider mb-5">Quick Links</h3>
            <ul className="space-y-3">
              <li><Link to="/" className="text-slate-400 hover:text-emerald-400 text-sm transition-colors">Home</Link></li>
              <li>
                <a href="/#top-writers" onClick={(e) => handleHashLink(e, 'top-writers')} className="text-slate-400 hover:text-emerald-400 text-sm transition-colors cursor-pointer">
                  Top Writers
                </a>
              </li>
              <li>
                <a href="/#how-it-works" onClick={(e) => handleHashLink(e, 'how-it-works')} className="text-slate-400 hover:text-emerald-400 text-sm transition-colors cursor-pointer">
                  How It Works
                </a>
              </li>
              <li>
                <Link to="/reviews" className="text-slate-400 hover:text-emerald-400 text-sm transition-colors">
                  Student Reviews
                </Link>
              </li>
              <li>
                <a href="/#services" onClick={(e) => handleHashLink(e, 'services')} className="text-slate-400 hover:text-emerald-400 text-sm transition-colors cursor-pointer">
                  All Services
                </a>
              </li>
              <li>
                <a href="/#faqs" onClick={(e) => handleHashLink(e, 'faqs')} className="text-slate-400 hover:text-emerald-400 text-sm transition-colors cursor-pointer">
                  FAQs
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact Us */}
          <div className="flex flex-col">
            <h3 className="text-white font-bold text-sm uppercase tracking-wider mb-5">Contact Us</h3>
            <ul className="space-y-3">
              <li>
                <a href={homePhone.href} className="flex items-center gap-2.5 text-slate-400 hover:text-emerald-400 text-xs sm:text-sm transition-colors">
                  <svg className="w-4 h-4 text-emerald-400 shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                  </svg>
                  {homePhone.display}
                </a>
              </li>
              <li>
                <a href={SITE_CONFIG.email.href} className="flex items-center gap-2.5 text-slate-400 hover:text-emerald-400 text-xs sm:text-sm transition-colors">
                  <svg className="w-4 h-4 text-emerald-400 shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  {SITE_CONFIG.email.display}
                </a>
              </li>
              <li>
                <span className="flex items-center gap-2.5 text-slate-400 text-xs sm:text-sm">
                  <svg className="w-4 h-4 text-emerald-400 shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                  24/7 Live Support Team
                </span>
              </li>
             
            </ul>
          </div>

        </div>

        {/* Middle Bar: Copyright, Payment Methods, Security Badges */}
        <div className="py-7 flex flex-col lg:flex-row items-center justify-between gap-6 border-b border-slate-800/80">

          {/* Copyright */}
          <div className="text-slate-400 text-xs sm:text-sm">
            &copy; {new Date().getFullYear()} TutorsPath. All Rights Reserved.
          </div>

          {/* Payment Methods & Security */}
          <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-8">

            {/* We Accept Payments */}
            <div className="flex items-center gap-3">
              <span className="text-slate-400 text-xs font-semibold">We Accept:</span>
              <div className="flex items-center gap-2">
                {/* Visa */}
                <div className="bg-white px-2 py-1 rounded-md shadow-xs flex items-center justify-center h-6">
                  <span className="text-[11px] font-black italic tracking-tighter text-blue-900">VISA</span>
                </div>
                {/* Mastercard */}
                <div className="bg-white px-2 py-1 rounded-md shadow-xs flex items-center justify-center h-6">
                  <div className="flex -space-x-1.5">
                    <div className="w-3 h-3 rounded-full bg-red-500 opacity-90"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500 opacity-90"></div>
                  </div>
                </div>
                {/* American Express */}
                <div className="bg-white px-1.5 py-1 rounded-md shadow-xs flex items-center justify-center h-6">
                  <span className="text-[9px] font-bold text-blue-600 tracking-tighter">AMEX</span>
                </div>
                {/* Discover */}
                <div className="bg-white px-1.5 py-1 rounded-md shadow-xs flex items-center justify-center h-6">
                  <span className="text-[9px] font-extrabold text-orange-600 tracking-tighter">DISCOVER</span>
                </div>
                {/* PayPal */}
                <div className="bg-white px-2 py-1 rounded-md shadow-xs flex items-center justify-center h-6">
                  <span className="text-[10px] font-bold text-blue-700 italic">PayPal</span>
                </div>
              </div>
            </div>

            {/* Divider */}
            <div className="hidden lg:block w-px h-6 bg-slate-800"></div>

            {/* Security Badges */}
            <div className="flex items-center gap-5">
              {/* SSL */}
              <div className="flex items-center gap-1.5 text-slate-300">
                <svg className="w-4 h-4 text-emerald-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 1.944A11.954 11.954 0 012.166 5C2.056 5.649 2 6.319 2 7c0 5.225 3.34 9.67 8 11.317C14.66 16.67 18 12.225 18 7c0-.682-.057-1.35-.166-2.001A11.954 11.954 0 0110 1.944zM11 14a1 1 0 11-2 0 1 1 0 012 0zm0-7a1 1 0 10-2 0v3a1 1 0 102 0V7z" clipRule="evenodd" />
                </svg>
                <div className="leading-tight text-left">
                  <div className="text-[9.5px] font-bold text-slate-400">256-BIT SSL</div>
                  <div className="text-[10.5px] font-extrabold text-white">ENCRYPTED</div>
                </div>
              </div>

              {/* McAfee */}
              <div className="flex items-center gap-1.5 text-slate-300">
                <svg className="w-4 h-4 text-red-500" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 10.99h7c-.53 4.12-3.28 7.79-7 8.94V12H5V6.3l7-3.11v8.8z" />
                </svg>
                <div className="leading-tight text-left">
                  <div className="text-[9.5px] font-bold text-slate-400">McAfee</div>
                  <div className="text-[10.5px] font-extrabold text-white">SECURE</div>
                </div>
              </div>

              {/* Norton */}
              <div className="flex items-center gap-1.5 text-slate-300">
                <div className="w-4 h-4 rounded-full bg-yellow-400 flex items-center justify-center text-slate-900 font-bold text-[9.5px]">✓</div>
                <div className="leading-tight text-left">
                  <div className="text-[10px] font-bold text-white">Norton</div>
                  <div className="text-[9px] text-slate-400 uppercase">VERIFIED</div>
                </div>
              </div>
            </div>

          </div>

        </div>

     

      </div>
    </footer>
  );
};

export default Footer;