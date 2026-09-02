import React from 'react';
import ChevronDownIcon from './ChevronDownIcon';

const LABEL_CLASS = 'text-slate-800 text-sm font-semibold mb-1.5 block';
const SELECT_CLASS =
  'w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-md text-slate-800 text-sm appearance-none focus:outline-none focus:border-primary cursor-pointer transition-colors';

/**
 * Labeled <select> with a chevron-down affordance.
 * Pass native <option>/<optgroup> elements as children.
 */
const SelectField = ({ label, value, onChange, children, className = '', fixedHeight = false, disabled = false }) => (
  <div>
    {label && (
      <label className={`${LABEL_CLASS} ${disabled ? 'text-slate-400' : ''}`}>
        {label}
        {disabled && (
          <span className="ml-1.5 text-xs font-normal text-slate-400">(not editable)</span>
        )}
      </label>
    )}
    <div className="relative">
      <select
        value={value}
        onChange={onChange}
        disabled={disabled}
        className={`${SELECT_CLASS} ${fixedHeight ? 'h-[42px]' : ''} ${
          disabled ? 'bg-slate-100 text-slate-400 cursor-not-allowed border-slate-200 opacity-70' : ''
        } ${className}`}
      >
        {children}
      </select>
      <span className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-slate-400">
        <ChevronDownIcon />
      </span>
    </div>
  </div>
);

export default SelectField;
