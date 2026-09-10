import { WORDS_PER_PAGE, ORDER_STEP, PAID_STATUSES } from '../constants/orderOptions';

/**
 * Formats a page count into the "N Words" label shown next to the page
 * stepper and used as the disabled Word Count field value.
 */
export const formatWordCount = (pages, lineSpacing = 'double') => {
  const baseWords = (parseInt(pages, 10) || 1) * WORDS_PER_PAGE;
  // Apply line spacing multiplier: double for single line spacing (2x), normal for double (1x)
  const multiplier = lineSpacing?.toLowerCase().includes('single') ? 2 : 1;
  return `${baseWords * multiplier} Words`;
};

/**
 * Calculates word count based on pages and line spacing.
 * Returns the actual numeric word count (not formatted string).
 */
export const calculateWordCount = (pages, lineSpacing = 'double') => {
  const baseWords = (parseInt(pages, 10) || 1) * WORDS_PER_PAGE;
  const multiplier = lineSpacing?.toLowerCase().includes('single') ? 2 : 1;
  return baseWords * multiplier;
};

/**
 * Strips the date portion from a deadline label and normalizes it to the
 * backend's deadline key.
 * "3 days / Aug 29, 2026 (11:06 PM)" → "3 days"
 */
export const parseDeadlineKey = (deadlineLabel) => {
  const raw = (deadlineLabel || '3 days').split(' / ')[0].trim();
  const keyMap = { '48 hours': '2 days' };
  return keyMap[raw] || raw;
};

/**
 * Maps a backend order status to the step id shown in <OrderStepTracker />.
 */
export const statusToStep = (status) => {
  if (!status || status === 'draft') return ORDER_STEP.CONFIRM_ORDER;
  if (status === 'awaitingPayment') return ORDER_STEP.DEPOSIT_FUNDS;
  if (PAID_STATUSES.includes(status)) return ORDER_STEP.TRACK_PROGRESS;
  return ORDER_STEP.CONFIRM_ORDER;
};

export const isOrderPaid = (order) =>
  PAID_STATUSES.includes(order?.status) || order?.paymentStatus === 'paid';

/**
 * Sums the price of every currently-selected addon.
 * `addonsCatalog` items may use either `name` or `label` for display text;
 * only `id`/`price` are needed here.
 */
export const calcAddonsCost = (selectedAddons, addonsCatalog) =>
  addonsCatalog
    .filter((addon) => selectedAddons?.[addon.id])
    .reduce((sum, addon) => sum + addon.price, 0);

/**
 * Resolves the "base" price of an order from whichever field the backend
 * happens to have populated (pricing engine output vs. legacy flat fields).
 */
export const getOrderBasePrice = (order) => {
  if (order?.pricing?.finalAmount != null) return Number(order.pricing.finalAmount);
  if (order?.pricing?.calculatedAmount != null) return Number(order.pricing.calculatedAmount);
  if (order?.price != null) return Number(order.price);
  if (order?.totalPrice != null) return Number(order.totalPrice);
  return null;
};
