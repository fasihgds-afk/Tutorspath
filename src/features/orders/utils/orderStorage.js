import tokenManager from '../../../services/auth/tokenManager';

const BASE_KEY = 'student_placed_orders';

const getStorageKey = () => {
  try {
    const user = tokenManager.getUser();
    const userId = user?.id || user?._id;
    return userId ? `${BASE_KEY}_${userId}` : `${BASE_KEY}_guest`;
  } catch {
    return `${BASE_KEY}_guest`;
  }
};

export const orderStorage = {
  getOrders: () => {
    try {
      const key = getStorageKey();
      const stored = localStorage.getItem(key);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  },

  saveOrder: (order) => {
    if (!order || !order._id) return;
    try {
      const key = getStorageKey();
      const current = orderStorage.getOrders();
      const existingIdx = current.findIndex((o) => o._id === order._id);
      let updated;
      if (existingIdx >= 0) {
        updated = [...current];
        updated[existingIdx] = { ...updated[existingIdx], ...order };
      } else {
        updated = [order, ...current];
      }
      localStorage.setItem(key, JSON.stringify(updated));
    } catch (e) {
      console.error('Failed to save order in local storage:', e);
    }
  },

  updateOrderPayment: (orderId, paymentStatus = 'paid') => {
    try {
      const key = getStorageKey();
      const current = orderStorage.getOrders();
      const updated = current.map((o) => {
        if (o._id === orderId) {
          return {
            ...o,
            paymentStatus,
            status: paymentStatus === 'paid' ? 'paid' : o.status,
            orderNumber: o.orderNumber || `TP-${Date.now().toString().slice(-6)}`,
            paidAt: paymentStatus === 'paid' ? new Date().toISOString() : o.paidAt,
          };
        }
        return o;
      });
      localStorage.setItem(key, JSON.stringify(updated));
      return updated.find((o) => o._id === orderId);
    } catch (e) {
      console.error('Failed to update order payment in local storage:', e);
    }
  },

  clearOrders: () => {
    try {
      const key = getStorageKey();
      localStorage.removeItem(key);
      localStorage.removeItem(BASE_KEY);
      localStorage.removeItem(`${BASE_KEY}_guest`);
    } catch (e) {
      console.error('Failed to clear order storage:', e);
    }
  },
};

export default orderStorage;
