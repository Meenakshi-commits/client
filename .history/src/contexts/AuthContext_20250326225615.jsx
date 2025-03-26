import React, { createContext, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role');
    const username = localStorage.getItem('username');
    if (token && role) {
      setUser({ token, role, username });
    }
  }, []); // Ensure it runs on component mount

  const login = (response) => {
    const { token, role, username } = response;
    localStorage.setItem('token', token);
    localStorage.setItem('role', role);
    localStorage.setItem('username', username || 'User');
    setUser({ token, role, username }); // Ensure state is updated
    navigate('/dashboard');
  };

  const logout = () => {
    localStorage.clear();
    setUser(null);
    navigate('/login');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
