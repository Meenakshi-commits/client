import React from 'react';
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center">
      <div className="text-white text-center space-y-6">
        <h1 className="text-4xl font-bold">Welcome Admin</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <button onClick={() => navigate('/rooms')} className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg shadow-lg">Manage Rooms</button>
          <button onClick={() => navigate('/billing')} className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg shadow-lg">Manage Billing</button>
          <button onClick={() => navigate('/notifications')} className="bg-yellow-500 hover:bg-yellow-600 text-white px-6 py-3 rounded-lg shadow-lg">View Notifications</button>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
