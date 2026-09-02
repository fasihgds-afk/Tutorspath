import React, { useState, useEffect, useCallback } from 'react';
import { useSearchParams, Link, useNavigate } from 'react-router-dom';
import OrderStepTracker from '../components/OrderStepTracker';
import OrderDetailsPanel from '../components/confirm-order/OrderDetailsPanel';
import OrderCostPanel from '../components/confirm-order/OrderCostPanel';
import StripePaymentModal from '../components/confirm-order/StripePaymentModal';
import orderApi from '../api/orderApi';
import orderStorage from '../utils/orderStorage';
import { SITE_CONFIG } from '../../../config/siteConfig';
import { CONFIRM_ORDER_ADDONS } from '../constants/orderOptions';
import {
  statusToStep,
  isOrderPaid,
  calcAddonsCost,
  getOrderBasePrice,
} from '../utils/orderHelpers';

const ConfirmOrderDetails = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const orderId = searchParams.get('orderId');

  const [order, setOrder] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [fetchError, setFetchError] = useState('');

  // ── Add-ons ────────────────────────────────────────────────────────────
  const [selectedAddons, setSelectedAddons] = useState({});

  // ── Pay ────────────────────────────────────────────────────────────────
  const [isPaying, setIsPaying] = useState(false);
  const [actionError, setActionError] = useState('');

  // ── Stripe payment modal ────────────────────────────────────────────────
  const [stripeModal, setStripeModal] = useState({
    isOpen: false,
    clientSecret: null,
    currency: 'usd',
  });

  // ── Fetch order ────────────────────────────────────────────────────────
  const fetchOrder = useCallback(async () => {
    if (!orderId) {
      navigate('/student/dashboard');
      return;
    }
    setFetchError('');
    try {
      const data = await orderApi.getOrder(orderId);
      if (data) {
        setOrder(data);
      } else {
        navigate('/student/dashboard');
      }
    } catch {
      setFetchError('Failed to load order. Please refresh.');
    } finally {
      setIsLoading(false);
    }
  }, [orderId, navigate]);

  useEffect(() => {
    setIsLoading(true);
    fetchOrder();
  }, [fetchOrder]);

  // Sync selected add-ons whenever order changes (from backend order.addOns)
  useEffect(() => {
    if (order?.addOns && Array.isArray(order.addOns)) {
      const initialSelected = {};
      order.addOns.forEach((addon) => {
        const addonName = typeof addon === 'string' ? addon : addon?.name;
        const matched = CONFIRM_ORDER_ADDONS.find(
          (a) =>
            a.name?.toLowerCase() === addonName?.toLowerCase() ||
            a.label?.toLowerCase() === addonName?.toLowerCase() ||
            a.id === addon?.id
        );
        if (matched) {
          initialSelected[matched.id] = true;
        }
      });
      setSelectedAddons(initialSelected);
    }
  }, [order?.addOns]);

  // ── Toggle Add-on & update pricing ────────────────────────────────────
  const toggleAddon = async (id) => {
    const nextSelected = { ...selectedAddons, [id]: !selectedAddons[id] };
    setSelectedAddons(nextSelected);

    if (orderId && !isPaid) {
      const addOns = CONFIRM_ORDER_ADDONS
        .filter((addon) => !!nextSelected[addon.id])
        .map((addon) => addon.name);

      try {
        const updated = await orderApi.updateOrder(orderId, {
          deadline: order.deadline,
          numberOfPages: order.numberOfPages,
          lineSpacing: order.lineSpacing,
          addOns,
        });
        if (updated) setOrder(updated);
      } catch (err) {
        console.error('Failed to update add-ons:', err);
      }
    }
  };

  // ── Deposit → POST /api/v1/payments/orders/:orderId/payment-intent ─────
  const handleDepositFunds = async () => {
    if (!orderId || isPaying) return;
    setActionError('');
    setIsPaying(true);
    try {
      const result = await orderApi.createPaymentIntent(orderId, 'stripe');
      const clientSecret = result?.clientSecret || result?.data?.clientSecret;
      const currency = result?.currency || result?.data?.currency || 'usd';

      if (!clientSecret) {
        throw new Error('Payment could not be initialized. Please try again.');
      }

      // Open Stripe modal with the clientSecret
      setStripeModal({ isOpen: true, clientSecret, currency });
    } catch (err) {
      setActionError(err?.message || 'Failed to initialize payment. Please try again.');
    } finally {
      setIsPaying(false);
    }
  };

  // ── Stripe payment succeeded ────────────────────────────────────────────
  // IMPORTANT: This fires while the modal is still open, showing its own
  // "success" screen. We must NOT close the modal here — closing it is the
  // user's action (clicking "Go to Dashboard") or the modal's own onClose.
  // This handler's job is purely to sync the payment result to the backend
  // and refresh the order so the rest of the app (and the dashboard, once
  // the user navigates back) shows the correct status.
  const handlePaymentSuccess = async (paymentIntent) => {
    try {
      // Tell OUR backend the payment succeeded so it can re-verify with
      // Stripe server-side and update order.status / order.paymentStatus.
      // This does not replace a webhook — it's a fast-path sync in case the
      // webhook is delayed or misconfigured.
      const updated = await orderApi.confirmPaymentSuccess(orderId, paymentIntent?.id);
      if (updated) {
        setOrder(updated);
      }
    } catch (err) {
      console.error('Failed to confirm payment with backend:', err);
      setActionError(
        'Payment was charged, but we had trouble updating your order. Please refresh or contact support.'
      );
    }

    // Keep local cache in sync as a fallback too
    orderStorage.updateOrderPayment(orderId, 'paid');

    // Re-fetch from backend to be sure we have the authoritative state
    await fetchOrder();
  };

  // ── Stripe modal closed (by user, after success screen, or cancel) ─────
  const handleModalClose = () => {
    setStripeModal({ isOpen: false, clientSecret: null, currency: 'usd' });
  };

  // ── Derived ──────────────────────────────────────────────────────────────
  const currentStep = order ? statusToStep(order.status) : statusToStep('awaitingPayment');
  const isPaid = isOrderPaid(order);
  const canPay = !isPaid;

  const displayId = order?.orderNumber || `TP-${String(order?._id || '').slice(-8).toUpperCase()}`;
  const spacingLabel =
    String(order?.lineSpacing || '').toLowerCase() === 'single' ? 'Single Spaced' : 'Double Spaced';

  const assignmentAmount =
    order?.pricing?.assignmentAmount != null
      ? Number(order.pricing.assignmentAmount)
      : getOrderBasePrice(order);

  const addonsAmount =
    order?.pricing?.addOnsAmount != null
      ? Number(order.pricing.addOnsAmount)
      : calcAddonsCost(selectedAddons, CONFIRM_ORDER_ADDONS);

  const finalAmount =
    order?.pricing?.finalAmount != null
      ? Number(order.pricing.finalAmount)
      : assignmentAmount != null
      ? Number((assignmentAmount + addonsAmount).toFixed(2))
      : null;

  // ── Loading / Error ──────────────────────────────────────────────────────
  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <span className="text-slate-500 text-sm font-medium">Loading order details...</span>
      </div>
    );
  }
  if (fetchError) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center gap-3">
        <p className="text-red-600 font-medium text-sm">{fetchError}</p>
        <button onClick={fetchOrder} className="text-sm font-bold text-primary hover:underline cursor-pointer">
          Retry
        </button>
      </div>
    );
  }
  if (!order) return null;

  // ── Render ───────────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-slate-50 font-sans antialiased text-slate-800">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 flex flex-col gap-6">
        {/* Step Tracker */}
        <div className="bg-white border border-slate-200 rounded-lg px-3 sm:px-6 py-4 sm:py-5 shadow-sm">
          <div className="flex items-center justify-between mb-3 sm:mb-4">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">Order Progress</span>
            <a
              href={SITE_CONFIG.phone?.href || 'tel:+19145154875'}
              className="hidden sm:flex items-center gap-1.5 text-xs font-semibold text-primary hover:underline"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z"
                />
              </svg>
              {SITE_CONFIG.phone?.display || '+1 (877) 657-8180'}
            </a>
          </div>
          <OrderStepTracker currentStep={currentStep} />
        </div>

        {/* Page Title */}
        <div>
          <h1 className="text-xl font-bold text-slate-900">Confirm Your Order</h1>
          <p className="text-slate-500 text-sm mt-0.5">
            Review your order, edit details or pricing — then confirm and deposit funds.
          </p>
        </div>

        {/* Action Error */}
        {actionError && (
          <div className="bg-red-50 border border-red-200 text-red-700 text-sm px-4 py-3 rounded-md">
            {actionError}
          </div>
        )}

        {/* Payment Success */}
        {isPaid && (
          <div className="bg-emerald-50 border border-emerald-200 rounded-sm px-6 py-8 flex flex-col items-center gap-3 text-center">
            <div className="w-14 h-14 rounded-full bg-emerald-100 flex items-center justify-center">
              <svg className="w-7 h-7 text-emerald-600" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
              </svg>
            </div>
            <h2 className="text-lg font-bold text-emerald-900">Payment Received Successfully!</h2>
            <p className="text-emerald-700 text-sm max-w-md">
              Your order is now active. Our academic specialist is reviewing your requirements.
            </p>
            <Link
              to="/student/dashboard"
              className="mt-2 bg-primary hover:bg-primary-hover text-white text-sm font-bold px-7 py-2.5 rounded transition-colors"
            >
              Go to Dashboard →
            </Link>
          </div>
        )}

        {/* ── Main Content ─────────────────────────────────────────────── */}
        {!isPaid && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* LEFT: Order Details */}
            <div className="lg:col-span-7 flex flex-col gap-5">
              <OrderDetailsPanel
                order={order}
                orderId={orderId}
                displayId={displayId}
                spacingLabel={spacingLabel}
                selectedAddons={selectedAddons}
                onToggleAddon={toggleAddon}
              />
            </div>

            {/* RIGHT: Price + Actions */}
            <div className="lg:col-span-5 flex flex-col gap-5">
              <OrderCostPanel
                basePrice={assignmentAmount}
                finalAmount={finalAmount}
                addonsCost={addonsAmount}
                discountAmount={order?.pricing?.discountAmount}
                discountPercentage={order?.pricing?.discountPercentage}
                discountReason={order?.pricing?.discountReason}
                canPay={canPay}
                isPaying={isPaying}
                onDepositFunds={handleDepositFunds}
                isPaid={isPaid}
                orderStatus={order.status}
              />
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="border-t border-slate-200 mt-10 py-4 text-center">
        <p className="text-xs text-slate-400">
          Copyright © {new Date().getFullYear()} TutorsPath. All Rights Reserved.
        </p>
      </div>

      {/* Stripe Payment Modal */}
      <StripePaymentModal
        isOpen={stripeModal.isOpen}
        clientSecret={stripeModal.clientSecret}
        finalAmount={finalAmount}
        currency={stripeModal.currency}
        orderNumber={order?.orderNumber}
        onSuccess={handlePaymentSuccess}
        onClose={handleModalClose}
      />
    </div>
  );
};

export default ConfirmOrderDetails;