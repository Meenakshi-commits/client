import React from 'react';
import { useNavigate } from 'react-router-dom';

const ReportsDashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-300 p-8">
      <h1 className="text-3xl font-bold mb-8">Reports Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <button
          onClick={() => navigate('/admin/reports/users')}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          User Reports
        </button>
        <button
          onClick={() => navigate('/admin/reports/rooms')}
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        >
          Room Reports
        </button>
        <button
          onClick={() => navigate('/admin/reports/billing')}
          className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600"
        >
          Billing Reports
        </button>
        <button
          onClick={() => navigate('/admin/reports/maintenance')}
          className="bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600"
        >
          Maintenance Reports
        </button>
      </div>
    </div>
  );
};

export default ReportsDashboard;
