import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: { 'Content-Type': 'application/json' },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// Auth
export const signup = (data) => api.post('/auth/signup', data);
export const login = (data) => api.post('/auth/login', data);
export const forgotPassword = (email) => api.post('/auth/forgot-password', { email });
export const resetPassword = (token, password) => api.post(`/auth/reset-password/${token}`, { password });

// Rooms
export const getRooms = () => api.get('/rooms');
export const createRoom = (data) => api.post('/rooms', data);
export const updateRoom = (id, data) => api.put(`/rooms/${id}`, data);
export const deleteRoom = (id) => api.delete(`/rooms/${id}`);

// Maintenance
export const getMaintenanceRequests = () => api.get('/maintenance');
export const createMaintenanceRequest = (data) => api.post('/maintenance', data);
export const updateMaintenanceRequest = (id, data) => api.put(`/maintenance/${id}`, data);

// Billing
export const getBills = () => api.get('/billing');
export const createBill = (data) => api.post('/billing', data);
export const processPayment = (billId, paymentData) => api.post(`/billing/${billId}/pay`, paymentData);

// Reports
export const getOccupancyReport = () => api.get('/reports/occupancy');
export const getFinancialReport = () => api.get('/reports/financial');

// Notifications
export const getNotifications = () => api.get('/notifications');