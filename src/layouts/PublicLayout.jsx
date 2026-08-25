import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Navbar from '../components/navigation/Navbar';
import Footer from '../components/common/Footer';
import Footer1 from '../components/common/Footer1';
import { SITE_CONFIG } from '../config/siteConfig';

const PublicLayout = () => {
  const location = useLocation();
  const activeHomeVal = String(SITE_CONFIG.activeHome || '').trim().toLowerCase();
  const isHome1 =
    location.pathname.startsWith('/home-1') ||
    location.pathname.startsWith('/home1') ||
    (location.pathname === '/' && (activeHomeVal === 'home-1' || activeHomeVal === 'home1' || activeHomeVal === '1'));

  return (
    <div className="min-h-screen flex flex-col justify-between">
      {/* Navigation Header */}
      <Navbar />

      {/* Main Page Content */}
      <div className="flex-grow">
        <Outlet />
      </div>

      {/* Footer: Home Footer for Home, Home-1 Footer for Home-1 */}
      {isHome1 ? <Footer1 /> : <Footer />}
    </div>
  );
};

export default PublicLayout;

