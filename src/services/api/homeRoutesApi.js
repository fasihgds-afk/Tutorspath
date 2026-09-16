import api from './apiClient';
import { SITE_TAG } from '../../config/env';

/**
 * Normalize a path EXACTLY like the backend RouteConfig model does,
 * so the frontend's activeRoutes.includes() check matches 100%.
 *   - trim
 *   - strip query/hash
 *   - ensure leading slash
 *   - collapse duplicate slashes
 *   - remove trailing slash (except root '/')
 *   - lowercase
 */
export const normalizePathLikeBackend = (value) => {
  if (!value || typeof value !== 'string') return '/';
  let path = value.trim();
  path = path.split('?')[0].split('#')[0];
  if (!path.startsWith('/')) path = `/${path}`;
  path = path.replace(/\/+/g, '/');
  if (path.length > 1 && path.endsWith('/')) path = path.slice(0, -1);
  path = path.toLowerCase();
  return path || '/';
};

/**
 * Fetches this site tag's full route configuration from the backend.
 *
 * GET /api/v1/public/active-routes
 * Header: x-site-tag: <VITE_SITE_TAG>
 *
 * Cache-busting: ONLY in development to bypass the backend's 5-minute
 * in-memory cache. In production, uses browser cache for faster loads.
 *
 * The site tag is never hardcoded here — it always comes from
 * import.meta.env.VITE_SITE_TAG (see src/config/env.js), so this same
 * function works for tutorspath, tutorsnext, tutorspie, or any future site
 * without code changes.
 */
export const getActiveRoutes = () => {
  const isDev = import.meta.env.DEV;
  const cacheBust = isDev ? `?_=${Date.now()}` : '';
  const separator = '/public/active-routes'.includes('?') ? '&' : '?';
  const endpoint = `/public/active-routes${separator}${cacheBust}`;

  return api.get(endpoint, {
    headers: {
      'x-site-tag': SITE_TAG,
    },
  });
};

/**
 * Normalizes the backend payload into two lists:
 *   - activeRoutes: paths with isRealHomePage: true  → render RealHomePage (Home)
 *   - knownRoutes:  EVERY path that actually exists as a RouteConfig document
 *                   for this site tag, real AND demo combined → anything in
 *                   here but not in activeRoutes renders DemoHomePage (Home1).
 *                   A path that is in NEITHER list was never created in the
 *                   backend at all (e.g. /paper-19 when only /paper-4
 *                   exists) and must NOT render Home or Home1 — it falls
 *                   through to the not-found redirect.
 *
 * Preferred backend shape (send every RouteConfig doc for the site tag, not
 * just the real ones):
 *   { data: { siteTag, routes: [{ path, isRealHomePage }, ...] } }
 *
 * Legacy shape still supported for backward compatibility. Because it only
 * lists real paths, knownRoutes falls back to activeRoutes — every other
 * path is treated as not-found (never guessed from a regex) until the
 * backend is updated to send `routes`.
 *   { data: { siteTag, activeRoutes: ["/", "/essay-1"] } }
 */
export const parseRouteConfigResponse = (payload) => {
  const data = payload?.data || {};

  // Handle new format with objects: { path, isRealHomePage }
  if (Array.isArray(data.routes)) {
    const activeRoutes = [];
    const knownRoutes = [];
    data.routes.forEach((entry) => {
      const path = normalizePathLikeBackend(entry?.path);
      knownRoutes.push(path);
      if (entry?.isRealHomePage) activeRoutes.push(path);
    });
    return { activeRoutes, knownRoutes };
  }

  // Handle legacy array format: activeRoutes only
  const legacyActiveRoutes = Array.isArray(data.activeRoutes)
    ? data.activeRoutes.map((path) => normalizePathLikeBackend(path))
    : [];

  // Handle legacy object format with isRealHomePage field
  if (Array.isArray(data.activeRoutes) && data.activeRoutes[0]?.isRealHomePage !== undefined) {
    const activeRoutes = [];
    const knownRoutes = [];
    data.activeRoutes.forEach((entry) => {
      const path = normalizePathLikeBackend(entry?.path || entry);
      knownRoutes.push(path);
      if (entry?.isRealHomePage) activeRoutes.push(path);
    });
    return { activeRoutes, knownRoutes };
  }

  return { activeRoutes: legacyActiveRoutes, knownRoutes: legacyActiveRoutes };
};

export default { getActiveRoutes, normalizePathLikeBackend, parseRouteConfigResponse };