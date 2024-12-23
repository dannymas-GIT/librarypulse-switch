import React from 'react';
import { Card } from '../../components/ui/Card';
import { LineChart } from '../../components/charts/LineChart';
import { useQuery } from '@tanstack/react-query';
import { fetchSwitchMetrics } from '../../services/api';

const LatencyMetrics: React.FC = () => {
  const { data: metrics, isLoading } = useQuery({
    queryKey: ['switchMetrics'],
    queryFn: fetchSwitchMetrics
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-lg">Loading latency metrics...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Latency Metrics</h1>
      
      <div className="grid grid-cols-1 gap-6">
        <Card className="p-6">
          <h2 className="text-lg font-medium mb-4">Network Latency Over Time</h2>
          <LineChart
            data={metrics?.trafficStats.map(stat => ({
              timestamp: stat.timestamp,
              ingress: stat.ingressTraffic,
              egress: stat.egressTraffic
            })) || []}
          />
        </Card>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          <Card className="p-6">
            <h3 className="text-lg font-medium mb-2">Average Latency</h3>
            <p className="text-3xl font-bold">2.5 ms</p>
            <p className="text-sm text-gray-500 mt-1">Last 24 hours</p>
          </Card>

          <Card className="p-6">
            <h3 className="text-lg font-medium mb-2">Peak Latency</h3>
            <p className="text-3xl font-bold">8.1 ms</p>
            <p className="text-sm text-gray-500 mt-1">Last 24 hours</p>
          </Card>

          <Card className="p-6">
            <h3 className="text-lg font-medium mb-2">Jitter</h3>
            <p className="text-3xl font-bold">0.8 ms</p>
            <p className="text-sm text-gray-500 mt-1">Last 24 hours</p>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default LatencyMetrics; 