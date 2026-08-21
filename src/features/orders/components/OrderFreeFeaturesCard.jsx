import React from 'react';

const freeFeaturesList = [
  { name: 'Choose a 5-star Expert', price: '$7' },
  { name: 'Unlimited Revisions', price: '$8' },
  { name: 'Cover Page', price: '$10' },
  { name: 'Outline', price: '$7' },
  { name: 'Paper Formatting', price: '$6' },
  { name: 'Referencing & Bibliography', price: '$9' },
  { name: 'Turnitin Report', price: '$9' },
  { name: 'Dedicated User Area', price: '$7' },
  { name: '24/7 Order Tracking', price: '$10' },
  { name: 'Periodic Email Alerts', price: '$6' },
];

const OrderFreeFeaturesCard = () => {
  return (
    <div className="bg-white border border-slate-200 p-5 flex flex-col gap-3">
      {/* Header */}
      <div className="text-center border-b border-slate-200 pb-3">
        <span className="text-slate-800 text-sm font-bold uppercase tracking-wide">
          Absolutely Free Features
        </span>
      </div>

      {/* Feature list */}
      <div className="flex flex-col gap-2.5">
        {freeFeaturesList.map((item, idx) => (
          <div key={idx} className="flex items-center justify-between text-sm">
            <span className="text-slate-700 flex items-center gap-2">
              <span className="text-primary font-bold">✓</span>
              {item.name}
            </span>
            <div className="flex items-center gap-2 shrink-0">
              <span className="line-through text-slate-400 text-xs">{item.price}</span>
              <span className="bg-primary text-white text-[10px] font-bold px-2 py-0.5">FREE</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrderFreeFeaturesCard;
