import Link from 'next/link';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { FiArrowLeft } from 'react-icons/fi';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      <Header />
      <main className="flex-grow flex items-center justify-center">
        <div className="container mx-auto px-4 py-20 text-center">
          <h1 className="text-6xl md:text-8xl font-bold mb-6 gradient-text">404</h1>
          <h2 className="text-2xl md:text-4xl font-semibold mb-6">Page Not Found</h2>
          <p className="text-gray-400 mb-12 max-w-lg mx-auto">
            The page you are looking for might have been removed, had its name changed, 
            or is temporarily unavailable.
          </p>
          <Link 
            href="/" 
            className="inline-flex items-center px-6 py-3 bg-primary text-white font-medium rounded-md hover:opacity-90 transition-all duration-300"
          >
            <FiArrowLeft className="mr-2" /> Back to Home
          </Link>
        </div>
      </main>
      <Footer />
    </div>
  );
} 