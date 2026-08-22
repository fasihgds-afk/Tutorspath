import React from 'react';

const items = [
  'Premium quality',
  'Qualified experts',
  'Any deadline • 125+ subjects',
  'On-time delivery',
  'Authentic sources',
  '24/7 customer support',
  'Confidential and secure'
];

const WhyChooseUs = () => {
  return (
    <div className="bg-white rounded-[20px] border border-[#f1f5f9] p-6 shadow-[0_10px_30px_rgba(0,0,0,0.03)] flex flex-col gap-4">

      {/* Header */}
      <div className="bg-primary text-white text-center py-3 rounded-[14px] font-black text-[15px] tracking-wide shadow-sm">
        Why Choose Us
      </div>

      {/* List */}
      <div className="flex flex-col divide-y divide-[#f1f5f9] text-[13.5px]">
        {items.map((item) => (
          <div key={item} className="py-3 flex items-center gap-3 text-[#0f172a] font-medium">
            <svg className="w-4 h-4 text-primary shrink-0" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
            </svg>
            {item}
          </div>
        ))}
      </div>

    </div>
  );
};

export default WhyChooseUs;
