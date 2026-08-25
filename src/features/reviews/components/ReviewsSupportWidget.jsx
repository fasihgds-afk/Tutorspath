import React from 'react';
import { SITE_CONFIG } from '../../../config/siteConfig';

const ReviewsSupportWidget = () => {
  return (
    <div className="bg-white rounded-[20px] border border-[#f1f5f9] p-5 shadow-[0_10px_30px_rgba(0,0,0,0.03)] flex flex-col gap-3">

      {/* Header bar — same style as WhyChooseUs */}
      <div className="bg-primary text-white text-center py-2.5 rounded-[12px] font-black text-[14px] tracking-wide">
        Need Assistance?
      </div>

      {/* Subtitle */}
      <p className="text-[#64748b] text-[13px] text-center font-medium">
        Our support team is available <span className="text-primary font-bold">24/7</span>
      </p>

      {/* Buttons */}
      <div className="flex flex-col gap-2 pt-1">
        <a
          href={SITE_CONFIG.whatsapp.href}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2.5 px-4 py-2.5 border border-slate-200 rounded-xl text-[13px] font-semibold text-slate-700 hover:border-primary hover:text-primary hover:bg-primary-soft transition-colors"
        >
          <svg className="w-4 h-4 text-primary shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
          </svg>
          Call {SITE_CONFIG.phone.display}
        </a>

        <button
          type="button"
          onClick={() => { if (window.Tawk_API?.maximize) window.Tawk_API.maximize(); }}
          className="flex items-center gap-2.5 px-4 py-2.5 border border-slate-200 rounded-xl text-[13px] font-semibold text-slate-700 hover:border-primary hover:text-primary hover:bg-primary-soft transition-colors cursor-pointer w-full"
        >
          <svg className="w-4 h-4 text-primary shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z" />
          </svg>
          Live Chat
        </button>

        <a
          href={SITE_CONFIG.email.href}
          className="flex items-center gap-2.5 px-4 py-2.5 border border-slate-200 rounded-xl text-[13px] font-semibold text-slate-700 hover:border-primary hover:text-primary hover:bg-primary-soft transition-colors"
        >
          <svg className="w-4 h-4 text-primary shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
          </svg>
          Email Support
        </a>
      </div>

    </div>
  );
};

export default ReviewsSupportWidget;
