import React from 'react';
import { PLACE_ORDER_ADDONS } from '../constants/orderOptions';

const AddonsCard = ({ selectedAddons = {}, onToggleAddon, disabled = false }) => {
  return (
    <div className="bg-white border border-slate-200 rounded-xl p-5 sm:p-6 flex flex-col gap-4 shadow-xs">
      <h3 className="text-slate-900 text-base font-bold pb-3 border-b border-slate-200">
        Add-ons
      </h3>
      <div className="flex flex-col gap-2.5">
        {PLACE_ORDER_ADDONS.map((addon) => {
          const isChecked = !!selectedAddons[addon.id];
          return (
            <label
              key={addon.id}
              onClick={() => !disabled && onToggleAddon(addon.id)}
              className={`flex items-center justify-between py-3 px-4 border rounded-lg transition-colors ${
                disabled
                  ? 'cursor-not-allowed opacity-60 border-slate-200 bg-slate-50'
                  : isChecked
                  ? 'border-primary bg-emerald-50/40 text-slate-900 font-medium cursor-pointer'
                  : 'border-slate-300 hover:border-slate-400 bg-white text-slate-800 cursor-pointer'
              }`}
            >
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={isChecked}
                  disabled={disabled}
                  onChange={() => !disabled && onToggleAddon(addon.id)}
                  className="w-4 h-4 accent-primary rounded disabled:cursor-not-allowed"
                />
                <span className="text-sm font-medium">{addon.name}</span>
              </div>
              <span className="text-slate-800 font-bold text-sm bg-slate-100 px-2 py-0.5 rounded border border-slate-200">
                +${addon.price.toFixed(2)}
              </span>
            </label>
          );
        })}
      </div>
    </div>
  );
};

export default AddonsCard;
