import axios from 'axios';

const API_URL = 'https://server-production-d135.up.railway.app/'; // Ensure this is correct

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

export const getRooms = async () => {
  return await apiService.get('/api/rooms');
};

export const getRoomDetails = async (roomId) => {
  try {
    const response = await apiService.get(`/api/rooms/${roomId}/details`);
    return response.data;
  } catch (error) {
    console.error('Error fetching room details:', error?.response?.data?.message || error.message);
    throw error;
  }
};

export const allocateRoom = async (userId, roomId) => {
  const response = await apiService.post('/rooms/allocate', { userId, roomId });
  return response.data;
};

export const updateRoom = async (roomId, data) => {
  const response = await apiService.put(`/rooms/${roomId}`, data);
  return response.data;
};

export const deleteRoom = async (roomId) => {
  const response = await apiService.delete(`/rooms/${roomId}`);
  return response.data;
};
