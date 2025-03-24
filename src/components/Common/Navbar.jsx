import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

const Navbar = () => {
  const { user, logout } = useAuth();

  return (
    <header className="w-full bg-gradient-to-r from-gray-800 to-gray-900 text-white p-4 flex justify-between items-center">
      <nav className="flex space-x-6">
        <Link to="/" className="hover:underline">Home</Link>
        <Link to="/about-us" className="hover:underline">About Us</Link>
        <Link to="/contact-us" className="hover:underline">Contact Us</Link>
      </nav>
      <div>
        {user ? (
          <>
            <span className="mr-4">Welcome, {user.username}!</span>
            <button onClick={logout} className="hover:underline">Logout</button>
          </>
        ) : (
          <>
            <Link to="/login" className="hover:underline">Login</Link>
            <Link to="/signup" className="ml-4 hover:underline">Sign Up</Link>
          </>
        )}
      </div>
    </header>
  );
};

export default Navbar;
