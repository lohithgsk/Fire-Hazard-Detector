import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AlertTriangle } from 'lucide-react';

export default function Navbar() {
  const location = useLocation();
  
  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <AlertTriangle className="h-8 w-8 text-red-500" />
            <span className="ml-2 text-xl font-semibold">Fire Hazard Monitor</span>
          </div>
          <div className="flex items-center space-x-4">
            <Link
              to="/"
              className={`px-3 py-2 rounded-md text-sm font-medium ${
                location.pathname === '/' 
                  ? 'bg-red-500 text-white'
                  : 'text-gray-700 hover:bg-red-100'
              }`}
            >
              Dashboard
            </Link>
            <Link
              to="/video"
              className={`px-3 py-2 rounded-md text-sm font-medium ${
                location.pathname === '/video'
                  ? 'bg-red-500 text-white'
                  : 'text-gray-700 hover:bg-red-100'
              }`}
            >
              Video Feed
            </Link>
            <Link
              to="/about"
              className={`px-3 py-2 rounded-md text-sm font-medium ${
                location.pathname === '/about'
                  ? 'bg-red-500 text-white'
                  : 'text-gray-700 hover:bg-red-100'
              }`}
            >
              About
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}