import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

export const createRazorpayOrder = async (data) => {
  const token = localStorage.getItem('token');
  const response = await axios.post(`${API_URL}/api/billing/create-razorpay-order`, data, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

export const verifyRazorpayPayment = async (data) => {
  const token = localStorage.getItem('token');
  const response = await axios.post(`${API_URL}/api/billing/verify-razorpay-payment`, data, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

export const getBillingDetails = async () => {
  const token = localStorage.getItem('token');
  const response = await axios.get(`${API_URL}/api/billing`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};
