import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

export const createResident = async (data) => {
  const token = localStorage.getItem('token');
  const response = await axios.post(`${API_URL}/api/residents`, data, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

export const getResidents = async () => {
  const token = localStorage.getItem('token');
  const response = await axios.get(`${API_URL}/api/residents`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

export const getResidentById = async (id) => {
  const token = localStorage.getItem('token');
  const response = await axios.get(`${API_URL}/api/residents/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

export const updateResident = async (id, data) => {
  const token = localStorage.getItem('token');
  const response = await axios.put(`${API_URL}/api/residents/${id}`, data, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

export const deleteResident = async (id) => {
  const token = localStorage.getItem('token');
  const response = await axios.delete(`${API_URL}/api/residents/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};
