import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const ResidentDashboard = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem('token') || localStorage.getItem('role') !== 'resident') {
      navigate('/login');
    }
  }, [navigate]);

  const handleRoomsNavigation = () => {
    navigate('/resident/rooms');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 to-indigo-700 flex items-center justify-center">
      <div className="text-white text-center space-y-6">
        <h1 className="text-4xl font-bold">Welcome Resident</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <button onClick={handleRoomsNavigation} className="bg-blue-400 hover:bg-blue-500 text-white px-6 py-3 rounded-lg shadow-lg">View Room Details</button>
          <button onClick={() => navigate('/billing')} className="bg-green-400 hover:bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg">View Billing</button>
        </div>
      </div>
    </div>
  );
};

export default ResidentDashboard;
