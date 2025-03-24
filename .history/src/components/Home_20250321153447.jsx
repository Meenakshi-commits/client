// src/components/Home.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 to-blue-500 flex flex-col justify-center items-center text-white">
      <header className="absolute top-0 w-full flex justify-between p-6">
        <nav className="flex space-x-6">
          <button onClick={() => navigate('/')} className="hover:underline">Home</button>
          <button onClick={() => navigate('/about-us')} className="hover:underline">About Us</button>
          <button onClick={() => navigate('/contact-us')} className="hover:underline">Contact Us</button>
        </nav>
        <div>
          <button onClick={() => navigate('/login')} className="hover:underline">Login</button>
          <button onClick={() => navigate('/signup')} className="ml-4 hover:underline">Sign Up</button>
        </div>
      </header>
      <h1 className="text-6xl font-bold mb-6">Welcome to Sunshine Hostels</h1>
      <p className="text-xl mb-8">Experience comfort and convenience like never before.</p>
      <button onClick={() => navigate('/signup')} className="bg-white text-blue-600 px-6 py-3 rounded-lg text-lg font-semibold shadow-lg hover:bg-gray-100">
        Explore Now
      </button>
    </div>
  );
};

export default Home;
