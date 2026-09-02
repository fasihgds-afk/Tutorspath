import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import orderApi from '../../orders/api/orderApi';

/**
 * Smart redirect hook.
 * Checks the user's order history and navigates to the most relevant page:
 *
 *  1. No orders at all            → /order/place-order
 *  2. Has draft / awaitingPayment → /Order/ConfirmOrderDetails?orderId=...
 *  3. Has paid / completed order  → /student/dashboard
 */
const PAID_STATUSES = ['paid', 'writerAssigned', 'inProgress', 'submitted', 'revisionRequested', 'completed'];
const PENDING_STATUSES = ['draft', 'awaitingPayment'];

const useSmartRedirect = () => {
  const navigate = useNavigate();

  const redirect = useCallback(async () => {
    try {
      const orders = await orderApi.getStudentOrders();

      if (!Array.isArray(orders) || orders.length === 0) {
        // No orders — send them to create one
        navigate('/order/place-order');
        return;
      }

      // Sort newest first
      const sorted = [...orders].sort(
        (a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0)
      );

      // Check if any order is paid/active
      const paidOrder = sorted.find((o) => PAID_STATUSES.includes(o.status));
      if (paidOrder) {
        navigate('/student/dashboard');
        return;
      }

      // Check if any order is pending (draft / awaiting payment)
      const pendingOrder = sorted.find((o) => PENDING_STATUSES.includes(o.status));
      if (pendingOrder) {
        navigate(`/Order/ConfirmOrderDetails?orderId=${pendingOrder._id}`);
        return;
      }

      // Fallback — just go to dashboard
      navigate('/student/dashboard');
    } catch {
      // API failed — safe fallback
      navigate('/order/place-order');
    }
  }, [navigate]);

  return redirect;
};

export default useSmartRedirect;
