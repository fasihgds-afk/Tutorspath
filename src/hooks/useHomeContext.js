import { useLocation, useNavigate } from 'react-router-dom';
import {
  checkIsActiveHome1,
  checkIsHome1Path,
  getHomePhone,
  HOME_1_PATH,
  HOME_DEFAULT_PATH,
} from '../config/homeConfig';
import { SITE_CONFIG } from '../config/siteConfig';
import { useAppConfig } from '../context/AppConfigContext';

/**
 * Hook providing a single centralized source of truth for all Home/Home-1 state,
 * routing context, phone details, and hash scrolling behavior.
 *
 * Backend override (highest priority on landing pages):
 *   If AppConfigContext has loaded active routes from the backend AND we are on
 *   a landing path (/, /home*, /home-1*, or any configured SEO route):
 *     - isHome1 = landingIsHome1Override
 *         = true  when backend isRealHomePage=false → Home1 demo (Hire A Tutor, 1 CTA, #hash)
 *         = false when backend isRealHomePage=true  → Home real  (Hire A Writer + Login)
 *   This replaces the old hardcoded `SITE_CONFIG.activeHome` rule for landing pages.
 *
 * Legacy fallback (on non-landing pages or while backend is still loading):
 *   Fall back to the URL-based `checkIsHome1Path(location.pathname, SITE_CONFIG.activeHome)`
 *   rule so pages like /reviews, /student/dashboard, etc. still work as before.
 */
export const useHomeContext = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { landingIsHome1Override, activeRoutesLoaded, checkIsLandingPath: dynamicCheckIsLandingPath } = useAppConfig();

  const activeIsHome1 = checkIsActiveHome1(SITE_CONFIG.activeHome);
  const urlBasedIsHome1 = checkIsHome1Path(location.pathname, SITE_CONFIG.activeHome);
  // Use dynamic check from AppConfigContext, or fallback to URL-based check
  const isLandingPage = dynamicCheckIsLandingPath
    ? dynamicCheckIsLandingPath(location.pathname)
    : urlBasedIsHome1; // Fallback: if it's home1-based, consider it a landing page

  // Apply the backend override when we have data and this IS a landing page.
  const isHome1 =
    activeRoutesLoaded && isLandingPage && landingIsHome1Override !== undefined
      ? landingIsHome1Override
      : urlBasedIsHome1;

  const homePath = isHome1 ? HOME_1_PATH : HOME_DEFAULT_PATH;
  const phone = getHomePhone(isHome1);

  /**
   * Universal hash link handler:
   * - If already on a landing page with in-DOM section IDs, smoothly scrolls directly.
   * - If on another page, navigates to `${homePath}#${hash}` and ScrollToHash handles scrolling.
   */
  const handleHashLink = (e, hash, onNavigate) => {
    if (e && typeof e.preventDefault === 'function') {
      e.preventDefault();
    }
    if (typeof onNavigate === 'function') {
      onNavigate();
    }

    if (isLandingPage) {
      const el = document.getElementById(hash);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        return;
      }
    }

    const targetHome = isHome1 ? HOME_1_PATH : HOME_DEFAULT_PATH;
    navigate(`${targetHome}#${hash}`);
  };

  return {
    isHome1,
    isHome: !isHome1,
    isLandingPage,
    activeIsHome1,
    homePath,
    phone,
    handleHashLink,
  };
};

export default useHomeContext;
