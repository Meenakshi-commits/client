// src/components/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate, useLocation } from 'react-router-dom';
import Home from '../Home';
import AboutUs from '../AboutUs';
import ContactUs from '../ContactUs';
import Login from '../Auth/Login';
import Signup from '../Auth/Signup';
import ForgotPassword from '../Auth/ForgotPassword';
import ResetPassword from '../Auth/ResetPassword';
import AdminDashboard from '../Dashboard/AdminDashboard';
import ResidentDashboard from '../Dashboard/ResidentDashboard';
import RoomList from '../Rooms/RoomList';
import RoomDetails from '../Rooms/RoomDetails';

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const isAuthenticated = !!localStorage.getItem('token');
  const role = localStorage.getItem('role');
  const username = localStorage.getItem('username');

  const handleLogout = () => {
    localStorage.clear();
    navigate('/');
  };

  const getGradient = () => {
    switch (location.pathname) {
      case '/about-us':
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
          <>
            <span className="mr-4">Welcome, {username || 'User'}!</span>
            <button onClick={handleLogout} className="hover:underline">Logout</button>
          </>
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

  const getDashboardComponent = () => {
    if (role === 'admin') {
      return <AdminDashboard />;
    } else if (role === 'resident') {
      return <ResidentDashboard />;
    }
    return <Navigate to="/login" />;
  };

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
        <Route path="/dashboard" element={getDashboardComponent()} />
        <Route path="/admin/rooms" element={<RoomList />} />
        <Route path="/admin/rooms/:id" element={<RoomDetails />} />
        <Route path="/resident/rooms" element={<RoomList />} />
        <Route path="/resident/rooms/:id" element={<RoomDetails />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
};

export default App;
