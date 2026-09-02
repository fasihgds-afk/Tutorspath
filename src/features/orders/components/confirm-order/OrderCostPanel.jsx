import React from 'react';
import { Link } from 'react-router-dom';

const OrderCostPanel = ({
  basePrice,
  finalAmount,
  addonsCost,
  discountAmount,
  discountPercentage,
  discountReason,
  canConfirm,
  isConfirming,
  onConfirm,
  canPay,
  isPaying,
  onDepositFunds,
  isPaid,
  orderStatus,
}) => (
  <>
    {/* Order Cost */}
    <div className="bg-white border border-slate-200 rounded-sm overflow-hidden shadow-xs">
      <div className="bg-primary text-white px-5 py-3">
        <span className="font-bold text-sm uppercase tracking-wide">Order Cost</span>
      </div>
      <div className="flex flex-col divide-y divide-slate-100 px-5">
        {basePrice != null && (
          <div className="flex items-center justify-between py-2.5 text-sm">
            <span className="text-slate-600">Calculated Price</span>
            <span className="font-bold text-slate-900">${basePrice.toFixed(2)}</span>
          </div>
        )}

        {/* Show backend discount if admin applied one */}
        {discountAmount > 0 && (
          <div className="flex items-center justify-between py-2.5 text-sm">
            <span className="text-slate-600">
              Discount
              {discountPercentage > 0 && ` (${discountPercentage}%)`}
              {discountReason && <span className="text-slate-400 font-normal"> — {discountReason}</span>}
            </span>
            <span className="font-bold text-emerald-600">−${Number(discountAmount).toFixed(2)}</span>
          </div>
        )}

        {addonsCost > 0 && (
          <div className="flex items-center justify-between py-2.5 text-sm">
            <span className="text-slate-600">Add-ons</span>
            <span className="font-bold text-slate-900">${addonsCost.toFixed(2)}</span>
          </div>
        )}

        <div className="flex items-center justify-between py-3">
          <span className="font-black text-slate-900 text-base uppercase">Total</span>
          <span className="font-black text-primary text-xl">
            {finalAmount != null ? `$${finalAmount.toFixed(2)}` : 'Calculating…'}
          </span>
        </div>
      </div>
    </div>

    {/* Confirm Order (draft only) */}
    {canConfirm && (
      <button
        type="button"
        disabled={isConfirming}
        onClick={onConfirm}
        className="w-full bg-slate-800 hover:bg-slate-900 disabled:opacity-60 text-white font-black text-sm py-3.5 px-6 rounded transition-colors cursor-pointer shadow-sm tracking-wide uppercase"
      >
        {isConfirming ? 'Confirming Order…' : 'CONFIRM ORDER'}
      </button>
    )}

    {/* Deposit Funds (awaitingPayment only) */}
    {canPay && (
      <div className="flex flex-col gap-3">
        <p className="text-xs text-slate-500 text-center leading-relaxed">
          By placing order, you confirm that you have read and agreed to our{' '}
          <Link to="/privacy-policy" className="text-primary hover:underline font-semibold">
            Privacy Policy
          </Link>{' '}
          and{' '}
          <Link to="/terms" className="text-primary hover:underline font-semibold">
            Terms &amp; Conditions
          </Link>
          .
        </p>
        <button
          type="button"
          disabled={isPaying}
          onClick={onDepositFunds}
          className="w-full bg-primary hover:bg-primary-hover disabled:opacity-60 text-white font-black text-sm py-3.5 px-6 rounded transition-colors cursor-pointer shadow-sm tracking-wide uppercase"
        >
          {isPaying ? 'Processing…' : finalAmount != null ? `DEPOSIT FUNDS ($${finalAmount.toFixed(2)})` : 'DEPOSIT FUNDS'}
        </button>
      </div>
    )}

    {/* Fallback status */}
    {!canConfirm && !canPay && !isPaid && (
      <div className="bg-slate-50 border border-slate-200 rounded-sm px-5 py-4 text-sm text-slate-600 text-center font-medium">
        Order status: <span className="font-bold text-slate-800">{orderStatus}</span>
      </div>
    )}

    {/* Satisfaction Notice */}
    <div className="bg-slate-50 border border-slate-200 rounded-sm p-5">
      <div className="flex items-center gap-2 mb-2">
        <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z"
          />
        </svg>
        <h3 className="font-bold text-slate-800 text-sm">Your Satisfaction, Our Priority</h3>
      </div>
      <p className="text-xs text-slate-600 leading-relaxed">
        Your payment stays secure and is only released when you're 100% satisfied. Unlimited free
        revisions — no extra cost, no stress.
      </p>
    </div>
  </>
);

export default OrderCostPanel;
