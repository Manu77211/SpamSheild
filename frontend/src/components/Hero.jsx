import { Shield, ArrowRight, Sparkles, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const Hero = () => {
  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-linear-to-br from-gray-900 via-blue-900 to-gray-800">
      {/* Animated Background Blobs */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-cyan-500 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-2000"></div>
        <div className="absolute top-40 left-40 w-96 h-96 bg-indigo-500 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-4000"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
        <div className="text-center">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center space-x-2 bg-gray-800/80 backdrop-blur-xl border border-purple-500/30 px-6 py-3 rounded-full shadow-2xl mb-8"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            >
              <Sparkles className="h-5 w-5 text-yellow-500" />
            </motion.div>
            <span className="text-sm font-medium text-purple-300">
              Smart Spam Protection
            </span>
          </motion.div>

          {/* Main Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-5xl md:text-7xl font-bold mb-6"
          >
            <span className="bg-linear-to-r from-purple-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent">
              Keep Your Messages
            </span>
            <br />
            <span className="text-white">Safe & Clean</span>
          </motion.h1>

          {/* Subheading */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto"
          >
            Smart technology to help you identify spam messages and keep your inbox organized.
            Simple, effective, and easy to use.
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
              className="group inline-flex items-center justify-center px-8 py-4 bg-linear-to-r from-purple-600 to-blue-600 text-white rounded-xl hover:shadow-2xl hover:shadow-purple-500/25 transition transform hover:scale-105"
            >
              Get Started
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition" />
            </Link>
            <Link
              to="/dashboard"
              className="inline-flex items-center justify-center px-8 py-4 bg-gray-800/80 backdrop-blur-xl border border-purple-500/30 text-white rounded-xl shadow-lg hover:shadow-xl hover:shadow-purple-500/20 transition transform hover:scale-105"
            >
              <Shield className="mr-2 h-5 w-5 text-purple-400" />
              Try It Out
            </Link>
          </motion.div>

          {/* Features */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto"
          >
            <motion.div 
              className="bg-gray-800/60 backdrop-blur-xl border border-purple-500/20 p-6 rounded-2xl shadow-2xl hover:shadow-purple-500/20 transition cursor-pointer"
              whileHover={{ y: -10, scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <motion.div 
                className="flex items-center justify-center mb-4"
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <CheckCircle className="h-10 w-10 text-green-400" />
              </motion.div>
              <h3 className="text-2xl font-bold bg-linear-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent mb-2">Easy Detection</h3>
              <p className="text-gray-300 text-sm">Simply paste your message and get instant spam detection results</p>
            </motion.div>
            <motion.div 
              className="bg-gray-800/60 backdrop-blur-xl border border-purple-500/20 p-6 rounded-2xl shadow-2xl hover:shadow-purple-500/20 transition cursor-pointer"
              whileHover={{ y: -10, scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300, delay: 0.1 }}
            >
              <motion.div 
                className="flex items-center justify-center mb-4"
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Shield className="h-10 w-10 text-purple-400" />
              </motion.div>
              <h3 className="text-2xl font-bold bg-linear-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent mb-2">Smart Protection</h3>
              <p className="text-gray-300 text-sm">Advanced algorithms to identify suspicious patterns and content</p>
            </motion.div>
            <motion.div 
              className="bg-gray-800/60 backdrop-blur-xl border border-purple-500/20 p-6 rounded-2xl shadow-2xl hover:shadow-purple-500/20 transition cursor-pointer"
              whileHover={{ y: -10, scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300, delay: 0.2 }}
            >
              <motion.div 
                className="flex items-center justify-center mb-4"
                animate={{ rotate: 360 }}
                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
              >
                <Sparkles className="h-10 w-10 text-cyan-400" />
              </motion.div>
              <h3 className="text-2xl font-bold bg-linear-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent mb-2">Real-time Analysis</h3>
              <p className="text-gray-300 text-sm">Get immediate feedback with detailed analysis and recommendations</p>
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
