import React from 'react';
import { Card } from '../../components/ui/Card';
import { LineChart } from '../../components/charts/LineChart';
import { DataTable } from '../../components/ui/DataTable';
import { useQuery } from '@tanstack/react-query';
import { fetchSwitchMetrics } from '../../services/api';
import type { Column } from '../../types/table';

interface TopPort {
  port: string;
  ingress: string;
  egress: string;
  utilization: string;
}

const TrafficAnalysis: React.FC = () => {
  const { data: metrics, isLoading } = useQuery({
    queryKey: ['switchMetrics'],
    queryFn: fetchSwitchMetrics
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-lg">Loading traffic analysis...</div>
      </div>
    );
  }

  // Mock traffic data
  const trafficStats = {
    totalIngress: '1.2 Tbps',
    totalEgress: '980 Gbps',
    peakIngress: '1.5 Tbps',
    peakEgress: '1.2 Tbps',
    topPorts: [
      { port: 'GE1/0/1', ingress: '120 Gbps', egress: '98 Gbps', utilization: '85%' },
      { port: 'GE1/0/2', ingress: '95 Gbps', egress: '88 Gbps', utilization: '72%' },
      { port: 'GE1/0/3', ingress: '85 Gbps', egress: '79 Gbps', utilization: '65%' },
      { port: 'GE1/0/4', ingress: '78 Gbps', egress: '72 Gbps', utilization: '60%' },
      { port: 'GE1/0/5', ingress: '65 Gbps', egress: '58 Gbps', utilization: '50%' },
    ]
  };

  const columns: Column<TopPort>[] = [
    { header: 'Port', accessorKey: 'port' },
    { header: 'Ingress', accessorKey: 'ingress' },
    { header: 'Egress', accessorKey: 'egress' },
    {
      header: 'Utilization',
      accessorKey: 'utilization',
      cell: ({ row }) => (
        <div className="flex items-center">
          <span className="mr-2">{row.original.utilization}</span>
          <div className="flex-1 h-2 bg-gray-200 rounded-full">
            <div
              className="h-2 bg-blue-500 rounded-full"
              style={{ width: row.original.utilization }}
            ></div>
          </div>
        </div>
      )
    }
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Traffic Analysis</h1>

      <div className="grid grid-cols-1 gap-6">
        {/* Traffic Overview Cards */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <Card className="p-6">
            <h3 className="text-sm font-medium text-gray-500">Total Ingress</h3>
            <p className="mt-2 text-3xl font-semibold text-gray-900">{trafficStats.totalIngress}</p>
            <p className="mt-1 text-sm text-gray-500">Current throughput</p>
          </Card>

          <Card className="p-6">
            <h3 className="text-sm font-medium text-gray-500">Total Egress</h3>
            <p className="mt-2 text-3xl font-semibold text-gray-900">{trafficStats.totalEgress}</p>
            <p className="mt-1 text-sm text-gray-500">Current throughput</p>
          </Card>

          <Card className="p-6">
            <h3 className="text-sm font-medium text-gray-500">Peak Ingress</h3>
            <p className="mt-2 text-3xl font-semibold text-gray-900">{trafficStats.peakIngress}</p>
            <p className="mt-1 text-sm text-gray-500">Last 24 hours</p>
          </Card>

          <Card className="p-6">
            <h3 className="text-sm font-medium text-gray-500">Peak Egress</h3>
            <p className="mt-2 text-3xl font-semibold text-gray-900">{trafficStats.peakEgress}</p>
            <p className="mt-1 text-sm text-gray-500">Last 24 hours</p>
          </Card>
        </div>

        {/* Traffic History Chart */}
        <Card className="p-6">
          <h2 className="text-lg font-medium mb-4">Traffic History</h2>
          <LineChart
            data={metrics?.trafficStats.map(stat => ({
              timestamp: stat.timestamp,
              ingress: stat.ingressTraffic,
              egress: stat.egressTraffic
            })) || []}
          />
        </Card>

        {/* Top Ports Table */}
        <Card className="p-6">
          <h2 className="text-lg font-medium mb-4">Top Ports by Traffic</h2>
          <DataTable
            columns={columns}
            data={trafficStats.topPorts}
          />
        </Card>

        {/* Traffic Distribution */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <Card className="p-6">
            <h2 className="text-lg font-medium mb-4">Protocol Distribution</h2>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm text-gray-600 mb-1">
                  <span>HTTP/HTTPS</span>
                  <span>45%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-blue-500 h-2 rounded-full" style={{ width: '45%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm text-gray-600 mb-1">
                  <span>Database</span>
                  <span>25%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-green-500 h-2 rounded-full" style={{ width: '25%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm text-gray-600 mb-1">
                  <span>File Transfer</span>
                  <span>20%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-yellow-500 h-2 rounded-full" style={{ width: '20%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm text-gray-600 mb-1">
                  <span>Other</span>
                  <span>10%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-gray-500 h-2 rounded-full" style={{ width: '10%' }}></div>
                </div>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <h2 className="text-lg font-medium mb-4">Traffic Patterns</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-medium">Peak Hours</h3>
                  <p className="text-sm text-gray-500">10:00 AM - 4:00 PM</p>
                </div>
                <span className="text-lg font-semibold">1.2 Tbps avg</span>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-medium">Off-Peak Hours</h3>
                  <p className="text-sm text-gray-500">8:00 PM - 6:00 AM</p>
                </div>
                <span className="text-lg font-semibold">450 Gbps avg</span>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-medium">Busiest Day</h3>
                  <p className="text-sm text-gray-500">Wednesday</p>
                </div>
                <span className="text-lg font-semibold">1.5 Tbps peak</span>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-medium">Quietest Day</h3>
                  <p className="text-sm text-gray-500">Sunday</p>
                </div>
                <span className="text-lg font-semibold">300 Gbps avg</span>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default TrafficAnalysis; 