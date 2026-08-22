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
    } catch (e) {
      console.error('Failed to set user in storage:', e);
    }
  },

  setAuth: (token, user) => {
    tokenManager.setToken(token);
    tokenManager.setUser(user);
  },

  clearAuth: () => {
    try {
      localStorage.removeItem(TOKEN_KEY);
      localStorage.removeItem(USER_KEY);
    } catch (e) {
      console.error('Failed to clear auth storage:', e);
    }
  },

  isAuthenticated: () => {
    return Boolean(tokenManager.getToken());
  },
};

export default tokenManager;
