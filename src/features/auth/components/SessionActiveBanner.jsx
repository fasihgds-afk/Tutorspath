import React, { useState } from 'react';
import tokenManager from '../../../services/auth/tokenManager';
import useSmartRedirect from '../hooks/useSmartRedirect';

const SessionActiveBanner = () => {
  const [isLoading, setIsLoading] = useState(false);
  const smartRedirect = useSmartRedirect();

  const currentUser = tokenManager.getUser();
  const name = currentUser?.fullName || currentUser?.name || 'there';

  const handleClick = async () => {
    setIsLoading(true);
    await smartRedirect();
    setIsLoading(false);
  };

  return (
    <div className="w-full bg-emerald-50 border border-emerald-200 rounded-xl px-4 py-3 flex items-center justify-between gap-3 shadow-sm mb-5">
      {/* Left: icon + text */}
      <div className="flex items-center gap-2.5 min-w-0">
        <div className="w-7 h-7 rounded-full bg-emerald-100 flex items-center justify-center shrink-0">
          <svg className="w-4 h-4 text-emerald-600" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <div className="min-w-0">
          <p className="text-xs font-bold text-emerald-900 leading-snug">
            Hey {name}, your session is already active!
          </p>
          <p className="text-[11px] text-emerald-700 mt-0.5 leading-snug">
            You're logged in. Click to view or create an order.
          </p>
        </div>
      </div>

      {/* Right: CTA button */}
      <button
        type="button"
        onClick={handleClick}
        disabled={isLoading}
        className="shrink-0 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-70 text-white text-[11px] font-bold px-3.5 py-2 rounded-lg transition-colors flex items-center gap-1.5 whitespace-nowrap cursor-pointer"
      >
        {isLoading ? (
          <>
            <svg className="animate-spin w-3 h-3" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
            </svg>
            Checking...
          </>
        ) : (
          <>
            View / Create Order
            <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
            </svg>
          </>
        )}
      </button>
    </div>
  );
};

export default SessionActiveBanner;
