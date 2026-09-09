const TOKEN_KEY = 'auth_token';
const USER_KEY = 'auth_user';

export const tokenManager = {
  getToken: () => {
    try {
      return localStorage.getItem(TOKEN_KEY);
    } catch {
      return null;
    }
  },

  setToken: (token) => {
    try {
      if (token) {
        localStorage.setItem(TOKEN_KEY, token);
      } else {
        localStorage.removeItem(TOKEN_KEY);
      }
      if (typeof window !== 'undefined') {
        window.dispatchEvent(new Event('auth_state_changed'));
      }
    } catch (e) {
      console.error('Failed to set token in storage:', e);
    }
  },

  getUser: () => {
    try {
      const user = localStorage.getItem(USER_KEY);
      return user ? JSON.parse(user) : null;
    } catch {
      return null;
    }
  },

  setUser: (user) => {
    try {
      if (user) {
        localStorage.setItem(USER_KEY, JSON.stringify(user));
      } else {
        localStorage.removeItem(USER_KEY);
      }
      if (typeof window !== 'undefined') {
        window.dispatchEvent(new Event('auth_state_changed'));
      }
    } catch (e) {
      console.error('Failed to set user in storage:', e);
    }
  },

  setAuth: (token, user) => {
    tokenManager.setToken(token);
    tokenManager.setUser(user);
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new Event('auth_state_changed'));
    }
  },

  clearAuth: () => {
    try {
      const user = tokenManager.getUser();
      const userId = user?.id || user?._id;
      if (userId) {
        localStorage.removeItem(`student_placed_orders_${userId}`);
      }
      localStorage.removeItem('student_placed_orders');
      localStorage.removeItem('student_placed_orders_guest');
      localStorage.removeItem('heroOrderData');
      localStorage.removeItem(TOKEN_KEY);
      localStorage.removeItem(USER_KEY);
      if (typeof sessionStorage !== 'undefined') {
        sessionStorage.clear();
      }
      if (typeof window !== 'undefined') {
        window.dispatchEvent(new CustomEvent('auth_state_changed'));
      }
    } catch (e) {
      console.error('Failed to clear auth storage:', e);
    }
  },

  isAuthenticated: () => {
    return Boolean(tokenManager.getToken());
  },
};

export default tokenManager;
