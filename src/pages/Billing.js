import React, { useState, useEffect } from 'react';
import { getBills, processPayment } from '../services/api';

function Billing() {
  const [bills, setBills] = useState([]);

  useEffect(() => {
    fetchBills();
  }, []);

  const fetchBills = async () => {
    const response = await getBills();
    setBills(response.data);
  };

  const handlePayment = async (bill) => {
    const options = {
      key: process.env.REACT_APP_RAZORPAY_KEY,
      amount: bill.amount * 100, // Convert to paise
      currency: 'INR',
      name: 'Hostel Management',
      description: `Bill payment for ${bill.description}`,
      handler: async (response) => {
        await processPayment(bill._id, {
          paymentId: response.razorpay_payment_id,
          status: 'success'
        });
        fetchBills();
      },
      prefill: {
        email: bill.user.email,
        contact: bill.user.phone,
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Billing</h1>
      <div className="space-y-4">
        {bills.map((bill) => (
          <div key={bill._id} className="border p-4 rounded flex justify-between items-center">
            <div>
              <p className="font-bold">{bill.description}</p>
              <p>Amount: ₹{bill.amount}</p>
              <p>Status: {bill.status}</p>
            </div>
            {bill.status === 'pending' && (
              <button
                onClick={() => handlePayment(bill)}
                className="bg-green-500 text-white p-2 rounded"
              >
                Pay Now
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Billing;