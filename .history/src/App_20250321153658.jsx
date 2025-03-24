import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import Home from './components/Home';
import AboutUs from './components/AboutUs';
import ContactUs from './components/ContactUs';
import Login from './components/Auth/Login';
import Signup from './components/Auth/Signup';

const Header = () => {
  const navigate = useNavigate();

  return (
    <header className="bg-gradient-to-br from-blue-600 to-purple-700 text-white p-4 flex justify-between items-center">
      <h1 className="text-2xl cursor-pointer" onClick={() => navigate('/')}>Sunshine Hostels</h1>
      <div className="flex space-x-4">
        <button onClick={() => navigate('/')} className="bg-gray-600 px-4 py-2 rounded">Home</button>
        <button onClick={() => navigate('/about-us')} className="bg-gray-600 px-4 py-2 rounded">About Us</button>
        <button onClick={() => navigate('/contact-us')} className="bg-gray-600 px-4 py-2 rounded">Contact Us</button>
        <button onClick={() => navigate('/login')} className="bg-blue-500 px-4 py-2 rounded">Login</button>
        <button onClick={() => navigate('/signup')} className="bg-green-500 px-4 py-2 rounded">Sign Up</button>
      </div>
    </header>
  );
};

const App = () => {
  return (
    <Router>
      <Header />
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
