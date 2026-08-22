import { API_BASE_URL } from '../../config/env';
import tokenManager from '../auth/tokenManager';

class ApiError extends Error {
  constructor(message, status = 500, errors = null, data = null) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.errors = errors;
    this.data = data;
  }
}

export const request = async (endpoint, options = {}) => {
  const url = endpoint.startsWith('http') ? endpoint : `${API_BASE_URL}${endpoint}`;
  const token = tokenManager.getToken();

  const headers = {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...options.headers,
  };

  const config = {
    ...options,
    headers,
  };

  if (config.body && typeof config.body === 'object' && !(config.body instanceof FormData)) {
    config.body = JSON.stringify(config.body);
  }

  try {
    const response = await fetch(url, config);
    let data = null;

    try {
      data = await response.json();
    } catch {
      data = null;
    }

    if (!response.ok) {
      const message =
        data?.message ||
        (data?.errors && data.errors.length > 0 ? data.errors[0].message : 'An error occurred. Please try again.');

      throw new ApiError(message, response.status, data?.errors || null, data);
    }

    return data;
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }

    // Network / connection error
    throw new ApiError(
      'Unable to connect to the server. Please check your network or try again later.',
      0
    );
  }
};

export const api = {
  get: (endpoint, options = {}) => request(endpoint, { ...options, method: 'GET' }),
  post: (endpoint, body, options = {}) => request(endpoint, { ...options, method: 'POST', body }),
  put: (endpoint, body, options = {}) => request(endpoint, { ...options, method: 'PUT', body }),
  delete: (endpoint, options = {}) => request(endpoint, { ...options, method: 'DELETE' }),
};

export default api;
