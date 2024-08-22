import Header from '../components/Header';
import Footer from '../components/Footer';
import BackToHome from '../components/BackToHome';

export default function Progress() {
  return (
    <div className='min-h-screen bg-gray-100 flex flex-col'>
      <Header />

      <main className='container mx-auto py-10 px-6 flex-grow'>
        <div className='text-center'>
          <h2 className='text-3xl font-bold mb-4 text-red-700'>
            Progress Tracking
          </h2>
          <p className='text-lg text-gray-700'>Track student progress.</p>
        </div>
      </main>

      <BackToHome />
      <Footer />
    </div>
  );
}