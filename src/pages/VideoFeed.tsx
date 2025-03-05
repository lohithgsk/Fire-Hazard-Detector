import React, { useEffect, useState } from 'react';
import { Camera } from 'lucide-react';
import axios from 'axios';

interface FireStatus {
  is_fire: boolean;
  frame: string;
}

export default function VideoFeed() {
  const [fireStatus, setFireStatus] = useState<FireStatus | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const checkConnection = async () => {
      try {
        // Try to fetch fire status to check connection
        const response = await axios.get('http://127.0.0.1:5000/fire_status');
        setFireStatus(response.data);
        setIsConnected(true);
        setError(null);
      } catch (err) {
        setIsConnected(false);
        setError('Unable to connect to video feed');
        console.error(err);
      }
    };

    // Initial check
    checkConnection();

    // Check connection and fetch status periodically
    const intervals = [
      setInterval(checkConnection, 5000),
      setInterval(checkConnection, 2000)
    ];

    return () => {
      intervals.forEach(clearInterval);
    };
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="bg-white rounded-lg shadow-lg p-8">
        <div className="flex items-center mb-6">
          <Camera className="h-8 w-8 text-red-500 mr-3" />
          <h1 className="text-3xl font-bold text-gray-900">Live Fire Detection</h1>
        </div>

        {/* Video Feed Area */}
        <div className="aspect-video bg-gray-100 rounded-lg overflow-hidden relative">
          {/* Fallback or error state */}
          {(!isConnected || error) && (
            <div className="absolute inset-0 flex items-center justify-center bg-gray-200">
              <p className="text-gray-600">
                {error || 'Connecting to video feed...'}
              </p>
            </div>
          )}

          {/* Video Feed */}
          <img 
            src="http://127.0.0.1:5000/video_feed" 
            alt="Live Video Feed" 
            className="w-full h-full object-contain"
          />
        </div>

        {/* Status Indicator */}
        <div className="mt-4 flex items-center justify-between">
          <div className="flex items-center">
            <div className={`w-2 h-2 rounded-full mr-2 ${isConnected ? 'bg-green-500 animate-pulse' : 'bg-red-500'}`}></div>
            <span className={`text-sm font-medium ${isConnected ? 'text-green-600' : 'text-red-600'}`}>
              {isConnected ? 'Live Feed Active' : 'Feed Disconnected'}
            </span>
          </div>

          {fireStatus && (
            <div className={`px-4 py-2 rounded ${
              fireStatus.is_fire ? 'bg-red-500 text-white' : 'bg-green-500 text-white'
            }`}>
              {fireStatus.is_fire ? 'FIRE DETECTED' : 'ALL CLEAR'}
            </div>
          )}
        </div>

        {/* Information Section */}
        <div className="mt-6 bg-gray-50 rounded-lg p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-3">Fire Detection System</h2>
          <p className="text-gray-600">
            Real-time video analysis for fire detection using advanced machine learning techniques.
            The system continuously monitors the video feed and provides immediate alerts if fire is detected.
          </p>
        </div>
      </div>
    </div>
  );
}