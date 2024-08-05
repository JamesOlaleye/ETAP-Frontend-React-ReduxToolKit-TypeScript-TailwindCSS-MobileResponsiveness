import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { register } from '../service/apiService';

export default function Register() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [adminKey, setAdminKey] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const userData = {
      firstName,
      lastName,
      email,
      password,
      adminKey: adminKey || undefined,
    };

    try {
      await register(userData);
      setSuccess(true);
      toast.success('Registration successful!');
      navigate('/login');
    } catch (err) {
      setError('Registration failed');
      toast.error('Registration failed. Please try again.');
    }
  };

  return (
    <div className='min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-400 to-blue-600 py-10'>
      <div className='bg-white shadow-lg rounded-lg p-8 max-w-md w-full'>
        <ToastContainer />
        <h2 className='text-3xl font-semibold text-center text-gray-700 mb-6'>
          Create an Account
        </h2>
        {success ? (
          <p className='text-green-500 text-center'>Registration successful!</p>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className='mb-4'>
              <label className='block text-gray-700'>First Name</label>
              <input
                type='text'
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className='mt-1 block w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-200'
                required
              />
            </div>
            <div className='mb-4'>
              <label className='block text-gray-700'>Last Name</label>
              <input
                type='text'
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className='mt-1 block w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-200'
                required
              />
            </div>
            <div className='mb-4'>
              <label className='block text-gray-700'>Email</label>
              <input
                type='email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className='mt-1 block w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-200'
                required
              />
            </div>
            <div className='mb-4'>
              <label className='block text-gray-700'>Password</label>
              <input
                type='password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className='mt-1 block w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-200'
                required
              />
            </div>
            <div className='mb-4'>
              <label className='block text-gray-700'>
                Admin Key (Optional)
              </label>
              <input
                type='text'
                value={adminKey}
                onChange={(e) => setAdminKey(e.target.value)}
                className='mt-1 block w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-200'
              />
            </div>
            {error && <p className='text-red-500'>{error}</p>}
            <button
              type='submit'
              className='w-full bg-blue-600 text-white py-3 rounded hover:bg-blue-700 transition duration-200'
            >
              Register
            </button>
          </form>
        )}
        <p className='mt-4 text-center text-gray-600'>
          If you already have an account,{' '}
          <Link to='/login' className='text-blue-500 hover:underline'>
            login here
          </Link>
          .
        </p>
      </div>
    </div>
  );
}
