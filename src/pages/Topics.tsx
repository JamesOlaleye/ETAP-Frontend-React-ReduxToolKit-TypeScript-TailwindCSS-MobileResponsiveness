import { useEffect, useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import BackToHome from '../components/BackToHome';
import { getTopicsBySubject } from '../service/apiService';
import { Topic as TopicType } from '../types';
import { ClipLoader } from 'react-spinners';

interface TopicsProps {
  subjectId: string;
}

export default function Topics({ subjectId }: TopicsProps) {
  const [topics, setTopics] = useState<TopicType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTopics = async () => {
      try {
        const response = await getTopicsBySubject(subjectId);
        setTopics(response.data);
      } catch (error) {
        console.error('Error fetching topics:', error);
        setError('Error fetching topics');
      } finally {
        setLoading(false);
      }
    };

    fetchTopics();
  }, [subjectId]);

  return (
    <div className='min-h-screen bg-gray-100 flex flex-col'>
      <Header />

      <main className='container mx-auto py-10 px-6 flex-grow'>
        <div className='text-center'>
          <h2 className='text-3xl font-bold mb-4 text-red-700'>
            Topic Management
          </h2>
          <p className='text-lg text-gray-700'>
            Manage topics for each subject.
          </p>
        </div>

        {loading && <ClipLoader />}
        {error && <p className='text-red-500'>{error}</p>}
        {!loading && !error && (
          <div className='max-w-3xl mx-auto'>
            <ul className='space-y-4'>
              {topics.map((topic) => (
                <li
                  key={topic.id}
                  className='border-b py-4 bg-white shadow-md rounded-lg flex justify-center items-center'
                >
                  <div className='p-4 text-blue-500'>
                    <span className='text-indigo-600 font-bold'>
                      {topic.title}
                    </span>
                    <span className='text-gray-600 ml-2'>
                      - {topic.description}
                    </span>
                  </div>
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
