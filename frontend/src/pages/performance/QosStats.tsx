import React from 'react';
import { Card } from '../../components/ui/Card';
import { DataTable } from '../../components/ui/DataTable';
import { LineChart } from '../../components/charts/LineChart';
import { useQuery } from '@tanstack/react-query';
import { fetchSwitchMetrics } from '../../services/api';

const QosStats: React.FC = () => {
  const { data: metrics, isLoading } = useQuery({
    queryKey: ['switchMetrics'],
    queryFn: fetchSwitchMetrics
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-lg">Loading QoS statistics...</div>
      </div>
    );
  }

  // Mock QoS data - in a real application, this would come from the API
  const qosData = [
    { priority: 'High', class: 'Voice', bandwidth: '20%', latency: '< 10ms', packetLoss: '< 0.1%' },
    { priority: 'High', class: 'Video', bandwidth: '30%', latency: '< 20ms', packetLoss: '< 0.5%' },
    { priority: 'Medium', class: 'Business', bandwidth: '30%', latency: '< 50ms', packetLoss: '< 1%' },
    { priority: 'Low', class: 'Default', bandwidth: '20%', latency: '< 100ms', packetLoss: '< 2%' },
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">QoS Statistics</h1>
      
      <div className="grid grid-cols-1 gap-6">
        <Card className="p-6">
          <h2 className="text-lg font-medium mb-4">Traffic Classes</h2>
          <DataTable
            columns={[
              { header: 'Priority', accessorKey: 'priority' },
              { header: 'Class', accessorKey: 'class' },
              { header: 'Bandwidth', accessorKey: 'bandwidth' },
              { header: 'Latency', accessorKey: 'latency' },
              { header: 'Packet Loss', accessorKey: 'packetLoss' },
            ]}
            data={qosData}
          />
        </Card>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <Card className="p-6">
            <h2 className="text-lg font-medium mb-4">Bandwidth Distribution</h2>
            <LineChart
              data={metrics?.trafficStats.map(stat => ({
                timestamp: stat.timestamp,
                ingress: stat.ingressTraffic,
                egress: stat.egressTraffic
              })) || []}
            />
          </Card>

          <Card className="p-6">
            <h2 className="text-lg font-medium mb-4">QoS Performance</h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-medium text-gray-500">Policy Compliance</h3>
                <div className="mt-1 relative pt-1">
                  <div className="overflow-hidden h-2 text-xs flex rounded bg-blue-100">
                    <div className="w-[95%] shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-500"></div>
                  </div>
                  <span className="text-sm font-semibold text-gray-700">95%</span>
                </div>
              </div>
              
              <div>
                <h3 className="text-sm font-medium text-gray-500">SLA Achievement</h3>
                <div className="mt-1 relative pt-1">
                  <div className="overflow-hidden h-2 text-xs flex rounded bg-green-100">
                    <div className="w-[98%] shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-green-500"></div>
                  </div>
                  <span className="text-sm font-semibold text-gray-700">98%</span>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default QosStats; 