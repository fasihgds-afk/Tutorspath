import React from 'react';
import { Link } from 'react-router-dom';
import DetailList from '../shared/DetailList';
import { CONFIRM_ORDER_ADDONS } from '../../constants/orderOptions';

const OrderDetailsPanel = ({
  order,
  orderId,
  displayId,
  spacingLabel,
  selectedAddons,
  onToggleAddon,
}) => {
  const detailRows = [
    { label: 'Order ID', value: displayId },
    { label: 'Deadline', value: order.deadline || 'N/A' },
    { label: 'Academic Level', value: order.academicLevel || 'N/A' },
    { label: 'Line Spacing', value: spacingLabel },
    { label: 'Type of Work', value: order.assignmentType || 'N/A' },
    { label: 'Subject', value: order.subject || 'N/A' },
    { label: 'No. of Pages', value: order.numberOfPages || 1 },
    { label: 'Topic', value: order.title || 'N/A' },
    { label: 'Guidelines', value: order.guidelines || 'None provided' },
  ];

  const moreDetailRows = [
    { label: 'Citation Style', value: order.citationStyle || 'Non Specific' },
    { label: 'Font Face', value: order.fontStyle || 'Calibri (Standard)' },
    { label: 'References', value: order.references ?? 0 },
    { label: 'Language', value: order.language || 'US English' },
  ];

  return (
    <div className="bg-white border border-slate-200 rounded-sm overflow-hidden shadow-xs">
      {/* Card Header — always show edit button */}
      <div className="bg-primary text-white px-5 py-3 flex items-center justify-between gap-2">
        <span className="font-bold text-sm">Order Details</span>
        <Link
          to={`/order/place-order?orderId=${orderId}`}
          className="flex items-center gap-1.5 text-xs font-semibold bg-white/20 hover:bg-white/30 text-white px-3 py-1.5 rounded transition-colors"
        >
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487z" />
          </svg>
          Edit Order Details
        </Link>
      </div>

      <DetailList items={detailRows} variant="divided" />

      {/* More Details */}
      <div className="bg-slate-50 border-t border-slate-200 px-5 py-2.5 flex items-center gap-2">
        <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"
          />
        </svg>
        <span className="text-xs font-bold text-slate-600 uppercase tracking-wide">More Details</span>
      </div>
      <DetailList items={moreDetailRows} variant="divided" />

      {/* Add-ons */}
      <div className="bg-slate-50 border-t border-slate-200 px-5 py-2.5 flex items-center gap-2">
        <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <span className="text-xs font-bold text-slate-600 uppercase tracking-wide">Add-ons</span>
      </div>
      <div className="divide-y divide-slate-100">
        {CONFIRM_ORDER_ADDONS.map((addon) => (
          <label
            key={addon.id}
            className="flex items-center justify-between py-2.5 px-5 transition-colors cursor-pointer hover:bg-slate-50"
          >
            <div className="flex items-center gap-2.5">
              <input
                type="checkbox"
                checked={!!selectedAddons[addon.id]}
                onChange={() => onToggleAddon(addon.id)}
                className="accent-primary w-4 h-4 cursor-pointer"
              />
              <span className="text-sm text-slate-700 font-medium">{addon.label}</span>
            </div>
            <span className="text-sm font-bold text-primary">${addon.price.toFixed(2)}</span>
          </label>
        ))}
      </div>
    </div>
  );
};

export default OrderDetailsPanel;
