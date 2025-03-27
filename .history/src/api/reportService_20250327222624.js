import axios from 'axios';

const API_URL = 'https://server-production-d135.up.railway.app'; // Updated to production server

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
