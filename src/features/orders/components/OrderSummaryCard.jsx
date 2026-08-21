import React from 'react';

const OrderSummaryCard = ({
  formData,
  selectedExpert,
  selectedAddons,
  rawSubtotal,
  discountAmount,
  expertCost,
  addonsCost,
  totalAmount,
  totalSaved,
  onConfirm,
}) => {
  const expertLabels = {
    system: 'Best Fit Expert (FREE)',
    rehire: 'Rehire Previous (+$5.00)',
    custom: 'Top 10 Elite (+$8.75)',
  };

  const activeAddonCount = Object.values(selectedAddons).filter(Boolean).length;

  return (
    <div className="bg-white rounded-3xl border border-slate-200/80 p-6 shadow-xl shadow-slate-200/40 flex flex-col gap-4">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-100">
        <h3 className="text-slate-900 text-base font-extrabold tracking-tight">
          Live Order Summary
        </h3>
        <span className="bg-emerald-50 text-emerald-700 border border-emerald-200 text-[11px] font-extrabold px-2.5 py-0.5 rounded-full">
          50% OFF Applied
        </span>
      </div>

      {/* Snapshot Specs */}
      <div className="bg-slate-50/70 p-3.5 rounded-2xl border border-slate-200/60 flex flex-col gap-2 text-xs">
        <div className="flex justify-between items-center text-slate-600">
          <span className="font-medium">Paper:</span>
          <span className="font-bold text-slate-800">{formData.typeOfWork}</span>
        </div>
        <div className="flex justify-between items-center text-slate-600">
          <span className="font-medium">Length:</span>
          <span className="font-bold text-slate-800">
            {formData.pages} Page{formData.pages > 1 ? 's' : ''} ({formData.wordCount})
          </span>
        </div>
        <div className="flex justify-between items-center text-slate-600">
          <span className="font-medium">Level:</span>
          <span className="font-bold text-slate-800">{formData.academicLevel}</span>
        </div>
        <div className="flex justify-between items-center text-slate-600">
          <span className="font-medium">Deadline:</span>
          <span className="font-bold text-slate-800">{formData.deadline}</span>
        </div>
        <div className="flex justify-between items-center text-slate-600">
          <span className="font-medium">Expert Tier:</span>
          <span className="font-bold text-slate-800">{expertLabels[selectedExpert] || 'Standard'}</span>
        </div>
        {activeAddonCount > 0 && (
          <div className="flex justify-between items-center text-slate-600">
            <span className="font-medium">Selected Add-ons:</span>
            <span className="font-bold text-emerald-700">{activeAddonCount} selected</span>
          </div>
        )}
      </div>

      {/* Pricing Math */}
      <div className="flex flex-col gap-2 text-xs pt-1 border-t border-slate-100">
        <div className="flex justify-between text-slate-500">
          <span>Standard Base Price:</span>
          <span className="font-semibold text-slate-700">${rawSubtotal.toFixed(2)}</span>
        </div>

        <div className="flex justify-between text-emerald-600 font-bold">
          <span>50% Special Discount:</span>
          <span>-${discountAmount.toFixed(2)}</span>
        </div>

        {expertCost > 0 && (
          <div className="flex justify-between text-slate-600">
            <span>Expert Tier Upgrade:</span>
            <span className="font-semibold text-slate-800">+${expertCost.toFixed(2)}</span>
          </div>
        )}

        {addonsCost > 0 && (
          <div className="flex justify-between text-slate-600">
            <span>Add-ons Total:</span>
            <span className="font-semibold text-slate-800">+${addonsCost.toFixed(2)}</span>
          </div>
        )}

        {/* Final Total */}
        <div className="flex items-baseline justify-between pt-3 border-t border-slate-200/90 mt-1">
          <div>
            <span className="text-xs font-bold text-slate-500 block">Final Price:</span>
            <span className="text-[10px] text-emerald-600 font-bold block">
              You save ${totalSaved}
            </span>
          </div>
          <div className="text-right">
            <span className="text-2xl sm:text-3xl font-black text-slate-900 leading-none">
              ${totalAmount}
            </span>
          </div>
        </div>
      </div>

      {/* CTA Button */}
      <button
        type="button"
        onClick={onConfirm}
        className="w-full bg-primary hover:bg-primary-hover active:scale-[0.98] text-white text-sm sm:text-base font-extrabold py-3.5 px-6 rounded-2xl shadow-lg shadow-emerald-600/25 transition-all flex items-center justify-center gap-2 cursor-pointer mt-1"
      >
        <span>CONFIRM ORDER</span>
        <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
        </svg>
      </button>

      {/* Micro trust guarantee */}
      <div className="flex items-center justify-center gap-2 text-[11px] text-slate-500 text-center mt-0.5">
        <svg className="w-3.5 h-3.5 text-emerald-600 shrink-0" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M10 1.944A11.954 11.954 0 012.166 5C2.056 5.649 2 6.319 2 7c0 5.225 3.34 9.67 8 11.317C14.66 16.67 18 12.225 18 7c0-.682-.057-1.35-.166-2.001A11.954 11.954 0 0110 1.944zM11 14a1 1 0 11-2 0 1 1 0 012 0zm0-7a1 1 0 10-2 0v3a1 1 0 102 0V7z" clipRule="evenodd" />
        </svg>
        <span>256-Bit SSL Encrypted &amp; 100% Guaranteed</span>
      </div>
    </div>
  );
};

export default OrderSummaryCard;
