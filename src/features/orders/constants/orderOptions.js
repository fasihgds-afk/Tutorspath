/**
 * Domain constants for the Orders feature.
 *
 * These were previously duplicated (with drifting values) across multiple
 * components/pages. Centralizing them here gives a single source of truth
 * and makes future edits (e.g. price changes) a one-line change.
 */

// Word count is derived from page count using this ratio everywhere in the flow.
export const WORDS_PER_PAGE = 275;

// Step ids shared by <OrderStepTracker /> and the status→step mapping in
// ConfirmOrderDetails. Using named constants instead of magic numbers (1-4)
// keeps both places in sync.
export const ORDER_STEP = {
  SHARE_DETAILS: 1,
  CONFIRM_ORDER: 2,
  DEPOSIT_FUNDS: 3,
  TRACK_PROGRESS: 4,
};

export const ORDER_STEPS = [
  { id: ORDER_STEP.SHARE_DETAILS, label: 'Share Order Details' },
  { id: ORDER_STEP.CONFIRM_ORDER, label: 'Confirm Your Order' },
  { id: ORDER_STEP.DEPOSIT_FUNDS, label: 'Deposit Funds' },
  { id: ORDER_STEP.TRACK_PROGRESS, label: 'Track Progress' },
];

// Statuses that indicate the order has been paid for.
export const PAID_STATUSES = ['paid', 'writerAssigned', 'inProgress', 'submitted', 'completed'];

// ── Add-ons ──────────────────────────────────────────────────────────────
// Unified add-ons catalog matching backend pricing service exactly.
export const ORDER_ADDONS = [
  { id: 'grammarCheck',       name: 'Grammar Check Report', label: 'Grammar Check Report', price: 6.75 },
  { id: 'onePageSummary',    name: 'One Page Summary',      label: 'One Page Summary',      price: 15.7 },
  { id: 'abstractPage',      name: 'Abstract Page',         label: 'Abstract Page',         price: 15.7 },
  { id: 'qualityDoubleCheck', name: 'Quality Double-check', label: 'Quality Double-check', price: 3.92 },
];

export const PLACE_ORDER_ADDONS = ORDER_ADDONS;
export const CONFIRM_ORDER_ADDONS = ORDER_ADDONS;

// ── Free features list (OrderFreeFeaturesCard) ─────────────────────────────
export const FREE_FEATURES = [
  { name: 'Choose a 5-star Expert', price: '$7' },
  { name: 'Unlimited Revisions', price: '$8' },
  { name: 'Cover Page', price: '$10' },
  { name: 'Outline', price: '$7' },
  { name: 'Paper Formatting', price: '$6' },
  { name: 'Referencing & Bibliography', price: '$9' },
  { name: 'Turnitin Report', price: '$9' },
  { name: 'Dedicated User Area', price: '$7' },
  { name: '24/7 Order Tracking', price: '$10' },
  { name: 'Periodic Email Alerts', price: '$6' },
];

// ── Requirements form static option lists ───────────────────────────────
export const LINE_SPACING_OPTIONS = ['Double Line Space', 'Single Line Space'];
export const CITATION_STYLES = ['Non Specific', 'APA', 'MLA', 'Chicago', 'Harvard', 'IEEE'];
export const FONT_STYLES = ['Calibri (Standard)', 'Times New Roman', 'Arial', 'Helvetica'];
export const LANGUAGES = ['US English', 'UK English', 'Australian English', 'Canadian English'];

// Backend deadline keys — must match backend DEADLINE_RATES keys exactly.
// Used by the inline "Edit Price" form on ConfirmOrderDetails.
export const DEADLINE_OPTIONS = [
  '3 hours',
  '6 hours',
  '12 hours',
  '24 hours',
  '2 days',
  '3 days',
  '4 days',
  '5 days',
  '7 days',
  '10 days',
  '15 days',
];
