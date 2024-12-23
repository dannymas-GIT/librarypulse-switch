import React from 'react';
import { Card } from '../../components/ui/Card';
import { DataTable } from '../../components/ui/DataTable';
import { useQuery } from '@tanstack/react-query';
import { fetchSwitchMetrics } from '../../services/api';

const PortStatus: React.FC = () => {
  const { data: metrics, isLoading } = useQuery({
    queryKey: ['switchMetrics'],
    queryFn: fetchSwitchMetrics
  });

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Port Status</h1>
      <Card className="p-6">
        <DataTable
          columns={[
            { header: 'Port', accessorKey: 'portId' },
            { header: 'Status', accessorKey: 'status' },
            { header: 'Bandwidth', accessorKey: 'bandwidth' },
            { header: 'Packets/s', accessorKey: 'packetsPerSecond' },
            { header: 'Errors', accessorKey: 'errors' }
          ]}
          data={metrics?.portUtilization || []}
        />
      </Card>
    </div>
  );
};

export default PortStatus; 