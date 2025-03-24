import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const RoomList = () => {
  const [rooms, setRooms] = useState([]);
  const navigate = useNavigate();
  const role = localStorage.getItem('role');

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:5000/api/rooms', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setRooms(response.data);
      } catch (error) {
        console.error('Error fetching rooms:', error);
      }
    };
    fetchRooms();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-300 p-8">
      <h1 className="text-3xl font-bold mb-8">Room Management</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {rooms.map((room) => (
          <div key={room._id} className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold">Room {room.roomNumber}</h2>
            <p>Type: {room.type}</p>
            <p>Price: ${room.price}</p>
            <p>Status: {room.status}</p>
            {room.status === 'occupied' && room.resident && <p>Allocated to: {room.resident.name}</p>}
            <button
              className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              onClick={() => navigate(`/${role === 'admin' ? 'admin' : 'resident'}/rooms/${room._id}`)}
            >
              {role === 'admin' ? 'Manage Room' : 'View Room'}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RoomList;
