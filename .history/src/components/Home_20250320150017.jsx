// src/components/Home.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  const handleExplore = () => {
    const token = localStorage.getItem('token');
    if (token) {
      navigate('/admin-dashboard');
    } else {
      navigate('/login');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="text-center p-8">
        <h1 className="text-4xl font-bold mb-4">Welcome to Our Hostel Management System</h1>
        <p className="text-gray-600 mb-6">Manage rooms, track payments, and handle maintenance seamlessly.</p>
        <button onClick={handleExplore} className="bg-blue-500 text-white px-6 py-3 rounded-lg">Explore Now</button>
      </div>
    </div>
  );
};

export default Home;
