import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../features/authSlice';
import { Link, useNavigate } from 'react-router-dom';
import { RootState, AppDispatch } from '../redux/store';
import { LoginData } from '../types';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {
  const [formData, setFormData] = useState<LoginData>({
    email: '',
    password: '',
  });

  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();
  const loading = useSelector((state: RootState) => state.auth.loading);
  const error = useSelector((state: RootState) => state.auth.error);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await dispatch(loginUser(formData)).unwrap();
      toast.success('Login successful!');
      navigate('/home');
    } catch (err) {
      toast.error('Login failed. Please check your credentials.');
    }
  };

  return (
    <div className='min-h-screen flex items-center justify-center bg-gradient-to-r from-green-400 to-blue-500 py-10'>
      <div className='bg-white shadow-lg rounded-lg p-8 max-w-md w-full'>
        <ToastContainer />
        <h2 className='text-3xl font-semibold text-center text-gray-700 mb-6'>
          Login to Your Account
        </h2>
        <form onSubmit={handleSubmit}>
          <div className='mb-4'>
            <label className='block text-gray-700'>Email</label>
            <input
              type='email'
              name='email'
              value={formData.email}
              onChange={handleChange}
              className='mt-1 block w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-200'
              required
            />
          </div>
          <div className='mb-4'>
            <label className='block text-gray-700'>Password</label>
            <input
              type='password'
              name='password'
              value={formData.password}
              onChange={handleChange}
              className='mt-1 block w-full p-3 border border-gray-300 rounded-lg'
              required
            />
          </div>
          {error && <p className='text-red-500 text-center mb-4'>{error}</p>}
          <button
            type='submit'
            className='w-full py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition duration-300'
            disabled={loading}
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
          <p className='text-center text-gray-600 mt-4'>
            Don't have an account?{' '}
            <Link to='/register' className='text-blue-500 hover:underline'>
              Register
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
