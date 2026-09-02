import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import tokenManager from '../../../services/auth/tokenManager';
import orderApi from '../../orders/api/orderApi';
import { SITE_CONFIG } from '../../../config/siteConfig';

const StudentDashboard = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const currentUser = tokenManager.getUser();
  const studentName = currentUser?.fullName || currentUser?.name || 'Student';

  useEffect(() => {
    const fetchOrders = async () => {
      setIsLoading(true);
      try {
        const data = await orderApi.getStudentOrders();
        setOrders(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error('Failed to load student orders:', err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchOrders();
  }, []);

  const displayedOrders = orders.filter((order) => {
    if (!searchTerm.trim()) return true;
    const term = searchTerm.toLowerCase();
    const orderId = String(order.orderNumber || order._id || '').toLowerCase();
    const project = String(order.title || order.assignmentType || '').toLowerCase();
    const status = String(order.status || '').toLowerCase();
    return orderId.includes(term) || project.includes(term) || status.includes(term);
  });

  const getStatusConfig = (status, paymentStatus) => {
    const s = String(status || '').toLowerCase();
    const p = String(paymentStatus || '').toLowerCase();
    if (p === 'failed') return { label: 'Payment Failed', cls: 'bg-red-100 text-red-800' };
    switch (s) {
      case 'draft':              return { label: 'Draft',             cls: 'bg-slate-100 text-slate-700' };
      case 'awaitingpayment':    return { label: 'Awaiting Payment',  cls: 'bg-amber-100 text-amber-800' };
      case 'paid':               return { label: 'Paid',              cls: 'bg-emerald-100 text-emerald-800' };
      case 'writerassigned':     return { label: 'Writer Assigned',   cls: 'bg-blue-100 text-blue-800' };
      case 'inprogress':         return { label: 'In Progress',       cls: 'bg-indigo-100 text-indigo-800' };
      case 'submitted':          return { label: 'Submitted',         cls: 'bg-violet-100 text-violet-800' };
      case 'revisionrequested':  return { label: 'Revision Requested',cls: 'bg-orange-100 text-orange-800' };
      case 'completed':          return { label: '✓ Completed',       cls: 'bg-emerald-100 text-emerald-900' };
      case 'cancelled':          return { label: 'Cancelled',         cls: 'bg-red-100 text-red-800' };
      case 'refunded':           return { label: 'Refunded',          cls: 'bg-slate-100 text-slate-700' };
      default:                   return { label: status || 'Unknown', cls: 'bg-slate-100 text-slate-700' };
    }
  };

  const getActionConfig = (order) => {
    const isPaid = order.paymentStatus === 'paid' ||
      ['paid','writerAssigned','inProgress','submitted','revisionRequested','completed'].includes(order.status);
    const isAwaitingPayment = order.status === 'awaitingPayment';
    const isCancelledOrRefunded = ['cancelled', 'refunded'].includes(order.status);
    if (isPaid || isCancelledOrRefunded) return { label: 'View Order', cls: 'bg-slate-600 hover:bg-slate-700 text-white' };
    if (isAwaitingPayment)               return { label: 'Pay Now',    cls: 'bg-amber-500 hover:bg-amber-600 text-white' };
    return                                      { label: 'Confirm Order', cls: 'bg-primary hover:bg-primary-hover text-white' };
  };

  return (
    <div className="w-full bg-white font-sans antialiased text-[#111827] py-6 px-4 sm:px-6 lg:px-8 min-h-[calc(100vh-80px)]">
      <div className="w-full max-w-[1280px] mx-auto flex flex-col gap-6">

        {/* ── Top Header ── */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <h1 className="text-xl sm:text-2xl font-bold text-slate-800">
            WELCOME <span className="text-primary">{studentName}</span>,
          </h1>
          <Link
            to="/order/place-order"
            className="bg-primary hover:bg-primary-hover text-white text-sm font-semibold py-2.5 px-6 rounded-md transition-colors text-center sm:text-left"
          >
            Place New Order
          </Link>
        </div>

        {/* ── Main 2-Column Layout ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">

          {/* ── Left: Orders (8 cols) ── */}
          <div className="lg:col-span-8 flex flex-col gap-4">

            {/* Table header row */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <h2 className="text-lg font-bold text-slate-800">
                All Orders{' '}
                <span className="text-sm font-normal text-slate-500">({orders.length})</span>
              </h2>
              <div className="relative w-full sm:w-64">
                <input
                  type="text"
                  placeholder="Search Order"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-3 pr-8 py-2 border border-slate-300 rounded-full text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-primary"
                />
                <span className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-slate-400">
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                  </svg>
                </span>
              </div>
            </div>

            {/* ── Desktop Table (hidden on mobile) ── */}
            <div className="hidden sm:block w-full border border-slate-200 rounded-sm overflow-x-auto bg-white shadow-xs">
              <table className="w-full min-w-[640px] text-center text-xs border-collapse">
                <thead>
                  <tr className="bg-primary text-white font-semibold">
                    <th className="py-3 px-3 font-semibold text-center border-r border-emerald-600/30 whitespace-nowrap">Order ID</th>
                    <th className="py-3 px-3 font-semibold text-center border-r border-emerald-600/30">Project</th>
                    <th className="py-3 px-3 font-semibold text-center border-r border-emerald-600/30 whitespace-nowrap">Order Date</th>
                    <th className="py-3 px-3 font-semibold text-center border-r border-emerald-600/30 whitespace-nowrap">Delivery</th>
                    <th className="py-3 px-3 font-semibold text-center border-r border-emerald-600/30">Status</th>
                    <th className="py-3 px-3 font-semibold text-center">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {isLoading ? (
                    <tr className="bg-slate-50 border-t border-slate-200">
                      <td colSpan="6" className="py-8 text-center text-slate-500 font-medium">
                        Loading your orders...
                      </td>
                    </tr>
                  ) : displayedOrders.length === 0 ? (
                    <tr className="bg-slate-50 border-t border-slate-200">
                      <td colSpan="6" className="py-8 text-center text-slate-500 font-medium">
                        No Record Found
                      </td>
                    </tr>
                  ) : (
                    displayedOrders.map((order, idx) => {
                      const displayId = order.orderNumber || (order._id ? `#${order._id.slice(-6).toUpperCase()}` : `#ORD-${idx + 1}`);
                      const projectTitle = order.title || order.assignmentType || 'Academic Paper';
                      const orderDate = order.createdAt
                        ? new Date(order.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })
                        : 'Today';
                      const deliveryDate = order.deadline || '3-5 Days';
                      const { label: statusLabel, cls: statusCls } = getStatusConfig(order.status, order.paymentStatus);
                      const { label: actionLabel, cls: actionCls } = getActionConfig(order);

                      return (
                        <tr key={order._id || idx} className="border-t border-slate-200 hover:bg-slate-50 transition-colors text-slate-700 font-medium">
                          <td className="py-3.5 px-3 font-bold text-primary border-r border-slate-200 whitespace-nowrap text-left">
                            {displayId}
                          </td>
                          <td className="py-3.5 px-3 text-slate-900 border-r border-slate-200 font-semibold text-left" style={{maxWidth: '160px'}}>
                            <div className="truncate">{projectTitle}</div>
                            {order.academicLevel && (
                              <span className="text-[11px] text-slate-500 font-normal">
                                {order.academicLevel} &bull; {order.numberOfPages || 1} pg
                              </span>
                            )}
                          </td>
                          <td className="py-3.5 px-3 text-slate-600 border-r border-slate-200 whitespace-nowrap">{orderDate}</td>
                          <td className="py-3.5 px-3 text-slate-700 border-r border-slate-200 font-medium whitespace-nowrap">{deliveryDate}</td>
                          <td className="py-3.5 px-3 border-r border-slate-200">
                            <span className={`text-xs font-semibold px-2 py-1 rounded whitespace-nowrap ${statusCls}`}>{statusLabel}</span>
                          </td>
                          <td className="py-3.5 px-3">
                            <Link
                              to={`/Order/ConfirmOrderDetails?orderId=${order._id}`}
                              className={`text-[11px] font-bold px-3 py-1.5 rounded transition-colors inline-block whitespace-nowrap ${actionCls}`}
                            >
                              {actionLabel}
                            </Link>
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>

            {/* ── Mobile Cards (visible only on mobile) ── */}
            <div className="sm:hidden flex flex-col gap-3">
              {isLoading ? (
                <div className="py-8 text-center text-slate-500 font-medium text-sm">
                  Loading your orders...
                </div>
              ) : displayedOrders.length === 0 ? (
                <div className="py-8 text-center text-slate-500 font-medium text-sm border border-slate-200 rounded-lg bg-white">
                  No Record Found
                </div>
              ) : (
                displayedOrders.map((order, idx) => {
                  const displayId = order.orderNumber || (order._id ? `#${order._id.slice(-6).toUpperCase()}` : `#ORD-${idx + 1}`);
                  const projectTitle = order.title || order.assignmentType || 'Academic Paper';
                  const orderDate = order.createdAt
                    ? new Date(order.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
                    : 'Today';
                  const deliveryDate = order.deadline || '3-5 Days';
                  const { label: statusLabel, cls: statusCls } = getStatusConfig(order.status, order.paymentStatus);
                  const { label: actionLabel, cls: actionCls } = getActionConfig(order);

                  return (
                    <div key={order._id || idx} className="bg-white border border-slate-200 rounded-lg p-4 flex flex-col gap-3 shadow-xs">
                      {/* ID + status */}
                      <div className="flex items-start justify-between gap-2">
                        <span className="text-xs font-bold text-primary break-all leading-snug">{displayId}</span>
                        <span className={`text-xs font-semibold px-2 py-0.5 rounded shrink-0 ${statusCls}`}>{statusLabel}</span>
                      </div>

                      {/* Project */}
                      <div>
                        <p className="text-sm font-semibold text-slate-900 leading-snug">{projectTitle}</p>
                        {order.academicLevel && (
                          <p className="text-xs text-slate-500 mt-0.5">
                            {order.academicLevel} &bull; {order.numberOfPages || 1} page{order.numberOfPages > 1 ? 's' : ''}
                          </p>
                        )}
                      </div>

                      {/* Dates */}
                      <div className="flex gap-5 text-xs">
                        <div>
                          <p className="text-slate-400 font-medium">Ordered</p>
                          <p className="font-semibold text-slate-700 mt-0.5">{orderDate}</p>
                        </div>
                        <div>
                          <p className="text-slate-400 font-medium">Delivery</p>
                          <p className="font-semibold text-slate-700 mt-0.5">{deliveryDate}</p>
                        </div>
                      </div>

                      {/* Action */}
                      <Link
                        to={`/Order/ConfirmOrderDetails?orderId=${order._id}`}
                        className={`w-full text-center text-xs font-bold py-2.5 px-4 rounded transition-colors ${actionCls}`}
                      >
                        {actionLabel}
                      </Link>
                    </div>
                  );
                })
              )}
            </div>

          </div>

          {/* ── Right: Support Card (4 cols) ── */}
          <div className="lg:col-span-4 flex flex-col gap-4">

            <div className="border border-slate-200 rounded-sm overflow-hidden bg-white relative shadow-xs">
              <div className="bg-primary text-white font-bold text-sm px-4 py-3">
                Contact Customer Support
              </div>

              {/* Watermark */}
              <div className="absolute right-3 top-14 opacity-10 pointer-events-none select-none">
                <svg className="w-36 h-36 text-slate-800" viewBox="0 0 100 100" fill="currentColor">
                  <circle cx="50" cy="50" r="45" stroke="currentColor" strokeWidth="6" fill="none" />
                  <text x="50%" y="60%" dominantBaseline="middle" textAnchor="middle" fontSize="32" fontWeight="bold">24</text>
                </svg>
              </div>

              <div className="flex flex-col text-xs relative z-10">
                <a href="#" className="flex items-center gap-3 px-4 py-3 border-b border-slate-100 text-slate-700 hover:text-primary hover:bg-slate-50 transition-colors">
                  <svg className="w-4 h-4 text-primary shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 9.75a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375m-13.5 3.01c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 01.865-.501 48.172 48.172 0 003.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z" />
                  </svg>
                  <span className="font-medium">Chat with a Representative</span>
                </a>

                <a href={`tel:${SITE_CONFIG.phone?.display?.replace(/\D/g, '') || '19145154875'}`} className="flex items-center gap-3 px-4 py-3 border-b border-slate-100 text-slate-700 hover:text-primary hover:bg-slate-50 transition-colors">
                  <svg className="w-4 h-4 text-primary shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                  </svg>
                  <span className="font-medium">Request Call Back</span>
                </a>

                <Link to="/order/place-order" className="flex items-center gap-3 px-4 py-3 border-b border-slate-100 text-slate-700 hover:text-primary hover:bg-slate-50 transition-colors">
                  <svg className="w-4 h-4 text-primary shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125" />
                  </svg>
                  <span className="font-medium">Free Inquiry</span>
                </Link>

                <a href={`mailto:${SITE_CONFIG.email?.display || 'care@tutorspath.com'}`} className="flex items-center gap-3 px-4 py-3 border-b border-slate-100 text-slate-700 hover:text-primary hover:bg-slate-50 transition-colors">
                  <svg className="w-4 h-4 text-primary shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                  </svg>
                  <span className="font-medium">{SITE_CONFIG.email?.display || 'care@tutorspath.com'}</span>
                </a>

                <a href={`tel:${SITE_CONFIG.phoneHome1?.display?.replace(/\D/g, '') || '923295128671'}`} className="flex items-center gap-3 px-4 py-3 text-slate-700 hover:text-primary hover:bg-slate-50 transition-colors">
                  <svg className="w-4 h-4 text-primary shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                  </svg>
                  <span className="font-semibold">{SITE_CONFIG.phoneHome1?.display || '+92-329-5128671'}</span>
                </a>
              </div>
            </div>

            <Link
              to="/order/place-order"
              className="w-full text-center bg-primary hover:bg-primary-hover text-white text-sm font-semibold py-3 px-4 rounded-md transition-colors block shadow-xs"
            >
              Place New Order
            </Link>

          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;
