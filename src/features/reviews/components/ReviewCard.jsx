import React from 'react';

const ReviewCard = ({ review }) => {
  const { initial, name, title, time, rating, text } = review;

  return (
    <div className="bg-white rounded-[20px] border border-[#f1f5f9] p-6 shadow-[0_10px_30px_rgba(0,0,0,0.03)] flex flex-col gap-4 hover:-translate-y-0.5 hover:shadow-[0_16px_40px_rgba(5,150,105,0.08)] hover:border-primary-border transition-all duration-300">

      {/* Top row: avatar + name + time */}
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">

          {/* Avatar */}
          <div className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center font-bold text-base shadow-sm shrink-0">
            {initial}
          </div>

          {/* Name + title */}
          <div className="flex flex-col">
            <div className="flex items-center gap-1.5">
              <span className="font-extrabold text-[#0f172a] text-[14.5px]">{name}</span>
              <span className="text-primary text-[12px] font-semibold flex items-center gap-0.5">
                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                </svg>
                verified
              </span>
            </div>
            <span className="text-[13px] font-bold text-[#0f172a]">{title}</span>
          </div>
        </div>

        {/* Time */}
        <span className="text-[12px] text-[#94a3b8] shrink-0">{time}</span>
      </div>

      {/* Stars */}
      <div className="flex items-center gap-1">
        {Array.from({ length: rating }).map((_, i) => (
          <svg key={i} className="w-4 h-4 text-amber-400" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
          </svg>
        ))}
        <span className="text-[#0f172a] font-bold text-xs ml-1">{rating}.0</span>
      </div>

      {/* Review text */}
      <p className="text-[#475569] text-[13.5px] leading-relaxed">{text}</p>

    </div>
  );
};

export default ReviewCard;
