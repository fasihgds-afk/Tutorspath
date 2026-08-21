import React, { useState } from 'react';
import OrderStepTracker from '../components/OrderStepTracker';
import OrderRequirementsForm from '../components/OrderRequirementsForm';
import ExpertSelectionCard from '../components/ExpertSelectionCard';
import AddonsCard from '../components/AddonsCard';
import OrderDiscountPromoCard from '../components/OrderDiscountPromoCard';
import OrderFreeFeaturesCard from '../components/OrderFreeFeaturesCard';

const PlaceOrder = () => {
  const [formData, setFormData] = useState({
    typeOfWork: 'Short Essay',
    academicLevel: 'Undergraduate',
    subject: '',
    projectTitle: '',
    deadline: '15 days',
    pages: 1,
    wordCount: '275 Words',
    lineSpacing: 'Double Line Space',
    guidelines: '',
    citationStyle: 'Non Specific',
    references: 0,
    fontStyle: 'Calibri (Standard)',
    language: 'US English',
  });

  const [selectedExpert, setSelectedExpert] = useState('system');
  const [selectedAddons, setSelectedAddons] = useState({});
  const [currentStep, setCurrentStep] = useState(1);

  const handleToggleAddon = (addonId) => {
    setSelectedAddons((prev) => ({ ...prev, [addonId]: !prev[addonId] }));
  };

  const handleConfirmOrder = (e) => {
    e?.preventDefault?.();
    setCurrentStep(2);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="bg-[#f8fafc] font-sans text-[#111827] py-8 px-4 sm:px-6 lg:px-8 min-h-screen">
      <div className="w-full max-w-[1280px] mx-auto flex flex-col gap-5">

        {/* Breadcrumb Step Tracker */}
        <OrderStepTracker currentStep={currentStep} onStepClick={(s) => setCurrentStep(s)} />

        {/* Page Title */}
        <h1 className="text-slate-900 text-xl font-bold">
          Describe the requirements of your order
        </h1>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">

          {/* Left: Form */}
          <div className="lg:col-span-7 flex flex-col gap-4">
            <OrderRequirementsForm formData={formData} setFormData={setFormData} />
            <ExpertSelectionCard selectedExpert={selectedExpert} onChange={setSelectedExpert} />
            <AddonsCard selectedAddons={selectedAddons} onToggleAddon={handleToggleAddon} />

            {/* Submit Button */}
            <div>
              <button
                type="button"
                onClick={handleConfirmOrder}
                className="bg-primary hover:bg-primary-hover text-white text-sm font-bold py-3 px-10 transition-colors cursor-pointer"
              >
                CONFIRM ORDER
              </button>
            </div>
          </div>

          {/* Right: Sidebar */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            <OrderDiscountPromoCard />
            <OrderFreeFeaturesCard />
          </div>

        </div>

      </div>
    </div>
  );
};

export default PlaceOrder;
