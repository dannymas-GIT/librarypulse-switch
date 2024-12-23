import React from 'react';
import { useQuery } from '@tanstack/react-query';

interface PortError {
  portId: string;
  status: string;
  errors: number;
  timestamp: string;
}

const mockData: PortError[] = [
  { portId: 'Port 1', status: 'Error', errors: 5, timestamp: '2023-12-23T10:00:00' },
  { portId: 'Port 2', status: 'Warning', errors: 2, timestamp: '2023-12-23T10:00:00' },
  { portId: 'Port 3', status: 'Error', errors: 8, timestamp: '2023-12-23T10:00:00' },
];

const ErrorStats: React.FC = () => {
  const { data: portErrors = mockData, isLoading } = useQuery({
    queryKey: ['portErrors'],
    queryFn: async () => {
      // TODO: Replace with actual API call
      return mockData;
    },
  });

  if (isLoading) {
    return (
      <div className="p-4">
        <div className="animate-pulse">Loading error statistics...</div>
      </div>
    );
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Error Statistics</h1>
      
      <div className="grid gap-6">
        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white shadow rounded-lg p-6">
            <h3 className="text-sm font-medium text-gray-500">Total Errors</h3>
            <p className="text-2xl font-semibold text-red-600">
              {portErrors.reduce((sum, port) => sum + port.errors, 0)}
            </p>
          </div>
          <div className="bg-white shadow rounded-lg p-6">
            <h3 className="text-sm font-medium text-gray-500">Affected Ports</h3>
            <p className="text-2xl font-semibold text-amber-600">
              {portErrors.length}
            </p>
          </div>
          <div className="bg-white shadow rounded-lg p-6">
            <h3 className="text-sm font-medium text-gray-500">Latest Update</h3>
            <p className="text-sm text-gray-600">
              {new Date().toLocaleString()}
            </p>
          </div>
        </div>

        {/* Error Table */}
        <div className="bg-white shadow rounded-lg overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Port ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Errors</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Error</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {portErrors.map((port) => (
                <tr key={port.portId}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{port.portId}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      port.status === 'Error' ? 'bg-red-100 text-red-800' : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {port.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{port.errors}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(port.timestamp).toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ErrorStats; 