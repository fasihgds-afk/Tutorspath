# TutorsPath — Student Frontend

A React + Vite student-facing web application for placing and tracking academic orders.

---

## Tech Stack

| Tool | Version |
|---|---|
| React | 19 |
| Vite | 8 |
| React Router | 7 |
| Tailwind CSS | 4 |

---

## Project Structure

```
src/
├── components/
│   ├── common/          # Shared UI components (Button, Input, Modal, etc.)
│   ├── feedback/        # ErrorBoundary, Toast
│   ├── home/            # Public landing page sections
│   └── navigation/      # Navbar (public) + StudentNavbar
├── features/
│   ├── auth/            # Login, Register, Forgot/Reset Password
│   ├── dashboard/       # Student dashboard (orders overview)
│   ├── home/            # Home page
│   └── orders/          # Place order flow + order components
├── layouts/
│   ├── PublicLayout.jsx  # Navbar + Footer for public pages
│   └── StudentLayout.jsx # StudentNavbar + StudentFooter for logged-in pages
├── routes/
│   └── AppRoutes.jsx     # All app routes in one file
├── services/            # Axios instance, API handlers, token manager
├── hooks/               # useDebounce, usePagination
├── utils/               # formatters, helpers, validation
└── styles/              # Global CSS + variables
```

---

## Pages & Routes

| Route | Page | Layout |
|---|---|---|
| `/` | Home | Public |
| `/account/register` | Register | Public |
| `/login` | Login | Public |
| `/student/dashboard` | Student Dashboard | Student |
| `/student/orders` | My Orders | Student |
| `/order/placeorder` | Place New Order | Student |

---

## Getting Started

### 1. Clone the repo

```bash
git clone <repo-url>
cd Frontend
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up environment variables

```bash
cp .env.example .env
```

Fill in the required values in `.env`.

### 4. Run the dev server

```bash
npm run dev
```

### 5. Build for production

```bash
npm run build
```

---

## Environment Variables

Create a `.env` file in the project root (never commit this file):

```
VITE_API_BASE_URL=https://your-api-url.com/api
```

---

## Notes

- This project is **student-facing only**. Admin and writer dashboards are not part of this codebase.
- All sensitive config (API keys, tokens) must be kept in `.env` which is git-ignored.
- The `.env.example` file shows the required variable names without values — commit that, not `.env`.
