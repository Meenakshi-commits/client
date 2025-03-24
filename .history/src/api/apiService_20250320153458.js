import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

const apiService = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add a token if available for authenticated requests
apiService.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const login = async (data) => {
  const response = await apiService.post('/auth/login', data);
  return response.data;
};

export const signup = async (data) => {
  const response = await apiService.post('/auth/signup', data);
  return response.data;
};

export const forgotPassword = async (data) => {
  const response = await apiService.post('/auth/forgot-password', data);
  return response.data;
};

export const resetPassword = async (token, data) => {
  const response = await apiService.post(`/auth/reset-password/${token}`, data);
  return response.data;
};

export const logout = async () => {
  const response = await apiService.get('/auth/logout');
  return response.data;
};
