import React from 'react';

/**
 * Renders a list of { label, value } rows.
 *
 * variant="grid"    → two-column grid layout (used for the pre-confirm review summary)
 * variant="divided" → single-column list with divider lines (used on ConfirmOrderDetails)
 */
const DetailList = ({ items, variant = 'divided', labelWidthClass = 'w-36' }) => {
  if (variant === 'grid') {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3 text-sm">
        {items.map(({ label, value }) => (
          <div key={label} className="flex gap-2">
            <span className={`${labelWidthClass} shrink-0 font-semibold text-slate-500`}>{label}</span>
            <span className="text-slate-800 font-medium">{value || '—'}</span>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="divide-y divide-slate-100">
      {items.map(({ label, value }) => (
        <div key={label} className="flex items-start py-2.5 px-5 text-sm">
          <span className={`${labelWidthClass} shrink-0 font-semibold text-slate-600`}>{label}</span>
          <span className="text-slate-800 font-medium">{value}</span>
        </div>
      ))}
    </div>
  );
};

export default DetailList;
