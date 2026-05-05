import toast from 'react-hot-toast';

const RAW_API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';
// Ensure no trailing slash
const API_BASE_URL = RAW_API_URL.endsWith('/') ? RAW_API_URL.slice(0, -1) : RAW_API_URL;

export { API_BASE_URL };

export const saveAuthTokens = (data) => {
  if (data.access_token) {
    localStorage.setItem('token', data.access_token);
  }
  if (data.refresh_token) {
    localStorage.setItem('refreshToken', data.refresh_token);
  }
  if (data.role) {
    localStorage.setItem('role', data.role);
  }
};

export const clearAuthTokens = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('refreshToken');
  localStorage.removeItem('role');
};

const refreshAccessToken = async () => {
  const refreshToken = localStorage.getItem('refreshToken');
  if (!refreshToken) return null;

  const response = await fetch(`${API_BASE_URL}/refresh`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ refresh_token: refreshToken }),
  });

  if (!response.ok) {
    clearAuthTokens();
    return null;
  }

  const data = await response.json();
  saveAuthTokens(data);
  return data.access_token;
};

export const apiRequest = async (endpoint, options = {}) => {
  const token = localStorage.getItem('token');
  const authEndpoints = ['/login', '/signup', '/verify-otp', '/forgot-password', '/reset-password'];
  
  const isFormData = options.body instanceof FormData;
  
  const headers = {
    ...(isFormData ? {} : { 'Content-Type': 'application/json' }),
    ...options.headers,
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  // Remove any empty/undefined headers
  Object.keys(headers).forEach(key => {
    if (!headers[key]) delete headers[key];
  });

  const config = {
    ...options,
    headers,
  };

  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, config);

    if (response.status === 401 && !options._retry && !authEndpoints.some(path => endpoint.startsWith(path)) && endpoint !== '/refresh') {
      const newAccessToken = await refreshAccessToken();
      if (newAccessToken) {
        return apiRequest(endpoint, { ...options, _retry: true });
      }

      if (!['/login', '/signup'].includes(window.location.pathname)) {
        window.location.href = '/login';
      }
    }
    
    // Handle non-JSON responses (e.g. 204 No Content)
    const contentType = response.headers.get('content-type');
    let data;
    if (contentType && contentType.includes('application/json')) {
      data = await response.json();
    } else {
      data = { message: 'Success' };
    }

    if (!response.ok) {
      const errorMessage = typeof data.detail === 'string' 
        ? data.detail 
        : Array.isArray(data.detail) 
          ? data.detail.map(d => d.msg).join(', ')
          : 'Something went wrong';
      toast.error(errorMessage);
      throw new Error(errorMessage);
    }

    return data;
  } catch (error) {
    if (error.message === 'Failed to fetch') {
      console.error(`API Connection Error: Failed to fetch from ${API_BASE_URL}${endpoint}`);
      toast.error('Connection error. Please check if the backend is running.');
    }
    throw error;
  }
};
