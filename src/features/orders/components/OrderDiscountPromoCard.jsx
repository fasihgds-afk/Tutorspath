import React from 'react';

const OrderDiscountPromoCard = () => {
  return (
    <div className="bg-white border border-slate-200 p-5 flex flex-col gap-4">

      {/* Discount Header */}
      <div className="flex items-center justify-between border-b border-slate-200 pb-3">
        <span className="bg-primary text-white text-xs font-bold px-3 py-1.5">
          50% DISCOUNT
        </span>
        <div className="text-right">
          <span className="text-[11px] font-bold text-slate-400 block uppercase tracking-wide">Up to 20%</span>
          <span className="text-xs font-bold text-primary block">Extra Discount on Big Orders</span>
        </div>
      </div>

      {/* 4 Trust Features */}
      <div className="grid grid-cols-2 gap-3">
        {[
          { icon: '🏆', label: 'Premium Quality Services' },
          { icon: '📚', label: 'Top Academic Experts' },
          { icon: '🔒', label: 'Full Confidentiality' },
          { icon: '✏️', label: 'Unlimited Free Revisions' },
        ].map((item, i) => (
          <div key={i} className="border border-slate-200 p-3 flex flex-col items-center text-center gap-1.5 hover:border-primary transition-colors">
            <span className="text-xl">{item.icon}</span>
            <span className="text-slate-800 font-semibold text-xs leading-tight">{item.label}</span>
          </div>
        ))}
      </div>

    </div>
  );
};

export default OrderDiscountPromoCard;
