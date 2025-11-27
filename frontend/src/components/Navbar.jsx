import { useState } from 'react';
import { Shield, Menu, X } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  return (
    <nav className="fixed w-full bg-white/80 backdrop-blur-md z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <Shield className="h-8 w-8 text-blue-600" />
            <span className="text-2xl font-bold bg-linear-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              SpamShield
            </span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <Link 
              to="/" 
              className={`font-medium transition ${
                location.pathname === '/' 
                  ? 'text-blue-600 border-b-2 border-blue-600 pb-1' 
                  : 'text-gray-700 hover:text-blue-600'
              }`}
            >
              Home
            </Link>
            <Link 
              to="/news" 
              className={`font-medium transition ${
                location.pathname === '/news' 
                  ? 'text-blue-600 border-b-2 border-blue-600 pb-1' 
                  : 'text-gray-700 hover:text-blue-600'
              }`}
            >
              News
            </Link>
            <Link 
              to="/dashboard" 
              className={`font-medium transition ${
                location.pathname === '/dashboard' 
                  ? 'text-blue-600 border-b-2 border-blue-600 pb-1' 
                  : 'text-gray-700 hover:text-blue-600'
              }`}
            >
              Dashboard
            </Link>
            <Link 
              to="/statistics" 
              className={`font-medium transition ${
                location.pathname === '/statistics' 
                  ? 'text-blue-600 border-b-2 border-blue-600 pb-1' 
                  : 'text-gray-700 hover:text-blue-600'
              }`}
            >
              Statistics
            </Link>
            <Link
              to="/login"
              className="px-4 py-2 text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-50 transition"
            >
              Login
            </Link>
            <Link
              to="/signup"
              className="px-4 py-2 text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-50 transition"
            >
              Sign Up
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-gray-100"
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-t">
          <div className="px-4 py-4 space-y-3">
            <Link
              to="/"
              className={`block px-4 py-2 rounded-lg ${
                location.pathname === '/' 
                  ? 'bg-blue-100 text-blue-600 font-semibold' 
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
              onClick={() => setIsOpen(false)}
            >
              Home
            </Link>
            <Link
              to="/news"
              className={`block px-4 py-2 rounded-lg ${
                location.pathname === '/news' 
                  ? 'bg-blue-100 text-blue-600 font-semibold' 
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
              onClick={() => setIsOpen(false)}
            >
              News
            </Link>
            <Link
              to="/dashboard"
              className={`block px-4 py-2 rounded-lg ${
                location.pathname === '/dashboard' 
                  ? 'bg-blue-100 text-blue-600 font-semibold' 
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
              onClick={() => setIsOpen(false)}
            >
              Dashboard
            </Link>
            <Link
              to="/statistics"
              className={`block px-4 py-2 rounded-lg ${
                location.pathname === '/statistics' 
                  ? 'bg-blue-100 text-blue-600 font-semibold' 
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
              onClick={() => setIsOpen(false)}
            >
              Statistics
            </Link>
            <Link
              to="/login"
              className="block px-4 py-2 text-blue-600 border border-blue-600 rounded-lg text-center"
              onClick={() => setIsOpen(false)}
            >
              Login
            </Link>
            <Link
              to="/signup"
              className="block px-4 py-2  text-blue-600 border border-blue-600 rounded-lg text-center"
              onClick={() => setIsOpen(false)}
            >
              Sign Up
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
