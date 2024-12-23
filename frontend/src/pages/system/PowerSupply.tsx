import React from 'react';
import { Card } from '../../components/ui/Card';
import { DataTable } from '../../components/ui/DataTable';
import { LineChart } from '../../components/charts/LineChart';
import { useQuery } from '@tanstack/react-query';
import { fetchSwitchMetrics } from '../../services/api';

const PowerSupply: React.FC = () => {
  // Mock power supply data
  const psuData = [
    {
      id: 'PSU1',
      status: 'Active',
      voltage: 12.1,
      current: 8.5,
      power: 102.85,
      temperature: 45,
      fanSpeed: 2100,
    },
    {
      id: 'PSU2',
      status: 'Active',
      voltage: 12.0,
      current: 8.2,
      power: 98.4,
      temperature: 43,
      fanSpeed: 1950,
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'standby':
        return 'bg-yellow-100 text-yellow-800';
      case 'fault':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Power Supply Status</h1>

      <div className="grid grid-cols-1 gap-6">
        <Card className="p-6">
          <h2 className="text-lg font-medium mb-4">Power Supply Units</h2>
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            {psuData.map((psu) => (
              <Card key={psu.id} className="p-4 border border-gray-200">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-lg font-medium">{psu.id}</h3>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(psu.status)}`}>
                    {psu.status}
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-500">Voltage</p>
                    <p className="text-lg font-semibold">{psu.voltage}V</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Current</p>
                    <p className="text-lg font-semibold">{psu.current}A</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Power</p>
                    <p className="text-lg font-semibold">{psu.power}W</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Temperature</p>
                    <p className="text-lg font-semibold">{psu.temperature}°C</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Fan Speed</p>
                    <p className="text-lg font-semibold">{psu.fanSpeed} RPM</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </Card>

        <Card className="p-6">
          <h2 className="text-lg font-medium mb-4">Power Consumption History</h2>
          <LineChart
            data={Array.from({ length: 24 }, (_, i) => ({
              timestamp: new Date(Date.now() - (23 - i) * 3600000).toISOString(),
              ingress: Math.random() * 50 + 150, // Mock power consumption data
              egress: Math.random() * 50 + 150,
            }))}
          />
        </Card>

        <Card className="p-6">
          <h2 className="text-lg font-medium mb-4">Power Supply Events</h2>
          <DataTable
            columns={[
              { header: 'Time', accessorKey: 'time' },
              { header: 'PSU', accessorKey: 'psu' },
              { header: 'Event', accessorKey: 'event' },
              { header: 'Details', accessorKey: 'details' },
            ]}
            data={[
              { time: '09:45:23', psu: 'PSU1', event: 'Voltage Fluctuation', details: 'Voltage normalized after brief fluctuation' },
              { time: '08:30:15', psu: 'PSU2', event: 'Fan Speed Change', details: 'Fan speed increased due to temperature' },
              { time: '07:15:00', psu: 'PSU1', event: 'Status Change', details: 'Switched to active mode from standby' },
            ]}
          />
        </Card>
      </div>
    </div>
  );
};

export default PowerSupply; 