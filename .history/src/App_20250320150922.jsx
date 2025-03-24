import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import Home from './components/Home';
import AboutUs from './components/AboutUs';
import ContactUs from './components/ContactUs';
import Login from './components/Auth/Login';
import Signup from './components/Auth/Signup';

const NavigationButtons = () => {
  const navigate = useNavigate();

  return (
    <div className="fixed bottom-4 left-4 flex space-x-4">
      <button onClick={() => navigate(-1)} className="bg-gray-600 text-white px-4 py-2 rounded">Back</button>
      <button onClick={() => navigate(1)} className="bg-gray-600 text-white px-4 py-2 rounded">Forward</button>
    </div>
  );
};

const App = () => {
  return (
    <Router>
      <NavigationButtons />
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
