import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const RoomDetails = () => {
  const { id } = useParams();
  const [room, setRoom] = useState(null);
  const [userId, setUserId] = useState('');
  const [users, setUsers] = useState([]);
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
        console.error('Error fetching room details:', error?.response?.data?.message || error.message);
      }
    };

    const fetchUsers = async () => {
      if (role !== 'admin') return; // Only admins can fetch users
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:5000/api/users', {
          headers: { Authorization: `Bearer ${token}` },
        });
        console.log('API Response:', response.data); // Debugging log to check response
        setUsers(response.data);
      } catch (error) {
        console.error('Error fetching users:', error?.response?.data?.message || error.message);
      }
    };

    fetchRoom();
    fetchUsers();
  }, [id, role]);

  const handleAllocateRoom = async () => {
    if (!userId) {
      alert('Please select a user to allocate the room.');
      return;
    }
    try {
      const token = localStorage.getItem('token');
      await axios.post(
        'http://localhost:5000/api/rooms/allocate',
        { userId, roomId: id },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert('Room allocated successfully!');
      navigate(`/${role}/rooms`);
    } catch (error) {
      alert(error?.response?.data?.message || 'Error allocating room');
    }
  };

  if (!room) return <p>Loading room details...</p>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-300 p-8">
      <h1 className="text-3xl font-bold mb-8">Room {room.roomNumber}</h1>
      <p>Type: {room.type}</p>
      <p>Price: ₹{room.price}</p>
      <p>Status: {room.status}</p>
      {room.status === 'occupied' && room.user ? <p>Allocated to: {room.user.name}</p> : <p>Not Allocated</p>}

      {role === 'admin' ? (
        <div className="mt-8">
          <select
            onChange={(e) => setUserId(e.target.value)}
            value={userId}
            className="p-2 border rounded mr-4"
          >
            <option value="">Select User</option>
            {users
              .filter((user) => user.role === 'resident') // Filter only residents
              .map((user) => (
                <option key={user._id} value={user._id}>
                  {user.email}
                </option>
              ))}
          </select>
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
