import { useLocation, Link } from 'react-router-dom';

export default function BackToHome() {
  const location = useLocation();

  // Check if the current path is not the home page
  if (location.pathname === '/') {
    return null;
  }

  return (
    <div className='text-center py-4'>
      <Link to='/home' className='text-blue-600 hover:underline'>
        &larr; Back to Home
      </Link>
    </div>
  );
}
