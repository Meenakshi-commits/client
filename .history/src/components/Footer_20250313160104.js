import React from 'react';
import { EnvelopeIcon, PhoneIcon } from '@heroicons/react/24/outline';

function Footer() {
  return (
    <footer className="bg-gray-800 text-white p-4">
      <div className="flex justify-between items-center max-w-7xl mx-auto">
        <div>&copy; 2025 Hostel Management System</div>
        <div className="flex space-x-4">
          <EnvelopeIcon className="h-6 w-6" />
          <PhoneIcon className="h-6 w-6" />
        </div>
      </div>
    </footer>
  );
}

export default Footer;