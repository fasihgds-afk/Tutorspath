import React from 'react';

const steps = [
  { id: 1, label: 'Share Order Details' },
  { id: 2, label: 'Confirm Your Order' },
  { id: 3, label: 'Deposit Funds' },
  { id: 4, label: 'Track Progress' },
];

const OrderStepTracker = ({ currentStep = 1, onStepClick }) => {
  return (
    <div className="flex flex-wrap items-center gap-2 text-sm font-semibold text-slate-500">
      {steps.map((step, index) => {
        const isActive = step.id === currentStep;

        return (
          <React.Fragment key={step.id}>
            <button
              type="button"
              onClick={() => onStepClick && onStepClick(step.id)}
              className={`transition-colors focus:outline-none ${
                isActive
                  ? 'text-primary font-bold'
                  : 'text-slate-500 hover:text-primary cursor-pointer'
              }`}
            >
              {step.label}
            </button>

            {index < steps.length - 1 && (
              <span className="text-slate-400 select-none">&gt;</span>
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
};

export default OrderStepTracker;
