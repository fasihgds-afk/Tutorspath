import React from 'react';

const TRUST_FEATURES = [
  {
    label: 'Premium Quality Services',
    icon: (
      <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
      </svg>
    ),
  },
  {
    label: 'Top Academic Experts',
    icon: (
      <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 14l9-5-9-5-9 5 9 5zm0 0v7" />
      </svg>
    ),
  },
  {
    label: 'Full Confidentiality',
    icon: (
      <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"
        />
      </svg>
    ),
  },
  {
    label: 'Unlimited Free Revisions',
    icon: (
      <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"
        />
      </svg>
    ),
  },
];

const OrderDiscountPromoCard = () => {
  return (
    <div className="bg-white border border-slate-200 rounded-xl p-5 flex flex-col gap-4 shadow-xs">
      {/* Discount Header */}
      <div className="flex items-center justify-between border-b border-slate-200 pb-3">
        <span className="bg-primary text-white text-xs font-bold px-3 py-1.5 rounded">
          50% DISCOUNT
        </span>
        <div className="text-right">
          <span className="text-[11px] font-bold text-slate-400 block uppercase tracking-wide">
            Up to 20%
          </span>
          <span className="text-xs font-bold text-primary block">Extra Discount on Big Orders</span>
        </div>
      </div>

      {/* Trust features */}
      <div className="grid grid-cols-2 gap-3">
        {TRUST_FEATURES.map((item) => (
          <div
            key={item.label}
            className="border border-slate-200 rounded-lg p-3 flex flex-col items-center text-center gap-1.5 hover:border-primary transition-colors bg-slate-50/50"
          >
            <div className="w-8 h-8 rounded-full bg-emerald-50 text-primary flex items-center justify-center">
              {item.icon}
            </div>
            <span className="text-slate-800 font-semibold text-xs leading-tight">{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrderDiscountPromoCard;
