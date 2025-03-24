// src/components/Auth/ForgotPassword.jsx
import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { forgotPassword } from '../../api/apiService';

const ForgotPassword = () => {
  const navigate = useNavigate();

  const initialValues = {
    email: '',
  };

  const validationSchema = Yup.object({
    email: Yup.string().email('Invalid email format').required('Email is required'),
  });

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      await forgotPassword(values);
      alert('Password reset link sent to your email. Please check your inbox.');
      navigate('/login');
    } catch (error) {
      alert(error.response?.data?.message || 'Failed to send reset link');
    }
    setSubmitting(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4">Forgot Password</h2>
        <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
          {({ isSubmitting }) => (
            <Form>
              <div className="mb-4">
                <label className="block text-gray-700">Email</label>
                <Field type="email" name="email" className="w-full p-2 border rounded" />
                <ErrorMessage name="email" component="div" className="text-red-500 text-sm" />
              </div>
              <button type="submit" disabled={isSubmitting} className="w-full bg-blue-500 text-white p-2 rounded">
                {isSubmitting ? 'Sending...' : 'Send Reset Link'}
              </button>
            </Form>
          )}
        </Formik>
        <p className="mt-4 text-center">
          Remembered your password? <button onClick={() => navigate('/login')} className="text-blue-500">Login</button>
        </p>
      </div>
    </div>
  );
};

export default ForgotPassword;
