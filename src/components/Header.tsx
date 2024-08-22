import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../redux/store';
import { logout } from '../features/authSlice';

export default function Header() {
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );
  const userRole = useSelector((state: RootState) => state.user.role); // Use role from user state

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  return (
    <header className='bg-blue-600 text-white py-4'>
      <div className='container mx-auto flex justify-between items-center'>
        <div className='flex items-center'>
          <img
            src='images/ETAPLogo.png'
            alt='ETAP Logo'
            className='h-8 w-auto mr-2'
          />
          <h1 className='text-3xl font-bold'>ETAP</h1>
        </div>

        <nav className='flex space-x-4'>
          {isAuthenticated && userRole === 'admin' && (
            <Link
              to='/users'
              className='text-yellow-300 px-4 hover:bg-yellow-500 hover:text-white transition duration-300 rounded-md'
            >
              Users
            </Link>
          )}
          <Link
            to='/subjects'
            className='text-yellow-300 px-4 hover:bg-yellow-500 hover:text-white transition duration-300 rounded-md'
          >
            Subjects
          </Link>
          <Link
            to='/topics'
            className='text-yellow-300 px-4 hover:bg-yellow-500 hover:text-white transition duration-300 rounded-md'
          >
            Topics
          </Link>
          <Link
            to='/progress'
            className='text-yellow-300 px-4 hover:bg-yellow-500 hover:text-white transition duration-300 rounded-md'
          >
            Progress
          </Link>
          {isAuthenticated && (
            <button
              onClick={handleLogout}
              className='bg-red-600 text-white px-4 py-2 hover:bg-red-700 transition duration-300 rounded-md'
            >
              Logout
            </button>
          )}
        </nav>
      </div>
    </header>
  );
}
