import React from 'react';

const LABEL_CLASS = 'text-slate-800 text-sm font-semibold mb-1.5 block';

/**
 * Labeled numeric stepper: [-] [value] [+].
 */
const NumberStepperField = ({ label, value, onChange, onIncrement, onDecrement, ariaLabel, disabled = false }) => (
  <div>
    {label && (
      <label className={`${LABEL_CLASS} ${disabled ? 'text-slate-400' : ''}`}>
        {label}
        {disabled && (
          <span className="ml-1.5 text-xs font-normal text-slate-400">(not editable)</span>
        )}
      </label>
    )}
    <div className={`flex items-center border rounded-md overflow-hidden w-full h-[42px] ${
      disabled ? 'border-slate-200 bg-slate-100 opacity-70' : 'border-slate-300 bg-white'
    }`}>
      <button
        type="button"
        onClick={disabled ? undefined : onDecrement}
        disabled={disabled}
        className={`w-10 h-full font-bold text-lg leading-none select-none transition-colors shrink-0 flex items-center justify-center ${
          disabled
            ? 'bg-slate-200 text-slate-400 cursor-not-allowed'
            : 'bg-primary text-white hover:bg-primary-hover cursor-pointer'
        }`}
        aria-label={`Decrease ${ariaLabel}`}
      >
        −
      </button>
      <input
        type="text"
        value={value}
        onChange={disabled ? undefined : onChange}
        readOnly={disabled}
        className={`flex-1 min-w-0 text-center py-2 text-sm font-bold focus:outline-none border-0 bg-transparent ${
          disabled ? 'text-slate-400 cursor-not-allowed' : 'text-slate-900'
        }`}
      />
      <button
        type="button"
        onClick={disabled ? undefined : onIncrement}
        disabled={disabled}
        className={`w-10 h-full font-bold text-lg leading-none select-none transition-colors shrink-0 flex items-center justify-center ${
          disabled
            ? 'bg-slate-200 text-slate-400 cursor-not-allowed'
            : 'bg-primary text-white hover:bg-primary-hover cursor-pointer'
        }`}
        aria-label={`Increase ${ariaLabel}`}
      >
        +
      </button>
    </div>
  </div>
);

export default NumberStepperField;
