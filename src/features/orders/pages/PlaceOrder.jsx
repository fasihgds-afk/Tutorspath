import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import OrderStepTracker from '../components/OrderStepTracker';
import OrderRequirementsForm from '../components/OrderRequirementsForm';
import AddonsCard from '../components/AddonsCard';
import OrderFreeFeaturesCard from '../components/OrderFreeFeaturesCard';
import orderApi from '../api/orderApi';
import tokenManager from '../../../services/auth/tokenManager';
import { ORDER_STEP, WORDS_PER_PAGE, PLACE_ORDER_ADDONS } from '../constants/orderOptions';
import { formatWordCount, parseDeadlineKey } from '../utils/orderHelpers';
import { SITE_TAG } from '../../../config/env';
import { deadline as deadlineOptions } from '../../../config/dropdown-fields.config';

const HERO_ORDER_STORAGE_KEY = 'heroOrderData';

const getInitialFormData = () => {
  const defaults = {
    typeOfWork: 'Short Essay',
    academicLevel: 'Undergraduate',
    subject: 'History',
    projectTitle: '',
    deadline: '3 days / Aug 29, 2026 (11:06 PM)',
    pages: 1,
    wordCount: '275 Words',
    lineSpacing: 'Double Line Space',
    guidelines: '',
    citationStyle: 'Non Specific',
    references: 0,
    fontStyle: 'Calibri (Standard)',
    language: 'US English',
  };

  try {
    const saved = localStorage.getItem(HERO_ORDER_STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      if (parsed.assignmentTypeLabel) defaults.typeOfWork = parsed.assignmentTypeLabel;
      if (parsed.academicLevelLabel) defaults.academicLevel = parsed.academicLevelLabel;
      if (parsed.subjectLabel) defaults.subject = parsed.subjectLabel;
      if (parsed.deadlineLabel) defaults.deadline = parsed.deadlineLabel;
    }
  } catch (e) {
    console.error('Failed to load hero order data:', e);
  }

  return defaults;
};

const PlaceOrder = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const orderIdParam = searchParams.get('orderId');

  const [formData, setFormData] = useState(getInitialFormData);
  const [selectedAddons, setSelectedAddons] = useState({});
  const [activeOrder, setActiveOrder] = useState(null);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  // Load existing order when editing (orderId in URL)
  useEffect(() => {
    if (!orderIdParam) return;

    orderApi.getOrder(orderIdParam).then((order) => {
      if (!order) return;
      setActiveOrder(order);

      // ── Deadline: backend stores the key ("3 days").
      // The <select> options use full labels ("3 days / Aug 29, 2026 ...").
      // Find the matching label so the dropdown shows the correct option.
      const matchedDeadlineOption = deadlineOptions.options.find(
        (o) => parseDeadlineKey(o.label) === order.deadline
      );
      const deadlineDisplayLabel = matchedDeadlineOption?.label || order.deadline;

      // ── Line spacing: backend stores "single" / "double".
      // Map back to the display labels used by LINE_SPACING_OPTIONS.
      const lineSpacingDisplayLabel =
        order.lineSpacing === 'single' ? 'Single Line Space' : 'Double Line Space';

      setFormData((prev) => ({
        ...prev,
        typeOfWork: order.assignmentType || prev.typeOfWork,
        academicLevel: order.academicLevel || prev.academicLevel,
        subject: order.subject || prev.subject,
        projectTitle: order.title || prev.projectTitle,
        deadline: deadlineDisplayLabel,
        pages: order.numberOfPages || prev.pages,
        wordCount: formatWordCount(order.numberOfPages || 1),
        lineSpacing: lineSpacingDisplayLabel,
        guidelines: order.guidelines || prev.guidelines,
        citationStyle: order.citationStyle || prev.citationStyle,
        references: order.references ?? prev.references,
        fontStyle: order.fontStyle || prev.fontStyle,
        language: order.language || prev.language,
      }));

      // Initialize selected add-ons when editing existing order
      if (order.addOns && Array.isArray(order.addOns)) {
        const initialSelected = {};
        order.addOns.forEach((addon) => {
          const addonName = typeof addon === 'string' ? addon : addon?.name;
          const matched = PLACE_ORDER_ADDONS.find(
            (a) =>
              a.name?.toLowerCase() === addonName?.toLowerCase() ||
              a.label?.toLowerCase() === addonName?.toLowerCase() ||
              a.id === addon?.id
          );
          if (matched) initialSelected[matched.id] = true;
        });
        setSelectedAddons(initialSelected);
      }

      // If already past draft, go straight back to ConfirmOrderDetails
      if (order.status && order.status !== 'draft') {
        navigate(`/Order/ConfirmOrderDetails?orderId=${order._id}`, { replace: true });
      }
    });
  }, [orderIdParam, navigate]);

  const handleToggleAddon = (addonId) => {
    setSelectedAddons((prev) => ({ ...prev, [addonId]: !prev[addonId] }));
  };

  const buildOrderPayload = () => {
    const pages = Math.max(1, parseInt(formData.pages, 10) || 1);
    const lineSpacing = formData.lineSpacing?.toLowerCase().includes('single') ? 'single' : 'double';
    const title =
      formData.projectTitle?.trim() ||
      `${formData.typeOfWork || 'Academic Paper'} - ${formData.subject || 'Assignment'}`;
    const deadline = parseDeadlineKey(formData.deadline);

    // Build addOns array: only the EXACT backend names for selected add-ons
    const addOns = PLACE_ORDER_ADDONS
      .filter((addon) => !!selectedAddons[addon.id])
      .map((addon) => addon.name);

    return {
      tag: SITE_TAG,
      assignmentType: formData.typeOfWork || 'Short Essay',
      academicLevel: formData.academicLevel || 'Undergraduate',
      subject: formData.subject || 'General Studies',
      title,
      deadline,
      numberOfPages: pages,
      wordCount: pages * WORDS_PER_PAGE,
      lineSpacing,
      guidelines: formData.guidelines || '',
      citationStyle: formData.citationStyle || 'Non Specific',
      references: Math.max(0, parseInt(formData.references, 10) || 0),
      fontStyle: formData.fontStyle || 'Calibri (Standard)',
      language: formData.language || 'US English',
      addOns,
    };
  };

  // Build a restricted payload for PATCH /pricing — only the 4 fields the backend accepts
  const buildPricingUpdatePayload = () => {
    const pages = Math.max(1, parseInt(formData.pages, 10) || 1);
    // Convert display label → backend key  ("Single Line Space" → "single", anything else → "double")
    const lineSpacing = formData.lineSpacing?.toLowerCase().includes('single') ? 'single' : 'double';
    // Convert display label → backend key  ("3 days / Aug 29..." → "3 days")
    const deadline = parseDeadlineKey(formData.deadline);
    const addOns = PLACE_ORDER_ADDONS
      .filter((addon) => !!selectedAddons[addon.id])
      .map((addon) => addon.name);

    return { deadline, numberOfPages: pages, lineSpacing, addOns };
  };

  /**
   * Step 1 → Step 2: Create or update the draft order in the backend,
   * then move to the review step before confirming.
   */
  const handlePlaceOrder = async (e) => {
    e?.preventDefault?.();
    setErrorMsg('');

    if (!tokenManager.isAuthenticated()) {
      localStorage.setItem(
        HERO_ORDER_STORAGE_KEY,
        JSON.stringify({
          assignmentTypeLabel: formData.typeOfWork,
          academicLevelLabel: formData.academicLevel,
          subjectLabel: formData.subject,
          deadlineLabel: formData.deadline,
          savedAt: Date.now(),
        })
      );
      navigate('/login');
      return;
    }

    const payload = buildOrderPayload();
    setIsSubmitting(true);

    try {
      let order;

      if (activeOrder?._id) {
        // Update order — only send the 4 fields the backend accepts
        // PATCH /api/v1/orders/:orderId/pricing
        const pricingPayload = buildPricingUpdatePayload();
        order = await orderApi.updateOrderPricing(activeOrder._id, pricingPayload);
      } else {
        // POST /api/v1/orders
        order = await orderApi.createOrder(payload);
      }

      localStorage.removeItem(HERO_ORDER_STORAGE_KEY);
      const targetOrderId = order?._id || activeOrder?._id;
      navigate(`/Order/ConfirmOrderDetails?orderId=${targetOrderId}`);
    } catch (err) {
      console.error('Order error:', err);
      setErrorMsg(err?.message || 'Failed to submit order. Please verify all fields.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-[#f8fafc] font-sans text-[#111827] py-8 px-4 sm:px-6 lg:px-8 min-h-screen">
      <div className="w-full max-w-[1280px] mx-auto flex flex-col gap-5">
        {/* Shared Step Tracker */}
        <OrderStepTracker currentStep={ORDER_STEP.SHARE_DETAILS} />

        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <h1 className="text-slate-900 text-xl font-bold">
            {orderIdParam
              ? `Edit Order${activeOrder?.orderNumber ? ' #' + activeOrder.orderNumber : ''}`
              : 'Describe the requirements of your order'}
          </h1>
        </div>

        {/* Error Banner */}
        {errorMsg && (
          <div className="bg-red-50 border border-red-200 text-red-700 text-sm px-4 py-3 rounded-md">
            {errorMsg}
          </div>
        )}

        {/* ── REQUIREMENTS FORM ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left: Form */}
          <div className="lg:col-span-7 flex flex-col gap-5">
        <OrderRequirementsForm formData={formData} setFormData={setFormData} editMode={!!orderIdParam} />
            <AddonsCard selectedAddons={selectedAddons} onToggleAddon={handleToggleAddon} />

            <div>
              <button
                type="button"
                disabled={isSubmitting}
                onClick={handlePlaceOrder}
                className="bg-primary hover:bg-primary-hover disabled:opacity-70 text-white text-sm font-bold py-3.5 px-10 rounded-md transition-colors cursor-pointer shadow-sm tracking-wide flex items-center gap-2"
              >
                {isSubmitting ? 'PROCESSING...' : orderIdParam ? 'UPDATE ORDER' : 'PLACE ORDER'}
              </button>
            </div>
          </div>

          {/* Right: Sidebar */}
          <div className="lg:col-span-5 flex flex-col gap-5">
            {/* Live pricing preview sidebar */}
            <div className="bg-white border border-slate-200 rounded-xl p-5 sm:p-6 flex flex-col gap-4 shadow-xs sticky top-24">
              <div className="pb-3 border-b border-slate-200">
                <h3 className="text-slate-900 text-base font-bold">Order Summary</h3>
                <p className="text-xs text-slate-500 mt-0.5">Review your assignment specs</p>
              </div>

              {/* Specs snapshot */}
              <div className="flex flex-col gap-2 text-xs text-slate-600">
                <div className="flex justify-between">
                  <span className="font-medium">Pages:</span>
                  <span className="font-bold text-slate-800">{formData.pages} page{formData.pages > 1 ? 's' : ''} ({formData.wordCount})</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Deadline:</span>
                  <span className="font-bold text-slate-800 text-right max-w-[180px] truncate">{formData.deadline}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Spacing:</span>
                  <span className="font-bold text-slate-800">{formData.lineSpacing}</span>
                </div>
              </div>

              {/* Selected add-ons preview */}
              {(() => {
                const selected = PLACE_ORDER_ADDONS.filter((a) => !!selectedAddons[a.id]);
                return selected.length > 0 ? (
                  <div className="flex flex-col gap-1.5 pt-2 border-t border-slate-100">
                    <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Selected Add-ons</p>
                    {selected.map((a) => (
                      <div key={a.id} className="flex justify-between text-xs">
                        <span className="text-slate-600">{a.name}</span>
                        <span className="font-bold text-slate-800">+${a.price.toFixed(2)}</span>
                      </div>
                    ))}
                  </div>
                ) : null;
              })()}

              {/* User-friendly next step note */}
              <div className="bg-emerald-50/80 border border-emerald-200/90 rounded-lg px-3.5 py-3 text-xs text-slate-700 flex items-start gap-2.5 shadow-2xs">
                <svg className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
                </svg>
                <div className="leading-relaxed text-slate-600">
                  <span className="font-bold text-slate-800">Next Step:</span> You can review the complete price breakdown, customize add-ons, and confirm your order before making payment.
                </div>
              </div>
            </div>

            <OrderFreeFeaturesCard />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlaceOrder;
