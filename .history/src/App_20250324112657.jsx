import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import Navbar from './components/Common/Navbar';
import ProtectedRoute from './components/Common/ProtectedRoute';

// Pages
import Home from './components/Pages/Home';
import AboutUs from './components/Pages/AboutUs';
import ContactUs from './components/Pages/ContactUs';

// Authentication
import Login from './components/Auth/Login';
import Signup from './components/Auth/Signup';
import ForgotPassword from './components/Auth/ForgotPassword';
import ResetPassword from './components/Auth/ResetPassword';

// Dashboard
import AdminDashboard from './components/Dashboard/AdminDashboard';
import ResidentDashboard from './components/Dashboard/ResidentDashboard';

// Rooms
import RoomList from './components/Rooms/RoomList';
import RoomDetails from './components/Rooms/RoomDetails';

// Dynamic Background Gradient
const GradientWrapper = ({ children }) => {
  const path = window.location.pathname;

  // Apply gradients based on the route
  const getGradientClass = () => {
    if (path === '/about-us' || path === '/contact-us') {
      return 'bg-gradient-to-r from-gray-700 to-gray-900';
    }
    if (path === '/login') {
      return 'bg-gradient-to-r from-blue-600 to-blue-800';
    }
    if (path === '/signup') {
      return 'bg-gradient-to-r from-green-500 to-green-700';
    }
    if (path === '/dashboard') {
      return 'bg-gradient-to-r from-purple-600 to-purple-800';
    }
    return 'bg-gradient-to-r from-gray-800 to-black';
  };

  return (
    <div className={`min-h-screen ${getGradientClass()} text-white`}>
      {children}
    </div>
  );
};

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <GradientWrapper>
          <Navbar />
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/about-us" element={<AboutUs />} />
            <Route path="/contact-us" element={<ContactUs />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password/:token" element={<ResetPassword />} />

            {/* Role-based Dashboard */}
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <DashboardRedirect />
                </ProtectedRoute>
              }
            />

            {/* Admin Routes */}
            <Route
              path="/admin/rooms"
              element={
                <ProtectedRoute requiredRole="admin">
                  <RoomList />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/rooms/:id"
              element={
                <ProtectedRoute requiredRole="admin">
                  <RoomDetails />
                </ProtectedRoute>
              }
            />

            {/* Resident Routes */}
            <Route
              path="/resident/rooms"
              element={
                <ProtectedRoute requiredRole="resident">
                  <RoomList />
                </ProtectedRoute>
              }
            />
            <Route
              path="/resident/rooms/:id"
              element={
                <ProtectedRoute requiredRole="resident">
                  <RoomDetails />
                </ProtectedRoute>
              }
            />

            {/* Catch-all Redirect */}
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </GradientWrapper>
      </Router>
    </AuthProvider>
  );
};

// Redirect Based on Role
const DashboardRedirect = () => {
  const { user } = useAuth();
  if (user?.role === 'admin') {
    return <Navigate to="/admin-dashboard" />;
  }
  if (user?.role === 'resident') {
    return <Navigate to="/resident-dashboard" />;
  }
  return <Navigate to="/login" />;
};

export default App;
