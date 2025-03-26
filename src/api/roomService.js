import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

export const getRoomDetails = async (roomId) => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.get(`${API_URL}/api/rooms/${roomId}/details`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching room details:', error?.response?.data?.message || error.message);
    throw error;
  }
};
