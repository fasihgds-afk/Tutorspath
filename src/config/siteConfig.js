// ─────────────────────────────────────────────
//  Central site configuration
//  Edit contact details OR route paths here —
//  all components pick them up automatically.
// ─────────────────────────────────────────────

export const SITE_CONFIG = {
  phone: {
    display: '+1 (914) 515-4875',
    href: 'tel:+19145154875',
  },
  phoneHome: {
    display: '+1 (914) 515-4875',
    href: 'tel:+19145154875',
  },
  phoneHome1: {
    display: '+92-329-5128671',
    href: 'tel:+923295128671',
  },
  whatsapp: {
    display: '+92-329-5128671',
    href: 'tel:+923295128671',
  },
  email: {
    display: 'care@tutorspath.com',
    href: 'mailto:care@tutorspath.com',
  },
  // Change activeHome to 'home' or 'home-1' to choose which home shows on '/'
  activeHome: 'home1',
  routes: {
    register: '/register',   // Change once here — updates Navbar & everywhere else
    login: '/login',
  },
};
