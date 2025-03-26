import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

export const createMaintenanceRequest = async (data) => {
  const token = localStorage.getItem('token');
  const response = await axios.post(`${API_URL}/api/maintenance`, data, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

export const updateMaintenanceStatus = async (id, data) => {
  const token = localStorage.getItem('token');
  const response = await axios.put(`${API_URL}/api/maintenance/${id}`, data, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

export const getMaintenanceRequests = async () => {
  const token = localStorage.getItem('token');
  const response = await axios.get(`${API_URL}/api/maintenance`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};
