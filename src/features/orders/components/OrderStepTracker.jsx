import React from 'react';
import { ORDER_STEPS } from '../constants/orderOptions';

const OrderStepTracker = ({ currentStep = 1, onStepClick }) => {
  return (
    <div className="flex flex-col gap-2 w-full">
      {/* ── Step circles + connectors row ── */}
      <div className="flex items-center w-full">
        {ORDER_STEPS.map((step, index) => {
          const isActive = step.id === currentStep;
          const isCompleted = step.id < currentStep;
          const isLast = index === ORDER_STEPS.length - 1;

          return (
            <React.Fragment key={step.id}>
              {/* Step circle */}
              <button
                type="button"
                onClick={() => onStepClick && onStepClick(step.id)}
                className="flex flex-col items-center shrink-0 focus:outline-none"
                style={{ cursor: onStepClick ? 'pointer' : 'default' }}
                aria-label={step.label}
              >
                <span
                  className={`
                    w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center
                    text-[11px] sm:text-xs font-bold border-2 transition-all duration-200
                    ${isCompleted
                      ? 'bg-emerald-500 border-emerald-500 text-white'
                      : isActive
                      ? 'bg-primary border-primary text-white shadow-md shadow-primary/30'
                      : 'bg-white border-slate-300 text-slate-400'
                    }
                  `}
                >
                  {isCompleted ? (
                    <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                    </svg>
                  ) : (
                    step.id
                  )}
                </span>

                {/* Label — hidden on mobile, shown on sm+ */}
                <span
                  className={`
                    hidden sm:block mt-1.5 text-[11px] font-semibold leading-tight
                    text-center whitespace-nowrap transition-colors
                    ${isCompleted ? 'text-emerald-600' : isActive ? 'text-primary' : 'text-slate-400'}
                  `}
                >
                  {step.label}
                </span>
              </button>

              {/* Connector line */}
              {!isLast && (
                <div className={`flex-1 mx-1 ${isCompleted ? '' : ''}`}>
                  <div
                    className={`h-0.5 w-full transition-all duration-300 ${
                      isCompleted ? 'bg-emerald-400' : 'bg-slate-200'
                    }`}
                  />
                </div>
              )}
            </React.Fragment>
          );
        })}
      </div>

      {/* ── Mobile-only: active step label shown below circles ── */}
      <div className="sm:hidden text-center">
        {ORDER_STEPS.map((step) => {
          const isActive = step.id === currentStep;
          const isCompleted = step.id < currentStep;
          if (!isActive && !isCompleted) return null;
          if (!isActive) return null;
          return (
            <span key={step.id} className="text-xs font-bold text-primary">
              Step {step.id}: {step.label}
            </span>
          );
        })}
      </div>
    </div>
  );
};

export default OrderStepTracker;
