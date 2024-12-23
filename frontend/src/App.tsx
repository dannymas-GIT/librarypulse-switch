import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { DashboardLayout } from './components/layout';
import {
  OverviewDashboard,
  PortStatus,
  TrafficAnalysis,
  ErrorStats,
  BandwidthUtilization,
  LatencyMetrics,
  QosStats,
  SystemResources,
  Temperature,
  PowerSupply,
  SystemLogs,
  PortLogs,
  AlertHistory,
  Settings
} from './pages';

const queryClient = new QueryClient();

const App: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <DashboardLayout>
          <Routes>
            <Route path="/" element={<OverviewDashboard />} />
            <Route path="/ports/status" element={<PortStatus />} />
            <Route path="/ports/traffic" element={<TrafficAnalysis />} />
            <Route path="/ports/errors" element={<ErrorStats />} />
            <Route path="/performance/bandwidth" element={<BandwidthUtilization />} />
            <Route path="/performance/latency" element={<LatencyMetrics />} />
            <Route path="/performance/qos" element={<QosStats />} />
            <Route path="/system/resources" element={<SystemResources />} />
            <Route path="/system/temperature" element={<Temperature />} />
            <Route path="/system/power" element={<PowerSupply />} />
            <Route path="/logs/system" element={<SystemLogs />} />
            <Route path="/logs/ports" element={<PortLogs />} />
            <Route path="/logs/alerts" element={<AlertHistory />} />
            <Route path="/settings" element={<Settings />} />
          </Routes>
        </DashboardLayout>
      </Router>
    </QueryClientProvider>
  );
};

export default App;
