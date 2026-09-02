# Frontend Integration Rules

> **MANDATORY:** Read this file before writing, modifying, or refactoring frontend code related to authentication, orders, pricing, add-ons, confirmation, or payments.
>
> These rules are the source of truth for integrating the frontend with the shared backend used by **TutorsPath** and **TutorsNext**.

## 1. Core Rule

The frontend sends **order inputs only**.

The backend is the **only authority for pricing**.

The frontend MUST NOT send or trust these pricing fields when creating/updating an order:

- `rate`
- `calculatedAmount`
- `finalAmount`
- `currency`
- `amountInSubunits`
- `discountAmount`

The backend uses the order's `tag` to load the correct website pricing configuration, calculate the price, and store the pricing snapshot.

Supported website tags:

```text
tutorspath
tutorsnext
```

---

## 2. Website Tag

Each frontend must define its site tag through environment configuration.

### TutorsPath

```env
VITE_SITE_TAG=tutorspath
```

### TutorsNext

```env
VITE_SITE_TAG=tutorsnext
```

Use:

```js
const SITE_TAG = import.meta.env.VITE_SITE_TAG;
```

Never hard-code the tag inside reusable order components.

The backend uses the tag to determine:

- Deadline pricing
- Add-on pricing
- Currency
- Subunit conversion
- Other website-specific pricing configuration

---

## 3. API Base URL

Use an environment variable:

```env
VITE_API_URL=https://your-backend-domain.com/api/v1
```

Use:

```js
const API_URL = import.meta.env.VITE_API_URL;
```

Do not hard-code production API URLs throughout the codebase.

---

# 4. Authentication

## Register Student

```http
POST /api/v1/auth/register
Content-Type: application/json
```

Body:

```json
{
  "fullName": "John Doe",
  "email": "john@example.com",
  "countryCode": "+1",
  "phoneNumber": "2025550100",
  "password": "Password@123"
}
```

Use the authentication response according to the existing backend implementation.

## Login

```http
POST /api/v1/auth/login
```

Body:

```json
{
  "email": "john@example.com",
  "password": "Password@123"
}
```

Save the returned JWT token according to the existing frontend authentication architecture.

Protected APIs require:

```http
Authorization: Bearer YOUR_JWT_TOKEN
```

Do not send `studentId` from the frontend when the backend can obtain it from the JWT.

---

# 5. Create Order

## Endpoint

```http
POST /api/v1/orders
```

Headers:

```http
Content-Type: application/json
Authorization: Bearer YOUR_JWT_TOKEN
```

The frontend sends order requirements and the website tag.

Example:

```json
{
  "tag": "tutorspath",
  "assignmentType": "Research Paper",
  "academicLevel": "Masters",
  "subject": "Education",
  "title": "Impact of Technology on Education",
  "deadline": "7 days",
  "numberOfPages": 5,
  "wordCount": 1500,
  "lineSpacing": "double",
  "guidelines": "Follow APA formatting.",
  "citationStyle": "APA",
  "references": 5,
  "fontStyle": "Arial",
  "language": "US English",
  "addOns": []
}
```

The same payload structure is used for `tutorsnext`; only the `tag` changes.

### MUST NOT send

```json
{
  "rate": 15.7,
  "calculatedAmount": 62.8,
  "finalAmount": 62.8,
  "currency": "USD",
  "amountInSubunits": 6280,
  "discountAmount": 0
}
```

The backend calculates all pricing.

---

# 6. Add-ons

Add-ons are optional.

No add-ons:

```json
{
  "addOns": []
}
```

The `addOns` field may also be omitted if supported by the backend.

One add-on:

```json
{
  "addOns": [
    "Grammar Check Report"
  ]
}
```

Multiple add-ons:

```json
{
  "addOns": [
    "Grammar Check Report",
    "One Page Summary",
    "Quality Double-check"
  ]
}
```

The frontend MUST send the exact add-on names returned/configured by the backend.

Do not invent, rename, or transform add-on names on the frontend.

---

# 7. Pricing

The backend calculates pricing using:

```text
Deadline Rate
× Line Spacing Multiplier
× Number of Pages
+ Add-ons
= Calculated Amount
```

Spacing rules:

```text
double = ×1
single = ×2
```

Example:

```text
Deadline: 3 hours
Rate: $15.70
Pages: 4
Spacing: double

15.70 × 1 × 4 = $62.80
```

With:

```text
Grammar Check Report = $6.75
```

The backend calculates:

```text
$62.80 + $6.75 = $69.55
```

The frontend should display the pricing returned by the backend.

### Important

The frontend must not use its own calculation as the source of truth.

If a local calculation is used for instant UI feedback, it must never be used for:

- Creating the payment
- Confirming the commercial price
- Sending Stripe amounts
- Overriding backend pricing
- Persisting pricing data

---

# 8. Update Order Pricing

Use the existing HTTP method configured in `order.routes.js`.

Endpoint:

```http
PATCH/PUT /api/v1/orders/:orderId/pricing
```

Headers:

```http
Authorization: Bearer YOUR_JWT_TOKEN
Content-Type: application/json
```

Only send fields that changed.

Example:

```json
{
  "deadline": "3 days",
  "numberOfPages": 6,
  "lineSpacing": "single",
  "addOns": [
    "Grammar Check Report"
  ]
}
```

The backend recalculates the price.

### Change only deadline

```json
{
  "deadline": "5 days"
}
```

### Change only add-ons

```json
{
  "addOns": [
    "Grammar Check Report",
    "Abstract Page"
  ]
}
```

### Remove all add-ons

```json
{
  "addOns": []
}
```

An empty array means **remove all selected add-ons**.

### Frontend behavior

When the student changes:

- Deadline
- Number of pages
- Line spacing
- Add-ons

call the pricing update API and replace the displayed pricing with the pricing returned by the backend.

Do not calculate the new price in React.

---

# 9. Get One Student Order

```http
GET /api/v1/orders/:orderId
```

Headers:

```http
Authorization: Bearer YOUR_JWT_TOKEN
```

The backend returns the requested order only if it belongs to the authenticated student.

---

# 10. Get All Orders for Logged-in Student

```http
GET /api/v1/orders/my-orders
```

Headers:

```http
Authorization: Bearer YOUR_JWT_TOKEN
```

No body is required.

Do NOT send:

```json
{
  "studentId": "..."
}
```

The backend gets the student ID from:

```text
req.user.userId
```

Example:

```js
const response = await axios.get(
  `${API_URL}/orders/my-orders`,
  {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }
);
```

Use this endpoint when loading a student's orders after login.

---

# 11. Confirm Order

After the student finishes entering the order requirements:

```http
POST /api/v1/orders/:orderId/confirm
```

Headers:

```http
Authorization: Bearer YOUR_JWT_TOKEN
```

No request body is required.

```json
{}
```

The backend:

1. Finds the student's order.
2. Verifies that the order is still a draft.
3. Gets the stored website tag.
4. Recalculates the price from backend configuration.
5. Includes selected add-ons.
6. Sets order status to `awaitingPayment`.
7. Sets payment status to `pending`.
8. Returns final pricing.

The frontend must use the returned pricing.

Do not calculate or override the final price before payment.

---

# 12. Payment

Use the existing payment endpoint configured in `payment.routes.js`.

```http
POST /api/v1/payments/stripe/create-payment-intent
```

The exact route must match the backend's existing `payment.routes.js`.

## Critical payment rule

The frontend MUST NOT send a Stripe amount calculated by React.

The backend obtains the amount from:

```text
order.pricing.amountInSubunits
```

Example:

```text
$69.55
↓
6955
```

The backend also uses:

```text
order.pricing.currency
```

Do not trust or accept a currency/amount supplied by the frontend.

The frontend should use the backend-created payment intent/client secret according to the existing Stripe integration.

---

# 13. Complete Order Flow

The frontend flow must follow:

```text
Student Login
     ↓
Create Order
     ↓
Backend calculates price
     ↓
Display backend pricing
     ↓
Student changes requirements?
     │
     └── YES
          ↓
       Update Pricing API
          ↓
       Backend recalculates
          ↓
       Display returned pricing
     ↓
Confirm Order
     ↓
Backend recalculates one final time
     ↓
Order = awaitingPayment
     ↓
Create Stripe Payment Intent
     ↓
Stripe Checkout / Payment Element
     ↓
Student pays
     ↓
Stripe Webhook
     ↓
Backend verifies payment
     ↓
Order = paid
     ↓
Admin assigns writer
```

---

# 14. Admin/Sales Agent Price Modification

This is separate from student pricing updates.

### Student pricing update

The student changes order requirements:

- Deadline
- Pages
- Line spacing
- Add-ons

### Admin/Sales price modification

An authorized Admin/Sales Agent changes the commercial price or discount.

Endpoint:

```http
/api/v1/orders/:orderId/price
```

Authorization:

```text
Admin or Sales Agent JWT
```

Only ONE of the following options should be sent.

## Discount by amount

```json
{
  "discountAmount": 10,
  "discountReason": "Customer requested discount"
}
```

## Discount by percentage

```json
{
  "discountPercentage": 15,
  "discountReason": "Promotional discount"
}
```

## Set final amount

```json
{
  "finalAmount": 75,
  "discountReason": "Sales adjustment"
}
```

### Never send multiple pricing modification options together

Do not send:

```json
{
  "discountAmount": 10,
  "discountPercentage": 15,
  "finalAmount": 75
}
```

Only one of:

```text
discountAmount
OR
discountPercentage
OR
finalAmount
```

The backend updates:

- `discountAmount`
- `discountPercentage`
- `finalAmount`
- `amountInSubunits`
- `priceVersion`
- `priceEditedBy`
- `priceEditedAt`
- `discountReason`

---

# 15. Recommended Frontend Configuration

## TutorsPath `.env`

```env
VITE_SITE_TAG=tutorspath
VITE_API_URL=https://your-backend-domain.com/api/v1
```

## TutorsNext `.env`

```env
VITE_SITE_TAG=tutorsnext
VITE_API_URL=https://your-backend-domain.com/api/v1
```

Use:

```js
const SITE_TAG = import.meta.env.VITE_SITE_TAG;
const API_URL = import.meta.env.VITE_API_URL;
```

Example create-order request:

```js
await axios.post(
  `${API_URL}/orders`,
  {
    tag: SITE_TAG,
    assignmentType,
    academicLevel,
    subject,
    title,
    deadline,
    numberOfPages,
    wordCount,
    lineSpacing,
    guidelines,
    citationStyle,
    references,
    fontStyle,
    language,
    addOns
  },
  {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }
);
```

---

# 16. Frontend Architecture Rules

When implementing this integration:

### DO

- Use `VITE_SITE_TAG`.
- Use `VITE_API_URL`.
- Send order requirements.
- Send the correct website tag.
- Use JWT authentication.
- Use backend-returned pricing.
- Call the pricing update endpoint when pricing inputs change.
- Call confirm before payment.
- Use backend payment information.
- Keep the two websites compatible with the same reusable order component.
- Reuse existing API/auth/payment utilities when they already exist.
- Follow the existing project's architecture and naming conventions.

### DO NOT

- Hard-code prices.
- Hard-code website tags inside reusable components.
- Send `rate`.
- Send `calculatedAmount`.
- Send `finalAmount` during normal student order creation.
- Send `currency`.
- Send `amountInSubunits`.
- Send `discountAmount` during normal student order creation.
- Calculate the Stripe amount in React.
- Trust a frontend-calculated price.
- Send `studentId` when the backend gets it from JWT.
- Create duplicate API clients if one already exists.
- Duplicate order/pricing logic for TutorsPath and TutorsNext.

---

# 17. Reusable Order Component

The same order form/component should work for both websites.

The difference should come from environment configuration:

```text
TutorsPath
    ↓
VITE_SITE_TAG=tutorspath
    ↓
Shared Order Component

TutorsNext
    ↓
VITE_SITE_TAG=tutorsnext
    ↓
Shared Order Component
```

Do not create separate pricing logic for each website unless the backend/API contract explicitly requires different UI behavior.

---

# 18. Pricing State

The frontend should treat backend pricing as server state.

Example concept:

```js
const [pricing, setPricing] = useState(null);
```

After creating/updating/confirming an order:

```js
setPricing(response.data.pricing);
```

Display the backend response rather than recalculating the amount.

For example:

```js
pricing.finalAmount
```

should be used for displaying the current final price when that field is returned by the backend.

If the backend response structure differs, follow the actual response returned by the existing backend rather than inventing a new structure.

---

# 19. Handling Pricing Changes

Pricing-related inputs are:

```text
deadline
numberOfPages
lineSpacing
addOns
```

When one or more of these changes:

```text
User changes input
      ↓
Update local form state
      ↓
Call /orders/:orderId/pricing
      ↓
Backend calculates price
      ↓
Receive pricing response
      ↓
Update pricing state
      ↓
Update price shown in UI
```

Do not duplicate the backend pricing formula in the frontend.

---

# 20. Error Handling

The frontend must handle API failures gracefully.

At minimum:

- Show a useful error message.
- Do not display a stale price as the current confirmed price when a pricing update fails.
- Prevent payment when the order has not been successfully confirmed.
- Handle expired/invalid JWT according to the existing authentication flow.
- Do not silently ignore pricing API errors.
- Do not fall back to a hard-coded price.

If a pricing request fails, keep the previous server pricing clearly distinguishable or indicate that pricing needs to be refreshed before continuing.

---

# 21. Security Rules

Never trust frontend pricing data.

The frontend is an untrusted client.

The backend must remain responsible for:

```text
Website tag
    ↓
Pricing configuration
    ↓
Price calculation
    ↓
Discount handling
    ↓
Currency
    ↓
Stripe subunits
    ↓
Payment amount
```

Never expose secret backend configuration or Stripe secret keys in frontend environment variables.

Only public frontend-safe values such as the Stripe publishable key may be exposed according to the existing Stripe implementation.

---

# 22. Existing Code First

Before adding new code:

1. Inspect the existing API service/client.
2. Inspect authentication/token handling.
3. Inspect existing order services/hooks.
4. Inspect order routes/API definitions if available.
5. Inspect existing Stripe/payment integration.
6. Reuse existing utilities instead of creating duplicates.
7. Match existing project conventions.

Do not rewrite working architecture unnecessarily.

---

# 23. API Contract Summary

| Purpose | Method | Endpoint |
|---|---|---|
| Register | POST | `/auth/register` |
| Login | POST | `/auth/login` |
| Create Order | POST | `/orders` |
| Update Pricing | PATCH/PUT | `/orders/:orderId/pricing` |
| Get One Order | GET | `/orders/:orderId` |
| Get My Orders | GET | `/orders/my-orders` |
| Confirm Order | POST | `/orders/:orderId/confirm` |
| Admin Price Edit | Existing configured method | `/orders/:orderId/price` |
| Stripe Payment Intent | POST | `/payments/stripe/create-payment-intent` |

**Important:** For Update Pricing and Stripe Payment, use the exact HTTP method/path configured in the existing backend route files if they differ from this documentation.

---

# 24. Final Rule

## The frontend sends WHAT the student wants.

## The backend decides HOW MUCH it costs.

```text
Frontend
  ↓
Order inputs + website tag
  ↓
Backend
  ↓
Pricing configuration
  ↓
Price calculation
  ↓
Stored pricing snapshot
  ↓
Backend returns price
  ↓
Frontend displays price
  ↓
Confirm
  ↓
Backend recalculates
  ↓
Payment
  ↓
Backend-controlled Stripe amount
```

**Never move pricing authority into the frontend.**
