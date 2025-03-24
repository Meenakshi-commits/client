import React from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  const handleExplore = () => {
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-400 to-purple-600 flex items-center justify-center">
      <div className="text-center text-white p-8">
        <h1 className="text-5xl font-bold mb-6">Welcome to Sunshine Hostels</h1>
        <p className="text-xl mb-8">Providing comfort and care with modern management solutions.</p>
        <button onClick={handleExplore} className="bg-white text-blue-600 font-bold px-8 py-4 rounded-lg shadow-lg">Explore Now</button>
      </div>
    </div>
  );
};

export default Home;