import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

export const getUserReport = async () => {
  const token = localStorage.getItem('token');
  const response = await axios.get(`${API_URL}/api/reports/users`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

export const getRoomReport = async () => {
  const token = localStorage.getItem('token');
  const response = await axios.get(`${API_URL}/api/reports/rooms`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

export const getBillingReport = async () => {
  const token = localStorage.getItem('token');
  const response = await axios.get(`${API_URL}/api/reports/billing`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

export const getMaintenanceReport = async () => {
  const token = localStorage.getItem('token');
  const response = await axios.get(`${API_URL}/api/reports/maintenance`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};
