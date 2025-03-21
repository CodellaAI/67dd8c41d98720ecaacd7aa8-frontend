
'use client'

import { useState } from 'react'
import axios from 'axios'

export default function Home() {
  const [status, setStatus] = useState('');
  const [loading, setLoading] = useState(false);

  const handleClick = async () => {
    try {
      setLoading(true);
      setStatus('Sending request...');
      
      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/log-click`, {
        message: 'Button clicked',
        timestamp: new Date()
      });
      
      setStatus(`Success! Entry added with ID: ${response.data.id}`);
    } catch (error) {
      console.error('Error logging click:', error);
      setStatus(`Error: ${error.message || 'Failed to log click'}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-center text-gray-800">
          Simple Click Logger
        </h1>
        
        <div className="flex flex-col items-center">
          <button
            onClick={handleClick}
            disabled={loading}
            className={`px-6 py-3 text-white font-medium rounded-lg transition-colors 
              ${loading 
                ? 'bg-gray-400 cursor-not-allowed' 
                : 'bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500'
              }`}
          >
            {loading ? 'Processing...' : 'Log Click to MongoDB'}
          </button>
          
          {status && (
            <div className={`mt-4 p-3 rounded-md text-sm ${
              status.includes('Success') 
                ? 'bg-green-100 text-green-800' 
                : status.includes('Error') 
                  ? 'bg-red-100 text-red-800' 
                  : 'bg-blue-100 text-blue-800'
            }`}>
              {status}
            </div>
          )}
        </div>
      </div>
    </main>
  )
}
