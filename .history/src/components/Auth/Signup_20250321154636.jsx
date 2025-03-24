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
      const response = await signup(values);
      const { token, role, name } = response.data;
      localStorage.setItem('token', token);
      localStorage.setItem('role', role);
      localStorage.setItem('name', name);
      alert('Signup successful! Redirecting to dashboard.');
      navigate('/dashboard');
    } catch (error) {
      alert(error.response?.data?.message || 'Signup failed');
    }
    setSubmitting(false);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-600 to-purple-700 text-white">
      <header className="w-full flex justify-between p-6">
       
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md transform transition-transform hover:scale-105 text-gray-800">
        <h2 className="text-3xl font-bold text-center mb-6">Create an Account</h2>
        <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
          {({ isSubmitting }) => (
            <Form>
              <div className="mb-4">
                <label className="block">Name</label>
                <Field type="text" name="name" className="w-full p-2 border rounded-lg" />
                <ErrorMessage name="name" component="div" className="text-red-500 text-sm" />
              </div>
              <div className="mb-4">
                <label className="block">Email</label>
                <Field type="email" name="email" className="w-full p-2 border rounded-lg" />
                <ErrorMessage name="email" component="div" className="text-red-500 text-sm" />
              </div>
              <div className="mb-4">
                <label className="block">Password</label>
                <Field type="password" name="password" className="w-full p-2 border rounded-lg" />
                <ErrorMessage name="password" component="div" className="text-red-500 text-sm" />
              </div>
              <div className="mb-4">
                <label className="block">Confirm Password</label>
                <Field type="password" name="confirmPassword" className="w-full p-2 border rounded-lg" />
                <ErrorMessage name="confirmPassword" component="div" className="text-red-500 text-sm" />
              </div>
              <div className="mb-4">
                <label className="block">Phone</label>
                <Field type="text" name="phone" className="w-full p-2 border rounded-lg" />
                <ErrorMessage name="phone" component="div" className="text-red-500 text-sm" />
              </div>
              <div className="mb-4">
                <label className="block">Role</label>
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
              <button type="submit" disabled={isSubmitting} className="w-full bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600">
                {isSubmitting ? 'Signing up...' : 'Sign Up'}
              </button>
            </Form>
          )}
        </Formik>
        <p className="mt-6 text-center">
          Already have an account? <button onClick={() => navigate('/login')} className="text-blue-500">Login</button>
        </p>
      </div>
    </div>
  );
};

export default Signup;
