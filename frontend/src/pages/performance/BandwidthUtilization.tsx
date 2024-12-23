import React from 'react';
import { Card } from '../../components/ui/Card';
import { LineChart } from '../../components/charts/LineChart';
import { useQuery } from '@tanstack/react-query';
import { fetchSwitchMetrics } from '../../services/api';

const BandwidthUtilization: React.FC = () => {
  const { data: metrics, isLoading } = useQuery({
    queryKey: ['switchMetrics'],
    queryFn: fetchSwitchMetrics
  });

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Bandwidth Utilization</h1>
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <Card className="p-6">
          <h2 className="text-lg font-medium mb-4">Port Bandwidth Usage</h2>
          <LineChart
            data={metrics?.trafficStats.map(stat => ({
              timestamp: stat.timestamp,
              ingress: stat.ingressTraffic,
              egress: stat.egressTraffic
            })) || []}
          />
        </Card>
      </div>
    </div>
  );
};

export default BandwidthUtilization; 