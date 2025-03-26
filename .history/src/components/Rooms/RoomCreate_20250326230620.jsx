import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const RoomCreate = () => {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      roomNumber: '',
      type: 'single',
      price: '',
    },
    validationSchema: Yup.object({
      roomNumber: Yup.string().required('Room number is required'),
      type: Yup.string().oneOf(['single', 'double', 'triple'], 'Invalid room type').required('Room type is required'),
      price: Yup.number().positive('Price must be positive').required('Price is required'),
    }),
    onSubmit: async (values, { setSubmitting }) => {
      try {
        const token = localStorage.getItem('token');
        await axios.post('http://localhost:5000/api/rooms', values, {
          headers: { Authorization: `Bearer ${token}` },
        });
        alert('Room created successfully!');
        navigate('/admin/rooms');
      } catch (error) {
        console.error('Error creating room:', error);
        alert(error?.response?.data?.message || 'Failed to create room');
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6">Create Room</h1>
        <form onSubmit={formik.handleSubmit}>
          <label className="block mb-2">Room Number</label>
          <input
            type="text"
            name="roomNumber"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.roomNumber}
            className="w-full p-2 border rounded mb-4"
          />
          {formik.touched.roomNumber && formik.errors.roomNumber && <p className="text-red-500">{formik.errors.roomNumber}</p>}

          <label className="block mb-2">Room Type</label>
          <select
            name="type"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.type}
            className="w-full p-2 border rounded mb-4"
          >
            <option value="single">Single</option>
            <option value="double">Double</option>
            <option value="triple">Triple</option>
          </select>

          <label className="block mb-2">Price</label>
          <input
            type="number"
            name="price"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.price}
            className="w-full p-2 border rounded mb-4"
          />
          {formik.touched.price && formik.errors.price && <p className="text-red-500">{formik.errors.price}</p>}

          <button
            type="submit"
            disabled={formik.isSubmitting}
            className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
          >
            {formik.isSubmitting ? 'Creating...' : 'Create Room'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default RoomCreate;
