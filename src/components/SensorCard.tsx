import React from 'react';
import { Thermometer, Droplets, Wind, Zap } from 'lucide-react';

interface SensorCardProps {
  title: string;
  value: string;
  unit: string;
  icon: 'temperature' | 'humidity' | 'smoke' | 'voltage';
  alert?: boolean;
  alertMessage?: string;
}

export default function SensorCard({ title, value, unit, icon, alert, alertMessage }: SensorCardProps) {
  const icons = {
    temperature: <Thermometer className="h-8 w-8" />,
    humidity: <Droplets className="h-8 w-8" />,
    smoke: <Wind className="h-8 w-8" />,
    voltage: <Zap className="h-8 w-8" />
  };

  return (
    <div className={`p-6 rounded-lg shadow-md ${alert ? 'bg-red-50' : 'bg-white'}`}>
      <div className="flex items-center justify-between mb-4">
        <div className={`p-3 rounded-full ${alert ? 'bg-red-100 text-red-600' : 'bg-gray-100 text-gray-600'}`}>
          {icons[icon]}
        </div>
        {alert && (
          <span className="text-red-600 text-sm font-medium px-2.5 py-0.5 rounded-full bg-red-100">
            Alert
          </span>
        )}
      </div>
      <h3 className="text-lg font-medium text-gray-900">{title}</h3>
      <div className="mt-2 flex items-baseline">
        <p className="text-3xl font-semibold text-gray-900">{value}</p>
        <p className="ml-2 text-sm text-gray-500">{unit}</p>
      </div>
      {alert && alertMessage && (
        <p className="mt-2 text-sm text-red-600">{alertMessage}</p>
      )}
    </div>
  );
}