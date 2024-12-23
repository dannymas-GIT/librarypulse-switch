import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

interface BandwidthData {
  time: string;
  inbound: number;
  outbound: number;
}

interface BandwidthChartProps {
  data: BandwidthData[];
}

export const BandwidthChart: React.FC<BandwidthChartProps> = ({ data }) => {
  return (
    <div className="h-[300px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="time" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line
            type="monotone"
            dataKey="inbound"
            stroke="#3B82F6"
            strokeWidth={2}
            dot={false}
            name="Inbound Traffic"
          />
          <Line
            type="monotone"
            dataKey="outbound"
            stroke="#10B981"
            strokeWidth={2}
            dot={false}
            name="Outbound Traffic"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}; 