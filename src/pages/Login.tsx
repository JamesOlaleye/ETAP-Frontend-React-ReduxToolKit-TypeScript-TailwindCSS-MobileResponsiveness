import { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { login } from '../service/apiService';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const loginData = {
      email,
      password,
    };

    try {
      const response = await login(loginData);
      console.log('Login response:', response.data);
      localStorage.setItem('authToken', response.data.token);
      setSuccess(true);
      toast.success('Login successful!');
      navigate('/');
    } catch (err) {
      console.error(err);
      setError('Login failed');
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
        {success ? (
          <p className='text-green-500 text-center'>Login successful!</p>
        ) : (
          <form onSubmit={handleSubmit}>
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
            {error && <p className='text-red-500'>{error}</p>}
            <button
              type='submit'
              className='w-full bg-blue-600 text-white py-3 rounded hover:bg-blue-700 transition duration-200'
            >
              Login
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
