import React from 'react';
import { ORDER_STEPS } from '../constants/orderOptions';

const OrderStepTracker = ({ currentStep = 1, onStepClick }) => {
  return (
    <div className="flex flex-wrap items-center gap-2 text-xs sm:text-sm font-semibold text-slate-500 py-1">
      {ORDER_STEPS.map((step, index) => {
        const isActive = step.id === currentStep;
        const isCompleted = step.id < currentStep;

        return (
          <React.Fragment key={step.id}>
            <button
              type="button"
              onClick={() => onStepClick && onStepClick(step.id)}
              className={`flex items-center gap-1.5 transition-colors focus:outline-none cursor-pointer ${
                isActive
                  ? 'text-primary font-bold'
                  : isCompleted
                  ? 'text-slate-700 hover:text-primary font-medium'
                  : 'text-slate-400 hover:text-slate-600'
              }`}
            >
              <span
                className={`w-5 h-5 rounded-full flex items-center justify-center text-[11px] font-bold ${
                  isActive
                    ? 'bg-primary text-white'
                    : isCompleted
                    ? 'bg-emerald-100 text-emerald-800'
                    : 'bg-slate-200 text-slate-600'
                }`}
              >
                {isCompleted ? '✓' : step.id}
              </span>
              <span>{step.label}</span>
            </button>

            {index < ORDER_STEPS.length - 1 && (
              <span className="text-slate-300 font-bold select-none mx-1">&gt;</span>
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
};

export default OrderStepTracker;
