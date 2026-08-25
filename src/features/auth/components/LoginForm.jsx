import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { SITE_CONFIG } from '../../../config/siteConfig';

// ─── Field wrapper ────────────────────────────────────────────────────────────
const FieldWrapper = ({ label, error, children }) => (
  <div className="flex flex-col gap-1">
    <label className="text-slate-700 text-xs font-semibold tracking-wide uppercase">
      {label}
    </label>
    {children}
    {error && (
      <span className="text-red-500 text-[11px] font-medium mt-0.5 flex items-center gap-1">
        <svg className="w-3 h-3 shrink-0" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
        </svg>
        {error}
      </span>
    )}
  </div>
);

// ─── Input icon prefix ────────────────────────────────────────────────────────
const InputIcon = ({ children }) => (
  <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 text-slate-400 pointer-events-none">
    {children}
  </span>
);

// ─── Validation ───────────────────────────────────────────────────────────────
const validate = ({ email, password }) => {
  const errors = {};
  if (!email.trim()) {
    errors.email = 'Email address is required.';
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    errors.email = 'Please enter a valid email address.';
  }
  if (!password) {
    errors.password = 'Password is required.';
  } else if (password.length < 6) {
    errors.password = 'Password must be at least 6 characters.';
  }
  return errors;
};

// ─── Main Login Form Component ───────────────────────────────────────────────
const LoginForm = ({ onSubmit }) => {
  const [fields, setFields] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});
  const [apiError, setApiError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const set = (key) => (e) => {
    setFields((prev) => ({ ...prev, [key]: e.target.value }));
    if (errors[key]) setErrors((prev) => ({ ...prev, [key]: '' }));
    if (apiError) setApiError('');
  };

  const borderClass = (key) => {
    if (errors[key]) return 'border-red-400 focus:ring-red-400 focus:border-red-400';
    if (fields[key] && !errors[key]) return 'border-emerald-400 focus:ring-emerald-400 focus:border-emerald-500';
    return 'border-slate-200 focus:border-emerald-500';
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setApiError('');
    const errs = validate(fields);
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;

    setIsSubmitting(true);
    try {
      await onSubmit?.({
        email: fields.email.trim(),
        password: fields.password,
      });
    } catch (err) {
      console.error('Login error:', err);
      if (err?.errors && Array.isArray(err.errors)) {
        const backendFieldErrors = {};
        err.errors.forEach((eItem) => {
          backendFieldErrors[eItem.field] = eItem.message;
        });
        setErrors((prev) => ({ ...prev, ...backendFieldErrors }));
      }
      setApiError(err?.message || 'Invalid email or password. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full">
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xl shadow-slate-200/40 overflow-hidden">
        <form className="p-6 sm:p-8 flex flex-col gap-4" onSubmit={handleSubmit} noValidate>

          {/* Header */}
          <div className="mb-1 text-center">
            <h2 className="text-slate-900 text-xl font-bold tracking-tight">Welcome Back</h2>
            <p className="text-slate-400 text-sm mt-0.5">Sign in to your account</p>
          </div>

          {/* Backend Error Banner */}
          {apiError && (
            <div className="p-3 bg-red-50 border border-red-200/80 rounded-xl flex items-start gap-2.5 text-red-700 text-xs">
              <svg className="w-4 h-4 shrink-0 text-red-500 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              <div className="flex-1 font-medium">{apiError}</div>
            </div>
          )}

          {/* Email */}
          <FieldWrapper label="Email Address" error={errors.email}>
            <div className="relative">
              <InputIcon>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </InputIcon>
              <input
                type="email"
                placeholder="Enter your email address"
                value={fields.email}
                onChange={set('email')}
                autoComplete="email"
                disabled={isSubmitting}
                className={`w-full pl-9 pr-3.5 py-2.5 bg-slate-50 border rounded-lg text-slate-800 text-sm placeholder-slate-400 focus:outline-none focus:ring-1 transition-all duration-200 disabled:opacity-60 ${borderClass('email')}`}
              />
            </div>
          </FieldWrapper>

          {/* Password */}
          <FieldWrapper label="Password" error={errors.password}>
            <div className="relative">
              <InputIcon>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </InputIcon>
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="Enter your password"
                value={fields.password}
                onChange={set('password')}
                autoComplete="current-password"
                disabled={isSubmitting}
                className={`w-full pl-9 pr-9 py-2.5 bg-slate-50 border rounded-lg text-slate-800 text-sm placeholder-slate-400 focus:outline-none focus:ring-1 transition-all duration-200 disabled:opacity-60 ${borderClass('password')}`}
              />
              <button
                type="button"
                onClick={() => setShowPassword((v) => !v)}
                className="absolute inset-y-0 right-0 flex items-center pr-3.5 text-slate-400 hover:text-slate-600 transition-colors"
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? (
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                  </svg>
                ) : (
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                )}
              </button>
            </div>

            {/* Forgot password link removed */}
          </FieldWrapper>

          {/* Submit */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full mt-1 bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-700 hover:to-emerald-600 disabled:opacity-60 disabled:cursor-not-allowed text-white text-sm font-bold py-2.5 px-6 rounded-lg shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/40 transition-all duration-200 cursor-pointer flex items-center justify-center gap-2"
          >
            {isSubmitting ? (
              <>
                <svg className="animate-spin w-4 h-4 text-white" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <span>Signing In…</span>
              </>
            ) : (
              'Sign In'
            )}
          </button>

          {/* Footer */}
          <p className="text-center text-slate-400 text-xs mt-1">
            Don't have an account?{' '}
            <Link to={SITE_CONFIG.routes.register} className="text-emerald-600 font-semibold hover:text-emerald-700 transition-colors">
              Create Account
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;