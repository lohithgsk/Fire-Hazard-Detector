import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { ApiResponse, SensorData } from '../types';
import SensorCard from '../components/SensorCard';

export default function Dashboard() {
  const [data, setData] = useState<SensorData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get<ApiResponse>(
          'https://api.thingspeak.com/channels/2863220/feeds.json?api_key=KKRHPXAAFHZ1Q3A3&results=1'
        );
        setData(response.data.feeds[0]);
        setError(null);
      } catch (err) {
        setError('Failed to fetch sensor data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 5000); // Fetch every 5 seconds

    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-red-500 border-t-transparent"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-red-500">{error}</div>
      </div>
    );
  }

  if (!data) return null;

  const temperature = parseFloat(data.field1);
  const humidity = parseFloat(data.field2);
  const smokeLevel = parseFloat(data.field3);
  const voltage = parseFloat(data.field4);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Sensor Readings</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <SensorCard
          title="Temperature"
          value={data.field1}
          unit="°C"
          icon="temperature"
          alert={temperature > 35}
          alertMessage={temperature > 35 ? "Possible Fire Alert!" : undefined}
        />
        <SensorCard
          title="Humidity"
          value={data.field2}
          unit="%"
          icon="humidity"
        />
        <SensorCard
          title="Smoke Level"
          value={data.field3}
          unit="ppm"
          icon="smoke"
          alert={smokeLevel > 1550}
          alertMessage={smokeLevel > 1550 ? "Smoke Detected!" : undefined}
        />
        <SensorCard
          title="Voltage"
          value={data.field4}
          unit="V"
          icon="voltage"
          alert={voltage > 3.0}
          alertMessage={voltage > 3.0 ? "Possible Electrical Hazard!" : undefined}
        />
      </div>
    </div>
  );
}