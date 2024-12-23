import React from 'react';
import { Card } from '../../components/ui/Card';
import { LineChart } from '../../components/charts/LineChart';
import { useQuery } from '@tanstack/react-query';
import { fetchSwitchMetrics } from '../../services/api';

const Temperature: React.FC = () => {
  const { data: metrics, isLoading } = useQuery({
    queryKey: ['switchMetrics'],
    queryFn: fetchSwitchMetrics
  });

  // Mock temperature data - in a real application, this would come from the API
  const temperatureData = {
    current: 42,
    threshold: 75,
    warning: 65,
    sensors: [
      { name: 'CPU', temp: 42, status: 'Normal' },
      { name: 'System', temp: 38, status: 'Normal' },
      { name: 'Power Supply 1', temp: 45, status: 'Normal' },
      { name: 'Power Supply 2', temp: 44, status: 'Normal' },
    ]
  };

  const getTemperatureColor = (temp: number) => {
    if (temp >= temperatureData.threshold) return 'text-red-600';
    if (temp >= temperatureData.warning) return 'text-yellow-600';
    return 'text-green-600';
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Temperature Monitoring</h1>
      
      <div className="grid grid-cols-1 gap-6">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {temperatureData.sensors.map((sensor, index) => (
            <Card key={index} className="p-6">
              <h3 className="text-lg font-medium mb-2">{sensor.name}</h3>
              <p className={`text-3xl font-bold ${getTemperatureColor(sensor.temp)}`}>
                {sensor.temp}°C
              </p>
              <p className="text-sm text-gray-500 mt-1">{sensor.status}</p>
            </Card>
          ))}
        </div>

        <Card className="p-6">
          <h2 className="text-lg font-medium mb-4">Temperature History</h2>
          <LineChart
            data={metrics?.trafficStats.map(stat => ({
              timestamp: stat.timestamp,
              ingress: stat.ingressTraffic,
              egress: stat.egressTraffic
            })) || []}
          />
        </Card>

        <Card className="p-6">
          <h2 className="text-lg font-medium mb-4">Temperature Thresholds</h2>
          <div className="space-y-4">
            <div>
              <h3 className="text-sm font-medium text-gray-500">Current vs Maximum</h3>
              <div className="mt-1 relative pt-1">
                <div className="overflow-hidden h-2 text-xs flex rounded bg-gray-200">
                  <div 
                    style={{ width: `${(temperatureData.current / temperatureData.threshold) * 100}%` }}
                    className={`shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center ${
                      getTemperatureColor(temperatureData.current).replace('text-', 'bg-')
                    }`}
                  ></div>
                </div>
                <div className="flex justify-between text-sm text-gray-600 mt-1">
                  <span>0°C</span>
                  <span>{temperatureData.threshold}°C</span>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Temperature; 