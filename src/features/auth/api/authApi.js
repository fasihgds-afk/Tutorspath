import api from '../../../services/api/apiClient';
import tokenManager from '../../../services/auth/tokenManager';

export const authApi = {
  /**
   * Register a new user (Student)
   * @param {{ fullName: string, email: string, countryCode: string, phoneNumber: string, password: string }} payload
   */
  signup: async (payload) => {
    const res = await api.post('/auth/signup', payload);
    if (res?.data?.token) {
      tokenManager.setAuth(res.data.token, res.data.user);
    }
    return res;
  },

  /**
   * Login user
   * @param {{ email: string, password: string }} payload
   */
  login: async (payload) => {
    const res = await api.post('/auth/login', payload);
    if (res?.data?.token) {
      tokenManager.setAuth(res.data.token, res.data.user);
    }
    return res;
  },

  /**
   * Check if email is already registered
   * @param {string} email
   */
  checkEmail: async (email) => {
    return api.get(`/auth/check-email?email=${encodeURIComponent(email)}`);
  },

  /**
   * Fetch currently authenticated user profile
   */
  getMe: async () => {
    return api.get('/auth/me');
  },

  /**
   * Logout user
   */
  logout: () => {
    tokenManager.clearAuth();
  },
};

export default authApi;
