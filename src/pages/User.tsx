import BackToHome from '../components/BackToHome';
import Footer from '../components/Footer';
import Header from '../components/Header';

export default function User() {
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
      </main>

      <BackToHome />
      <Footer />
    </div>
  );
}
