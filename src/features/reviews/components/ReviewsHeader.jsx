import React, { useState } from 'react';

const ratingBars = [
  { label: '5 star', pct: '95%', value: '95%' },
  { label: '4 star', pct: '4%',  value: '4%' },
  { label: '3 star', pct: '0.5%', value: '0.5%' },
  { label: '2 star', pct: '0.3%', value: '0.3%' },
  { label: '1 star', pct: '0.2%', value: '0.2%' },
];

const ReviewsHeader = () => {
  const [sortBy, setSortBy] = useState('Most Recent');

  return (
    <div className="bg-white rounded-[20px] border border-[#f1f5f9] p-6 lg:p-8 shadow-[0_10px_30px_rgba(0,0,0,0.03)] flex flex-col gap-6">

      {/* Title + description */}
      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-2">
          <h2 className="text-[#0f172a] text-[20px] font-black">Reviews</h2>
          <span className="text-[12px] font-bold text-[#64748b] bg-[#f1f5f9] px-2.5 py-0.5 rounded-md">
            (5K+)
          </span>
        </div>
        <p className="text-[#64748b] text-[13.5px] leading-relaxed">
          Learn more about TutorsFy through recent student experiences. These sample reviews reflect
          the quality, delivery, and support students can expect from our team.
        </p>
      </div>

      {/* Rating Breakdown Bars */}
      <div className="flex flex-col gap-2 max-w-[420px]">
        {ratingBars.map((bar) => (
          <div key={bar.label} className="flex items-center gap-3 text-[13px] text-[#64748b]">
            <span className="w-10 shrink-0">{bar.label}</span>
            <div className="flex-1 h-2 bg-[#f1f5f9] rounded-full overflow-hidden">
              <div
                className="bg-primary h-full rounded-full transition-all duration-500"
                style={{ width: bar.pct }}
              />
            </div>
            <span className="w-10 text-right font-bold text-[#0f172a]">{bar.value}</span>
          </div>
        ))}
      </div>

      {/* Sort bar */}
      <div className="flex items-center justify-between pt-2 border-t border-[#f1f5f9]">
        <span className="text-[13.5px] font-bold text-[#64748b]">Sorted By:</span>
        <div className="relative">
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-4 py-2 bg-white border border-slate-300 rounded-xl text-[#0f172a] text-[13.5px] font-bold appearance-none focus:outline-none focus:border-primary pr-10 cursor-pointer hover:border-primary transition-colors"
          >
            <option>Most Recent</option>
            <option>Highest Rating</option>
            <option>Lowest Rating</option>
          </select>
          <span className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-[#64748b]">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </span>
        </div>
      </div>

    </div>
  );
};

export default ReviewsHeader;
