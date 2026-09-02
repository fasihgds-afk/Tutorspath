import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import orderApi from '../../orders/api/orderApi';
import { isOrderPaid } from '../../orders/utils/orderHelpers';

/**
 * Smart redirect hook after Login / Register or when clicking View/Create Order.
 * Checks the user's order history and navigates dynamically:
 *
 *  1. Zero orders (user didn't order) → /order/place-order
 *  2. Confirmed order but didn't pay (pending / unpaid) → /Order/ConfirmOrderDetails?orderId=...
 *  3. Completed payment (paid orders) → /student/dashboard
 */
const useSmartRedirect = () => {
  const navigate = useNavigate();

  const redirect = useCallback(async () => {
    try {
      const orders = await orderApi.getStudentOrders();

      // 1. Zero orders → show place order page
      if (!Array.isArray(orders) || orders.length === 0) {
        navigate('/order/place-order');
        return;
      }

      // Sort newest first
      const sorted = [...orders].sort(
        (a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0)
      );

      // 2. If user has an order they confirmed/created but didn't pay yet → go to confirm order / deposit funds
      const pendingUnpaidOrder = sorted.find((o) => !isOrderPaid(o));
      if (pendingUnpaidOrder && pendingUnpaidOrder._id) {
        navigate(`/Order/ConfirmOrderDetails?orderId=${pendingUnpaidOrder._id}`);
        return;
      }

      // 3. If user has completed payment → go to student dashboard
      const paidOrder = sorted.find((o) => isOrderPaid(o));
      if (paidOrder) {
        navigate('/student/dashboard');
        return;
      }

      // Fallback
      navigate('/student/dashboard');
    } catch (err) {
      console.error('Smart redirect error:', err);
      // Safe fallback if API fails
      navigate('/order/place-order');
    }
  }, [navigate]);

  return redirect;
};

export default useSmartRedirect;
