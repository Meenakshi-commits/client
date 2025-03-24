// src/components/Auth/Login.jsx
import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { login } from '../../api/apiService';

const Login = () => {
  const navigate = useNavigate();

  const initialValues = {
    email: '',
    password: '',
  };

  const validationSchema = Yup.object({
    email: Yup.string().email('Invalid email format').required('Email is required'),
    password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
  });

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const response = await login(values);
      alert('Login Successful!');
      localStorage.setItem('token', response.token); // Assuming response has a token
      navigate('/');
    } catch (error) {
      alert(error.response?.data?.message || 'Login failed');
    }
    setSubmitting(false);
  };

  return (
    <div className="bg-gradient-to-br from-blue-400 to-purple-700 text-white min-h-screen flex items-center justify-center">
      <div className="bg-white text-gray-800 p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4">Login</h2>
        <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
          {({ isSubmitting }) => (
            <Form>
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
              <button type="submit" disabled={isSubmitting} className="w-full bg-blue-500 text-white p-2 rounded">
                {isSubmitting ? 'Logging in...' : 'Login'}
              </button>
            </Form>
          )}
        </Formik>
        <p className="mt-4 text-center">
          Don't have an account? <button onClick={() => navigate('/signup')} className="text-blue-500">Sign Up</button>
        </p>
        <p className="mt-2 text-center">
          Forgot your password? <button onClick={() => navigate('/forgot-password')} className="text-blue-500">Reset Password</button>
        </p>
      </div>
    </div>
  );
};

export default Login;
