import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getUser, promoteUser } from '../service/apiService';
import BackToHome from '../components/BackToHome';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useAuth } from '../context/useAuth';
import { User as UserType } from '../types';
import { ClipLoader } from 'react-spinners';
import { PlusIcon } from '@heroicons/react/24/solid';

export default function UserDetail() {
  const { id } = useParams<{ id: string }>();
  const { user: currentUser, isAuthenticated } = useAuth(); // Place useAuth here

  console.log('Current User:', currentUser); // Log current user
  console.log('Current User Role:', currentUser?.role); // Log the role
  console.log('Is Authenticated:', isAuthenticated); // Log authentication status

  const [user, setUser] = useState<UserType | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [promoting, setPromoting] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        if (id) {
          const response = await getUser(id);
          console.log('Fetched User:', response.data.data); // Log fetched user
          setUser(response.data.data);
        }
      } catch (error) {
        console.error('Error fetching user:', error);
        setError('Error fetching user');
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [id]);

  const handlePromote = async () => {
    setPromoting(true);
    try {
      if (id) {
        await promoteUser(id);
        const updatedUser = await getUser(id);
        setUser(updatedUser.data.data);
      }
    } catch (error) {
      console.error('Error promoting user:', error);
      setError('Error promoting user');
    } finally {
      setPromoting(false);
    }
  };

  return (
    <div className='min-h-screen bg-gray-50 flex flex-col'>
      <Header />

      <main className='container mx-auto py-10 px-6 flex-grow'>
        <h2 className='text-4xl font-bold mb-6 text-center text-black'>
          User Details
        </h2>

        {loading && (
          <div className='flex justify-center'>
            <ClipLoader />
          </div>
        )}
        {error && <p className='text-red-500 text-center'>{error}</p>}
        {!loading && !error && user && (
          <div className='bg-white shadow-md rounded-lg p-8 border border-gray-200'>
            <div className='mb-6'>
              <p className='text-lg text-black mb-2'>
                <strong className='text-red-600'>First Name:</strong>{' '}
                {user.firstName}
              </p>
              <p className='text-lg text-black mb-2'>
                <strong className='text-red-600'>Last Name:</strong>{' '}
                {user.lastName}
              </p>
              <p className='text-lg text-black mb-2'>
                <strong className='text-red-600'>Email:</strong> {user.email}
              </p>
              <p className='text-lg text-black mb-2'>
                <strong className='text-red-600'>Role:</strong> {user.role}
              </p>
            </div>

            {/* Conditionally render the Promote User button for STUDENT role */}
            {isAuthenticated && user.role === 'STUDENT' && (
              <button
                onClick={handlePromote}
                disabled={promoting}
                className={`mt-4 py-3 px-6 rounded-lg 
                        ${
                          promoting
                            ? 'bg-gray-400'
                            : 'bg-black hover:bg-gray-800'
                        } 
                        text-white font-semibold transition duration-300 ease-in-out flex items-center`}
              >
                {!promoting && <PlusIcon className='h-5 w-5 mr-2' />}
                {promoting ? 'Promoting...' : 'Promote to Teacher'}
              </button>
            )}
          </div>
        )}
      </main>

      <BackToHome />
      <Footer />
    </div>
  );
}
