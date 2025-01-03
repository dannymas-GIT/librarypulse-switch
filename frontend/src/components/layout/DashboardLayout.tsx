import React from 'react';
import { Link, useLocation } from 'react-router-dom';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const NavLink = ({ to, children }: { to: string; children: React.ReactNode }) => {
  const location = useLocation();
  const isActive = location.pathname === to;

  return (
    <Link
      to={to}
      className={`flex items-center px-4 py-2 text-sm font-medium rounded-md ${
        isActive
          ? 'bg-gray-100 text-gray-900'
          : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
      }`}
    >
      {children}
    </Link>
  );
};

export const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="fixed inset-y-0 left-0 w-64 bg-white border-r border-gray-200">
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="flex items-center h-16 px-4 border-b border-gray-200">
            <h1 className="text-xl font-bold text-gray-900">Switch Dashboard</h1>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-2 py-4 space-y-1">
            <NavLink to="/">Overview</NavLink>
            
            <div className="pt-4">
              <p className="px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Ports
              </p>
              <div className="mt-2 space-y-1">
                <NavLink to="/ports/status">Status</NavLink>
                <NavLink to="/ports/traffic">Traffic Analysis</NavLink>
                <NavLink to="/ports/errors">Error Stats</NavLink>
              </div>
            </div>

            <div className="pt-4">
              <p className="px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Performance
              </p>
              <div className="mt-2 space-y-1">
                <NavLink to="/performance/bandwidth">Bandwidth</NavLink>
                <NavLink to="/performance/latency">Latency</NavLink>
                <NavLink to="/performance/qos">QoS</NavLink>
              </div>
            </div>

            <div className="pt-4">
              <p className="px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                System
              </p>
              <div className="mt-2 space-y-1">
                <NavLink to="/system/resources">Resources</NavLink>
                <NavLink to="/system/temperature">Temperature</NavLink>
                <NavLink to="/system/power">Power Supply</NavLink>
              </div>
            </div>

            <div className="pt-4">
              <p className="px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Logs
              </p>
              <div className="mt-2 space-y-1">
                <NavLink to="/logs/system">System Logs</NavLink>
                <NavLink to="/logs/ports">Port Logs</NavLink>
                <NavLink to="/logs/alerts">Alert History</NavLink>
              </div>
            </div>

            <div className="pt-4">
              <NavLink to="/settings">Settings</NavLink>
            </div>
          </nav>
        </div>
      </div>

      {/* Main content */}
      <div className="pl-64">
        <main className="py-6">
          <div className="mx-auto px-4 sm:px-6 md:px-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout; 