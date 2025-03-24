import React from 'react';

const ContactUs = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-400 to-teal-500 p-10 text-white">
      <h1 className="text-4xl font-bold mb-6">Contact Us</h1>
      <p className="mb-4">Reach out to us at any of our branches for assistance:</p>
      <ul className="list-disc ml-8 mb-8">
        <li>Chennai - +91 12345 67890</li>
        <li>Bangalore - +91 98765 43210</li>
        <li>Mumbai - +91 11111 22222</li>
      </ul>
      <p>For additional support, email us at <a href="mailto:support@hostel.com" className="underline">support@hostel.com</a>.</p>
    </div>
  );
};

export default ContactUs;
