import React from 'react';

const RegisterTrustBadge = () => {
  return (
    <div className="bg-surface rounded-2xl p-3.5 shadow-md border border-card-border flex items-center justify-between gap-3 w-full lg:max-w-[410px] hover:-translate-y-0.5 hover:shadow-lg transition-all duration-300">
      <div className="flex flex-col">
        <div className="flex items-center gap-1.5">
          <span className="text-[17px] font-extrabold text-text-dark">4.8/5</span>
          <div className="flex text-amber-400 text-[13px] gap-0.5">
            <span>★</span><span>★</span><span>★</span><span>★</span><span>★</span>
          </div>
        </div>
        <span className="text-[10px] text-text-body font-medium opacity-65">Based on 2,000+ Reviews</span>
      </div>
      <div className="flex items-center gap-2">
        {/* Trustpilot */}
        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-emerald-50/80 border border-emerald-200/60 shadow-xs hover:bg-emerald-50 transition-colors">
          <div className="w-4 h-4 rounded bg-[#00b67a] flex items-center justify-center shrink-0">
            <svg className="w-2.5 h-2.5 text-white" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
            </svg>
          </div>
          <span className="font-bold text-[11px] text-text-dark tracking-tight">Trustpilot</span>
        </div>

        {/* reviews.io */}
        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-sky-50/80 border border-sky-200/60 shadow-xs hover:bg-sky-50 transition-colors">
          <div className="w-4 h-4 rounded bg-[#0e131f] flex items-center justify-center shrink-0">
            <svg className="w-2.5 h-2.5 text-[#00c48c]" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2l2.4 7.4h7.6l-6.2 4.5 2.4 7.4-6.2-4.5-6.2 4.5 2.4-7.4-6.2-4.5h7.6z" />
            </svg>
          </div>
          <span className="font-bold text-[11px] text-text-dark tracking-tight">
            reviews<span className="text-[#0284c7] font-black">.io</span>
          </span>
        </div>
      </div>
    </div>
  );
};

export default RegisterTrustBadge;