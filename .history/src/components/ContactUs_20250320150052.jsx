// src/components/ContactUs.jsx
import React from 'react';

const ContactUs = () => {
  return (
    <div className="p-8">
      <h1 className="text-4xl font-bold mb-4">Contact Us</h1>
      <p className="text-gray-600">
        Have questions or feedback? Reach out to us at 
        <a href="mailto:support@hostel.com" className="text-blue-500"> support@hostel.com</a>.
      </p>
    </div>
  );
};

export default ContactUs;
