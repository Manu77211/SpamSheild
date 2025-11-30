import { useState } from 'react';
import { Shield, Menu, X, User, LogOut, ChevronDown } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const location = useLocation();
  const { user, signOut } = useAuth();

  const handleSignOut = async () => {
    await signOut();
    setDropdownOpen(false);
  };

  return (
    <nav className="fixed w-full bg-gray-900/90 backdrop-blur-xl z-50 shadow-2xl border-b border-purple-500/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="relative">
              <Shield className="h-9 w-9 text-purple-500 group-hover:text-purple-400 transition-all duration-300 group-hover:scale-110 group-hover:rotate-12" />
              <div className="absolute inset-0 bg-purple-500/20 rounded-full blur-lg group-hover:bg-purple-400/30 transition-all duration-300"></div>
            </div>
            <span className="text-2xl font-bold bg-linear-to-r from-purple-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent group-hover:from-purple-300 group-hover:via-blue-300 group-hover:to-cyan-300 transition-all duration-300">
              SpamShield
            </span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <Link 
              to="/" 
              className={`font-medium transition-all duration-300 relative group ${
                location.pathname === '/' 
                  ? 'text-purple-400' 
                  : 'text-gray-300 hover:text-purple-400'
              }`}
            >
              Home
              <span className={`absolute -bottom-1 left-0 w-0 h-0.5 bg-linear-to-r from-purple-400 to-cyan-400 transition-all duration-300 ${
                location.pathname === '/' ? 'w-full' : 'group-hover:w-full'
              }`}></span>
            </Link>
            <Link 
              to="/news" 
              className={`font-medium transition-all duration-300 relative group ${
                location.pathname === '/news' 
                  ? 'text-purple-400' 
                  : 'text-gray-300 hover:text-purple-400'
              }`}
            >
              News
              <span className={`absolute -bottom-1 left-0 w-0 h-0.5 bg-linear-to-r from-purple-400 to-cyan-400 transition-all duration-300 ${
                location.pathname === '/news' ? 'w-full' : 'group-hover:w-full'
              }`}></span>
            </Link>
            <Link 
              to="/dashboard" 
              className={`font-medium transition-all duration-300 relative group ${
                location.pathname === '/dashboard' 
                  ? 'text-purple-400' 
                  : 'text-gray-300 hover:text-purple-400'
              }`}
            >
              Dashboard
              <span className={`absolute -bottom-1 left-0 w-0 h-0.5 bg-linear-to-r from-purple-400 to-cyan-400 transition-all duration-300 ${
                location.pathname === '/dashboard' ? 'w-full' : 'group-hover:w-full'
              }`}></span>
            </Link>
            <Link 
              to="/statistics" 
              className={`font-medium transition-all duration-300 relative group ${
                location.pathname === '/statistics' 
                  ? 'text-purple-400' 
                  : 'text-gray-300 hover:text-purple-400'
              }`}
            >
              Analytics
              <span className={`absolute -bottom-1 left-0 w-0 h-0.5 bg-linear-to-r from-purple-400 to-cyan-400 transition-all duration-300 ${
                location.pathname === '/statistics' ? 'w-full' : 'group-hover:w-full'
              }`}></span>
            </Link>
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="flex items-center gap-2 p-2 rounded-xl hover:bg-purple-500/10 text-gray-300 hover:text-purple-400 transition-all duration-300 backdrop-blur-sm border border-purple-500/20"
                >
                  <div className="w-8 h-8 rounded-full bg-linear-to-r from-purple-400 to-blue-400 flex items-center justify-center">
                    <User className="w-4 h-4 text-white" />
                  </div>
                  <ChevronDown className="w-4 h-4" />
                </button>
                
                {dropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-gray-800 rounded-xl shadow-xl border border-purple-500/20 py-2">
                    <div className="px-4 py-2 border-b border-gray-700">
                      <p className="text-sm text-gray-300 truncate">{user.email}</p>
                    </div>
                    <button
                      onClick={handleSignOut}
                      className="w-full flex items-center gap-2 px-4 py-2 text-left text-gray-300 hover:bg-purple-500/10 hover:text-purple-400 transition-colors"
                    >
                      <LogOut className="w-4 h-4" />
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <>
                <Link
                  to="/login"
                  className="px-5 py-2.5 text-purple-400 border border-purple-400/50 rounded-xl hover:bg-purple-500/10 hover:border-purple-400 transition-all duration-300 font-medium backdrop-blur-sm"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="px-5 py-2.5 bg-linear-to-r from-purple-500 to-blue-500 text-white rounded-xl hover:from-purple-600 hover:to-blue-600 transition-all duration-300 font-medium shadow-lg hover:shadow-purple-500/25 transform hover:scale-105">
                  Signup
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-3 rounded-xl hover:bg-purple-500/10 text-gray-300 hover:text-purple-400 transition-all duration-300 backdrop-blur-sm border border-purple-500/20"
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-gray-800/95 backdrop-blur-xl border-t border-purple-500/20">
          <div className="px-6 py-6 space-y-4">
            <Link
              to="/"
              className={`block px-4 py-3 rounded-lg transition-all duration-300 text-center font-medium ${
                location.pathname === '/' 
                  ? 'bg-linear-to-r from-purple-500 to-blue-500 text-white shadow-lg' 
                  : 'text-white hover:bg-linear-to-r hover:from-purple-600 hover:to-blue-600'
              }`}
              onClick={() => setIsOpen(false)}
            >
              Home
            </Link>
            <Link
              to="/news"
              className={`block px-4 py-3 rounded-lg transition-all duration-300 text-center font-medium ${
                location.pathname === '/news' 
                  ? 'bg-linear-to-r from-purple-500 to-blue-500 text-white shadow-lg' 
                  : 'text-white hover:bg-linear-to-r hover:from-purple-600 hover:to-blue-600'
              }`}
              onClick={() => setIsOpen(false)}
            >
              News
            </Link>
            <Link
              to="/dashboard"
              className={`block px-4 py-3 rounded-lg transition-all duration-300 text-center font-medium ${
                location.pathname === '/dashboard' 
                  ? 'bg-linear-to-r from-purple-500 to-blue-500 text-white shadow-lg' 
                  : 'text-white hover:bg-linear-to-r hover:from-purple-600 hover:to-blue-600'
              }`}
              onClick={() => setIsOpen(false)}
            >
              Dashboard
            </Link>
            <Link
              to="/statistics"
              className={`block px-4 py-3 rounded-lg transition-all duration-300 text-center font-medium ${
                location.pathname === '/statistics' 
                  ? 'bg-linear-to-r from-purple-500 to-blue-500 text-white shadow-lg' 
                  : 'text-white hover:bg-linear-to-r hover:from-purple-600 hover:to-blue-600'
              }`}
              onClick={() => setIsOpen(false)}
            >
              Statistics
            </Link>
            {user ? (
              <div className="pt-4 border-t border-gray-700">
                <div className="flex items-center justify-center gap-2 px-4 py-2 text-gray-300">
                  <User className="w-5 h-5" />
                  <span className="text-sm truncate">{user.email}</span>
                </div>
                <button
                  onClick={handleSignOut}
                  className="w-full flex items-center justify-center gap-2 px-4 py-3 text-gray-300 hover:bg-purple-500/10 hover:text-purple-400 transition-colors rounded-lg mx-2"
                >
                  <LogOut className="w-4 h-4" />
                  Sign Out
                </button>
              </div>
            ) : (
              <>
                <Link
                  to="/login"
                  className="block px-5 py-3 text-purple-400 border border-purple-400/50 rounded-xl hover:bg-purple-500/10 hover:border-purple-400 transition-all duration-300 font-medium backdrop-blur-sm text-center"
                  onClick={() => setIsOpen(false)}
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="block px-5 py-3 bg-linear-to-r from-purple-500 to-blue-500 text-white rounded-xl hover:from-purple-600 hover:to-blue-600 transition-all duration-300 font-medium shadow-lg hover:shadow-purple-500/25 transform hover:scale-105 text-center"
                  onClick={() => setIsOpen(false)}>
                
                  signup
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
