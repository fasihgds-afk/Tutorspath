import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  assignmentType,
  academicLevel,
  subject,
  deadline,
} from '../../config/dropdown-fields.config';
import { SITE_CONFIG } from '../../config/siteConfig';
import tokenManager from '../../services/auth/tokenManager';

// ─── Reusable custom select with chevron icon ────────────────────────────────
const SelectField = ({ id, label, icon, value, onChange, required, children }) => (
  <div className="group flex items-center gap-3">
    <div className="w-9 h-9 lg:w-10 lg:h-10 rounded-xl bg-primary-100 flex items-center justify-center shrink-0 text-brand-purple group-hover:bg-primary group-hover:text-surface transition-all duration-300">
      {icon}
    </div>
    <div className="flex-1 min-w-0">
      <label htmlFor={id} className="text-[11px] font-bold text-text-body block mb-0.5">
        {label} <span className="text-primary">*</span>
      </label>
      <div className="relative">
        <select
          id={id}
          value={value}
          onChange={onChange}
          required={required}
          className="w-full appearance-none bg-surface-alt border border-primary-border rounded-xl px-3 py-2.5 text-[13px] text-text-dark font-medium focus:outline-none focus:border-primary hover:border-primary transition-all duration-200 pr-8 cursor-pointer"
        >
          <option value="" disabled>Select {label}…</option>
          {children}
        </select>
        <svg className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-purple" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </div>
    </div>
  </div>
);

// ─── The inner form component ─────────────────────────────────────────────────
const HeroOrderForm = () => {
  const navigate = useNavigate();

  const getDefaultValue = (field) => {
    if (field.groups) {
      for (const g of field.groups) {
        const sel = g.options.find((o) => o.selected);
        if (sel) return String(sel.value);
      }
      return '';
    }
    const sel = field.options?.find((o) => o.selected);
    return sel ? String(sel.value) : '';
  };

  const [form, setForm] = useState({
    assignmentType: getDefaultValue(assignmentType),
    academicLevel: getDefaultValue(academicLevel),
    subject: getDefaultValue(subject),
    deadline: getDefaultValue(deadline),
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (field) => (e) =>
    setForm((prev) => ({ ...prev, [field]: e.target.value }));

  const getLabel = (field, val) => {
    if (!val) return '';
    const num = Number(val);
    if (field.groups) {
      for (const g of field.groups) {
        const opt = g.options.find((o) => o.value === num);
        if (opt) return opt.label;
      }
    } else {
      const opt = field.options?.find((o) => o.value === num);
      if (opt) return opt.label;
    }
    return val;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    // Persist to localStorage so /order/place-order or /register can pre-fill order details
    const payload = {
      assignmentTypeValue: Number(form.assignmentType),
      assignmentTypeLabel: getLabel(assignmentType, form.assignmentType),
      academicLevelValue: Number(form.academicLevel),
      academicLevelLabel: getLabel(academicLevel, form.academicLevel),
      subjectValue: Number(form.subject),
      subjectLabel: getLabel(subject, form.subject),
      deadlineValue: Number(form.deadline),
      deadlineLabel: getLabel(deadline, form.deadline),
      savedAt: Date.now(),
    };
    localStorage.setItem('heroOrderData', JSON.stringify(payload));

    const isAuthenticated = tokenManager.isAuthenticated();
    const destination = isAuthenticated ? '/order/place-order' : SITE_CONFIG.routes.register;

    // Scroll to top then redirect
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setTimeout(() => {
      setLoading(false);
      navigate(destination);
    }, 500);
  };

  const allFilled = form.assignmentType && form.academicLevel && form.subject && form.deadline;

  return (
    <form onSubmit={handleSubmit} className="pt-8 px-4 lg:px-5 pb-6 space-y-3">

      {/* Loading overlay */}
      {loading && (
        <div className="flex flex-col items-center justify-center gap-3 py-8 text-center">
          <div className="w-14 h-14 rounded-full bg-primary-soft flex items-center justify-center">
            <svg className="w-7 h-7 text-primary animate-spin" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
            </svg>
          </div>
          <p className="text-[13px] font-semibold text-text-body opacity-70">Taking you to register…</p>
        </div>
      )}

      {!loading && (
        <>
          {/* ── Assignment Type ─────────────────────────────── */}
          <SelectField
            id="hero_assignment_type"
            label="Assignment Type"
            value={form.assignmentType}
            onChange={handleChange('assignmentType')}
            required
            icon={
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            }
          >
            {assignmentType.groups.map((g) => (
              <optgroup key={g.group} label={g.group}>
                {g.options.map((o) => (
                  <option key={o.value} value={String(o.value)}>{o.label}</option>
                ))}
              </optgroup>
            ))}
          </SelectField>

          {/* ── Academic Level ──────────────────────────────── */}
          <SelectField
            id="hero_academic_level"
            label="Academic Level"
            value={form.academicLevel}
            onChange={handleChange('academicLevel')}
            required
            icon={
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 14l9-5-9-5-9 5 9 5zm0 0v7" />
              </svg>
            }
          >
            {academicLevel.options.map((o) => (
              <option key={o.value} value={String(o.value)}>{o.label}</option>
            ))}
          </SelectField>

          {/* ── Subject ─────────────────────────────────────── */}
          <SelectField
            id="hero_subject"
            label="Subject"
            value={form.subject}
            onChange={handleChange('subject')}
            required
            icon={
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
              </svg>
            }
          >
            {subject.groups.map((g) => (
              <optgroup key={g.group} label={g.group}>
                {g.options.map((o) => (
                  <option key={o.value} value={String(o.value)}>{o.label}</option>
                ))}
              </optgroup>
            ))}
          </SelectField>

          {/* ── Deadline ────────────────────────────────────── */}
          <SelectField
            id="hero_deadline"
            label="Deadline"
            value={form.deadline}
            onChange={handleChange('deadline')}
            required
            icon={
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            }
          >
            {deadline.options.map((o) => (
              <option key={o.value} value={String(o.value)}>{o.label}</option>
            ))}
          </SelectField>

          {/* ── Submit ──────────────────────────────────────── */}
          <button
            type="submit"
            disabled={!allFilled}
            className="w-full mt-1 bg-gradient-to-r from-brand-start to-brand-end text-surface font-bold py-3 px-4 rounded-xl shadow-[0_4px_14px_rgba(5,150,105,0.35)] hover:scale-[1.02] hover:shadow-[0_8px_24px_rgba(5,150,105,0.45)] active:scale-[0.97] transition-all duration-200 flex items-center justify-center gap-2 text-[14px] cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
          >
            Get Free Quote →
          </button>

          {/* Security note */}
          <div className="pt-1 flex flex-col items-center gap-1.5 text-center">
            <div className="flex items-center gap-1 text-[11px] text-text-body">
              <svg className="w-3.5 h-3.5 text-primary shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2" /><path d="M7 11V7a5 5 0 0110 0v4" />
              </svg>
              <span>Your information is safe with us</span>
            </div>
          </div>
        </>
      )}
    </form>
  );
};

// ─── Main hero section ────────────────────────────────────────────────────────
const HeroSection = () => {
  return (
    <section className="w-full bg-surface-alt py-4 lg:py-8 px-4 sm:px-10 lg:px-16 xl:px-20 relative overflow-hidden">
      <div className="w-full max-w-7xl mx-auto relative px-0 sm:px-4">

        {/* Overlapping Image — desktop only */}
        <div className="hidden lg:block absolute bottom-0 right-[270px] xl:right-[330px] z-10 w-[460px] h-[560px] rounded-3xl overflow-hidden pointer-events-none select-none">
          <img
            src="/images/hero.png"
            alt="Student"
            className="w-full h-full object-cover object-top"
          />
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center relative z-20">

          {/* LEFT CONTENT COLUMN */}
          <div className="lg:col-span-7 flex flex-col space-y-5 lg:space-y-6 max-w-sm mx-auto lg:max-w-xl lg:mx-0 w-full text-center lg:text-left">

            {/* Trust Badge */}
            <div className="inline-flex items-center gap-2 bg-primary-soft text-brand-purple px-4 py-1.5 rounded-full text-[12px] lg:text-[13px] font-semibold w-fit shadow-xs mx-auto lg:mx-0 hover:scale-105 transition-transform duration-300 cursor-default">
              <svg className="w-4 h-4 text-brand-purple shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 1.944A11.954 11.954 0 012.166 5C2.056 5.649 2 6.319 2 7c0 5.225 3.34 9.67 8 11.317C14.66 16.67 18 12.225 18 7c0-.682-.057-1.35-.166-2.001A11.954 11.954 0 0110 1.944zM11 14a1 1 0 11-2 0 1 1 0 012 0zm0-7a1 1 0 10-2 0v3a1 1 0 102 0V7z" clipRule="evenodd" />
              </svg>
              <span>Trusted by 8,000+ Students Worldwide</span>
            </div>

            {/* Main Heading */}
            <h1 className="text-[30px] sm:text-[32px] lg:text-[38px] font-bold text-text-dark leading-tight tracking-tight">
              Get Better Grades with{' '}
              <br />
              Expert{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-start to-brand-end">
                Academic Writing Services
              </span>
            </h1>

            {/* Subheading bullets */}
            <div className="flex items-center justify-center lg:justify-start gap-3 text-[16px] sm:text-[17px] lg:text-[18px] font-bold text-text-body">
              <span>Fast</span>
              <span className="w-2 h-2 rounded-full bg-primary shrink-0"></span>
              <span>AI Free</span>
              <span className="w-2 h-2 rounded-full bg-primary shrink-0"></span>
              <span>100% Original</span>
            </div>

            {/* 2x2 Feature Grid */}
            <div className="grid grid-cols-2 gap-x-3 gap-y-4 pt-1 w-full lg:max-w-[410px]">

              {[
                {
                  svg: <><path d="M12 14l9-5-9-5-9 5 9 5z" /><path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0112 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" /><path strokeLinecap="round" strokeLinejoin="round" d="M12 14v7" /></>,
                  title: 'Expert Writers', sub: "PhD & Master Level"
                },
                {
                  svg: <><circle cx="12" cy="12" r="9" /><path strokeLinecap="round" strokeLinejoin="round" d="M12 7v5l3 3" /></>,
                  title: 'On Time Delivery', sub: 'Your assignment is always on time'
                },
                {
                  svg: <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />,
                  title: '100% Human-Written', sub: 'No AI, No Plagiarism — Guaranteed'
                },
                {
                  svg: <path strokeLinecap="round" strokeLinejoin="round" d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />,
                  title: '24/7 Support', sub: "We're Here For You"
                },
              ].map((f) => (
                <div key={f.title} className="group flex items-start gap-3">
                  <div className="w-9 h-9 lg:w-10 lg:h-10 rounded-xl bg-primary-soft flex items-center justify-center shrink-0 text-brand-purple group-hover:bg-primary group-hover:text-surface group-hover:scale-110 transition-all duration-300">
                    <svg className="w-4 h-4 lg:w-5 lg:h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      {f.svg}
                    </svg>
                  </div>
                  <div className="text-left">
                    <h3 className="text-[12px] lg:text-[14px] font-bold text-text-dark leading-tight">{f.title}</h3>
                    <p className="text-[11px] text-text-body mt-0.5 leading-snug opacity-70">{f.sub}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Rating Box */}
            {/* Rating Box */}
            <div className="bg-surface rounded-2xl p-3.5 shadow-md border border-card-border flex items-center justify-between gap-3 mt-1 w-full lg:max-w-[430px] hover:-translate-y-0.5 hover:shadow-lg transition-all duration-300">
              <div className="flex flex-col">
                <div className="flex items-center gap-1.5">
                  <span className="text-[17px] font-extrabold text-text-dark">
                    4.8/5
                  </span>

                  {/* Rating Stars */}
                  <div className="flex items-center gap-0.5">
                    {/* Full stars */}
                    <span className="text-[13px] leading-none text-amber-400">★</span>
                    <span className="text-[13px] leading-none text-amber-400">★</span>
                    <span className="text-[13px] leading-none text-amber-400">★</span>
                    <span className="text-[13px] leading-none text-amber-400">★</span>

                    {/* Partial star — 80% filled */}
                    <span className="relative inline-block text-[13px] leading-none">
                      {/* Gray base */}
                      <span className="text-gray-300">★</span>
                      {/* Amber overlay clipped to 80% width */}
                      <span
                        className="absolute inset-0 overflow-hidden text-amber-400"
                        style={{ width: '80%' }}
                      >★</span>
                    </span>
                  </div>
                </div>

                <span className="text-[10px] text-text-body font-medium opacity-65">
                  Based on 2,000+ Reviews
                </span>
              </div>

              <div className="flex items-center gap-2">
                {/* Trustpilot */}
                <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-emerald-50/80 border border-emerald-200/60 shadow-xs hover:bg-emerald-50 transition-colors">
                  <div className="w-4 h-4 rounded bg-[#00b67a] flex items-center justify-center shrink-0">
                    <svg
                      className="w-2.5 h-2.5 text-white"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                    </svg>
                  </div>

                  <span className="font-bold text-[11px] text-text-dark tracking-tight">
                    Trustpilot
                  </span>
                </div>

                {/* reviews.io */}
                <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-sky-50/80 border border-sky-200/60 shadow-xs hover:bg-sky-50 transition-colors">
                  <div className="w-4 h-4 rounded bg-[#0e131f] flex items-center justify-center shrink-0">
                    <svg
                      className="w-2.5 h-2.5 text-[#00c48c]"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M12 2l2.4 7.4h7.6l-6.2 4.5 2.4 7.4-6.2 4.5 2.4 7.4-6.2-4.5-6.2 4.5 2.4-7.4-6.2-4.5h7.6z" />
                    </svg>
                  </div>

                  <span className="font-bold text-[11px] text-text-dark tracking-tight">
                    reviews<span className="text-[#0284c7] font-black">.io</span>
                  </span>
                </div>
              </div>
            </div>



          </div>

          {/* RIGHT FORM COLUMN */}
          <div className="lg:col-span-5 relative w-full flex justify-center lg:justify-end pt-4 lg:pt-0 lg:pr-3">

            {/* Form Card */}
            <div className="bg-surface rounded-[20px] lg:rounded-[24px] shadow-[0_8px_32px_rgba(5,150,105,0.13)] border border-card-border w-full max-w-[420px] lg:max-w-[330px] overflow-visible relative mt-8 hover:shadow-[0_16px_48px_rgba(5,150,105,0.18)] transition-shadow duration-300">

              {/* Banner Header */}
              <div className="absolute -top-5 left-4 right-4 z-30 bg-gradient-to-r from-brand-start to-brand-end py-2.5 lg:py-3 px-4 text-center text-surface font-bold text-[12px] lg:text-[13px] tracking-wide rounded-xl shadow-lg">
                Get in Touch — We are Available 24/7
              </div>

              {/* Discount Badge */}
              <div className="absolute -top-7 -right-2.5 z-40 group cursor-pointer">
                {/* Glowing pulse ring */}
                <span className="absolute inset-0 rounded-full bg-emerald-400 opacity-40 animate-ping pointer-events-none" />

                {/* Badge Circle */}
                <div className="relative w-[52px] h-[52px] lg:w-[56px] lg:h-[56px] rounded-full bg-gradient-to-br from-emerald-500 via-teal-600 to-emerald-800 text-white flex flex-col items-center justify-center shadow-[0_8px_20px_rgba(5,150,105,0.45)] border-2 border-white rotate-12 group-hover:rotate-0 group-hover:scale-110 transition-all duration-300 select-none">
                  <span className="text-[15px] lg:text-[16px] font-black tracking-tight leading-none drop-shadow-xs">
                    50%
                  </span>
                  <span className="text-[9px] lg:text-[10px] font-black uppercase tracking-wider text-emerald-100 leading-tight">
                    OFF
                  </span>
                </div>
              </div>

              {/* Form Body */}
              <HeroOrderForm />

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default HeroSection;
