import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import tokenManager from '../services/auth/tokenManager';

/**
 * ProtectedRoute component:
 * Checks if the user is authenticated via tokenManager.
 * If not, redirects to /register (with redirect location state).
 */
const ProtectedRoute = ({ redirectTo = '/register' }) => {
  const location = useLocation();
  const isAuthenticated = tokenManager.isAuthenticated();

  if (!isAuthenticated) {
    return <Navigate to={redirectTo} state={{ from: location }} replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
