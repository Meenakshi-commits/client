import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate, useLocation } from 'react-router-dom';
import Home from './components/Home';
import AboutUs from './components/AboutUs';
import ContactUs from './components/ContactUs';
import Login from './components/Auth/Login';
import Signup from './components/Auth/Signup';
import ForgotPassword from './components/Auth/ForgotPassword';
import ResetPassword from './components/Auth/ResetPassword';
import AdminDashboard from './components/Dashboard/AdminDashboard';
import ResidentDashboard from './components/Dashboard/ResidentDashboard';

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const isAuthenticated = !!localStorage.getItem('token');

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    navigate('/');
  };

  const getGradient = () => {
    switch (location.pathname) {
      case '/about-us':
        return 'from-gray-700 to-gray-800';
      case '/contact-us':
        return 'from-gray-700 to-gray-800';
      case '/login':
        return 'from-blue-600 to-blue-800';
      case '/signup':
        return 'from-blue-400 to-blue-600';
      default:
        return 'from-gray-800 to-gray-900';
    }
  };

  return (
    <header className={`w-full bg-gradient-to-r ${getGradient()} text-white p-4 flex justify-between items-center`}>
      <nav className="flex space-x-6">
        <button onClick={() => navigate('/')} className="hover:underline">Home</button>
        <button onClick={() => navigate('/about-us')} className="hover:underline">About Us</button>
        <button onClick={() => navigate('/contact-us')} className="hover:underline">Contact Us</button>
      </nav>
      <div>
        {isAuthenticated ? (
          <button onClick={handleLogout} className="hover:underline">Logout</button>
        ) : (
          <>
            <button onClick={() => navigate('/login')} className="hover:underline">Login</button>
            <button onClick={() => navigate('/signup')} className="ml-4 hover:underline">Sign Up</button>
          </>
        )}
      </div>
    </header>
  );
};

const App = () => {
  const role = localStorage.getItem('role');

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/contact-us" element={<ContactUs />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />
        <Route path="/dashboard" element={
          role === 'admin' 
            ? <AdminDashboard /> 
            : role === 'resident' 
              ? <ResidentDashboard />
              : <Navigate to="/" />
        } />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
};

export default App;