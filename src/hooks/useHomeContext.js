import { useLocation, useNavigate } from 'react-router-dom';
import {
  checkIsActiveHome1,
  checkIsHome1Path,
  checkIsLandingPath,
  getHomePhone,
  HOME_1_PATH,
  HOME_DEFAULT_PATH,
} from '../config/homeConfig';
import { SITE_CONFIG } from '../config/siteConfig';

/**
 * Hook providing a single centralized source of truth for all Home/Home-1 state,
 * routing context, phone details, and hash scrolling behavior.
 */
export const useHomeContext = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const activeIsHome1 = checkIsActiveHome1(SITE_CONFIG.activeHome);
  const isHome1 = checkIsHome1Path(location.pathname, SITE_CONFIG.activeHome);
  const isLandingPage = checkIsLandingPath(location.pathname);
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
