import React from 'react';

const addonsList = [
  { id: 'grammarCheck', name: 'Grammar Check Report', price: 6.75 },
  { id: 'onePageSummary', name: 'One Page Summary', price: 9.00 },
  { id: 'abstractPage', name: 'Abstract Page', price: 9.00 },
  { id: 'qualityDoubleCheck', name: 'Quality Double-check', price: 2.25 },
];

const AddonsCard = ({ selectedAddons = {}, onToggleAddon }) => {
  return (
    <div className="bg-white border border-slate-200 p-5 flex flex-col gap-4">
      <h3 className="text-slate-900 text-base font-bold pb-3 border-b border-slate-200">
        Add-ons
      </h3>
      <div className="flex flex-col gap-2">
        {addonsList.map((addon) => {
          const isChecked = !!selectedAddons[addon.id];
          return (
            <label
              key={addon.id}
              onClick={() => onToggleAddon(addon.id)}
              className="flex items-center justify-between py-2.5 px-3 border border-slate-300 cursor-pointer hover:border-primary transition-colors"
            >
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={isChecked}
                  onChange={() => onToggleAddon(addon.id)}
                  className="w-4 h-4 accent-primary cursor-pointer"
                />
                <span className="text-slate-800 text-sm">{addon.name}</span>
              </div>
              <span className="text-slate-800 font-semibold text-sm">${addon.price.toFixed(2)}</span>
            </label>
          );
        })}
      </div>
    </div>
  );
};

export default AddonsCard;
