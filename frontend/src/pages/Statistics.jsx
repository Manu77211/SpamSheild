import { useState } from 'react';
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Shield, TrendingUp, AlertTriangle, CheckCircle, Calendar, Download } from 'lucide-react';
import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import toast from 'react-hot-toast';

const Statistics = () => {
  const [timeRange, setTimeRange] = useState('week');

  // Mock data - Replace with real API data
  const statsData = {
    totalChecked: 1547,
    spamDetected: 823,
    safeMessages: 724,
    accuracy: 99.5,
  };

  const weeklyData = [
    { day: 'Mon', spam: 120, safe: 95 },
    { day: 'Tue', spam: 135, safe: 110 },
    { day: 'Wed', spam: 98, safe: 102 },
    { day: 'Thu', spam: 142, safe: 88 },
    { day: 'Fri', spam: 156, safe: 125 },
    { day: 'Sat', spam: 89, safe: 98 },
    { day: 'Sun', spam: 83, safe: 106 },
  ];

  const threatTypes = [
    { name: 'Phishing', value: 342, color: '#ef4444' },
    { name: 'Scam', value: 256, color: '#f59e0b' },
    { name: 'Malware', value: 125, color: '#8b5cf6' },
    { name: 'Other', value: 100, color: '#6b7280' },
  ];

  const recentActivity = [
    { id: 1, message: 'Phishing attempt blocked', type: 'spam', time: '2 hours ago', confidence: 98.5 },
    { id: 2, message: 'Message verified as safe', type: 'safe', time: '5 hours ago', confidence: 99.2 },
    { id: 3, message: 'Scam detected and blocked', type: 'spam', time: '1 day ago', confidence: 97.3 },
    { id: 4, message: 'Message verified as safe', type: 'safe', time: '1 day ago', confidence: 98.8 },
    { id: 5, message: 'Malware link detected', type: 'spam', time: '2 days ago', confidence: 99.7 },
  ];

  const handleExport = () => {
    toast.success('Exporting your statistics report...');
    setTimeout(() => {
      toast.success('Report downloaded successfully!');
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8"
          >
            <div>
              <h1 className="text-4xl font-bold bg-linear-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
                Statistics & Analytics
              </h1>
              <p className="text-gray-600">Track your spam detection performance</p>
            </div>
            <button
              onClick={handleExport}
              className="mt-4 md:mt-0 flex items-center space-x-2 px-6 py-3 bg-linear-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:shadow-lg transition"
            >
              <Download className="h-5 w-5" />
              <span>Export Report</span>
            </button>
          </motion.div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              whileHover={{ y: -5 }}
              className="bg-white rounded-xl p-6 shadow-lg cursor-pointer"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-blue-100 rounded-lg">
                  <Shield className="h-6 w-6 text-blue-600" />
                </div>
                <span className="text-sm text-gray-500">Total</span>
              </div>
              <h3 className="text-3xl font-bold text-gray-800 mb-1">{statsData.totalChecked}</h3>
              <p className="text-sm text-gray-600">Messages Checked</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              whileHover={{ y: -5 }}
              className="bg-white rounded-xl p-6 shadow-lg cursor-pointer"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-red-100 rounded-lg">
                  <AlertTriangle className="h-6 w-6 text-red-600" />
                </div>
                <span className="text-sm text-gray-500">Blocked</span>
              </div>
              <h3 className="text-3xl font-bold text-gray-800 mb-1">{statsData.spamDetected}</h3>
              <p className="text-sm text-gray-600">Spam Detected</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              whileHover={{ y: -5 }}
              className="bg-white rounded-xl p-6 shadow-lg cursor-pointer"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-green-100 rounded-lg">
                  <CheckCircle className="h-6 w-6 text-green-600" />
                </div>
                <span className="text-sm text-gray-500">Safe</span>
              </div>
              <h3 className="text-3xl font-bold text-gray-800 mb-1">{statsData.safeMessages}</h3>
              <p className="text-sm text-gray-600">Safe Messages</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              whileHover={{ y: -5 }}
              className="bg-white rounded-xl p-6 shadow-lg cursor-pointer"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-purple-100 rounded-lg">
                  <TrendingUp className="h-6 w-6 text-purple-600" />
                </div>
                <span className="text-sm text-gray-500">Rate</span>
              </div>
              <h3 className="text-3xl font-bold text-gray-800 mb-1">{statsData.accuracy}%</h3>
              <p className="text-sm text-gray-600">Accuracy</p>
            </motion.div>
          </div>

          {/* Charts Section */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            {/* Weekly Activity Chart */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="lg:col-span-2 bg-white rounded-xl p-6 shadow-lg"
            >
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-gray-800">Weekly Activity</h2>
                <select
                  value={timeRange}
                  onChange={(e) => setTimeRange(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="week">This Week</option>
                  <option value="month">This Month</option>
                  <option value="year">This Year</option>
                </select>
              </div>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={weeklyData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="day" stroke="#6b7280" />
                  <YAxis stroke="#6b7280" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#fff',
                      border: 'none',
                      borderRadius: '8px',
                      boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                    }}
                  />
                  <Legend />
                  <Bar dataKey="spam" fill="#ef4444" radius={[8, 8, 0, 0]} />
                  <Bar dataKey="safe" fill="#10b981" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </motion.div>

            {/* Threat Distribution */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white rounded-xl p-6 shadow-lg"
            >
              <h2 className="text-xl font-bold text-gray-800 mb-6">Threat Types</h2>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={threatTypes}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    fill="#8884d8"
                    paddingAngle={5}
                    dataKey="value"
                    label
                  >
                    {threatTypes.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
              <div className="mt-4 space-y-2">
                {threatTypes.map((type, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: type.color }}></div>
                      <span className="text-sm text-gray-600">{type.name}</span>
                    </div>
                    <span className="text-sm font-semibold text-gray-800">{type.value}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Recent Activity */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-xl p-6 shadow-lg"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-800">Recent Activity</h2>
              <Calendar className="h-5 w-5 text-gray-400" />
            </div>
            <div className="space-y-4">
              {recentActivity.map((activity, index) => (
                <motion.div
                  key={activity.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ x: 5 }}
                  className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition cursor-pointer"
                >
                  <div className="flex items-center space-x-4">
                    <div className={`p-2 rounded-lg ${activity.type === 'spam' ? 'bg-red-100' : 'bg-green-100'}`}>
                      {activity.type === 'spam' ? (
                        <AlertTriangle className="h-5 w-5 text-red-600" />
                      ) : (
                        <CheckCircle className="h-5 w-5 text-green-600" />
                      )}
                    </div>
                    <div>
                      <p className="font-medium text-gray-800">{activity.message}</p>
                      <p className="text-sm text-gray-500">{activity.time}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-sm font-semibold text-gray-800">{activity.confidence}%</span>
                    <p className="text-xs text-gray-500">confidence</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Statistics;
