import React, { useEffect, useState } from 'react';
import { getMaintenanceRequests } from '../../api/maintenanceService';
import { useNavigate } from 'react-router-dom';

const MaintenanceManagement = () => {
  const [requests, setRequests] = useState([]);
  const role = localStorage.getItem('role');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMaintenanceRequests = async () => {
      try {
        const data = await getMaintenanceRequests();
        setRequests(data);
      } catch (error) {
        console.error('Error fetching maintenance requests:', error);
      }
    };

    fetchMaintenanceRequests();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-300 p-8">
      <h1 className="text-3xl font-bold mb-8">Maintenance Management</h1>
      {role === 'resident' && (
        <button
          onClick={() => navigate('/resident/maintenance/create')}
          className="mb-4 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        >
          Create Maintenance Request
        </button>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {requests.map((request) => (
          <div key={request._id} className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold">Request ID: {request._id}</h2>
            <p>Description: {request.description}</p>
            <p>Status: {request.status}</p>
            {role === 'admin' && (
              <button
                className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                onClick={() => navigate(`/admin/maintenance/${request._id}`)}
              >
                Update Status
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MaintenanceManagement;
