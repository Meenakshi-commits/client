import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getRoomDetails } from '../../api/apiService';
import axios from 'axios';

const RoomDetails = () => {
  const { id } = useParams();
  const [roomData, setRoomData] = useState(null);
  const [userId, setUserId] = useState('');
  const [users, setUsers] = useState([]);
  const role = localStorage.getItem('role');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRoomDetails = async () => {
      try {
        const data = await getRoomDetails(id);
        setRoomData(data);
      } catch (error) {
        console.error('Error fetching room details:', error);
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

    fetchRoomDetails();
    fetchUsers();
  }, [id, role]);

  const handleAllocateRoom = async () => {
    if (!userId) {
      alert('Please select a user to allocate the room.');
      return;
    }

    const selectedUser = users.find((user) => user._id === userId);
    if (!selectedUser) {
      alert('Selected user not found.');
      return;
    }

    try {
      const token = localStorage.getItem('token');
      await axios.post(
        'http://localhost:5000/api/rooms/allocate',
        {
          userId,
          roomId: id,
          name: selectedUser.name, // Include the user's name
          phone: selectedUser.phone, // Include the user's phone
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      alert('Room allocated successfully!');
      navigate(`/${role}/rooms`);
    } catch (error) {
      alert(error?.response?.data?.message || 'Error allocating room');
    }
  };

  if (!roomData) return <p>Loading room details...</p>;

  const { room, resident } = roomData;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-300 p-8">
      <h1 className="text-3xl font-bold mb-8">Room Details</h1>
      <p>Room Number: {room.roomNumber}</p>
      <p>Type: {room.type}</p>
      <p>Status: {room.status}</p>
      <p>Price: ₹{room.price}</p>
      {resident ? (
        <>
          <h2 className="text-2xl font-semibold mt-6">Resident Details</h2>
          <p>Name: {resident.name}</p>
          <p>Email: {resident.email}</p>
          <p>Phone: {resident.phone}</p>
          <p>Check-in Date: {new Date(resident.checkInDate).toLocaleDateString()}</p>
        </>
      ) : (
        <p>No resident details available.</p>
      )}

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
