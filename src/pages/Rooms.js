import React, { useState, useEffect } from 'react';
import { getRooms, createRoom, updateRoom, deleteRoom } from '../services/api';
import { useAuth } from '../contexts/AuthContext';

function Rooms() {
  const { user } = useAuth();
  const [rooms, setRooms] = useState([]);
  const [newRoom, setNewRoom] = useState({ roomNumber: '', capacity: '' });

  useEffect(() => {
    fetchRooms();
  }, []);

  const fetchRooms = async () => {
    const response = await getRooms();
    setRooms(response.data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await createRoom(newRoom);
    setNewRoom({ roomNumber: '', capacity: '' });
    fetchRooms();
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Room Management</h1>
      {user?.role === 'admin' && (
        <form onSubmit={handleSubmit} className="mb-6 space-y-4">
          <input
            type="text"
            value={newRoom.roomNumber}
            onChange={(e) => setNewRoom({ ...newRoom, roomNumber: e.target.value })}
            placeholder="Room Number"
            className="border p-2 rounded"
          />
          <input
            type="number"
            value={newRoom.capacity}
            onChange={(e) => setNewRoom({ ...newRoom, capacity: e.target.value })}
            placeholder="Capacity"
            className="border p-2 rounded"
          />
          <button type="submit" className="bg-blue-500 text-white p-2 rounded">
            Add Room
          </button>
        </form>
      )}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {rooms.map((room) => (
          <div key={room._id} className="border p-4 rounded">
            <h3 className="font-bold">Room {room.roomNumber}</h3>
            <p>Capacity: {room.capacity}</p>
            <p>Status: {room.status}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Rooms;