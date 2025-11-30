import React, { useState } from 'react';
import { motion } from 'framer-motion';
import apiService from '../services/api';

const BackendTest = () => {
  const [testResults, setTestResults] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const runTests = async () => {
    setIsLoading(true);
    const results = {};

    // Test 1: Backend Health
    console.log('🧪 Testing backend health...');
    const healthResult = await apiService.testConnection();
    results.health = healthResult;
    setTestResults({ ...results });

    // Test 2: API Health  
    console.log('🧪 Testing API health...');
    const apiResult = await apiService.testAPIHealth();
    results.apiHealth = apiResult;
    setTestResults({ ...results });

    // Test 3: Analyze Message (should fail without auth)
    console.log('🧪 Testing analyze endpoint (should fail)...');
    const analyzeResult = await apiService.analyzeMessage("Hello test message");
    results.analyze = analyzeResult;
    setTestResults({ ...results });

    setIsLoading(false);
  };

  const ResultCard = ({ title, result }) => (
    <div className="bg-white rounded-lg p-4 shadow-md border">
      <div className="flex items-center gap-2 mb-2">
        <div className={`w-3 h-3 rounded-full ${result?.success ? 'bg-green-500' : 'bg-red-500'}`} />
        <h3 className="font-semibold">{title}</h3>
        <span className="text-sm text-gray-500">({result?.status || 'N/A'})</span>
      </div>
      
      {result?.success ? (
        <div className="text-green-700 text-sm">
          ✅ Success: {result.data?.status || result.data?.message || 'Connected'}
        </div>
      ) : (
        <div className="text-red-700 text-sm">
          ❌ {result?.error || result?.data?.error || 'Failed'}
        </div>
      )}
      
      {result?.data && (
        <pre className="mt-2 text-xs bg-gray-100 p-2 rounded overflow-auto max-h-20">
          {JSON.stringify(result.data, null, 2)}
        </pre>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            🛡️ SpamShield Backend Connection Test
          </h1>
          <p className="text-gray-600">
            Testing connection between React frontend and Flask backend
          </p>
        </motion.div>

        <div className="text-center mb-8">
          <button
            onClick={runTests}
            disabled={isLoading}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 mx-auto"
          >
            {isLoading ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Testing...
              </>
            ) : (
              <>
                🧪 Run Backend Tests
              </>
            )}
          </button>
        </div>

        <div className="grid gap-4 md:grid-cols-1 lg:grid-cols-3">
          <ResultCard 
            title="Backend Health (/health)"
            result={testResults.health}
          />
          <ResultCard 
            title="API Health (/api/health)" 
            result={testResults.apiHealth}
          />
          <ResultCard 
            title="Analyze Endpoint (No Auth)"
            result={testResults.analyze}
          />
        </div>

        {Object.keys(testResults).length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-8 bg-white rounded-lg p-6 shadow-md"
          >
            <h2 className="text-xl font-semibold mb-4">📊 Test Summary</h2>
            <div className="grid gap-2">
              <div className="flex justify-between">
                <span>Backend Server:</span>
                <span className={testResults.health?.success ? 'text-green-600' : 'text-red-600'}>
                  {testResults.health?.success ? '✅ Running' : '❌ Offline'}
                </span>
              </div>
              <div className="flex justify-between">
                <span>API Endpoints:</span>
                <span className={testResults.apiHealth?.success ? 'text-green-600' : 'text-red-600'}>
                  {testResults.apiHealth?.success ? '✅ Available' : '❌ Unavailable'}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Authentication:</span>
                <span className={testResults.analyze?.status === 401 ? 'text-green-600' : 'text-yellow-600'}>
                  {testResults.analyze?.status === 401 ? '✅ Protected' : '⚠️ Checking...'}
                </span>
              </div>
            </div>
            
            {testResults.health?.success && testResults.apiHealth?.success ? (
              <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg">
                <div className="text-green-800 font-semibold">🎉 Backend Connection Successful!</div>
                <div className="text-green-700 text-sm">Ready to proceed with frontend integration.</div>
              </div>
            ) : (
              <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                <div className="text-red-800 font-semibold">❌ Backend Connection Failed</div>
                <div className="text-red-700 text-sm">Backend: https://spamsheild-1.onrender.com</div>
              </div>
            )}
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default BackendTest;