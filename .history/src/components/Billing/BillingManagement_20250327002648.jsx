import React, { useEffect, useState } from 'react';
import { getBillingDetails } from '../../api/billingService';
import { useNavigate } from 'react-router-dom';

const BillingManagement = () => {
  const [bills, setBills] = useState([]);
  const role = localStorage.getItem('role');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBillingDetails = async () => {
      try {
        const data = await getBillingDetails();
        setBills(data);
      } catch (error) {
        console.error('Error fetching billing details:', error);
      }
    };

    fetchBillingDetails();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-300 p-8">
      <h1 className="text-3xl font-bold mb-8">Billing Management</h1>
      {role === 'admin' && (
        <button
          onClick={() => navigate('/admin/billing/create')}
          className="mb-4 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        >
          Create Bill
        </button>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {bills.map((bill) => (
          <div key={bill._id} className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold">Bill ID: {bill._id}</h2>
            <p>Amount: ₹{bill.amount}</p>
            <p>Status: {bill.status}</p>
            {role === 'admin' && (
              <button
                className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                onClick={() => navigate(`/admin/billing/${bill._id}`)}
              >
                Manage Bill
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default BillingManagement;
