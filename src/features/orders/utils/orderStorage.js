const ORDERS_STORAGE_KEY = 'student_placed_orders';

export const orderStorage = {
  getOrders: () => {
    try {
      const stored = localStorage.getItem(ORDERS_STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  },

  saveOrder: (order) => {
    if (!order || !order._id) return;
    try {
      const current = orderStorage.getOrders();
      const existingIdx = current.findIndex((o) => o._id === order._id);
      let updated;
      if (existingIdx >= 0) {
        updated = [...current];
        updated[existingIdx] = { ...updated[existingIdx], ...order };
      } else {
        updated = [order, ...current];
      }
      localStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify(updated));
    } catch (e) {
      console.error('Failed to save order in local storage:', e);
    }
  },

  updateOrderPayment: (orderId, paymentStatus = 'paid') => {
    try {
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
      localStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify(updated));
      return updated.find((o) => o._id === orderId);
    } catch (e) {
      console.error('Failed to update order payment in local storage:', e);
    }
  },
};

export default orderStorage;
