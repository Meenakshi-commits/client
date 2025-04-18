import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const RoomDetails = () => {
  const { id } = useParams();
  const [room, setRoom] = useState(null);
  const [userId, setUserId] = useState('');
  const role = localStorage.getItem('role');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRoom = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`http://localhost:5000/api/rooms/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setRoom(response.data);
      } catch (error) {
        console.error('Error fetching room details:', error);
      }
    };
    fetchRoom();
  }, [id]);

  const handleAllocateRoom = async () => {
    try {
      const token = localStorage.getItem('token');
      await axios.post('http://localhost:5000/api/rooms/allocate', { userId, roomId: id }, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert('Room allocated successfully!');
      navigate('/rooms');
    } catch (error) {
      alert('Error allocating room');
    }
  };

  if (!room) return <p>Loading room details...</p>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-300 p-8">
      <h1 className="text-3xl font-bold mb-8">Room {room.roomNumber}</h1>
      <p>Type: {room.type}</p>
      <p>Price: ${room.price}</p>
      <p>Status: {room.status}</p>
      {room.status === 'occupied' && room.resident && <p>Allocated to: {room.resident.name}</p>}

      {role === 'admin' ? (
        <div className="mt-8">
          <input
            type="text"
            placeholder="Enter User ID"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            className="p-2 border rounded mr-4"
          />
          <button
            onClick={handleAllocateRoom}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Allocate Room
          </button>
        </div>
      ) : room.status === 'occupied' ? (
        <div className="mt-8">
          <button
            onClick={() => navigate('/maintenance')}
            className="bg-yellow-500 text-white px-4 py-2 rounded mr-4 hover:bg-yellow-600"
          >
            Maintenance
          </button>
          <button
            onClick={() => navigate('/billing')}
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
          >
            Billing
          </button>
        </div>
      ) : null}
    </div>
  );
};

export default RoomDetails;
