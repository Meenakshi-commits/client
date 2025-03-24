import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Dashboard = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:5000/api/auth/user', {
          headers: { Authorization: `Bearer ${token}` },
        });
        const { role } = response.data;
        if (role === 'admin') {
          navigate('/dashboard/admin');
        } else if (role === 'resident') {
          navigate('/dashboard/resident');
        } else {
          navigate('/login');
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
        navigate('/login');
      }
    };

    fetchUser();
  }, [navigate]);

  return <div>Loading...</div>;
};

export default Dashboard;