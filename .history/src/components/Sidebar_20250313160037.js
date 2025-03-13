import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { BellIcon } from '@heroicons/react/24/outline';

function Sidebar() {
  const { user, logout, isAuthenticated } = useAuth();
  
  const navItems = [
    { path: '/dashboard', label: 'Dashboard', adminOnly: false },
    { path: '/rooms', label: 'Rooms', adminOnly: false },
    { path: '/maintenance', label: 'Maintenance', adminOnly: false },
    { path: '/billing', label: 'Billing', adminOnly: false },
    { path: '/reports', label: 'Reports', adminOnly: true },
  ];

  return (
    <div className="w-64 bg-gray-800 text-white p-4 h-screen">
      <div className="mb-8">
        <img src="/logo.png" alt="Hostel Logo" className="w-32 mx-auto" />
      </div>
      {isAuthenticated && (
        <>
          <nav className="space-y-2">
            {navItems.map((item) => (
              (!item.adminOnly || user?.role === 'admin') && (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={({ isActive }) =>
                    `block py-2 px-4 rounded ${isActive ? 'bg-gray-700' : 'hover:bg-gray-700'}`
                  }
                >
                  {item.label}
                </NavLink>
              )
            ))}
          </nav>
          <div className="mt-4">
            <button className="flex items-center py-2 px-4 hover:bg-gray-700 w-full">
              <BellIcon className="h-5 w-5 mr-2" />
              Notifications
            </button>
          </div>
          <button
            onClick={logout}
            className="mt-4 w-full py-2 px-4 bg-red-600 hover:bg-red-700 rounded"
          >
            Logout
          </button>
        </>
      )}
      {!isAuthenticated && (
        <div className="space-y-2">
          <NavLink to="/login" className="block py-2 px-4 hover:bg-gray-700 rounded">
            Login
          </NavLink>
          <NavLink to="/signup" className="block py-2 px-4 hover:bg-gray-700 rounded">
            Signup
          </NavLink>
        </div>
      )}
    </div>
  );
}

export default Sidebar;