import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext.jsx';
import Navbar from './components/Common/Navbar';
import ProtectedRoute from './components/Common/ProtectedRoute';

// Pages
import Home from './components/Pages/Home';
import AboutUs from './components/Pages/AboutUs';
import ContactUs from './components/Pages/ContactUs';
import Login from './components/Auth/Login';
import Signup from './components/Auth/Signup';
import ForgotPassword from './components/Auth/ForgotPassword';
import ResetPassword from './components/Auth/ResetPassword';

// Dashboard
import AdminDashboard from './components/Dashboard/AdminDashboard';
import ResidentDashboard from './components/Dashboard/ResidentDashboard';
import RoomList from './components/Rooms/RoomList';
import RoomDetails from './components/Rooms/RoomDetails';

const App = () => {
  return (
    <Router>
      <AuthProvider>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/contact-us" element={<ContactUs />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password/:token" element={<ResetPassword />} />

          {/* Role-based Dashboard */}
          <Route path="/dashboard" element={<ProtectedRoute><DashboardRedirect /></ProtectedRoute>} />

          {/* Admin Routes */}
          <Route path="/admin/dashboard" element={<ProtectedRoute requiredRole="admin"><AdminDashboard /></ProtectedRoute>} />
          <Route path="/admin/rooms" element={<ProtectedRoute requiredRole="admin"><RoomList /></ProtectedRoute>} />
          <Route path="/admin/rooms/:id" element={<ProtectedRoute requiredRole="admin"><RoomDetails /></ProtectedRoute>} />

          {/* Resident Routes */}
          <Route path="/resident/dashboard" element={<ProtectedRoute requiredRole="resident"><ResidentDashboard /></ProtectedRoute>} />
          <Route path="/resident/rooms" element={<ProtectedRoute requiredRole="resident"><RoomList /></ProtectedRoute>} />
          <Route path="/resident/rooms/:id" element={<ProtectedRoute requiredRole="resident"><RoomDetails /></ProtectedRoute>} />

          {/* Catch-all */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
};

const DashboardRedirect = () => {
  const { user } = useAuth();
  console.log('Inside DashboardRedirect');
  console.log('User Data:', user);

  if (user?.role === 'admin') {
    console.log('Navigating to Admin Dashboard');
    return <Navigate to="/admin/dashboard" />;
  }
  if (user?.role === 'resident' || user?.role === 'user') {
    console.log('Navigating to Resident Dashboard');
    return <Navigate to="/resident/dashboard" />;
  }
  
  console.log('No valid role. Redirecting to Login');
  return <Navigate to="/login" />;
};

export default App;
