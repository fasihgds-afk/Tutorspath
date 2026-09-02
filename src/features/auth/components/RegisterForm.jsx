import React, { useState } from 'react';
import { Link } from 'react-router-dom';

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

// ─── Input icon ───────────────────────────────────────────────────────────────
const InputIcon = ({ children }) => (
  <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400 pointer-events-none">
    {children}
  </span>
);

// ─── Country codes ────────────────────────────────────────────────────────────
const countryCodes = [
  { label: 'US (+1)',   value: '+1'   },
  { label: 'UK (+44)', value: '+44'  },
  { label: 'PK (+92)', value: '+92'  },
  { label: 'CA (+1)',  value: '+1'   },
  { label: 'AU (+61)', value: '+61'  },
  { label: 'IN (+91)', value: '+91'  },
  { label: 'AE (+971)',value: '+971' },
  { label: 'SA (+966)',value: '+966' },
];

// ─── Validation ───────────────────────────────────────────────────────────────
const validate = ({ fullName, email, phone, password }) => {
  const errors = {};
  if (!fullName.trim()) {
    errors.fullName = 'Full name is required.';
  } else if (fullName.trim().length < 2) {
    errors.fullName = 'Full name must be at least 2 characters.';
  }
  if (!email.trim()) {
    errors.email = 'Email address is required.';
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    errors.email = 'Please enter a valid email address.';
  }
  const cleanPhone = phone.trim().replace(/\D/g, '');
  if (!phone.trim()) {
    errors.phone = 'Phone number is required.';
  } else if (cleanPhone.length < 6 || cleanPhone.length > 20) {
    errors.phone = 'Phone number must be between 6 and 20 digits.';
  }
  if (!password) {
    errors.password = 'Password is required.';
  } else if (password.length < 8) {
    errors.password = 'Password must be at least 8 characters.';
  } else if (!/[a-z]/.test(password) || !/[0-9]/.test(password)) {
    errors.password = 'Use 8+ characters with at least 1 lowercase letter and 1 number.';
  }
  return errors;
};

const EMPTY_FIELDS = { fullName: '', email: '', countryCode: '+1', phone: '', password: '' };

// ─── Main component ───────────────────────────────────────────────────────────
const RegisterForm = ({ onSubmit }) => {
  const [fields, setFields]             = useState(EMPTY_FIELDS);
  const [errors, setErrors]             = useState({});
  const [apiError, setApiError]         = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading]       = useState(false);

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
    const clientErrors = validate(fields);
    setErrors(clientErrors);
    if (Object.keys(clientErrors).length > 0) return;

    setIsLoading(true);
    try {
      const tag = import.meta.env.VITE_SITE_TAG || 'tutorspath';
      await onSubmit?.({
        fullName: fields.fullName.trim(),
        email: fields.email.trim(),
        countryCode: fields.countryCode,
        phoneNumber: fields.phone.trim(),
        password: fields.password,
        tag,
      });
      // Navigation is handled by the parent page after success
    } catch (err) {
      if (err?.errors && Array.isArray(err.errors)) {
        const backendFieldErrors = {};
        err.errors.forEach((eItem) => {
          backendFieldErrors[eItem.field] = eItem.message;
        });
        setErrors((prev) => ({ ...prev, ...backendFieldErrors }));
      }
      setApiError(err?.message || 'Something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full">
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xl shadow-slate-200/40 overflow-hidden">
        <form className="p-6 sm:p-7 flex flex-col gap-3.5" onSubmit={handleSubmit} noValidate>

          {/* API Error Banner */}
          {apiError && (
            <div className="p-3 bg-red-50 border border-red-200/80 rounded-xl flex items-start gap-2.5 text-red-700 text-xs">
              <svg className="w-4 h-4 shrink-0 text-red-500 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              <div className="flex-1 font-medium">{apiError}</div>
            </div>
          )}
          <div className="mb-0.5 text-center">
            <h2 className="text-slate-900 text-xl font-bold tracking-tight">Create Account</h2>
            <p className="text-slate-400 text-xs sm:text-sm mt-0.5">Join thousands of successful students</p>
          </div>

          {/* Full Name */}
          <FieldWrapper label="Full Name" error={errors.fullName}>
            <div className="relative">
              <InputIcon>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </InputIcon>
              <input
                type="text"
                placeholder="Enter your full name"
                value={fields.fullName}
                onChange={set('fullName')}
                autoComplete="name"
                className={`w-full pl-9 pr-3.5 py-2.5 bg-slate-50 border rounded-lg text-slate-800 text-sm placeholder-slate-400 focus:outline-none focus:ring-1 transition-all duration-200 ${borderClass('fullName')}`}
              />
            </div>
          </FieldWrapper>

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
                className={`w-full pl-9 pr-3.5 py-2.5 bg-slate-50 border rounded-lg text-slate-800 text-sm placeholder-slate-400 focus:outline-none focus:ring-1 transition-all duration-200 ${borderClass('email')}`}
              />
            </div>
          </FieldWrapper>

          {/* Phone */}
          <FieldWrapper label="Phone Number" error={errors.phone}>
            <div className="grid grid-cols-12 gap-2">
              <div className="col-span-4 relative">
                <select
                  value={fields.countryCode}
                  onChange={set('countryCode')}
                  className="w-full px-2.5 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 text-xs appearance-none focus:outline-none focus:border-emerald-500 transition-all duration-200 font-medium cursor-pointer"
                >
                  {countryCodes.map((c) => (
                    <option key={c.label} value={c.value}>{c.label}</option>
                  ))}
                </select>
                <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none text-slate-400">
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                </span>
              </div>
              <div className="col-span-8 relative">
                <InputIcon>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </InputIcon>
                <input
                  type="tel"
                  placeholder="Enter phone number"
                  value={fields.phone}
                  onChange={set('phone')}
                  autoComplete="tel"
                  className={`w-full pl-9 pr-3.5 py-2.5 bg-slate-50 border rounded-lg text-slate-800 text-sm placeholder-slate-400 focus:outline-none focus:ring-1 transition-all duration-200 ${borderClass('phone')}`}
                />
              </div>
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
                placeholder="Create a strong password"
                value={fields.password}
                onChange={set('password')}
                autoComplete="new-password"
                className={`w-full pl-9 pr-9 py-2.5 bg-slate-50 border rounded-lg text-slate-800 text-sm placeholder-slate-400 focus:outline-none focus:ring-1 transition-all duration-200 ${borderClass('password')}`}
              />
              <button
                type="button"
                onClick={() => setShowPassword((v) => !v)}
                className="absolute inset-y-0 right-0 flex items-center pr-3 text-slate-400 hover:text-slate-600 transition-colors"
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
            <div className="flex items-center gap-1.5 mt-0.5">
              <span className="w-3.5 h-3.5 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 text-[9px] font-bold shrink-0">✓</span>
              <p className="text-slate-400 text-[10px] sm:text-[11px] leading-tight">
                8+ chars with at least 1 lowercase letter and 1 number
              </p>
            </div>
          </FieldWrapper>

          {/* Submit */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full mt-1 bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-700 hover:to-emerald-600 disabled:opacity-70 disabled:cursor-not-allowed text-white text-sm font-bold py-2.5 px-6 rounded-lg shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/40 transition-all duration-200 cursor-pointer flex items-center justify-center gap-2"
          >
            {isLoading ? (
              <>
                <svg className="animate-spin w-4 h-4 text-white shrink-0" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                Sending…
              </>
            ) : (
              'Create Account'
            )}
          </button>

          {/* Login link */}
          <p className="text-center text-slate-400 text-xs mt-1">
            Already have an account?{' '}
            <Link to="/login" className="text-emerald-600 font-semibold hover:text-emerald-700 transition-colors">
              Log In
            </Link>
          </p>

        </form>
      </div>
    </div>
  );
};

export default RegisterForm;
