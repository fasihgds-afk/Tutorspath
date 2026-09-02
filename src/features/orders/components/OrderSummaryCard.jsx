import React from 'react';

const OrderSummaryCard = ({
  formData,
  selectedAddons,
  rawSubtotal = 0,
  discountAmount = 0,
  addonsCost = 0,
  totalAmount = '0.00',
  totalSaved = '0.00',
  onConfirm,
}) => {
  const activeAddonCount = Object.values(selectedAddons || {}).filter(Boolean).length;

  return (
    <div className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-7 shadow-xl shadow-slate-200/40 flex flex-col gap-5 sticky top-24">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-100">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold text-sm border border-emerald-100">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
            </svg>
          </div>
          <div>
            <h3 className="text-slate-900 text-base font-extrabold tracking-tight">Order Summary</h3>
            <p className="text-slate-400 text-[11px]">Real-time live quotation</p>
          </div>
        </div>
        <span className="bg-emerald-50 text-emerald-700 border border-emerald-200 text-[11px] font-extrabold px-2.5 py-1 rounded-full shadow-2xs">
          50% OFF Applied
        </span>
      </div>

      {/* Snapshot Specs */}
      <div className="bg-slate-50/80 p-4 rounded-2xl border border-slate-200/70 flex flex-col gap-2.5 text-xs">
        <div className="flex justify-between items-center text-slate-600">
          <span className="font-medium flex items-center gap-1.5">
            <svg className="w-3.5 h-3.5 text-primary" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
            Paper:
          </span>
          <span className="font-bold text-slate-800 text-right max-w-[180px] truncate">{formData.typeOfWork}</span>
        </div>
        <div className="flex justify-between items-center text-slate-600">
          <span className="font-medium flex items-center gap-1.5">
            <svg className="w-3.5 h-3.5 text-primary" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h7" /></svg>
            Length:
          </span>
          <span className="font-bold text-slate-800">
            {formData.pages} Page{formData.pages > 1 ? 's' : ''} ({formData.wordCount})
          </span>
        </div>
        <div className="flex justify-between items-center text-slate-600">
          <span className="font-medium flex items-center gap-1.5">
            <svg className="w-3.5 h-3.5 text-primary" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 14l9-5-9-5-9 5 9 5zm0 0v7" /></svg>
            Level:
          </span>
          <span className="font-bold text-slate-800">{formData.academicLevel}</span>
        </div>
        <div className="flex justify-between items-center text-slate-600">
          <span className="font-medium flex items-center gap-1.5">
            <svg className="w-3.5 h-3.5 text-primary" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" /></svg>
            Subject:
          </span>
          <span className="font-bold text-slate-800 text-right max-w-[180px] truncate">{formData.subject || 'Not specified'}</span>
        </div>
        <div className="flex justify-between items-center text-slate-600">
          <span className="font-medium flex items-center gap-1.5">
            <svg className="w-3.5 h-3.5 text-primary" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            Deadline:
          </span>
          <span className="font-bold text-slate-800 text-right max-w-[170px] truncate">{formData.deadline}</span>
        </div>
        {activeAddonCount > 0 && (
          <div className="flex justify-between items-center text-slate-600 pt-1 border-t border-slate-200/60">
            <span className="font-medium flex items-center gap-1.5">
              <svg className="w-3.5 h-3.5 text-primary" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" /></svg>
              Add-ons:
            </span>
            <span className="font-bold text-emerald-700">{activeAddonCount} selected</span>
          </div>
        )}
      </div>

      {/* Pricing Breakdown */}
      <div className="flex flex-col gap-2.5 text-xs pt-2 border-t border-slate-100">
        <div className="flex justify-between text-slate-500">
          <span>Standard Base Price:</span>
          <span className="font-semibold text-slate-700 line-through">${rawSubtotal.toFixed(2)}</span>
        </div>

        <div className="flex justify-between text-emerald-600 font-bold">
          <span>50% Special Discount:</span>
          <span>-${discountAmount.toFixed(2)}</span>
        </div>

        {addonsCost > 0 && (
          <div className="flex justify-between text-slate-600">
            <span>Add-ons Total:</span>
            <span className="font-semibold text-slate-800">+${addonsCost.toFixed(2)}</span>
          </div>
        )}

        {/* Final Total */}
        <div className="flex items-center justify-between pt-4 border-t border-slate-200/90 mt-1">
          <div>
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">Total Amount</span>
            <span className="text-[11px] text-emerald-600 font-black flex items-center gap-1 mt-0.5">
              <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>
              You save ${totalSaved}
            </span>
          </div>
          <div className="text-right">
            <span className="text-3xl font-black text-slate-900 tracking-tight leading-none">
              ${totalAmount}
            </span>
          </div>
        </div>
      </div>

      {/* CTA Button */}
      <button
        type="button"
        onClick={onConfirm}
        className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 active:scale-[0.98] text-white text-sm sm:text-base font-extrabold py-3.5 px-6 rounded-2xl shadow-lg shadow-emerald-600/25 hover:shadow-emerald-600/35 transition-all flex items-center justify-center gap-2 cursor-pointer mt-1"
      >
        <span>CONFIRM ORDER</span>
        <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
        </svg>
      </button>

      {/* Trust Badges */}
      <div className="flex flex-col items-center gap-2 pt-1 border-t border-slate-100 text-center">
        <div className="flex items-center justify-center gap-1.5 text-[11px] font-semibold text-slate-500">
          <svg className="w-4 h-4 text-emerald-600 shrink-0" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 1.944A11.954 11.954 0 012.166 5C2.056 5.649 2 6.319 2 7c0 5.225 3.34 9.67 8 11.317C14.66 16.67 18 12.225 18 7c0-.682-.057-1.35-.166-2.001A11.954 11.954 0 0110 1.944zM11 14a1 1 0 11-2 0 1 1 0 012 0zm0-7a1 1 0 10-2 0v3a1 1 0 102 0V7z" clipRule="evenodd" />
          </svg>
          <span>256-Bit SSL Encrypted Checkout</span>
        </div>
        <div className="flex items-center justify-center gap-3 text-[10px] text-slate-400 font-medium">
          <span>• 100% Refund Guarantee</span>
          <span>• Direct Writer Chat</span>
          <span>• Free Turnitin Report</span>
        </div>
      </div>
    </div>
  );
};

export default OrderSummaryCard;
