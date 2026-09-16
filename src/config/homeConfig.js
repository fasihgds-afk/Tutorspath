import { SITE_CONFIG } from './siteConfig.js';

// ─────────────────────────────────────────────────────────────
//  Dynamic Route Configuration
//
//  Routes are now controlled by the backend via the activeRoutes API.
//  This file only contains utility functions for backward compatibility
//  and helper functions that are still used by some components.
//
//  The backend determines which routes show Real Home vs Demo Home
//  through the /api/v1/public/active-routes endpoint.
// ─────────────────────────────────────────────────────────────

// Empty config - routes are now dynamic from backend
export const SEO_ROUTES_CONFIG = {
  defaultVariant: 'auto',
  routes: {},
};

// Empty array - routes are now dynamic from backend
export const HOME_1_SEO_ROUTES = [];

export const HOME_1_PATH = '/home-1';
export const HOME_DEFAULT_PATH = '/';

/**
 * Normalizes a raw pathname: strips query/hash, lowercases,
 * and removes a trailing slash (except for the root '/').
 */
const normalizePath = (pathname = '') => {
  let clean = String(pathname).split('?')[0].split('#')[0].toLowerCase();
  if (clean.length > 1 && clean.endsWith('/')) {
    clean = clean.slice(0, -1);
  }
  return clean || '/';
};

/**
 * Check if the site configuration sets Home-1 as the active homepage for '/'.
 * This is kept for backward compatibility but should use dynamic backend logic.
 */
export const checkIsActiveHome1 = (activeHomeSetting = SITE_CONFIG.activeHome) => {
  const val = String(activeHomeSetting || '').trim().toLowerCase();
  return val === 'home-1' || val === 'home1' || val === '1';
};

/**
 * Resolves the variant ('home' | 'home1') for a given pathname.
 * This is kept for backward compatibility but should use dynamic backend logic.
 */
export const getRouteVariant = (pathname = '', activeHomeSetting = SITE_CONFIG.activeHome) => {
  const cleanPath = normalizePath(pathname);
  const activeIsHome1 = checkIsActiveHome1(activeHomeSetting);

  // 1. Explicit Home-1 paths & aliases
  if (cleanPath === '/home-1' || cleanPath.startsWith('/home-1/') ||
    cleanPath === '/home1' || cleanPath.startsWith('/home1/')) {
    return 'home1';
  }

  // 2. Explicit /home path
  if (cleanPath === '/home') {
    return 'home';
  }

  // 3. Root '/' when activeHome is Home-1
  if (cleanPath === '/') {
    return activeIsHome1 ? 'home1' : 'home';
  }

  // 4. Shared public pages inherit Home-1 when activeHome is Home-1,
  //    except for explicit auth, account, or student routes.
  const reservedPrefixes = ['/login', '/register', '/account', '/student', '/order', '/user-area', '/reviews'];
  const isReserved = reservedPrefixes.some(
    (prefix) => cleanPath === prefix || cleanPath.startsWith(`${prefix}/`)
  );

  if (activeIsHome1 && !isReserved) {
    return 'home1';
  }

  return 'home';
};

/**
 * Check if a given pathname belongs to Home-1 (explicit, SEO, or active).
 * This is kept for backward compatibility but should use dynamic backend logic.
 */
export const checkIsHome1Path = (pathname = '', activeHomeSetting = SITE_CONFIG.activeHome) => {
  return getRouteVariant(pathname, activeHomeSetting) === 'home1';
};

/**
 * Get the appropriate phone object based on Home-1 status.
 */
export const getHomePhone = (isHome1 = false) => {
  if (isHome1) {
    return SITE_CONFIG.phoneHome1 || SITE_CONFIG.phone;
  }
  return SITE_CONFIG.phoneHome || SITE_CONFIG.phone;
};

/**
 * Check if a given pathname is a landing page (root, home variants, or public route).
 * This is kept for backward compatibility but should use dynamic backend logic.
 */
export const checkIsLandingPath = (pathname = '') => {
  const cleanPath = normalizePath(pathname);
  const reservedPrefixes = ['/login', '/register', '/account', '/student', '/order', '/user-area', '/reviews'];
  const isReserved = reservedPrefixes.some(
    (prefix) => cleanPath === prefix || cleanPath.startsWith(`${prefix}/`)
  );
  return !isReserved;
};