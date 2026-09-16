import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Navbar from '../components/navigation/Navbar';
import Footer from '../components/common/Footer';
import Footer1 from '../components/common/Footer1';
import { SITE_CONFIG } from '../config/siteConfig';
import { checkIsHome1Path } from '../config/homeConfig';
import { useAppConfig } from '../context/AppConfigContext';

const PublicLayout = () => {
  const location = useLocation();
  const { landingIsHome1Override, activeRoutesLoaded } = useAppConfig();
  
  // Use dynamic routing if available, otherwise fall back to static config
  const isHome1 = landingIsHome1Override !== undefined 
    ? landingIsHome1Override 
    : checkIsHome1Path(location.pathname, SITE_CONFIG.activeHome);

  return (
    <div className="min-h-screen flex flex-col justify-between">
      {/* Navigation Header */}
      <Navbar />

      {/* Main Page Content */}
      <div className="flex-grow">
        <Outlet />
      </div>

      {/* Footer: Home Footer for Home, Home-1 Footer for Home-1 */}
      {activeRoutesLoaded ? (isHome1 ? <Footer1 /> : <Footer />) : (
        <div className="w-full bg-gray-50 border-t border-gray-200 py-8">
          <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="h-24 bg-gray-100 rounded-lg animate-pulse" />
          </div>
        </div>
      )}
    </div>
  );
};

export default PublicLayout;

