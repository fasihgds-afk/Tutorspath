import React from 'react';

const RegisterTrustBadge = () => {
  return (
    <div className="bg-surface rounded-2xl p-3.5 shadow-md border border-card-border flex items-center justify-between gap-3 w-full lg:max-w-[410px] hover:-translate-y-0.5 hover:shadow-lg transition-all duration-300">
      <div className="flex flex-col">
        <div className="flex items-center gap-1.5">
          <span className="text-[17px] font-extrabold text-text-dark">4.8/5</span>
          <div className="flex text-primary-200 text-[13px]">★★★★★</div>
        </div>
        <span className="text-[10px] text-text-body font-medium opacity-60">Based on 2,000+ Reviews</span>
      </div>
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-1 font-bold text-[12px] text-text-dark">
          <svg className="w-3.5 h-3.5 text-primary" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 0l3.709 7.513 8.291 1.206-6 5.846 1.418 8.257-7.418-3.902-7.418 3.902 1.418-8.257-6-5.846 8.291-1.206z" />
          </svg>
          <span>Trustpilot</span>
        </div>
        <div className="flex items-center gap-0.5 font-bold text-[12px] text-text-dark">
          <span className="text-primary text-[14px]">@</span>
          <span className="tracking-tight">BizProbe</span>
        </div>
      </div>
    </div>
  );
};

export default RegisterTrustBadge;