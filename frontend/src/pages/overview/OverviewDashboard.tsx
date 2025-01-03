import React from 'react';

const OverviewDashboard: React.FC = () => {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Switch Overview</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Status Card */}
        <div className="bg-white rounded-lg shadow p-4">
          <h2 className="text-lg font-semibold mb-2">System Status</h2>
          <div className="flex items-center">
            <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
            <span>Operational</span>
          </div>
        </div>

        {/* Port Summary Card */}
        <div className="bg-white rounded-lg shadow p-4">
          <h2 className="text-lg font-semibold mb-2">Port Summary</h2>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span>Active Ports:</span>
              <span className="font-medium">24/48</span>
            </div>
            <div className="flex justify-between">
              <span>Error State:</span>
              <span className="font-medium text-green-500">None</span>
            </div>
          </div>
        </div>

        {/* Traffic Card */}
        <div className="bg-white rounded-lg shadow p-4">
          <h2 className="text-lg font-semibold mb-2">Network Traffic</h2>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span>Incoming:</span>
              <span className="font-medium">1.2 Gbps</span>
            </div>
            <div className="flex justify-between">
              <span>Outgoing:</span>
              <span className="font-medium">800 Mbps</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OverviewDashboard; 