import React from 'react';
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-gradient-to-br from-gray-800 to-gray-900 min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-white mb-8">Welcome to Admin Dashboard</h1>
        <div className="space-y-4">
          <button onClick={() => navigate('/rooms')} className="bg-blue-500 text-white px-6 py-3 rounded-lg shadow-lg hover:bg-blue-600">Manage Rooms</button>
          <button onClick={() => navigate('/billing')} className="bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg hover:bg-green-600">Billing Management</button>
          <button onClick={() => navigate('/notifications')} className="bg-purple-500 text-white px-6 py-3 rounded-lg shadow-lg hover:bg-purple-600">View Notifications</button>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
