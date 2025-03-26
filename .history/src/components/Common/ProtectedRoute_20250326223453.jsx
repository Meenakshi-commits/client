import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

const ProtectedRoute = ({ children, requiredRole }) => {
  const { user } = useAuth();

  console.log('ProtectedRoute - User:', user); // Debugging log
  console.log('ProtectedRoute - Required Role:', requiredRole); // Debugging log

  if (!user) {
    console.log('No user found. Redirecting to login.');
    return <Navigate to="/login" />;
  }

  if (requiredRole && user.role !== requiredRole) {
    console.log(`User role (${user.role}) does not match required role (${requiredRole}). Redirecting to home.`);
    return <Navigate to="/" />;
  }

  return children;
};

export default ProtectedRoute;
