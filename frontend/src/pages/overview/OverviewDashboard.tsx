import React from 'react';
import { Card } from '../../components/ui/Card';
import { LineChart } from '../../components/charts/LineChart';
import { useQuery } from '@tanstack/react-query';
import { fetchSwitchMetrics } from '../../services/api';

const OverviewDashboard: React.FC = () => {
  const { data } = useQuery({
    queryKey: ['switchMetrics'],
    queryFn: fetchSwitchMetrics
  });

  // Mock overview statistics
  const stats = {
    totalPorts: 48,
    activePorts: 42,
    portUtilization: 87.5,
    totalTraffic: '2.5 Tbps',
    cpuUsage: 45,
    memoryUsage: 62,
    temperature: 42,
    alerts: 3
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Dashboard Overview</h1>

      <div className="grid grid-cols-1 gap-6">
        {/* Quick Stats */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <Card className="p-6">
            <h3 className="text-sm font-medium text-gray-500">Port Status</h3>
            <div className="mt-2 flex items-baseline">
              <p className="text-3xl font-semibold text-gray-900">{stats.activePorts}/{stats.totalPorts}</p>
              <p className="ml-2 text-sm text-green-600">Active</p>
            </div>
            <div className="mt-1">
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-green-500 h-2 rounded-full"
                  style={{ width: `${stats.portUtilization}%` }}
                ></div>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="text-sm font-medium text-gray-500">Total Traffic</h3>
            <p className="mt-2 text-3xl font-semibold text-gray-900">{stats.totalTraffic}</p>
            <p className="mt-1 text-sm text-gray-500">Across all ports</p>
          </Card>

          <Card className="p-6">
            <h3 className="text-sm font-medium text-gray-500">System Health</h3>
            <div className="mt-2 space-y-2">
              <div>
                <div className="flex justify-between text-sm">
                  <span>CPU</span>
                  <span>{stats.cpuUsage}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-blue-500 h-2 rounded-full"
                    style={{ width: `${stats.cpuUsage}%` }}
                  ></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm">
                  <span>Memory</span>
                  <span>{stats.memoryUsage}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-purple-500 h-2 rounded-full"
                    style={{ width: `${stats.memoryUsage}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="text-sm font-medium text-gray-500">Active Alerts</h3>
            <p className="mt-2 text-3xl font-semibold text-red-600">{stats.alerts}</p>
            <p className="mt-1 text-sm text-gray-500">Require attention</p>
          </Card>
        </div>

        {/* Traffic Overview */}
        <Card className="p-6">
          <h2 className="text-lg font-medium mb-4">Network Traffic Overview</h2>
          <LineChart
            data={data?.trafficStats.map(stat => ({
              timestamp: stat.timestamp,
              ingress: stat.ingressTraffic,
              egress: stat.egressTraffic
            })) || []}
          />
        </Card>

        {/* System Status */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <Card className="p-6">
            <h2 className="text-lg font-medium mb-4">Top Active Ports</h2>
            <div className="space-y-4">
              {data?.portUtilization.slice(0, 5).map((port, index) => (
                <div key={index} className="flex items-center justify-between">
                  <span className="text-sm font-medium">Port {port.portId}</span>
                  <div className="flex-1 mx-4">
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-blue-500 h-2 rounded-full"
                        style={{ width: `${(port.packetsPerSecond / 10000) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                  <span className="text-sm text-gray-500">{port.packetsPerSecond} pps</span>
                </div>
              ))}
            </div>
          </Card>

          <Card className="p-6">
            <h2 className="text-lg font-medium mb-4">Recent Events</h2>
            <div className="space-y-4">
              <div className="flex items-center">
                <span className="w-2 h-2 bg-red-500 rounded-full mr-2"></span>
                <span className="text-sm">High CPU temperature detected</span>
                <span className="ml-auto text-sm text-gray-500">2m ago</span>
              </div>
              <div className="flex items-center">
                <span className="w-2 h-2 bg-yellow-500 rounded-full mr-2"></span>
                <span className="text-sm">Port GE1/0/1 high utilization</span>
                <span className="ml-auto text-sm text-gray-500">5m ago</span>
              </div>
              <div className="flex items-center">
                <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                <span className="text-sm">System backup completed</span>
                <span className="ml-auto text-sm text-gray-500">15m ago</span>
              </div>
              <div className="flex items-center">
                <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                <span className="text-sm">Configuration changes applied</span>
                <span className="ml-auto text-sm text-gray-500">30m ago</span>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default OverviewDashboard; 