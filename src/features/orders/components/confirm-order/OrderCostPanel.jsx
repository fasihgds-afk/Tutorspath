import React from 'react';
import { SITE_CONFIG } from '../../../../config/siteConfig';
import { useHomeContext } from '../../../../hooks/useHomeContext';

const OrderCostPanel = ({
  basePrice,
  finalAmount,
  addonsCost,
  discountAmount,
  discountPercentage,
  discountReason,
  canPay,
  isPaying,
  onDepositFunds,
  isPaid,
  orderStatus,
}) => {
  const { phone: contextPhone } = useHomeContext();
  const phone = contextPhone || SITE_CONFIG.phone;

  // Calculate correct pricing breakdown
  const baseOrderPrice = basePrice != null ? Number(basePrice) : 0;
  const originalOrderPrice = baseOrderPrice * 2; // Base order × 2 (original price before discount)
  const discountedOrderPrice = baseOrderPrice; // After 50% discount
  const orderDiscount = originalOrderPrice - discountedOrderPrice; // 50% discount amount
  const addonsPrice = addonsCost != null ? Number(addonsCost) : 0;
  const finalPrice = discountedOrderPrice + addonsPrice;

  return (
    <>
      {/* Order Cost */}
      <div className="bg-white border border-slate-200 rounded-sm overflow-hidden shadow-xs">
        <div className="bg-primary text-white px-5 py-3">
          <span className="font-bold text-sm uppercase tracking-wide">Order Cost</span>
        </div>
        <div className="flex flex-col divide-y divide-slate-100 px-5">
          {/* Original Order Price (before discount, without add-ons) */}
          {baseOrderPrice > 0 && (
            <div className="flex items-center justify-between py-2.5 text-sm">
              <span className="text-slate-600">Original Price</span>
              <span className="text-slate-700 font-semibold">
                ${originalOrderPrice.toFixed(2)}
              </span>
            </div>
          )}

          {/* 50% Discount on Order (not on add-ons) */}
          {baseOrderPrice > 0 && (
            <div className="flex items-center justify-between py-2.5 text-sm bg-emerald-50/70 -mx-5 px-5">
              <span className="text-emerald-800 font-semibold flex items-center gap-1.5">
                <span>Limited Time Discount</span>
                <span className="bg-emerald-200/90 text-emerald-900 text-[10px] font-black px-1.5 py-0.5 rounded">
                  50%
                </span>
              </span>
              <span className="font-bold text-emerald-600">
                −${orderDiscount.toFixed(2)}
              </span>
            </div>
          )}

          {/* Add-ons (separate, not discounted) */}
          {addonsPrice > 0 && (
            <div className="flex items-center justify-between py-2.5 text-sm">
              <span className="text-slate-600">Add-ons</span>
              <span className="text-slate-700 font-semibold">
                ${addonsPrice.toFixed(2)}
              </span>
            </div>
          )}

          {/* Backend additional discount if present */}
          {discountAmount > 0 && (
            <div className="flex items-center justify-between py-2.5 text-sm">
              <span className="text-slate-600">
                Additional Discount
                {discountPercentage > 0 && ` (${discountPercentage}%)`}
                {discountReason && <span className="text-slate-400 font-normal"> — {discountReason}</span>}
              </span>
              <span className="font-bold text-emerald-600">−${Number(discountAmount).toFixed(2)}</span>
            </div>
          )}

          <div className="flex items-center justify-between py-3">
            <div>
              <span className="font-black text-slate-900 text-base uppercase block">Final Amount</span>
              <span className="text-[11px] text-emerald-600 font-semibold">You save 50% on order</span>
            </div>
            <div className="flex items-baseline gap-2">
              {baseOrderPrice > 0 && (
                <span className="text-sm text-slate-400 line-through font-medium">
                  ${(originalOrderPrice + addonsPrice).toFixed(2)}
                </span>
              )}
              <span className="font-black text-primary text-xl">
                {baseOrderPrice > 0 ? `$${finalPrice.toFixed(2)}` : 'Calculating…'}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Deposit Funds — always shown when not paid */}
      {canPay && (
        <div className="flex flex-col gap-3">
          <button
            type="button"
            disabled={isPaying}
            onClick={onDepositFunds}
            className="w-full bg-primary hover:bg-primary-hover disabled:opacity-60 text-white font-black text-sm py-3.5 px-6 rounded transition-colors cursor-pointer shadow-sm tracking-wide uppercase"
          >
            {isPaying ? 'Processing…' : baseOrderPrice > 0 ? `DEPOSIT FUNDS ($${finalPrice.toFixed(2)})` : 'DEPOSIT FUNDS'}
          </button>
        </div>
      )}

      {/* Fallback status — only shown if somehow canPay is false and not paid */}
      {!canPay && !isPaid && (
        <div className="bg-slate-50 border border-slate-200 rounded-sm px-5 py-4 text-sm text-slate-600 text-center font-medium">
          Order status: <span className="font-bold text-slate-800">{orderStatus}</span>
        </div>
      )}

      {/* Satisfaction Notice */}
      <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 sm:p-5">
        <div className="flex items-center gap-2.5 mb-2">
          <div className="w-7 h-7 rounded-lg bg-emerald-100 text-primary flex items-center justify-center shrink-0">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z"
              />
            </svg>
          </div>
          <h3 className="font-bold text-slate-800 text-sm">Your Satisfaction, Our Priority</h3>
        </div>
        <p className="text-xs text-slate-600 leading-relaxed pl-9">
          Your payment stays secure and is only released when you're 100% satisfied. Unlimited free
          revisions no extra cost, no stress.
        </p>
      </div>

      {/* Talk to an Expert / Query CTA */}
      <div className="bg-gradient-to-br from-emerald-50/70 via-white to-slate-50 border border-emerald-200/80 rounded-xl p-4 sm:p-5 shadow-xs">
        <div className="flex flex-col gap-3">
          <div className="flex items-start gap-3">
            <div className="w-9 h-9 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0 mt-0.5">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a.75.75 0 01-.822-.949 3.518 3.518 0 00.37-1.12c-.52-.614-.858-1.34-.858-2.151 0-.156.012-.31.034-.46A8.156 8.156 0 013 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z" />
              </svg>
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <h4 className="font-bold text-slate-900 text-sm leading-snug">
                  Have any query?
                </h4>
                <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100/80 px-2 py-0.5 rounded-full">
                  24/7 Available
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">
                Have questions about your order or pricing? Talk to our academic expert now.
              </p>
            </div>
          </div>

          {/* Two Action Buttons: Live Chat + Call */}
          <div className="flex flex-col sm:flex-row gap-2 w-full">
            {/* Live Chat Button */}
            <button
              type="button"
              onClick={() => {
                // Open Tawk.to or any injected chat widget
                if (window.Tawk_API && window.Tawk_API.maximize) {
                  window.Tawk_API.maximize();
                } else if (window.$crisp) {
                  window.$crisp.push(['do', 'chat:open']);
                } else {
                  // Fallback: open WhatsApp chat
                  window.open(
                    `https://wa.me/${phone.href.replace('tel:+', '')}?text=Hi, I need help with my order.`,
                    '_blank'
                  );
                }
              }}
              className="flex-1 flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-primary hover:bg-primary-hover active:bg-primary-hover text-white font-bold text-xs shadow-sm hover:shadow-md transition-all active:scale-[0.99] cursor-pointer"
            >
              {/* Chat bubble icon */}
              <svg className="w-3.5 h-3.5 shrink-0" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a.75.75 0 01-.822-.949 3.518 3.518 0 00.37-1.12c-.52-.614-.858-1.34-.858-2.151 0-.156.012-.31.034-.46A8.156 8.156 0 013 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z" />
              </svg>
              <span>Live Chat</span>
              <span className="w-1.5 h-1.5 rounded-full bg-green-300 animate-pulse shrink-0" />
            </button>

            {/* Call Button */}
            <a
              href={phone.href}
              className="flex-1 flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-white hover:bg-slate-50 active:bg-slate-100 text-primary border border-primary/30 hover:border-primary font-bold text-xs shadow-xs hover:shadow-sm transition-all active:scale-[0.99] cursor-pointer"
            >
              {/* Phone icon */}
              <svg className="w-3.5 h-3.5 shrink-0" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
              </svg>
              <span className="truncate">{phone.display}</span>
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default OrderCostPanel;
