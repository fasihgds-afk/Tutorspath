import React from 'react';

const avatars = [
  'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80',
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80',
  'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=100&q=80',
];

const RegisterTrustBadge = () => {
  return (
    <div className="bg-white rounded-2xl p-4 border border-slate-100 shadow-sm flex items-center gap-4 w-full max-w-sm hover:shadow-md transition-all duration-200">
      <div className="flex -space-x-2 overflow-hidden flex-shrink-0">
        {avatars.map((src, i) => (
          <img
            key={i}
            className="inline-block h-10 w-10 rounded-full ring-2 ring-white object-cover"
            src={src}
            alt="Student"
          />
        ))}
      </div>

      <div>
        <div className="flex items-center gap-1 text-amber-400 mb-0.5">
          <span className="text-sm font-bold text-slate-800 mr-0.5">4.9/5</span>
          {'★★★★★'}
          <span className="text-slate-400 text-[11px] font-normal ml-1">(2,340+)</span>
        </div>
        <p className="text-slate-400 text-xs">Students love our expert help!</p>
      </div>
    </div>
  );
};

export default RegisterTrustBadge;