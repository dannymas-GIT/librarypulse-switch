import React, { useState } from 'react';
import { 
  Network, 
  Activity, 
  Cpu, 
  AlertCircle, 
  Settings,
  Boxes,
  Radio
} from 'lucide-react';

interface NavigationItem {
  label: string;
  icon: React.ReactNode;
  href: string;
  subItems?: { label: string; href: string }[];
}

const navigationItems: NavigationItem[] = [
  {
    label: 'Overview',
    icon: <Network className="w-5 h-5" />,
    href: '/overview'
  },
  {
    label: 'Port Management',
    icon: <Boxes className="w-5 h-5" />,
    href: '/ports',
    subItems: [
      { label: 'Port Status', href: '/ports/status' },
      { label: 'Traffic Analysis', href: '/ports/traffic' },
      { label: 'Error Statistics', href: '/ports/errors' }
    ]
  },
  {
    label: 'Performance',
    icon: <Activity className="w-5 h-5" />,
    href: '/performance',
    subItems: [
      { label: 'Bandwidth Utilization', href: '/performance/bandwidth' },
      { label: 'Latency Metrics', href: '/performance/latency' },
      { label: 'QoS Statistics', href: '/performance/qos' }
    ]
  },
  {
    label: 'System Health',
    icon: <Cpu className="w-5 h-5" />,
    href: '/system',
    subItems: [
      { label: 'CPU & Memory', href: '/system/resources' },
      { label: 'Temperature', href: '/system/temperature' },
      { label: 'Power Supply', href: '/system/power' }
    ]
  },
  {
    label: 'Logs & Alerts',
    icon: <AlertCircle className="w-5 h-5" />,
    href: '/logs',
    subItems: [
      { label: 'System Logs', href: '/logs/system' },
      { label: 'Port Logs', href: '/logs/ports' },
      { label: 'Alert History', href: '/logs/alerts' }
    ]
  },
  {
    label: 'Settings',
    icon: <Settings className="w-5 h-5" />,
    href: '/settings'
  }
];

export const Sidebar: React.FC = () => {
  const [expandedItem, setExpandedItem] = useState<string | null>(null);

  return (
    <div className="w-64 min-h-screen bg-white border-r border-gray-200">
      <div className="p-6 border-b border-gray-200">
        <h1 className="text-xl font-bold text-gray-900">Switch Monitor</h1>
      </div>
      <nav className="p-4 space-y-1">
        {navigationItems.map((item) => (
          <div key={item.href} className="space-y-1">
            <button
              onClick={() => setExpandedItem(expandedItem === item.label ? null : item.label)}
              className="flex items-center w-full px-4 py-2 text-sm font-medium text-gray-700 rounded-md hover:bg-gray-50 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
            >
              {item.icon}
              <span className="ml-3">{item.label}</span>
            </button>
            {item.subItems && expandedItem === item.label && (
              <div className="pl-11 space-y-1">
                {item.subItems.map((subItem) => (
                  <a
                    key={subItem.href}
                    href={subItem.href}
                    className="block py-2 px-4 text-sm text-gray-600 rounded-md hover:bg-gray-50 hover:text-gray-900"
                  >
                    {subItem.label}
                  </a>
                ))}
              </div>
            )}
          </div>
        ))}
      </nav>
    </div>
  );
}; 