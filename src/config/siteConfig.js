// ─────────────────────────────────────────────
//  Central site configuration
//  Edit contact details OR route paths here —
//  all components pick them up automatically.
// ─────────────────────────────────────────────


export const SITE_CONFIG = {
  logo: {
    alt: 'TutorsNext',
    header: {
      src: '/images/tutorsnext-logo.png',
      className: 'h-7 w-auto sm:h-7',
    },
    footer: {
      src: '/images/TutorsNext White.png',
      className: 'h-10 w-auto',
    },
    favicon: '/images/Favicon TutorsNext.png',
  },

  phone: {
    display: '+1 (908) 695-0632',
    href: 'tel:+19086950632',
  },

  phoneHome: {
    display: '+1 (908) 695-0632',
    href: 'tel:+19086950632',
  },

  phoneHome1: {
    display: '+1 (908) 695-0632',
    href: 'tel:+19086950632',
  },

  whatsapp: {
    display: '+1 (908) 695-0632',
    href: 'tel:+19086950632',
  },

  email: {
    display: 'care@tutorsnext.com',
    href: 'mailto:care@tutorsnext.com',
  },

  // Change activeHome to 'home' or 'home-1' to choose which home shows on '/'
  activeHome: 'home-1',

  // Website tag for backend multi-tenant identification
  tag: import.meta.env.VITE_SITE_TAG || 'tutorsnext',

  routes: {
    register: '/register',
    login: '/login',
  },
};




