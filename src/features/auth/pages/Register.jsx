import React from 'react';
import { useNavigate } from 'react-router-dom';
import RegisterForm from '../components/RegisterForm';
import RegisterPerks from '../components/RegisterPerks';
import RegisterTrustBadge from '../components/RegisterTrustBadge';

const Register = () => {
  const navigate = useNavigate();

  const handleRegister = async (data) => {
    console.log('Student Register payload:', data);
    // Redirect student to Place Order page
    navigate('/order/placeorder');
  };

  return (
    <section className="min-h-[calc(100vh-70px)] bg-gradient-to-br from-slate-50 via-white to-emerald-50/20 py-4 px-4 sm:px-6 lg:px-8 flex items-center">
      <div className="w-full max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-10 items-center">

          {/* ── Left Column: info + perks ────────────────────────────────── */}
          <div className="flex flex-col items-start order-2 lg:order-1">

            {/* Trusted badge - Compact */}
            <div className="inline-flex items-center gap-1.5 bg-emerald-50 border border-emerald-200/60 px-3 py-1 rounded-full mb-3 shadow-sm">
              <svg className="w-2.5 h-2.5 text-emerald-600" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2l2.4 7.4h7.6l-6 4.6 2.3 7.4-6.3-4.6-6.3 4.6 2.3-7.4-6-4.6h7.6z" />
              </svg>
              <span className="text-emerald-700 text-[9px] font-bold tracking-[0.15em] uppercase">
                Trusted by 10,000+ Students
              </span>
            </div>

            {/* Heading - Compact */}
            <h1 className="text-slate-900 text-2xl sm:text-3xl lg:text-[30px] font-extrabold tracking-tight leading-[1.15] mb-2">
              Create Your Account &amp; Connect With{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-emerald-500">
                Top Experts
              </span>
            </h1>

            {/* Subtitle - Compact */}
            <p className="text-slate-500 text-sm max-w-lg mb-4 leading-relaxed">
              Join thousands of students who trust AssignmentMayens for high-quality academic support.
            </p>

            {/* Perks list - Compact */}
            <div className="mb-4 w-full">
              <RegisterPerks />
            </div>

            {/* Rating / social proof */}
            <RegisterTrustBadge />
          </div>

          {/* ── Right Column: form card ──────────────────────────────────── */}
          <div className="order-1 lg:order-2">
            <RegisterForm onSubmit={handleRegister} />
          </div>

        </div>
      </div>
    </section>
  );
};

export default Register;