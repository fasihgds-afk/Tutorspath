import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import PublicLayout from '../layouts/PublicLayout';
import StudentLayout from '../layouts/StudentLayout';
import Home from '../features/home/Home';
import Home1 from '../features/home/Home1';
import Register from '../features/auth/pages/Register';
import Login from '../features/auth/pages/Login';
import PlaceOrder from '../features/orders/pages/PlaceOrder';
import ConfirmOrderDetails from '../features/orders/pages/ConfirmOrderDetails';
import StudentDashboard from '../features/dashboard/components/StudentDashboard';
import Reviews from '../features/reviews/pages/Reviews';
import ProtectedRoute from './ProtectedRoute';
import { SITE_CONFIG } from '../config/siteConfig';
import { SEO_ROUTES_CONFIG, getRouteVariant } from '../config/homeConfig';

const AppRoutes = () => {
  const activeHomeVal = String(SITE_CONFIG.activeHome || '').trim().toLowerCase();
  const ActiveHome = (activeHomeVal === 'home-1' || activeHomeVal === 'home1' || activeHomeVal === '1') ? Home1 : Home;

  const seoRoutes = Object.keys(SEO_ROUTES_CONFIG.routes || {}).map((rawPath) => {
    const path = rawPath.startsWith('/') ? rawPath : `/${rawPath}`;
    const variant = getRouteVariant(path, SITE_CONFIG.activeHome);
    const Component = variant === 'home1' ? Home1 : Home;
    return { path, Component };
  });

  return (
    <Routes>
      {/* Public Routes with Full Public Navbar & Footer */}
      <Route element={<PublicLayout />}>
        <Route path="/" element={<ActiveHome />} />
        <Route path="/home" element={<Home />} />
        <Route path="/home-1" element={<Home1 />} />
        <Route path="/home1" element={<Home1 />} />
        <Route path="/reviews" element={<Reviews />} />
        <Route path="/account/register" element={<Register />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />

        {/* Dynamic SEO Landing Routes */}
        {seoRoutes.map(({ path, Component }) => (
          <Route key={path} path={path} element={<Component />} />
        ))}
      </Route>

      {/* Student Routes with Student Navbar & 2-line Footer */}
      <Route element={<StudentLayout />}>
        {/* Place Order Flow (Guests can initiate an order) */}
        <Route path="/order/placeorder" element={<PlaceOrder />} />
        <Route path="/order/place-order" element={<PlaceOrder />} />
        <Route path="/Order/PlaceOrder" element={<PlaceOrder />} />
        <Route path="/order/PlaceOrder" element={<PlaceOrder />} />
        <Route path="/student/order/place-order" element={<PlaceOrder />} />
        <Route path="/student/order/placeorder" element={<PlaceOrder />} />

        {/* Protected Student Routes (Redirect to /register if not logged in) */}
        <Route element={<ProtectedRoute redirectTo="/register" />}>
          {/* User Area / Orders Dashboard */}
          <Route path="/student/dashboard" element={<StudentDashboard />} />
          <Route path="/student/orders" element={<StudentDashboard />} />
          <Route path="/student/user-area" element={<StudentDashboard />} />
          <Route path="/user-area" element={<StudentDashboard />} />

          {/* Confirm Order Details */}
          <Route path="/Order/ConfirmOrderDetails" element={<ConfirmOrderDetails />} />
          <Route path="/order/confirm-order-details" element={<ConfirmOrderDetails />} />
        </Route>
      </Route>

      {/* Fallback route */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default AppRoutes;
