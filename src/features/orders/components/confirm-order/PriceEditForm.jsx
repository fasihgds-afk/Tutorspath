import React from 'react';
import { DEADLINE_OPTIONS, WORDS_PER_PAGE } from '../../constants/orderOptions';

const SPACING_OPTIONS = [
  { value: 'double', label: 'Double Spaced' },
  { value: 'single', label: 'Single Spaced' },
];

/**
 * Inline pricing-inputs editor shown on ConfirmOrderDetails while the order
 * is still a draft. Saves via PATCH /api/v1/orders/:orderId/pricing.
 */
const PriceEditForm = ({
  deadline,
  onDeadlineChange,
  pages,
  onPagesChange,
  spacing,
  onSpacingChange,
  error,
  isSaving,
  onSave,
  onCancel,
}) => (
  <div className="bg-amber-50 border-b-2 border-amber-300 px-5 py-5 flex flex-col gap-4">
    {/* Header */}
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm font-bold text-amber-900">Edit Pricing Inputs</p>
        <p className="text-xs text-amber-700 mt-0.5">
          Update your deadline, pages, or spacing — the total price updates automatically.
        </p>
      </div>
      <button
        type="button"
        onClick={onCancel}
        className="text-amber-600 hover:text-amber-900 transition-colors cursor-pointer"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>

    {error && (
      <p className="text-red-600 text-xs font-medium bg-red-50 border border-red-200 px-3 py-2 rounded">
        {error}
      </p>
    )}

    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {/* Deadline */}
      <div className="flex flex-col gap-1">
        <label className="text-xs font-semibold text-slate-700">Deadline</label>
        <select
          value={deadline}
          onChange={(e) => onDeadlineChange(e.target.value)}
          className="border border-slate-300 rounded px-3 py-2 text-sm text-slate-800 focus:outline-none focus:border-primary bg-white"
        >
          {DEADLINE_OPTIONS.map((d) => (
            <option key={d} value={d}>
              {d}
            </option>
          ))}
        </select>
      </div>

      {/* Number of Pages */}
      <div className="flex flex-col gap-1">
        <label className="text-xs font-semibold text-slate-700">
          Pages <span className="text-slate-400 font-normal">({pages * WORDS_PER_PAGE} words)</span>
        </label>
        <input
          type="number"
          min={1}
          value={pages}
          onChange={(e) => onPagesChange(Math.max(1, parseInt(e.target.value, 10) || 1))}
          className="border border-slate-300 rounded px-3 py-2 text-sm text-slate-800 focus:outline-none focus:border-primary"
        />
      </div>
    </div>

    {/* Line Spacing */}
    <div className="flex flex-col gap-1.5">
      <label className="text-xs font-semibold text-slate-700">Line Spacing</label>
      <div className="flex gap-4">
        {SPACING_OPTIONS.map(({ value, label }) => (
          <label key={value} className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name="editSpacing"
              value={value}
              checked={spacing === value}
              onChange={() => onSpacingChange(value)}
              className="accent-primary w-4 h-4"
            />
            <span className="text-sm text-slate-700 font-medium">{label}</span>
          </label>
        ))}
      </div>
    </div>

    {/* Save / Cancel */}
    <div className="flex items-center gap-3 pt-1 border-t border-amber-200">
      <button
        type="button"
        disabled={isSaving}
        onClick={onSave}
        className="bg-primary hover:bg-primary-hover disabled:opacity-60 text-white text-sm font-bold px-6 py-2 rounded transition-colors cursor-pointer"
      >
        {isSaving ? 'Saving…' : 'Save & Recalculate Price'}
      </button>
      <button
        type="button"
        onClick={onCancel}
        className="text-sm font-semibold text-slate-500 hover:text-slate-800 cursor-pointer transition-colors"
      >
        Cancel
      </button>
    </div>
  </div>
);

export default PriceEditForm;
