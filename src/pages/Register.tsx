//Register.tsx
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../redux/store'; // Ensure AppDispatch is exported from your store
import { registerUser } from '../features/authSlice';
import { Link, useNavigate } from 'react-router-dom';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Register = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    adminKey: '',
  });
  const dispatch: AppDispatch = useDispatch(); // Use AppDispatch here
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
      await dispatch(registerUser(formData)).unwrap();
      toast.success('Registration successful!');
      navigate('/login');
    } catch (err) {
      // toast.error('Registration failed. Please try again.');
      toast.error(error || 'Registration failed. Please try again.');
    }
  };

  return (
    <div className='min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-400 to-blue-600 py-10'>
      <div className='bg-white shadow-lg rounded-lg p-8 max-w-md w-full'>
        <ToastContainer />
        <h2 className='text-3xl font-semibold text-center text-gray-700 mb-6'>
          Create an Account
        </h2>
        <form onSubmit={handleSubmit}>
          <div className='mb-4'>
            <label className='block text-gray-700'>First Name</label>
            <input
              type='text'
              name='firstName'
              value={formData.firstName}
              onChange={handleChange}
              className='mt-1 block w-full p-3 border border-gray-300 rounded-lg'
              required
            />
          </div>
          <div className='mb-4'>
            <label className='block text-gray-700'>Last Name</label>
            <input
              type='text'
              name='lastName'
              value={formData.lastName}
              onChange={handleChange}
              className='mt-1 block w-full p-3 border border-gray-300 rounded-lg'
              required
            />
          </div>
          <div className='mb-4'>
            <label className='block text-gray-700'>Email</label>
            <input
              type='email'
              name='email'
              value={formData.email}
              onChange={handleChange}
              className='mt-1 block w-full p-3 border border-gray-300 rounded-lg'
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
          <div className='mb-4'>
            <label className='block text-gray-700'>Admin Key (optional)</label>
            <input
              type='text'
              name='adminKey'
              value={formData.adminKey}
              onChange={handleChange}
              className='mt-1 block w-full p-3 border border-gray-300 rounded-lg'
            />
          </div>
          <button
            type='submit'
            className='w-full py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition duration-300'
            disabled={loading}
          >
            {loading ? 'Registering...' : 'Register'}
          </button>
          <p className='text-center text-gray-600 mt-4'>
            Already have an account?{' '}
            <Link to='/login' className='text-blue-500 hover:underline'>
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;
