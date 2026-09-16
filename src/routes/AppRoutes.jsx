import React, { Suspense, lazy } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import PublicLayout from '../layouts/PublicLayout';
import StudentLayout from '../layouts/StudentLayout';
import Loader from '../components/common/Loader';
import { SITE_CONFIG } from '../config/siteConfig';
import { useAppConfig } from '../context/AppConfigContext';
import { normalizePathLikeBackend } from '../services/api/homeRoutesApi';
import { isReservedPath, getHomeVariant, HOME_VARIANT } from '../constants/routeConfig';

// Lazy load components for code splitting
const Home = lazy(() => import('../features/home/Home'));
const Home1 = lazy(() => import('../features/home/Home1'));
const Register = lazy(() => import('../features/auth/pages/Register'));
const Login = lazy(() => import('../features/auth/pages/Login'));
const PlaceOrder = lazy(() => import('../features/orders/pages/PlaceOrder'));
const ConfirmOrderDetails = lazy(() => import('../features/orders/pages/ConfirmOrderDetails'));
const StudentDashboard = lazy(() => import('../features/dashboard/components/StudentDashboard'));
const Reviews = lazy(() => import('../features/reviews/pages/Reviews'));

// Loading component wrapper
const LoadingWrapper = ({ children }) => (
  <Suspense fallback={
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <Loader />
    </div>
  }>
    {children}
  </Suspense>
);

/**
 * Real/Demo homepage gate — the single source of truth for every
 * backend-controlled SEO/landing route (/, /essay-1, /paper-4, ...).
 *
 * Decision is data-driven only. Nothing here is guessed from the URL shape
 * (no regex pattern list) — every path is checked against the route
 * documents the backend actually returned for this site tag, fetched once
 * at app init and cached in AppConfigContext:
 *
 *   1. Reserved app route (/login, /account, ...)  → let the static routes
 *      below handle it; this gate never renders for those.
 *   2. Path is in activeRoutes (isRealHomePage: true)   → RealHomePage (Home)
 *   3. Path is in knownRoutes  (isRealHomePage: false)  → DemoHomePage (Home1)
 *   4. Path is in NEITHER — never created in the backend → redirect to "/".
 *      This is what fixes /paper-19, /paper/books, etc. incorrectly
 *      rendering a homepage just because they *look* like an SEO route.
 *
 * While loading: shows a centered Loader (never accidentally exposes real
 * or demo content before the backend has actually been consulted).
 */
const HomeRouteGate = () => {
  const { isPathRealHome, isPathKnown, activeRoutesLoaded } = useAppConfig();
  const location = useLocation();
  const normalizedPath = normalizePathLikeBackend(location.pathname);

  if (!activeRoutesLoaded) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Loader />
      </div>
    );
  }

  // Reserved paths are handled by static routes BEFORE the wildcard route,
  // so they should never reach this gate. No need to check here.

  const variant = getHomeVariant(isPathRealHome, isPathKnown, normalizedPath);

  if (variant === HOME_VARIANT.REAL) {
    return (
      <LoadingWrapper>
        <Home />
      </LoadingWrapper>
    );
  }

  if (variant === HOME_VARIANT.DEMO) {
    return (
      <LoadingWrapper>
        <Home1 />
      </LoadingWrapper>
    );
  }

  // NOT_FOUND: path doesn't exist in the backend's route config for this
  // site tag — not real, not a known demo page. Don't render either homepage.
  return <Navigate to="/" replace />;
};

const AppRoutes = () => {
  return (
    <Routes>
      {/* Public Routes with Full Public Navbar & Footer */}
      <Route element={<PublicLayout />}>
        <Route path="/" element={<HomeRouteGate />} />
        <Route path="/home" element={
          <LoadingWrapper>
            <Home />
          </LoadingWrapper>
        } />
        <Route path="/home-1" element={
          <LoadingWrapper>
            <Home1 />
          </LoadingWrapper>
        } />
        <Route path="/home1" element={
          <LoadingWrapper>
            <Home1 />
          </LoadingWrapper>
        } />

        {/* Specific routes must come BEFORE the wildcard route */}
        <Route path="/reviews" element={
          <LoadingWrapper>
            <Reviews />
          </LoadingWrapper>
        } />
        
        {/* Registration is reachable at both '/account/register' and the
            centralized SITE_CONFIG.routes.register path so links generated
            from siteConfig.js always resolve to a real route. */}
        <Route path="/account/register" element={
          <LoadingWrapper>
            <Register />
          </LoadingWrapper>
        } />
        <Route path={SITE_CONFIG.routes.register} element={
          <LoadingWrapper>
            <Register />
          </LoadingWrapper>
        } />
        <Route path={SITE_CONFIG.routes.login} element={
          <LoadingWrapper>
            <Login />
          </LoadingWrapper>
        } />
        <Route path="/account/login" element={
          <LoadingWrapper>
            <Login />
          </LoadingWrapper>
        } />

        {/* Every other path (any depth) — /essay-1, /paper-4, /paper-19,
            /whatever-nobody-created — goes through the same data-driven
            HomeRouteGate. No per-keyword route list to maintain: whether
            it renders Home, Home1, or redirects to "/" depends only on
            what the backend actually has on record for this site tag. */}
        <Route path="*" element={<HomeRouteGate />} />
      </Route>

      {/* Student Routes with Student Navbar & 2-line Footer */}
      <Route element={<StudentLayout />}>
        {/* User Area / Orders Dashboard */}
        <Route path="/student/dashboard" element={
          <LoadingWrapper>
            <StudentDashboard />
          </LoadingWrapper>
        } />
        <Route path="/student/orders" element={
          <LoadingWrapper>
            <StudentDashboard />
          </LoadingWrapper>
        } />
        <Route path="/student/user-area" element={
          <LoadingWrapper>
            <StudentDashboard />
          </LoadingWrapper>
        } />
        <Route path="/user-area" element={
          <LoadingWrapper>
            <StudentDashboard />
          </LoadingWrapper>
        } />

        {/* Place Order Flow */}
        <Route path="/order/placeorder" element={
          <LoadingWrapper>
            <PlaceOrder />
          </LoadingWrapper>
        } />
        <Route path="/order/place-order" element={
          <LoadingWrapper>
            <PlaceOrder />
          </LoadingWrapper>
        } />
        <Route path="/Order/PlaceOrder" element={
          <LoadingWrapper>
            <PlaceOrder />
          </LoadingWrapper>
        } />
        <Route path="/order/PlaceOrder" element={
          <LoadingWrapper>
            <PlaceOrder />
          </LoadingWrapper>
        } />
        <Route path="/student/order/place-order" element={
          <LoadingWrapper>
            <PlaceOrder />
          </LoadingWrapper>
        } />
        <Route path="/student/order/placeorder" element={
          <LoadingWrapper>
            <PlaceOrder />
          </LoadingWrapper>
        } />

        {/* Confirm Order & Deposit Funds Flow */}
        <Route path="/Order/ConfirmOrderDetails" element={
          <LoadingWrapper>
            <ConfirmOrderDetails />
          </LoadingWrapper>
        } />
        <Route path="/order/confirmorderdetails" element={
          <LoadingWrapper>
            <ConfirmOrderDetails />
          </LoadingWrapper>
        } />
        <Route path="/order/confirm-order-details" element={
          <LoadingWrapper>
            <ConfirmOrderDetails />
          </LoadingWrapper>
        } />
        <Route path="/order/confirm-order" element={
          <LoadingWrapper>
            <ConfirmOrderDetails />
          </LoadingWrapper>
        } />
        <Route path="/student/order/confirm-order-details" element={
          <LoadingWrapper>
            <ConfirmOrderDetails />
          </LoadingWrapper>
        } />
      </Route>
    </Routes>
  );
};

export default AppRoutes;