/**
 * Single source of truth for "reserved" path prefixes — routes that always
 * belong to the static app (login/register/account/student/order/etc.) and
 * must never be swallowed by the backend-driven Home/Home1 gate, even if a
 * matching RouteConfig document also exists on the backend.
 *
 * Previously this list was duplicated in AppRoutes.jsx and
 * AppConfigContext.jsx and had drifted out of sync ('/reviews' was reserved
 * in one but not the other). Both now import from here.
 */
export const RESERVED_PREFIXES = [
  '/login',
  '/register',
  '/account',
  '/student',
  '/order',
  '/user-area',
  '/reviews',
];

export const isReservedPath = (normalizedPath) =>
  RESERVED_PREFIXES.some(
    (prefix) => normalizedPath === prefix || normalizedPath.startsWith(`${prefix}/`)
  );

/**
 * HOME_VARIANT — canonical mapping from the backend's isRealHomePage state
 * to which homepage renders. This used to be re-decided in two places
 * (AppRoutes.jsx's render gate, and AppConfigContext.jsx's
 * landingIsHome1Override) with two separate hardcoded true/false readings.
 * Both now call getHomeVariant() below so there is exactly one place that
 * says "false -> Home1, true -> Home".
 */
export const HOME_VARIANT = {
  REAL: 'real', // backend isRealHomePage: true       -> render Home
  DEMO: 'demo', // backend isRealHomePage: false (known path) -> render Home1
  NOT_FOUND: 'not-found', // path not known to the backend at all -> redirect "/"
};

/**
 * @param {(path: string) => boolean} isPathRealHome  from useAppConfig()
 * @param {(path: string) => boolean} isPathKnown      from useAppConfig()
 * @param {string} path  raw or normalized pathname to check
 * @returns {'real' | 'demo' | 'not-found'}
 */
export const getHomeVariant = (isPathRealHome, isPathKnown, path) => {
  if (isPathRealHome(path)) return HOME_VARIANT.REAL;
  if (isPathKnown(path)) return HOME_VARIANT.DEMO;
  return HOME_VARIANT.NOT_FOUND;
};