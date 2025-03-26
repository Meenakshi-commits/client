import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

const ProtectedRoute = ({ children, requiredRole }) => {
  const { user } = useAuth();

  if (!user) {
    console.log('No user found. Redirecting to login.');
    return <Navigate to="/login" />;
  }

  if (requiredRole && user.role !== requiredRole) {
    console.log('Unauthorized Access. Redirecting to respective dashboard.');
    return <Navigate to={user.role === 'admin' ? '/Admin/Dashboard' : '/resident/dashboard'} />;
  }

  return children;
};

export default ProtectedRoute;
