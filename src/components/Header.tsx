import { Link } from 'react-router-dom';

export default function Header() {
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
          <Link
            to='/users'
            className='text-yellow-300 px-4 hover:bg-yellow-500 hover:text-white transition duration-300 rounded-md'
          >
            Users
          </Link>
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
        </nav>
      </div>
    </header>
  );
}
