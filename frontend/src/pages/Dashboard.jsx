import { useState } from 'react';
import { Shield, AlertTriangle, CheckCircle, Copy, Loader, Upload, Download, History, FileText } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useDropzone } from 'react-dropzone';
import toast from 'react-hot-toast';
import jsPDF from 'jspdf';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import LoadingSkeleton from '../components/LoadingSkeleton';
import apiService from '../services/api';
import { useApiAuth } from '../hooks/useApiAuth';

const Dashboard = () => {
  const [message, setMessage] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [history, setHistory] = useState(() => {
    // Load history from localStorage on component mount
    try {
      const savedHistory = localStorage.getItem('spamshield-history');
      return savedHistory ? JSON.parse(savedHistory) : [];
    } catch (error) {
      console.error('Failed to load history from localStorage:', error);
      return [];
    }
  });
  const [showHistory, setShowHistory] = useState(false);

  // Initialize API authentication
  useApiAuth();

  // Save history to localStorage
  const saveHistory = (newHistory) => {
    try {
      localStorage.setItem('spamshield-history', JSON.stringify(newHistory));
      setHistory(newHistory);
    } catch (error) {
      console.error('Failed to save history to localStorage:', error);
      setHistory(newHistory); // Still update state even if localStorage fails
    }
  };

  const exampleMessages = [
    'URGENT: Your bank account has been suspended. Click here to verify: bit.ly/verify123',
    'Hey! Long time no see. How are you doing?',
    'CONGRATULATIONS! You won $1,000,000! Claim now: suspicious-link.com',
  ];

  // File upload dropzone
  const onDrop = (acceptedFiles) => {
    const file = acceptedFiles[0];
    if (file) {
      // Show options: Load content or Analyze directly
      toast((t) => (
        <div className="flex flex-col gap-2">
          <div className="font-medium">File "{file.name}" uploaded</div>
          <div className="flex gap-2">
            <button
              onClick={() => {
                loadFileContent(file);
                toast.dismiss(t.id);
              }}
              className="px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700"
            >
              Load Content
            </button>
            <button
              onClick={() => {
                analyzeFileDirectly(file);
                toast.dismiss(t.id);
              }}
              className="px-3 py-1 bg-green-600 text-white text-sm rounded hover:bg-green-700"
            >
              Analyze Directly
            </button>
          </div>
        </div>
      ), {
        duration: 10000,
      });
    }
  };

  // Load file content into text area
  const loadFileContent = (file) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const text = e.target.result;
      setMessage(text);
      toast.success(`File "${file.name}" content loaded successfully!`);
    };
    reader.readAsText(file);
  };

  // Analyze file directly via backend
  const analyzeFileDirectly = async (file) => {
    setLoading(true);
    setResult(null);

    try {
      const response = await apiService.analyzeFile(file);
      
      if (response.success) {
        const analysisData = response.data.analysis;
        
        // Transform backend response to match frontend format
        const analysisResult = {
          isSpam: analysisData.classification === 'spam',
          confidence: Math.round(analysisData.confidence * 100),
          reasons: [
            ...analysisData.analysis_details.model_explanations.map(exp => `ML Analysis: ${exp}`),
            ...(analysisData.threats_detected.length > 0 ? [`Threat detected: ${analysisData.threats_detected.join(', ')}`] : [])
          ],
          threatType: analysisData.threats_detected.join(', ') || 'None',
          riskScore: analysisData.risk_score,
          classification: analysisData.classification,
          recommendations: analysisData.recommendations,
          timestamp: new Date(analysisData.analyzed_at).toLocaleString(),
          message: `File: ${file.name}`,
          fileName: file.name
        };

        setResult(analysisResult);
        const newHistory = [analysisResult, ...history].slice(0, 10);
        saveHistory(newHistory);
        toast.success(`File "${file.name}" analyzed successfully!`);
      } else {
        toast.error(response.error || 'File analysis failed');
      }
    } catch (error) {
      console.error('File analysis error:', error);
      toast.error('Failed to analyze file. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'text/plain': ['.txt'] },
    maxFiles: 1,
  });

  // Export result as PDF
  const exportToPDF = () => {
    if (!result) {
      toast.error('No result to export!');
      return;
    }

    const doc = new jsPDF();
    doc.setFontSize(20);
    doc.text('SpamShield Analysis Report', 20, 20);
    
    doc.setFontSize(12);
    doc.text(`Status: ${result.isSpam ? 'SPAM DETECTED' : 'SAFE MESSAGE'}`, 20, 40);
    doc.text(`Confidence: ${result.confidence}%`, 20, 50);
    
    if (result.reasons.length > 0) {
      doc.text('Detection Reasons:', 20, 65);
      result.reasons.forEach((reason, index) => {
        doc.text(`- ${reason}`, 25, 75 + (index * 10));
      });
    }
    
    doc.text('Message:', 20, 100);
    const splitMessage = doc.splitTextToSize(message, 170);
    doc.text(splitMessage, 20, 110);
    
    doc.save('spamshield-report.pdf');
    toast.success('Report exported successfully!');
  };

  const analyzeMessage = async () => {
    if (!message.trim()) {
      toast.error('Please enter a message to analyze');
      return;
    }

    setLoading(true);
    setResult(null);

    try {
      // Call real backend API
      const response = await apiService.analyzeMessage(message);
      
      if (response.success) {
        const analysisData = response.data.analysis; // Backend puts analysis in 'analysis' field
        
        // Transform backend response to match frontend format
        const analysisResult = {
          isSpam: analysisData.classification === 'spam',
          confidence: Math.round(analysisData.confidence * 100), // Convert 0.9 to 90
          reasons: [
            ...analysisData.analysis_details.model_explanations.map(exp => `ML Analysis: ${exp}`),
            ...(analysisData.threats_detected.length > 0 ? [`Threat detected: ${analysisData.threats_detected.join(', ')}`] : [])
          ],
          threatType: analysisData.threats_detected.join(', ') || 'None',
          riskScore: analysisData.risk_score,
          classification: analysisData.classification,
          recommendations: analysisData.recommendations,
          timestamp: new Date(analysisData.analyzed_at).toLocaleString(),
          message: message.substring(0, 100) + (message.length > 100 ? '...' : ''),
        };

        setResult(analysisResult);
        const newHistory = [analysisResult, ...history].slice(0, 10); // Keep last 10
        saveHistory(newHistory);
        toast.success('Analysis complete!');
      } else {
        // Handle API errors
        toast.error(response.error || 'Analysis failed');
      }
    } catch (error) {
      console.error('Analysis error:', error);
      toast.error('Failed to analyze message. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-900 via-gray-800 to-gray-900">
      <Navbar />
      
      <div className="pt-24 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center justify-center p-4 bg-purple-500/20 backdrop-blur-sm rounded-full mb-6 border border-purple-500/30">
              <Shield className="h-10 w-10 text-purple-400" />
            </div>
            <h1 className="text-4xl md:text-4xl font-bold mb-5 bg-linear-to-r from-purple-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent">
              Message Scanner
            </h1>
            <p className="text-xl text-gray-300">
              Paste any message below to check if it might be spam
            </p>
          </motion.div>

          {/* Main Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-gray-800/60 backdrop-blur-xl border border-purple-500/20 rounded-2xl shadow-2xl shadow-purple-500/10 p-8"
          >
            {/* Action Buttons */}
            <div className="flex flex-wrap gap-2 mb-6">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowHistory(!showHistory)}
                className="flex items-center space-x-2 px-5 py-2.5 bg-gray-700/60 backdrop-blur-sm border border-purple-500/30 text-gray-300 rounded-xl hover:bg-purple-500/20 hover:text-white hover:border-purple-400/50 transition-all duration-300"
              >
                <History className="h-4 w-4" />
                <span>History</span>
              </motion.button>
              {result && (
                <motion.button
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={exportToPDF}
                  className="flex items-center space-x-2 px-5 py-2.5 bg-green-500/20 border border-green-500/30 text-green-400 rounded-xl hover:bg-green-500/30 hover:text-green-300 hover:border-green-400/50 transition-all duration-300 backdrop-blur-sm"
                >
                  <Download className="h-4 w-4" />
                  <span>Export PDF</span>
                </motion.button>
              )}
            </div>

            {/* Text Area */}
            <div className="mb-6">
              <label className="block text-sm font-semibold text-gray-300 mb-3">
                Message to Check
              </label>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Paste your message here..."
                rows="6"
                className="w-full px-4 py-3 bg-gray-700/60 backdrop-blur-sm border border-purple-500/30 text-white placeholder-gray-400 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-400 resize-none transition-all duration-300"
              />
            </div>

            {/* File Upload Dropzone */}
            <div className="mb-6">
              <div
                {...getRootProps()}
                className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all duration-300 ${
                  isDragActive
                    ? 'border-purple-500 bg-purple-500/10'
                    : 'border-purple-500/30 hover:border-purple-400 hover:bg-purple-500/5'
                }`}
              >
                <input {...getInputProps()} />
                <Upload className="h-10 w-10 text-purple-400 mx-auto mb-3" />
                {isDragActive ? (
                  <p className="text-purple-400 font-medium">Drop the file here...</p>
                ) : (
                  <div>
                    <p className="text-gray-300 font-medium mb-1">Drag & drop a text file here</p>
                    <p className="text-sm text-gray-400">or click to browse (.txt files only)</p>
                  </div>
                )}
              </div>
            </div>

            {/* Example Messages */}
            <div className="mb-8">
              <p className="text-sm font-semibold text-gray-300 mb-4">Try example messages:</p>
              <div className="flex flex-wrap gap-3">
                {exampleMessages.map((example, index) => (
                  <button
                    key={index}
                    onClick={() => setMessage(example)}
                    className="text-sm px-4 py-2.5 bg-gray-700/60 backdrop-blur-sm border border-purple-500/30 text-gray-300 rounded-xl hover:bg-purple-500/20 hover:text-white hover:border-purple-400/50 transition-all duration-300 flex items-center space-x-2"
                  >
                    <Copy className="h-4 w-4" />
                    <span>Example {index + 1}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Analyze Button */}
            <motion.button
              onClick={analyzeMessage}
              disabled={!message.trim() || loading}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full py-4 bg-linear-to-r from-purple-600 to-blue-600 text-white font-semibold rounded-xl hover:shadow-2xl hover:shadow-purple-500/25 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2 relative overflow-hidden"
            >
              {!loading && !message.trim() && (
                <motion.div
                  className="absolute inset-0 bg-linear-to-r from-transparent via-white to-transparent opacity-20"
                  animate={{ x: ['-100%', '100%'] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                />
              )}
              {loading ? (
                <>
                  <Loader className="h-5 w-5 animate-spin" />
                  <span>Checking...</span>
                </>
              ) : (
                <>
                  <Shield className="h-5 w-5" />
                  <span>Check Message</span>
                </>
              )}
            </motion.button>
          </motion.div>

          {/* Results */}
          {result && (
            <motion.div
              initial={{ opacity: 0, scale: 0.5, y: 50 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ type: "spring", stiffness: 200, damping: 15 }}
              className={`mt-8 rounded-2xl shadow-2xl p-8 backdrop-blur-xl border-2 ${
                result.isSpam
                  ? 'bg-red-900/30 border-red-500/30 shadow-red-500/10'
                  : 'bg-green-900/30 border-green-500/30 shadow-green-500/10'
              }`}
            >
              <div className="flex items-center space-x-4 mb-6">
                {result.isSpam ? (
                  <motion.div 
                    className="p-4 bg-red-500/20 backdrop-blur-sm rounded-full border border-red-500/30"
                    animate={{ scale: [1, 1.1, 1], rotate: [0, -5, 5, 0] }}
                    transition={{ duration: 0.5, repeat: 3 }}
                  >
                    <AlertTriangle className="h-10 w-10 text-red-400" />
                  </motion.div>
                ) : (
                  <motion.div 
                    className="p-4 bg-green-500/20 backdrop-blur-sm rounded-full border border-green-500/30"
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 0.5, repeat: 2 }}
                  >
                    <CheckCircle className="h-10 w-10 text-green-400" />
                  </motion.div>
                )}
                <div>
                  <h2 className="text-2xl font-bold text-white">
                    {result.isSpam ? 'Spam Detected!' : 'Message Looks Safe'}
                  </h2>
                  <div className="space-y-2">
                    <p className="text-gray-300">
                      Confidence: <span className="font-semibold text-white">{result.confidence}%</span>
                    </p>
                    <p className="text-gray-300">
                      Risk Score: <span className="font-semibold text-white">{result.riskScore}/100</span>
                    </p>
                    <p className="text-gray-300">
                      Classification: <span className="font-semibold capitalize text-white">{result.classification}</span>
                    </p>
                    {result.threatType && result.threatType !== 'None' && (
                      <p className="text-red-400">
                        Threats: <span className="font-semibold text-red-300">{result.threatType}</span>
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {result.reasons.length > 0 && (
                <div className="mt-6 p-4 bg-red-900/20 backdrop-blur-sm border border-red-500/30 rounded-xl">
                  <h3 className="font-semibold text-white mb-3">Detection Reasons:</h3>
                  <ul className="space-y-2">
                    {result.reasons.map((reason, index) => (
                      <li key={index} className="flex items-start space-x-2">
                        <span className="text-red-400 mt-1">•</span>
                        <span className="text-gray-200">{reason}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {result.recommendations && result.recommendations.length > 0 && (
                <div className="mt-6 p-4 bg-blue-900/20 backdrop-blur-sm border border-blue-500/30 rounded-xl">
                  <h3 className="font-semibold text-white mb-3">🛡️ Security Recommendations:</h3>
                  <ul className="space-y-2">
                    {result.recommendations.map((rec, index) => (
                      <li key={index} className="flex items-start space-x-2">
                        <span className="text-blue-400 mt-1">•</span>
                        <span className="text-gray-200 text-sm">{rec}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </motion.div>
          )}

          {/* History Sidebar */}
          <AnimatePresence>
            {showHistory && (
              <>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="fixed inset-0 bg-black/50 z-40"
                  onClick={() => setShowHistory(false)}
                />
                <motion.div
                  initial={{ x: '100%' }}
                  animate={{ x: 0 }}
                  exit={{ x: '100%' }}
                  transition={{ type: 'spring', damping: 25 }}
                  className="fixed right-0 top-0 h-full w-full md:w-96 bg-gray-900/95 backdrop-blur-xl border-l border-purple-500/30 shadow-2xl z-50 overflow-y-auto"
                >
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-6">
                      <h2 className="text-2xl font-bold text-white flex items-center space-x-2">
                        <History className="h-6 w-6 text-purple-400" />
                        <span>History</span>
                      </h2>
                      <button
                        onClick={() => setShowHistory(false)}
                        className="p-2 hover:bg-gray-700/50 rounded-lg transition text-white"
                      >
                        ✕
                      </button>
                    </div>

                    {history.length === 0 ? (
                      <div className="text-center py-12">
                        <FileText className="h-16 w-16 text-gray-500 mx-auto mb-4" />
                        <p className="text-gray-300">No history yet</p>
                        <p className="text-sm text-gray-400 mt-2">
                          Your analyzed messages will appear here
                        </p>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        {history.map((item, index) => (
                          <motion.div
                            key={index}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                            whileHover={{ scale: 1.02 }}
                            className={`p-4 rounded-lg cursor-pointer transition-all ${
                              item.isSpam
                                ? 'bg-red-500/10 border border-red-500/30 hover:bg-red-500/20'
                                : 'bg-green-500/10 border border-green-500/30 hover:bg-green-500/20'
                            }`}
                            onClick={() => {
                              setMessage(item.message);
                              setResult(item);
                              setShowHistory(false);
                              toast.success('Loaded from history!');
                            }}
                          >
                            <div className="flex items-center justify-between mb-2">
                              <span className={`text-sm font-semibold ${
                                item.isSpam ? 'text-red-600' : 'text-green-600'
                              }`}>
                                {item.isSpam ? 'SPAM' : 'SAFE'}
                              </span>
                              <span className="text-xs text-gray-500">{item.timestamp}</span>
                            </div>
                            <p className="text-sm text-gray-300 truncate mb-2">{item.message}</p>
                            <div className="flex items-center justify-between">
                              <span className="text-xs text-gray-600">
                                Confidence: {item.confidence}%
                              </span>
                              {item.isSpam ? (
                                <AlertTriangle className="h-4 w-4 text-red-600" />
                              ) : (
                                <CheckCircle className="h-4 w-4 text-green-600" />
                              )}
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    )}
                  </div>
                </motion.div>
              </>
            )}
          </AnimatePresence>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Dashboard;
