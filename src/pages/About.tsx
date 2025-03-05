import React from 'react';
import { Shield, AlertTriangle, Zap, ThermometerSun } from 'lucide-react';

export default function About() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">About Fire Hazard Monitoring System</h1>
        
        <div className="prose max-w-none">
          <p className="text-gray-600 mb-8">
            Our Fire Hazard Monitoring System is a state-of-the-art solution designed to provide real-time monitoring
            of critical environmental parameters to ensure safety and early detection of potential hazards.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <div className="flex items-start space-x-4">
              <ThermometerSun className="h-8 w-8 text-red-500 flex-shrink-0" />
              <div>
                <h3 className="text-lg font-semibold mb-2">Temperature Monitoring</h3>
                <p className="text-gray-600">
                  Continuous monitoring of ambient temperature with alerts when exceeding 35°C,
                  indicating potential fire hazards.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <AlertTriangle className="h-8 w-8 text-yellow-500 flex-shrink-0" />
              <div>
                <h3 className="text-lg font-semibold mb-2">Smoke Detection</h3>
                <p className="text-gray-600">
                  Advanced smoke level monitoring with immediate alerts when levels exceed 1550 ppm,
                  ensuring early fire detection.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <Zap className="h-8 w-8 text-blue-500 flex-shrink-0" />
              <div>
                <h3 className="text-lg font-semibold mb-2">Voltage Monitoring</h3>
                <p className="text-gray-600">
                  Real-time electrical system monitoring with alerts for voltages exceeding 3.0V,
                  preventing electrical hazards.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <Shield className="h-8 w-8 text-green-500 flex-shrink-0" />
              <div>
                <h3 className="text-lg font-semibold mb-2">24/7 Protection</h3>
                <p className="text-gray-600">
                  Continuous monitoring and instant alerts ensure round-the-clock protection
                  for your safety and peace of mind.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-gray-50 p-6 rounded-lg">
            <h3 className="text-xl font-semibold mb-4">Safety First</h3>
            <p className="text-gray-600">
              Our system is designed with your safety in mind, providing real-time monitoring and
              instant alerts to help prevent accidents before they occur. Regular monitoring and
              maintenance of the system ensure reliable operation when you need it most.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}