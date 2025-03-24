// src/components/Auth/Signup.jsx
import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { signup } from '../../api/apiService';

const Signup = () => {
  const navigate = useNavigate();

  const initialValues = {
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    role: 'resident',
  };

  const validationSchema = Yup.object({
    name: Yup.string().required('Name is required'),
    email: Yup.string().email('Invalid email format').required('Email is required'),
    password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Passwords must match')
      .required('Confirm Password is required'),
    phone: Yup.string().matches(/^[0-9]{10}$/, 'Phone number must be 10 digits').required('Phone number is required'),
    role: Yup.string().oneOf(['admin', 'resident'], 'Invalid role').required('Role is required'),
  });

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      await signup(values);
      alert('Signup successful! Please login.');
      navigate('/login');
    } catch (error) {
      alert(error.response?.data?.message || 'Signup failed');
    }
    setSubmitting(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4">Sign Up</h2>
        <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
          {({ isSubmitting }) => (
            <Form>
              <div className="mb-4">
                <label className="block text-gray-700">Name</label>
                <Field type="text" name="name" className="w-full p-2 border rounded" />
                <ErrorMessage name="name" component="div" className="text-red-500 text-sm" />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Email</label>
                <Field type="email" name="email" className="w-full p-2 border rounded" />
                <ErrorMessage name="email" component="div" className="text-red-500 text-sm" />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Password</label>
                <Field type="password" name="password" className="w-full p-2 border rounded" />
                <ErrorMessage name="password" component="div" className="text-red-500 text-sm" />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Confirm Password</label>
                <Field type="password" name="confirmPassword" className="w-full p-2 border rounded" />
                <ErrorMessage name="confirmPassword" component="div" className="text-red-500 text-sm" />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Phone</label>
                <Field type="text" name="phone" className="w-full p-2 border rounded" />
                <ErrorMessage name="phone" component="div" className="text-red-500 text-sm" />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Role</label>
                <div className="flex space-x-4">
                  <label>
                    <Field type="radio" name="role" value="admin" /> Admin
                  </label>
                  <label>
                    <Field type="radio" name="role" value="resident" /> Resident
                  </label>
                </div>
                <ErrorMessage name="role" component="div" className="text-red-500 text-sm" />
              </div>
              <button type="submit" disabled={isSubmitting} className="w-full bg-blue-500 text-white p-2 rounded">
                {isSubmitting ? 'Signing up...' : 'Sign Up'}
              </button>
            </Form>
          )}
        </Formik>
        <p className="mt-4 text-center">
          Already have an account? <button onClick={() => navigate('/login')} className="text-blue-500">Login</button>
        </p>
      </div>
    </div>
  );
};

export default Signup;
