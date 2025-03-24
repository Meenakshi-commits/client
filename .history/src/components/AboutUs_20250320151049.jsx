import React from 'react';

const AboutUs = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-10">
      <h1 className="text-4xl font-bold text-gray-800 mb-8">About Us</h1>
      <p className="text-gray-600 mb-4">Founded in 2010, Sunshine Hostels has grown into a leading name in hostel management. Our team is dedicated to providing exceptional living experiences for students and professionals alike.</p>
      <h2 className="text-2xl font-semibold text-gray-700 mb-4">Our Founders</h2>
      <ul className="list-disc ml-8 text-gray-600 mb-8">
        <li>John Doe - CEO</li>
        <li>Jane Smith - COO</li>
      </ul>
      <h2 className="text-2xl font-semibold text-gray-700 mb-4">Our Mission</h2>
      <p className="text-gray-600">To provide a seamless hostel experience through innovation and exceptional service.</p>
    </div>
  );
};

export default AboutUs;
