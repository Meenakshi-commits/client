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

// Rooms
import RoomList from './components/Rooms/RoomList';
import RoomDetails from './components/Rooms/RoomDetails';
import RoomCreate from './components/Rooms/RoomCreate';

// Users
import UserList from './components/Users/UserList';

// Billing
import BillingManagement from './components/Billing/BillingManagement';

// Maintenance
import MaintenanceManagement from './components/Maintenance/MaintenanceManagement';

// Reports
import ReportsDashboard from './components/Reports/ReportsDashboard';

const App = () => {
  return (
    <Router>
      <AuthProvider>
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
          <Route path="/dashboard" element={<ProtectedRoute><DashboardRedirect /></ProtectedRoute>} />

          {/* Admin Routes */}
          <Route path="/admin/dashboard" element={<ProtectedRoute requiredRole="admin"><AdminDashboard /></ProtectedRoute>} />
          <Route path="/admin/rooms" element={<ProtectedRoute requiredRole="admin"><RoomList /></ProtectedRoute>} />
          <Route path="/admin/rooms/:id" element={<ProtectedRoute requiredRole="admin"><RoomDetails /></ProtectedRoute>} />
          <Route path="/admin/rooms/create" element={<ProtectedRoute requiredRole="admin"><RoomCreate /></ProtectedRoute>} />
          <Route path="/admin/users" element={<ProtectedRoute requiredRole="admin"><UserList /></ProtectedRoute>} />
          <Route path="/admin/billing" element={<ProtectedRoute requiredRole="admin"><BillingManagement /></ProtectedRoute>} />
          <Route path="/admin/maintenance" element={<ProtectedRoute requiredRole="admin"><MaintenanceManagement /></ProtectedRoute>} />
          <Route path="/admin/reports" element={<ProtectedRoute requiredRole="admin"><ReportsDashboard /></ProtectedRoute>} />

          {/* Resident Routes */}
          <Route path="/resident/dashboard" element={<ProtectedRoute requiredRole="resident"><ResidentDashboard /></ProtectedRoute>} />
          <Route path="/resident/rooms" element={<ProtectedRoute requiredRole="resident"><RoomList /></ProtectedRoute>} />
          <Route path="/resident/rooms/:id" element={<ProtectedRoute requiredRole="resident"><RoomDetails /></ProtectedRoute>} />
          <Route path="/resident/billing" element={<ProtectedRoute requiredRole="resident"><BillingManagement /></ProtectedRoute>} />
          <Route path="/resident/maintenance" element={<ProtectedRoute requiredRole="resident"><MaintenanceManagement /></ProtectedRoute>} />

          {/* Catch-all */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
};

const DashboardRedirect = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  React.useEffect(() => {
    if (!user) {
      console.log('No User Found. Redirecting to Login');
      navigate('/login');
      return;
    }

    if (user?.role === 'admin') {
      console.log('Navigating to Admin Dashboard');
      navigate('/admin/dashboard');
    } else if (user?.role === 'resident' || user?.role === 'user') {
      console.log('Navigating to Resident Dashboard');
      navigate('/resident/dashboard');
    } else {
      console.log('Invalid Role:', user?.role);
      navigate('/');
    }
  }, [user, navigate]);

  return <div>Loading...</div>; // Display while navigating
};

export default App;
