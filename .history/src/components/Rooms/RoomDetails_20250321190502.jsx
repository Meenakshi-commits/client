import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getRoomDetails } from '../../api/apiService';

const RoomDetails = () => {
  const { id } = useParams();
  const [room, setRoom] = useState(null);

  useEffect(() => {
    const fetchRoomDetails = async () => {
      try {
        const response = await getRoomDetails(id);
        setRoom(response.data);
      } catch (error) {
        console.error('Error fetching room details:', error);
      }
    };

    fetchRoomDetails();
  }, [id]);

  if (!room) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-4">{room.name}</h2>
      <p>{room.description}</p>
      {/* Add more room details as needed */}
    </div>
  );
};

export default RoomDetails;
