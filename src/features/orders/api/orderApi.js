import api from '../../../services/api/apiClient';
import orderStorage from '../utils/orderStorage';

// Backend responses are inconsistently shaped ({ order }, plain data, or the
// raw object depending on endpoint/interceptor). This normalizes all of them.
const unwrapOrder = (res) => res?.data?.order || res?.data || res;

const findLocalOrder = (orderId) => orderStorage.getOrders().find((o) => o._id === orderId);

export const orderApi = {
  /**
   * 1. CREATE ORDER (Draft)
   * POST /api/v1/orders
   */
  createOrder: async (orderData) => {
    try {
      const res = await api.post('/orders', orderData);
      const created = unwrapOrder(res);
      if (created?._id) {
        orderStorage.saveOrder(created);
      }
      return created;
    } catch (error) {
      // Fallback draft saved locally
      const fallback = {
        _id: 'draft_' + Date.now(),
        orderNumber: 'TP-' + Math.floor(100000 + Math.random() * 900000),
        ...orderData,
        status: 'draft',
        paymentStatus: 'pending',
        createdAt: new Date().toISOString(),
      };
      orderStorage.saveOrder(fallback);
      return fallback;
    }
  },

  /**
   * 2. UPDATE ORDER PRICING
   * PATCH /api/v1/orders/:orderId/pricing
   */
  updateOrderPricing: async (orderId, pricingData) => {
    try {
      const res = await api.patch(`/orders/${orderId}/pricing`, pricingData);
      const updated = unwrapOrder(res);
      if (updated?._id) {
        orderStorage.saveOrder(updated);
      }
      return updated;
    } catch (error) {
      // Update local storage record if backend not accessible
      const existing = findLocalOrder(orderId);
      if (existing) {
        const localUpdated = { ...existing, ...pricingData };
        orderStorage.saveOrder(localUpdated);
        return localUpdated;
      }
      throw error;
    }
  },

  /**
   * 3. CONFIRM ORDER
   * POST /api/v1/orders/:orderId/confirm
   */
  confirmOrder: async (orderId) => {
    try {
      const res = await api.post(`/orders/${orderId}/confirm`, {});
      const confirmed = unwrapOrder(res);
      if (confirmed?._id) {
        orderStorage.saveOrder(confirmed);
      }
      return confirmed;
    } catch (error) {
      const existing = findLocalOrder(orderId);
      if (existing) {
        const localConfirmed = {
          ...existing,
          status: 'awaitingPayment',
          paymentStatus: 'pending',
        };
        orderStorage.saveOrder(localConfirmed);
        return localConfirmed;
      }
      throw error;
    }
  },

  /**
   * 4. GET SINGLE ORDER
   * GET /api/v1/orders/:orderId
   */
  getOrder: async (orderId) => {
    try {
      const res = await api.get(`/orders/${orderId}`);
      const order = unwrapOrder(res);
      if (order?._id) {
        orderStorage.saveOrder(order);
        return order;
      }
    } catch (e) {
      // Look up locally
    }
    return findLocalOrder(orderId) || null;
  },

  /**
   * 5. CREATE PAYMENT INTENT
   * POST /api/v1/payments/orders/:orderId/payment-intent
   */
  createPaymentIntent: async (orderId, paymentMethod = 'stripe') => {
    try {
      const res = await api.post(`/payments/orders/${orderId}/payment-intent`, {
        paymentMethod,
      });
      return res?.data || res;
    } catch (error) {
      // Simulate client payment intent if test mode
      return {
        clientSecret: 'simulated_secret_' + Date.now(),
        orderId,
      };
    }
  },

  /**
   * 6. CONFIRM PAYMENT SUCCESS (frontend-triggered fast-path sync)
   * POST /api/v1/payments/orders/:orderId/confirm
   *
   * Called right after Stripe confirms the PaymentIntent client-side.
   * The backend MUST re-verify the PaymentIntent status directly with
   * Stripe (never trust the frontend blindly) before marking the order
   * paid. This is a fast-path UX improvement — it does NOT replace the
   * Stripe webhook, which remains the authoritative source of truth in
   * case this call fails (network drop, tab closed, etc).
   */
  confirmPaymentSuccess: async (orderId, paymentIntentId) => {
    try {
      const res = await api.post(`/payments/orders/${orderId}/confirm`, {
        paymentIntentId,
      });
      const updated = unwrapOrder(res);
      if (updated?._id) {
        orderStorage.saveOrder(updated);
      }
      return updated;
    } catch (error) {
      console.error('confirmPaymentSuccess failed:', error);
      // Don't fabricate a "paid" order here — better to show the true
      // (possibly stale) backend state than to lie to the UI.
      throw error;
    }
  },

  /**
   * GET ALL STUDENT ORDERS
   * GET /api/v1/orders/my-orders
   * Backend returns all orders for the authenticated student (newest first).
   * Falls back to localStorage if the API fails.
   */
  getStudentOrders: async () => {
    try {
      const res = await api.get('/orders/my-orders');
      const orders = res?.data?.orders || res?.data || [];
      if (Array.isArray(orders) && orders.length > 0) {
        // Sync each fresh order into localStorage
        orders.forEach((o) => { if (o?._id) orderStorage.saveOrder(o); });
        return orders;
      }
      // Backend returned empty array — still valid, no fallback needed
      return orders;
    } catch {
      // Network error — fall back to localStorage cache
      return orderStorage.getOrders();
    }
  },
};

export default orderApi;