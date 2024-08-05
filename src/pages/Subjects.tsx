import { useEffect, useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import BackToHome from '../components/BackToHome';
import { getAllSubjects } from '../service/apiService';
import { Subject as SubjectType } from '../types';
import { ClipLoader } from 'react-spinners';

export default function Subjects() {
  const [subjects, setSubjects] = useState<SubjectType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSubjects = async () => {
      try {
        const response = await getAllSubjects();
        if (Array.isArray(response.data)) {
          setSubjects(response.data);
        } else if (response.data && Array.isArray(response.data.data)) {
          setSubjects(response.data.data);
        } else {
          console.error('Expected array but received:', response.data);
          setError('Unexpected data format');
        }
      } catch (error) {
        console.error('Error fetching subjects:', error);
        setError('Error fetching subjects');
      } finally {
        setLoading(false);
      }
    };

    fetchSubjects();
  }, []);

  return (
    <div className='min-h-screen bg-gray-100 flex flex-col'>
      <Header />

      <main className='container mx-auto py-10 px-6 flex-grow'>
        <div className='text-center'>
          <h2 className='text-3xl font-bold mb-4 text-red-700'>
            Subject Management
          </h2>
          <p className='text-lg text-gray-700'>View and create subjects.</p>
        </div>

        {loading && <ClipLoader />}
        {error && <p className='text-red-500'>{error}</p>}
        {!loading && !error && (
          <div className='max-w-3xl mx-auto'>
            <ul className='space-y-4'>
              {subjects.map((subject) => (
                <li
                  key={subject.id}
                  className='border-b py-4 bg-white shadow-md rounded-lg flex justify-center items-center'
                >
                  <span className='text-lg text-blue-500'>{subject.name}</span>
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
