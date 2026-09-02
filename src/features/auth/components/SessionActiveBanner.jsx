import React, { useState } from 'react';
import tokenManager from '../../../services/auth/tokenManager';
import authApi from '../api/authApi';
import useSmartRedirect from '../hooks/useSmartRedirect';

const SessionActiveBanner = () => {
  const [isLoading, setIsLoading] = useState(false);
  const smartRedirect = useSmartRedirect();

  const currentUser = tokenManager.getUser();
  const name = currentUser?.fullName || currentUser?.name || 'Test User';
  const email = currentUser?.email || '';
  const initials = name
    .split(' ')
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase() || '')
    .join('');

  const handleClick = async () => {
    setIsLoading(true);
    await smartRedirect();
    setIsLoading(false);
  };

  const handleLogout = () => {
    authApi.logout();
    window.location.reload();
  };

  return (
    <div className="w-full bg-white rounded-2xl border border-slate-200/90 shadow-sm p-6 sm:p-8 flex flex-col items-center text-center animate-in fade-in duration-200">
      {/* Avatar with active green indicator */}
      <div className="relative mb-4">
        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-emerald-400 flex items-center justify-center text-white text-xl font-extrabold shadow-md shadow-emerald-600/20 ring-4 ring-emerald-50">
          {initials || 'TU'}
        </div>
        <span className="absolute bottom-0 right-0 w-4 h-4 rounded-full bg-emerald-500 border-2 border-white shadow-xs" />
      </div>

      {/* Main Heading */}
      <h2 className="text-xl sm:text-2xl font-bold text-slate-900 leading-snug">
        Hey {name}, your session is already active!
      </h2>

      {/* Subtitle */}
      <p className="text-sm text-slate-500 font-medium mt-2 leading-relaxed max-w-sm">
        You're logged in. Click to view or create an order.
      </p>

      {/* Email pill */}
      {email && (
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-50 border border-slate-200 text-xs font-medium text-slate-600 my-4">
          <span className="w-2 h-2 rounded-full bg-emerald-500" />
          <span className="truncate max-w-[200px]">{email}</span>
        </div>
      )}

      {/* CTA Button: View / Create Order */}
      <button
        type="button"
        onClick={handleClick}
        disabled={isLoading}
        className="w-full mt-1 bg-primary hover:bg-primary-hover disabled:opacity-75 text-white font-bold text-sm py-3.5 px-5 rounded-xl shadow-md shadow-emerald-700/15 flex items-center justify-center gap-2 transition-all active:scale-[0.99] cursor-pointer"
      >
        {isLoading ? (
          <>
            <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
            </svg>
            <span>Checking order...</span>
          </>
        ) : (
          <>
            <span>View / Create Order</span>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
            </svg>
          </>
        )}
      </button>

      {/* Sign Out option */}
      <div className="mt-4 pt-4 border-t border-slate-100 w-full flex items-center justify-center gap-1.5 text-xs text-slate-500">
        <span>Want to switch accounts?</span>
        <button
          type="button"
          onClick={handleLogout}
          className="font-bold text-red-600 hover:text-red-700 hover:underline cursor-pointer"
        >
          Sign Out
        </button>
      </div>
    </div>
  );
};

export default SessionActiveBanner;
