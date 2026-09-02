import React, { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import {
  Elements,
  PaymentElement,
  useStripe,
  useElements,
} from '@stripe/react-stripe-js';
import { useNavigate } from 'react-router-dom';
import { STRIPE_PUBLISHABLE_KEY } from '../../../../config/env';

// Stripe instance — created once outside the component tree
const stripePromise = loadStripe(STRIPE_PUBLISHABLE_KEY);

// ── Stripe appearance ────────────────────────────────────────
const STRIPE_APPEARANCE = {
  theme: 'stripe',
  variables: {
    colorPrimary: '#16a34a',
    colorBackground: '#ffffff',
    colorText: '#1e293b',
    colorDanger: '#dc2626',
    fontFamily: 'Inter, ui-sans-serif, system-ui, sans-serif',
    spacingUnit: '4px',
    borderRadius: '6px',
  },
};

// ── Success screen ───────────────────────────────────────────
const PaymentSuccess = ({ finalAmount, currency, orderNumber, onDone }) => {
  const navigate = useNavigate();

  const handleGoToDashboard = () => {
    onDone();
    navigate('/student/dashboard');
  };

  return (
    <div className="flex flex-col items-center gap-5 py-4 text-center">
      {/* Green checkmark circle */}
      <div className="w-20 h-20 rounded-full bg-emerald-100 flex items-center justify-center">
        <svg
          className="w-10 h-10 text-emerald-600"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
        </svg>
      </div>

      <div className="flex flex-col gap-1.5">
        <h3 className="text-xl font-black text-slate-900">Payment Successful!</h3>
        {finalAmount != null && (
          <p className="text-3xl font-black text-emerald-600">
            ${Number(finalAmount).toFixed(2)}{' '}
            <span className="text-base font-semibold text-slate-500">
              {(currency || 'USD').toUpperCase()}
            </span>
          </p>
        )}
        {orderNumber && (
          <p className="text-sm text-slate-500 font-medium">
            Order <span className="font-bold text-slate-700">{orderNumber}</span> is now active
          </p>
        )}
      </div>

      <div className="bg-emerald-50 border border-emerald-200 rounded-lg px-4 py-3 text-sm text-emerald-800 text-left w-full">
        <p className="font-semibold mb-0.5">What happens next?</p>
        <p className="text-emerald-700 text-xs leading-relaxed">
          Our academic team is reviewing your requirements. You'll receive updates in your
          dashboard as your order progresses.
        </p>
      </div>

      <button
        type="button"
        onClick={handleGoToDashboard}
        className="w-full bg-primary hover:bg-primary-hover text-white font-black text-sm py-3.5 px-6 rounded transition-colors cursor-pointer shadow-sm tracking-wide uppercase"
      >
        Go to Dashboard →
      </button>
    </div>
  );
};

// ── Failed screen ────────────────────────────────────────────
const PaymentFailed = ({ errorMsg, onRetry, onCancel }) => (
  <div className="flex flex-col items-center gap-5 py-4 text-center">
    {/* Red X circle */}
    <div className="w-20 h-20 rounded-full bg-red-100 flex items-center justify-center">
      <svg
        className="w-10 h-10 text-red-600"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        viewBox="0 0 24 24"
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
      </svg>
    </div>

    <div className="flex flex-col gap-1.5">
      <h3 className="text-xl font-black text-slate-900">Payment Failed</h3>
      <p className="text-sm text-slate-500 max-w-xs mx-auto leading-relaxed">
        {errorMsg || 'Something went wrong. Please check your card details and try again.'}
      </p>
    </div>

    <div className="flex flex-col gap-2.5 w-full">
      <button
        type="button"
        onClick={onRetry}
        className="w-full bg-primary hover:bg-primary-hover text-white font-black text-sm py-3.5 px-6 rounded transition-colors cursor-pointer shadow-sm tracking-wide uppercase"
      >
        Try Again
      </button>
      <button
        type="button"
        onClick={onCancel}
        className="w-full text-slate-500 hover:text-slate-700 text-sm font-medium py-2 transition-colors cursor-pointer"
      >
        Cancel
      </button>
    </div>
  </div>
);

// ── Checkout form (inside <Elements>) ───────────────────────
const CheckoutForm = ({ finalAmount, currency, onSuccess, onFailed, onCancel }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [isProcessing, setIsProcessing] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    setIsProcessing(true);
    setErrorMsg('');

    const { error, paymentIntent } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: window.location.href,
      },
      redirect: 'if_required',
    });

    if (error) {
      // Show failed screen instead of inline error
      onFailed(error.message || 'Payment failed. Please try again.');
      setIsProcessing(false);
      return;
    }

    if (paymentIntent?.status === 'succeeded') {
      onSuccess(paymentIntent);
    } else {
      setIsProcessing(false);
    }
  };

  const displayAmount =
    finalAmount != null
      ? `$${Number(finalAmount).toFixed(2)} ${(currency || 'usd').toUpperCase()}`
      : '';

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      <PaymentElement options={{ layout: 'tabs' }} />

      {/* Inline error (only for non-fatal issues, e.g. validation) */}
      {errorMsg && (
        <div className="bg-red-50 border border-red-200 text-red-700 text-sm px-4 py-3 rounded-md">
          {errorMsg}
        </div>
      )}

      <div className="flex flex-col gap-2.5 pt-1">
        <button
          type="submit"
          disabled={!stripe || isProcessing}
          className="w-full bg-primary hover:bg-primary-hover disabled:opacity-60 text-white font-black text-sm py-3.5 px-6 rounded transition-colors cursor-pointer shadow-sm tracking-wide uppercase"
        >
          {isProcessing ? (
            <span className="flex items-center justify-center gap-2">
              <svg
                className="animate-spin w-4 h-4 text-white"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                />
              </svg>
              Processing…
            </span>
          ) : displayAmount ? (
            `PAY ${displayAmount}`
          ) : (
            'PAY NOW'
          )}
        </button>

        <button
          type="button"
          onClick={onCancel}
          disabled={isProcessing}
          className="w-full text-slate-500 hover:text-slate-700 text-sm font-medium py-2 transition-colors cursor-pointer disabled:opacity-50"
        >
          Cancel
        </button>
      </div>

      <p className="text-xs text-slate-400 text-center leading-relaxed">
        Secured and encrypted by{' '}
        <span className="font-semibold text-slate-500">Stripe</span>. Your card details are never
        stored on our servers.
      </p>
    </form>
  );
};

// ── Modal states ─────────────────────────────────────────────
// 'form'    → Stripe payment form
// 'success' → Payment confirmed screen
// 'failed'  → Payment failed screen

const StripePaymentModal = ({
  isOpen,
  clientSecret,
  finalAmount,
  currency,
  orderNumber,
  onSuccess,   // called immediately on success — syncs backend, does NOT control modal visibility
  onClose,
}) => {
  const [screen, setScreen] = useState('form');   // 'form' | 'success' | 'failed'
  const [failedMsg, setFailedMsg] = useState('');

  // Reset to form screen whenever the modal opens fresh
  React.useEffect(() => {
    if (isOpen) {
      setScreen('form');
      setFailedMsg('');
    }
  }, [isOpen, clientSecret]);

  if (!isOpen || !clientSecret) return null;

  const handleSuccess = (paymentIntent) => {
    // Show the success screen immediately. The modal stays open (isOpen is
    // controlled by the parent and we do NOT ask the parent to close it here)
    // so the user actually sees "Payment Successful!" before navigating away.
    setScreen('success');
    // Fire the backend sync in the background — this does not affect modal
    // visibility, only updates order data.
    onSuccess(paymentIntent);
  };

  const handleFailed = (msg) => {
    setFailedMsg(msg);
    setScreen('failed');
  };

  const handleRetry = () => {
    setScreen('form');
    setFailedMsg('');
  };

  // Titles per screen
  const titleMap = {
    form: 'Complete Your Payment',
    success: 'Payment Confirmed',
    failed: 'Payment Failed',
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-black/50 overflow-y-auto"
      onClick={(e) => {
        if (e.target === e.currentTarget && screen !== 'form') onClose();
      }}
    >
      {/* Inner wrapper centers modal vertically but allows scroll on short screens */}
      <div className="flex min-h-full items-center justify-center px-4 py-8">
      <div
        className="bg-white rounded-xl shadow-2xl w-full max-w-md flex flex-col"
        style={{ maxHeight: 'calc(100vh - 64px)' }}
      >
        {/* ── Sticky header (always visible) ── */}
        <div className="flex items-center justify-between px-6 pt-5 pb-4 border-b border-slate-100 shrink-0">
          <h2 className="text-base font-bold text-slate-900">{titleMap[screen]}</h2>
          <button
            type="button"
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 transition-colors cursor-pointer"
            aria-label="Close"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* ── Scrollable body ── */}
        <div className="overflow-y-auto flex-1 px-6 py-5 flex flex-col gap-4">
          {/* Amount badge — form screen only */}
          {screen === 'form' && finalAmount != null && (
            <div className="bg-slate-50 border border-slate-200 rounded-lg px-4 py-3 flex items-center justify-between shrink-0">
              <span className="text-sm text-slate-600 font-medium">Amount due</span>
              <span className="text-lg font-black text-primary">
                ${Number(finalAmount).toFixed(2)}{' '}
                <span className="text-sm font-semibold text-slate-500">
                  {(currency || 'USD').toUpperCase()}
                </span>
              </span>
            </div>
          )}

          {/* ── Screens ── */}
          {screen === 'form' && (
            <Elements
              stripe={stripePromise}
              options={{ clientSecret, appearance: STRIPE_APPEARANCE }}
            >
              <CheckoutForm
                finalAmount={finalAmount}
                currency={currency}
                onSuccess={handleSuccess}
                onFailed={handleFailed}
                onCancel={onClose}
              />
            </Elements>
          )}

          {screen === 'success' && (
            <PaymentSuccess
              finalAmount={finalAmount}
              currency={currency}
              orderNumber={orderNumber}
              onDone={onClose}
            />
          )}

          {screen === 'failed' && (
            <PaymentFailed
              errorMsg={failedMsg}
              onRetry={handleRetry}
              onCancel={onClose}
            />
          )}
        </div>
      </div>
      </div>
    </div>
  );
};

export default StripePaymentModal;