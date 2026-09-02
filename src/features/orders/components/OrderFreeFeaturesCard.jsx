import React from 'react';
import { FREE_FEATURES } from '../constants/orderOptions';

const OrderFreeFeaturesCard = () => {
  return (
    <div className="bg-white border border-slate-200 rounded-xl p-5 flex flex-col gap-3 shadow-xs">
      {/* Header */}
      <div className="text-center border-b border-slate-200 pb-3">
        <span className="text-slate-800 text-sm font-bold uppercase tracking-wide">
          Absolutely Free Features
        </span>
      </div>

      {/* Feature list */}
      <div className="flex flex-col gap-2.5">
        {FREE_FEATURES.map((item) => (
          <div key={item.name} className="flex items-center justify-between text-sm">
            <span className="text-slate-700 flex items-center gap-2">
              <span className="text-primary font-bold text-base">✓</span>
              {item.name}
            </span>
            <div className="flex items-center gap-2 shrink-0">
              <span className="line-through text-slate-400 text-xs">{item.price}</span>
              <span className="bg-primary text-white text-[10px] font-bold px-2 py-0.5 rounded">
                FREE
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrderFreeFeaturesCard;
