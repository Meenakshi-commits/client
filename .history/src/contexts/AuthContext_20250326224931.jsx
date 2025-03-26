import React, { createContext, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  // Check for token and role in localStorage on component mount
  useEffect(() => {
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role');
    const username = localStorage.getItem('username');
    if (token && role) {
      setUser({ token, role, username });
    }
  }, []);

  // Login function with error handling
  const login = async (credentials) => {
    try {
      const response = await axios.post('/api/auth/login', credentials);
      const { token, role, username } = response.data;

      if (token && role) {
        localStorage.setItem('token', token);
        localStorage.setItem('role', role);
        localStorage.setItem('username', username || 'User');
        setUser({ token, role, username });

        // Redirect to appropriate dashboard
        navigate(role === 'admin' ? '/admin/dashboard' : '/resident/dashboard');
      } else {
        throw new Error('Invalid login response');
      }
    } catch (error) {
      console.error('Login Error:', error);
      alert(error?.response?.data?.message || 'Login failed. Please try again.');
    }
  };

  // Logout function
  const logout = () => {
    localStorage.clear();
    setUser(null);
    navigate('/');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
