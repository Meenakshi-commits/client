// src/components/Auth/ResetPassword.jsx
import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useNavigate, useParams } from 'react-router-dom';
import { resetPassword } from '../../api/apiService';

const ResetPassword = () => {
  const { token } = useParams();
  const navigate = useNavigate();

  const initialValues = {
    password: '',
    confirmPassword: '',
  };

  const validationSchema = Yup.object({
    password: Yup.string()
      .min(6, 'Password must be at least 6 characters')
      .required('Password is required'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Passwords must match')
      .required('Confirm Password is required'),
  });

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      await resetPassword(token, values.password);
      alert('Password reset successful! Please login.');
      navigate('/login');
    } catch (error) {
      alert(error.response?.data?.message || 'Password reset failed');
    }
    setSubmitting(false);
  };

  return (
    <div className="bg-gradient-to-br from-blue-600 to-purple-600 text-white min-h-screen flex items-center justify-center">
      <div className="bg-white text-gray-800 p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4">Reset Password</h2>
        <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
          {({ isSubmitting }) => (
            <Form>
              <div className="mb-4">
                <label className="block text-gray-700">New Password</label>
                <Field type="password" name="password" className="w-full p-2 border rounded" />
                <ErrorMessage name="password" component="div" className="text-red-500 text-sm" />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Confirm Password</label>
                <Field type="password" name="confirmPassword" className="w-full p-2 border rounded" />
                <ErrorMessage name="confirmPassword" component="div" className="text-red-500 text-sm" />
              </div>
              <button type="submit" disabled={isSubmitting} className="w-full bg-blue-500 text-white p-2 rounded">
                {isSubmitting ? 'Resetting Password...' : 'Reset Password'}
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default ResetPassword;
