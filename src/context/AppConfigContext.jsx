import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { getActiveRoutes, normalizePathLikeBackend, parseRouteConfigResponse } from '../services/api/homeRoutesApi';
import { SITE_TAG } from '../config/env';
import { isReservedPath, getHomeVariant, HOME_VARIANT } from '../constants/routeConfig';

const AppConfigContext = createContext(undefined);

/**
 * Centralized, app-level configuration provider.
 *
 * Fetches backend-controlled config ONCE when the app initializes (not on
 * every route change) and exposes it to the rest of the app via context.
 * React Router should only ever read the cached value from here — it never
 * triggers its own request.
 *
 * Currently holds:
 *  - activeRoutes: paths with isRealHomePage: true for this site tag →
 *    render RealHomePage (Home). Defaults to [] and stays [] if the request
 *    fails, so a slow or broken backend can never accidentally expose an
 *    unfinished/real homepage — Demo is always the safe fallback.
 *  - knownRoutes: EVERY path that exists as a RouteConfig document for this
 *    site tag, real and demo combined. A path in knownRoutes but not in
 *    activeRoutes renders DemoHomePage (Home1). A path in NEITHER list does
 *    not exist in the backend at all and must fall through to the
 *    not-found redirect — it is never guessed from a URL pattern.
 *  - activeRoutesLoaded: true once the fetch has resolved (or errored).
 *    Router gates use this to hold a Loader instead of guessing.
 */
export const AppConfigProvider = ({ children }) => {
  const [activeRoutes, setActiveRoutes] = useState([]);
  const [knownRoutes, setKnownRoutes] = useState([]);
  const [activeRoutesLoaded, setActiveRoutesLoaded] = useState(false);
  const location = useLocation();

  useEffect(() => {
    let isMounted = true;

    const fetchActiveRoutes = async () => {
      try {
        const res = await getActiveRoutes();
        const { activeRoutes: normalizedActive, knownRoutes: normalizedKnown } =
          parseRouteConfigResponse(res);

        if (isMounted) {
          setActiveRoutes(normalizedActive);
          setKnownRoutes(normalizedKnown);
        }
      } catch (error) {
        // Fail safe: leave both lists empty so every route falls back to
        // the not-found redirect instead of accidentally exposing
        // RealHomePage or guessing at DemoHomePage content.
      } finally {
        if (isMounted) {
          setActiveRoutesLoaded(true);
        }
      }
    };

    fetchActiveRoutes();

    return () => {
      isMounted = false;
    };
  }, []);

  // ─── Derived helpers (recompute on location or activeRoutes change) ───
  //
  // isPathRealHome(path): true iff the backend's isRealHomePage=true for this path.
  //   This is THE source of truth for Navbar, Footer, and hero buttons —
  //   it replaces the old hardcoded `SITE_CONFIG.activeHome` rule.
  //
  // checkIsLandingPath: Dynamic check if path is a landing page (/, /home*, or any route)
  //   Now fully dynamic - doesn't rely on static homeConfig routes
  //
  // landingIsHome1Override:
  //   - On a landing path (/, /home*, or any route) AND activeRoutesLoaded:
  //       true  → render Home1-style chrome (single CTA, "Hire A Tutor", #hash href)
  //       false → render Home-style  chrome (Login + "Hire A Writer", /register /login links)
  //   - On a non-landing page (reviews, student area, etc.):
  //       undefined → let useHomeContext fall back to original SITE_CONFIG.activeHome rule.
  // Sets give O(1) lookups instead of the O(n) array.includes() scan that
  // ran on every navigation across both lists (2 scans x 60+ routes each).
  // Recomputed only when the underlying array actually changes.
  const activeRoutesSet = useMemo(() => new Set(activeRoutes), [activeRoutes]);
  const knownRoutesSet = useMemo(() => new Set(knownRoutes), [knownRoutes]);

  const isPathRealHome = (path) =>
    activeRoutesSet.has(normalizePathLikeBackend(path));

  // isPathKnown(path): true iff this path exists as a RouteConfig document
  // for this site tag (real OR demo). Used to tell a genuine demo page
  // apart from a path that was never created in the backend at all.
  const isPathKnown = (path) =>
    knownRoutesSet.has(normalizePathLikeBackend(path));

  // Dynamic landing path check - replaces static checkIsLandingPath.
  // Reserved prefixes now come from the shared constant so this can never
  // drift out of sync with AppRoutes.jsx's own reserved-path check again.
  const checkIsLandingPath = (pathname) => {
    const normalized = normalizePathLikeBackend(pathname);
    return !isReservedPath(normalized);
  };

  const landingIsHome1Override = useMemo(() => {
    if (!activeRoutesLoaded) return undefined;
    const pathname = location.pathname;
    if (!checkIsLandingPath(pathname)) return undefined;
    // true (Home1-style chrome) for both DEMO and NOT_FOUND variants,
    // false (Home-style chrome) only for REAL — same behavior as before,
    // now sourced from the one shared mapping instead of a local re-read.
    return getHomeVariant(isPathRealHome, isPathKnown, pathname) !== HOME_VARIANT.REAL;
  }, [activeRoutes, knownRoutes, activeRoutesLoaded, location.pathname]);

  const value = {
    activeRoutes,
    knownRoutes,
    activeRoutesLoaded,
    isPathRealHome,
    isPathKnown,
    checkIsLandingPath,
    landingIsHome1Override,
  };

  return (
    <AppConfigContext.Provider value={value}>
      {children}
    </AppConfigContext.Provider>
  );
};

export const useAppConfig = () => {
  const context = useContext(AppConfigContext);
  if (context === undefined) {
    throw new Error('useAppConfig must be used within an AppConfigProvider');
  }
  return context;
};

export default AppConfigContext;