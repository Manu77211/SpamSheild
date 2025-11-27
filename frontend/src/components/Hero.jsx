import { Shield, ArrowRight, Sparkles, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const Hero = () => {
  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-linear-to-br from-blue-50 via-purple-50 to-red-50">
      {/* Animated Background Blobs */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-400 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-400 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute top-40 left-40 w-80 h-80 bg-red-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
        <div className="text-center">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center space-x-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg mb-8 animate-pulse"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            >
              <Sparkles className="h-5 w-5 text-yellow-500" />
            </motion.div>
            <span className="text-sm font-medium text-gray-700">
              AI-Powered Spam Detection
            </span>
          </motion.div>

          {/* Main Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-5xl md:text-7xl font-bold mb-6"
          >
            <span className="bg-linear-to-r from-blue-600 via-purple-600 to-red-600 bg-clip-text text-transparent">
              Protect Your Inbox
            </span>
            <br />
            <span className="text-gray-800">From Spam & Phishing</span>
          </motion.h1>

          {/* Subheading */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto"
          >
            Advanced AI technology to detect and block spam messages, phishing attempts,
            and malicious content in real-time. Stay safe, stay protected.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center mb-16"
          >
            <Link
              to="/signup"
              className="group inline-flex items-center justify-center px-8 py-4 bg-linear-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:shadow-2xl transition transform hover:scale-105"
            >
              Get Started Free
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition" />
            </Link>
            <Link
              to="/dashboard"
              className="inline-flex items-center justify-center px-8 py-4 bg-white text-gray-800 rounded-xl shadow-lg hover:shadow-xl transition transform hover:scale-105"
            >
              <Shield className="mr-2 h-5 w-5 text-blue-600" />
              Try Demo
            </Link>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto"
          >
            <motion.div 
              className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-lg hover:shadow-2xl transition cursor-pointer"
              whileHover={{ y: -10, scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <motion.div 
                className="flex items-center justify-center mb-2"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <CheckCircle className="h-8 w-8 text-green-500" />
              </motion.div>
              <h3 className="text-3xl font-bold bg-linear-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent mb-1">1M+</h3>
              <p className="text-gray-600">Messages Analyzed</p>
            </motion.div>
            <motion.div 
              className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-lg hover:shadow-2xl transition cursor-pointer"
              whileHover={{ y: -10, scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300, delay: 0.1 }}
            >
              <motion.div 
                className="flex items-center justify-center mb-2"
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Shield className="h-8 w-8 text-blue-500" />
              </motion.div>
              <h3 className="text-3xl font-bold bg-linear-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent mb-1">99.5%</h3>
              <p className="text-gray-600">Accuracy Rate</p>
            </motion.div>
            <motion.div 
              className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-lg hover:shadow-2xl transition cursor-pointer"
              whileHover={{ y: -10, scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300, delay: 0.2 }}
            >
              <motion.div 
                className="flex items-center justify-center mb-2"
                animate={{ rotate: 360 }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              >
                <Sparkles className="h-8 w-8 text-purple-500" />
              </motion.div>
              <h3 className="text-3xl font-bold bg-linear-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-1">50K+</h3>
              <p className="text-gray-600">Active Users</p>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Custom CSS for blob animation */}
      <style jsx>{`
        @keyframes blob {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  );
};

export default Hero;
