import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'; // Import Link for navigation
import BackToHome from '../components/BackToHome';
import Footer from '../components/Footer';
import Header from '../components/Header';
import { getAllUsers } from '../service/apiService';
import { User as UserType } from '../types';
import { ClipLoader } from 'react-spinners';

export default function User() {
  const [users, setUsers] = useState<UserType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await getAllUsers();
        // Extract users from the nested data property
        if (Array.isArray(response.data.data)) {
          setUsers(response.data.data);
        } else {
          console.error('Expected array but received:', response.data.data);
          setError('Unexpected data format');
        }
      } catch (error) {
        console.error('Error fetching users:', error);
        setError('Error fetching users');
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div className='min-h-screen bg-gray-100 flex flex-col'>
      <Header />

      <main className='container mx-auto py-10 px-6 flex-grow'>
        <div className='text-center'>
          <h2 className='text-3xl font-bold mb-4 text-red-700'>Manage Users</h2>
          <p className='text-lg text-gray-700'>
            Here you can view, edit, and delete users.
          </p>
        </div>

        {loading && <ClipLoader />}
        {error && <p className='text-red-500'>{error}</p>}
        {!loading && !error && (
          <div className='max-w-3xl mx-auto'>
            <ul className='space-y-4'>
              {users.map((user) => (
                <li
                  key={user.id}
                  className='border-b py-4 bg-white shadow-md rounded-lg flex justify-center items-center'
                >
                  <Link
                    to={`/users/${user.id}`}
                    className='p-4 text-blue-500 hover:underline flex justify-center items-center'
                  >
                    <span className='text-indigo-600 font-bold'>
                      {user.firstName}
                    </span>
                    <span className='text-purple-600 font-semibold ml-1'>
                      {user.lastName}
                    </span>
                    <span className='text-blue-500 ml-2'>{user.email}</span>
                    <span className='text-teal-500 ml-2'>({user.role})</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </main>

      <BackToHome />
      <Footer />
    </div>
  );
}
