import React from 'react';
import { SITE_CONFIG } from '../../config/siteConfig';

const StudentFooter = () => {
  const phone = SITE_CONFIG.phoneHome1 || SITE_CONFIG.phone;
  const email = SITE_CONFIG.email;

  return (
    <footer className="w-full bg-slate-900 border-t border-slate-700/60 py-5 px-4 sm:px-6 lg:px-8 mt-auto">
      <div className="max-w-7xl mx-auto flex flex-col gap-3">

        {/* Line 1: Contact + Copyright */}
        <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-xs text-slate-400 font-medium">
          {/* Copyright */}
          <span>&copy; {new Date().getFullYear()} TutorsPath. All rights reserved.</span>

          <span className="text-slate-700 select-none hidden sm:inline">•</span>

          {/* Phone */}
          <a
            href={phone.href}
            className="flex items-center gap-1.5 hover:text-primary transition-colors"
          >
            <svg className="w-3.5 h-3.5 shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
            </svg>
            <span>{phone.display}</span>
          </a>

          <span className="text-slate-700 select-none hidden sm:inline">•</span>

          {/* Email */}
          <a
            href={email.href}
            className="flex items-center gap-1.5 hover:text-primary transition-colors"
          >
            <svg className="w-3.5 h-3.5 shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
            </svg>
            <span>{email.display}</span>
          </a>

          <span className="text-slate-700 select-none hidden sm:inline">•</span>

          {/* Trust badges inline */}
          <span className="flex items-center gap-1 text-slate-500">
            <svg className="w-3 h-3 text-emerald-500" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
            </svg>
            100% Secure &amp; Confidential
          </span>

          <span className="text-slate-700 select-none hidden sm:inline">•</span>

          <span className="flex items-center gap-1 text-slate-500">
            <svg className="w-3 h-3 text-emerald-500" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
            </svg>
            Free Revisions
          </span>
        </div>

        {/* Line 2: Educational Disclaimer */}
        <p className="text-[11px] text-slate-600 max-w-4xl mx-auto leading-relaxed text-center">
          Disclaimer: The research, editing, and model writing services provided on this platform are intended strictly for educational reference and academic guidance purposes.
        </p>

      </div>
    </footer>
  );
};

export default StudentFooter;
