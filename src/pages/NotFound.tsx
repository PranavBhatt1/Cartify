import { Link } from 'react-router-dom';
import { Home, Search, ShoppingBag, ArrowLeft } from 'lucide-react';

export const NotFound = () => {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 animate-fade-in">
      <div className="text-center max-w-lg">
        <div className="relative inline-block mb-8">
          <h1 className="text-[10rem] font-black text-primary-100 leading-none select-none animate-fade-in-up">404</h1>
          <div className="absolute inset-0 flex items-center justify-center">
            <Search className="h-20 w-20 text-primary-400 animate-pulse-slow" />
          </div>
        </div>
        <h2 className="text-3xl font-bold text-gray-900 mb-3 animate-fade-in-up stagger-1">Oops! Page Not Found</h2>
        <p className="text-gray-500 mb-8 animate-fade-in-up stagger-2">
          The page you're looking for doesn't exist or has been moved. Don't worry, let's get you back on track!
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center animate-fade-in-up stagger-3">
          <Link to="/" className="btn-primary inline-flex items-center justify-center gap-2 px-6 py-3">
            <Home className="h-5 w-5" /> Go Home
          </Link>
          <Link to="/products" className="btn-outline inline-flex items-center justify-center gap-2 px-6 py-3">
            <ShoppingBag className="h-5 w-5" /> Browse Products
          </Link>
        </div>
        <button onClick={() => window.history.back()} className="mt-4 text-sm text-gray-400 hover:text-primary-600 transition-colors inline-flex items-center gap-1 animate-fade-in-up stagger-4">
          <ArrowLeft className="h-4 w-4" /> Go back to previous page
        </button>
      </div>
    </div>
  );
};
