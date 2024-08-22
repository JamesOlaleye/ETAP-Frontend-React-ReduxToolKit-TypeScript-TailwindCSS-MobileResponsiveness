import { Link } from 'react-router-dom';

const LandingPage = () => {
  return (
    <div className='flex flex-col items-center justify-center h-screen bg-gradient-to-r from-blue-600 to-purple-700 text-white'>
      <img
        src='/images/ETAPLogo.png'
        alt='Welcome'
        className='h-58 object-cover rounded-lg mb-6'
      />
      <h1 className='text-4xl font-extrabold mb-2'>
        Welcome to Our Learning Platform!
      </h1>
      <p className='text-lg mb-6 text-center max-w-md'>
        Join our community to effectively manage your subjects and track your
        progress. Let's achieve your academic goals together!
      </p>
      <div className='flex justify-center space-x-4'>
        <Link to='/register'>
          <button className='bg-white text-blue-600 font-semibold py-2 px-6 rounded-lg shadow-md hover:bg-gray-200 transition duration-200'>
            Register
          </button>
        </Link>
        <Link to='/login'>
          <button className='bg-gray-800 text-white font-semibold py-2 px-6 rounded-lg shadow-md hover:bg-gray-700 transition duration-200'>
            Login
          </button>
        </Link>
      </div>
      <div className='mt-8'>
        <p className='text-sm'>
          Already have an account?{' '}
          <Link to='/login' className='underline'>
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LandingPage;
