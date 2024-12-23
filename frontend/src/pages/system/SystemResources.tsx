import React from 'react';
import { Card } from '../../components/ui/Card';
import { useQuery } from '@tanstack/react-query';
import { fetchSwitchMetrics } from '../../services/api';

const SystemResources: React.FC = () => {
  const { data: metrics, isLoading } = useQuery({
    queryKey: ['switchMetrics'],
    queryFn: fetchSwitchMetrics
  });

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">System Resources</h1>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <Card className="p-6">
          <h3 className="text-lg font-medium mb-2">CPU Usage</h3>
          <p className="text-3xl font-bold">{metrics?.systemHealth.cpuUsage}%</p>
        </Card>
        <Card className="p-6">
          <h3 className="text-lg font-medium mb-2">Memory Usage</h3>
          <p className="text-3xl font-bold">{metrics?.systemHealth.memoryUsage}%</p>
        </Card>
      </div>
    </div>
  );
};

export default SystemResources; 