import React, { useState } from 'react';
import { Link } from 'react-router-dom';

// ─── Field wrapper ───────────────────────────────────────────────────────────
const FieldWrapper = ({ label, error, children }) => (
  <div className="flex flex-col gap-1.5">
    <label className="text-slate-800 text-[13px] font-semibold tracking-wide">{label}</label>
    {children}
    {error && (
      <span className="text-red-500 text-[11px] font-medium mt-0.5">{error}</span>
    )}
  </div>
);

// ─── Icon prefix for inputs ───────────────────────────────────────────────────
const InputIcon = ({ children }) => (
  <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 text-slate-400 pointer-events-none">
    {children}
  </span>
);

// ─── Country codes ────────────────────────────────────────────────────────────
const countryCodes = [
  { label: 'US (+1)',  value: '+1' },
  { label: 'UK (+44)', value: '+44' },
  { label: 'PK (+92)', value: '+92' },
  { label: 'CA (+1)',  value: '+1-CA' },
  { label: 'AU (+61)', value: '+61' },
  { label: 'IN (+91)', value: '+91' },
];

// ─── Validation helpers ───────────────────────────────────────────────────────
const validate = ({ fullName, email, phone, password }) => {
  const errors = {};
  if (!fullName.trim()) errors.fullName = 'Full name is required.';
  if (!email.trim()) {
    errors.email = 'Email address is required.';
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    errors.email = 'Please enter a valid email address.';
  }
  if (!phone.trim()) errors.phone = 'Phone number is required.';
  if (!password) {
    errors.password = 'Password is required.';
  } else if (password.length < 8) {
    errors.password = 'Password must be at least 8 characters.';
  } else if (!/[a-z]/.test(password) || !/[0-9]/.test(password)) {
    errors.password = 'Use 8+ characters with at least one lowercase letter and one number.';
  }
  return errors;
};

// ─── Main component ───────────────────────────────────────────────────────────
const RegisterForm = ({ onSubmit }) => {
  const [fields, setFields] = useState({
    fullName: '',
    email: '',
    countryCode: '+1',
    phone: '',
    password: '',
  });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const set = (key) => (e) =>
    setFields((prev) => ({ ...prev, [key]: e.target.value }));

  const borderClass = (key) => {
    if (errors[key]) return 'border-red-400 focus:ring-red-400';
    if (fields[key] && !errors[key]) return 'border-emerald-400 focus:ring-emerald-400';
    return 'border-slate-200 focus:border-primary';
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate(fields);
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;

    setIsSubmitting(true);
    try {
      await onSubmit?.({ ...fields });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white rounded-3xl border border-slate-100 shadow-2xl shadow-slate-200/50 overflow-hidden">
      {/* Form */}
      <form className="p-8 md:p-10 flex flex-col gap-4" onSubmit={handleSubmit} noValidate>

        {/* Header */}
        <div className="mb-2">
          <h2 className="text-slate-900 text-2xl font-bold tracking-tight">Create Account</h2>
          <p className="text-slate-500 text-sm mt-1">Join thousands of successful students</p>
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
              className={`w-full pl-10 pr-4 py-3 bg-slate-50 border rounded-xl text-slate-800 text-sm placeholder-slate-400 focus:outline-none focus:ring-1 transition-all duration-200 ${borderClass('fullName')}`}
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
              className={`w-full pl-10 pr-4 py-3 bg-slate-50 border rounded-xl text-slate-800 text-sm placeholder-slate-400 focus:outline-none focus:ring-1 transition-all duration-200 ${borderClass('email')}`}
            />
          </div>
        </FieldWrapper>

        {/* Phone */}
        <FieldWrapper label="Phone Number" error={errors.phone}>
          <div className="grid grid-cols-12 gap-3">
            <div className="col-span-5 relative">
              <select
                value={fields.countryCode}
                onChange={set('countryCode')}
                className="w-full px-3.5 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 text-[13px] appearance-none focus:outline-none focus:border-primary transition-all duration-200"
              >
                {countryCodes.map((c) => (
                  <option key={c.value} value={c.value}>{c.label}</option>
                ))}
              </select>
              <span className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-slate-400">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </span>
            </div>

            <div className="col-span-7 relative">
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
                className={`w-full pl-9 pr-4 py-3 bg-slate-50 border rounded-xl text-slate-800 text-sm placeholder-slate-400 focus:outline-none focus:ring-1 transition-all duration-200 ${borderClass('phone')}`}
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
              className={`w-full pl-10 pr-10 py-3 bg-slate-50 border rounded-xl text-slate-800 text-sm placeholder-slate-400 focus:outline-none focus:ring-1 transition-all duration-200 ${borderClass('password')}`}
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
          <div className="flex items-start gap-2 mt-1.5">
            <span className="w-4 h-4 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-600 text-[10px] flex-shrink-0 mt-0.5">✓</span>
            <p className="text-slate-400 text-[11px] leading-relaxed">
              Use 8+ characters with at least one lowercase letter and one number
            </p>
          </div>
        </FieldWrapper>

        {/* Submit */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full mt-1 bg-primary hover:bg-emerald-700 disabled:opacity-60 disabled:cursor-not-allowed text-white text-sm font-bold py-3.5 px-6 rounded-xl shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/40 transition-all duration-200"
        >
          {isSubmitting ? 'Creating Account…' : 'Create My Account'}
        </button>

        {/* Divider */}
        <div className="relative my-1">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-slate-200"></div>
          </div>
          <div className="relative flex justify-center text-xs">
            <span className="px-4 bg-white text-slate-400">or</span>
          </div>
        </div>

        {/* Login Link */}
        <p className="text-center text-slate-500 text-sm">
          Already have an account?{' '}
          <Link to="/login" className="text-primary font-semibold hover:text-emerald-700 transition-colors">
            Log In
          </Link>
        </p>
      </form>
    </div>
  );
};

export default RegisterForm;