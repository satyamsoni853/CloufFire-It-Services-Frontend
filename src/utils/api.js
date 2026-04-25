import toast from 'react-hot-toast';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

export { API_BASE_URL };

export const apiRequest = async (endpoint, options = {}) => {
  const token = localStorage.getItem('token');
  
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
      toast.error('Connection error. Please check if the backend is running.');
    }
    throw error;
  }
};
