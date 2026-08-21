import React from 'react';
import { Link } from 'react-router-dom';

const ReviewsBanner = () => {
  return (
    <div className="w-full bg-gradient-to-r from-primary to-primary-hover text-white py-8 px-4 sm:px-6 lg:px-8 shadow-md">
      <div className="max-w-[1200px] mx-auto flex items-center gap-5">

        {/* Logo Icon Box */}
        <Link to="/" className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-md shrink-0 hover:scale-105 transition-transform">
          <svg className="w-7 h-7" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M20 5L30 10L20 15L10 10L20 5Z" fill="#059669" />
            <path d="M12 16.5V23C12 27.5 15.5 31 20 31C24.5 31 28 27.5 28 23V16.5"
              stroke="#059669" strokeWidth="2.5" strokeLinecap="round" />
            <path d="M16 20L20 23L24 20" stroke="#34D399" strokeWidth="2"
              strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </Link>

        {/* Brand Info */}
        <div className="flex flex-col gap-0.5">
          <div className="flex items-center gap-2">
            <span className="text-xl font-extrabold tracking-tight">TutorsPath</span>
            <span className="bg-white/20 w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold">✓</span>
          </div>
          <div className="flex items-center gap-2 text-[13px] text-white/90 font-medium">
            <span>4.9/5</span>
            <span className="text-amber-300 tracking-tight">★★★★★</span>
            <span className="font-bold text-white">Excellent</span>
          </div>
          <span className="text-[11.5px] text-white/75 mt-0.5">
            Based on 4,000+ verified student reviews
          </span>
        </div>

      </div>
    </div>
  );
};

export default ReviewsBanner;
