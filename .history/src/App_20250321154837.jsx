// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import Home from './components/Home';
import AboutUs from './components/AboutUs';
import ContactUs from './components/ContactUs';
import Login from './components/Auth/Login';
import Signup from './components/Auth/Signup';

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <header className="w-full bg-gradient-to-r from-gray-800 to-gray-900 text-white p-4 flex justify-between items-center">
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
  );
};

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/contact-us" element={<ContactUs />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
};

export default App;
