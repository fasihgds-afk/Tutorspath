import React from 'react';
import { EXPERT_OPTIONS } from '../constants/orderOptions';

const ExpertSelectionCard = ({ selectedExpert, onChange }) => {
  return (
    <div className="bg-white border border-slate-200 rounded-xl p-5 sm:p-6 flex flex-col gap-4 shadow-xs">
      <h3 className="text-slate-900 text-base font-bold pb-3 border-b border-slate-200">
        Expert Selection
      </h3>
      <div className="flex flex-col gap-2.5">
        {EXPERT_OPTIONS.map((opt) => {
          const isSelected = selectedExpert === opt.id;
          return (
            <label
              key={opt.id}
              onClick={() => onChange(opt.id)}
              className={`flex items-center justify-between py-3 px-4 border rounded-lg cursor-pointer transition-colors ${
                isSelected
                  ? 'border-primary bg-emerald-50/40 text-slate-900 font-medium'
                  : 'border-slate-300 hover:border-slate-400 bg-white text-slate-800'
              }`}
            >
              <div className="flex items-center gap-3">
                <input
                  type="radio"
                  name="expert"
                  checked={isSelected}
                  onChange={() => onChange(opt.id)}
                  className="w-4 h-4 accent-primary cursor-pointer"
                />
                <span className="text-sm font-medium">{opt.label}</span>
              </div>
              {opt.price ? (
                <span className="text-slate-800 font-bold text-sm bg-slate-100 px-2 py-0.5 rounded border border-slate-200">
                  {opt.price}
                </span>
              ) : (
                <span className="text-emerald-700 font-bold text-xs bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                  FREE
                </span>
              )}
            </label>
          );
        })}
      </div>
    </div>
  );
};

export default ExpertSelectionCard;
