import React from 'react';

const ExpertSelectionCard = ({ selectedExpert, onChange }) => {
  const options = [
    { id: 'system', label: 'Let The System Choose The Best Fit', price: null },
    { id: 'rehire', label: 'Rehire A Previous Expert', price: '$5.00' },
    { id: 'custom', label: 'Choose Expert Of Your Choice', price: '$8.75' },
  ];

  return (
    <div className="bg-white border border-slate-200 p-5 flex flex-col gap-4">
      <h3 className="text-slate-900 text-base font-bold pb-3 border-b border-slate-200">
        Expert Selection
      </h3>
      <div className="flex flex-col gap-2">
        {options.map((opt) => (
          <label
            key={opt.id}
            onClick={() => onChange(opt.id)}
            className="flex items-center justify-between py-2.5 px-3 border border-slate-300 cursor-pointer hover:border-primary transition-colors"
          >
            <div className="flex items-center gap-3">
              <input
                type="radio"
                name="expert"
                checked={selectedExpert === opt.id}
                onChange={() => onChange(opt.id)}
                className="w-4 h-4 accent-primary cursor-pointer"
              />
              <span className="text-slate-800 text-sm">{opt.label}</span>
            </div>
            {opt.price && <span className="text-slate-800 font-semibold text-sm">{opt.price}</span>}
          </label>
        ))}
      </div>
    </div>
  );
};

export default ExpertSelectionCard;
