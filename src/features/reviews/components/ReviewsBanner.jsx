import React from 'react';
import { Link } from 'react-router-dom';

const ReviewsBanner = () => {
  return (
    <div className="w-full bg-gradient-to-r from-primary to-primary-hover text-white py-8 px-4 sm:px-6 lg:px-8 shadow-md">
      <div className="max-w-[1200px] mx-auto flex items-center gap-5">


        {/* Brand Info */}
        <div className="flex flex-col gap-0.5 ml-10">
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
