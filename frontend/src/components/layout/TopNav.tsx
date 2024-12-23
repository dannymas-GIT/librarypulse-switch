import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Network, 
  Activity, 
  Cpu, 
  AlertCircle, 
  Boxes,
  ChevronDown
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
    icon: <Network className="w-6 h-6" />,
    href: '/'
  },
  {
    label: 'Port Management',
    icon: <Boxes className="w-6 h-6" />,
    href: '/ports',
    subItems: [
      { label: 'Port Status', href: '/ports/status' },
      { label: 'Traffic Analysis', href: '/ports/traffic' },
      { label: 'Error Statistics', href: '/ports/errors' }
    ]
  },
  {
    label: 'Performance',
    icon: <Activity className="w-6 h-6" />,
    href: '/performance',
    subItems: [
      { label: 'Bandwidth Utilization', href: '/performance/bandwidth' },
      { label: 'Latency Metrics', href: '/performance/latency' },
      { label: 'QoS Statistics', href: '/performance/qos' }
    ]
  },
  {
    label: 'System Health',
    icon: <Cpu className="w-6 h-6" />,
    href: '/system',
    subItems: [
      { label: 'CPU & Memory', href: '/system/resources' },
      { label: 'Temperature', href: '/system/temperature' },
      { label: 'Power Supply', href: '/system/power' }
    ]
  },
  {
    label: 'Logs & Alerts',
    icon: <AlertCircle className="w-6 h-6" />,
    href: '/logs',
    subItems: [
      { label: 'System Logs', href: '/logs/system' },
      { label: 'Port Logs', href: '/logs/ports' },
      { label: 'Alert History', href: '/logs/alerts' }
    ]
  }
];

export const TopNav: React.FC = () => {
  const [expandedItem, setExpandedItem] = useState<string | null>(null);
  const location = useLocation();

  const handleItemClick = (item: NavigationItem, e: React.MouseEvent) => {
    if (item.subItems) {
      e.preventDefault();
      setExpandedItem(expandedItem === item.label ? null : item.label);
    }
  };

  const isActive = (href: string) => {
    return location.pathname === href || location.pathname.startsWith(href + '/');
  };

  return (
    <div className="bg-white border-b border-gray-200">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-32">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <div className="py-4">
                <img 
                  src="/librarypulselogo.jpg" 
                  alt="LibraryPulse Logo" 
                  className="h-32 w-auto"
                />
              </div>
            </Link>
            <nav className="flex space-x-8 ml-12">
              {navigationItems.map((item) => (
                <div key={item.href} className="relative">
                  <Link
                    to={item.href}
                    className={`flex items-center px-4 py-3 text-lg font-bold rounded-md hover:bg-gray-50 hover:text-gray-900 ${
                      isActive(item.href) ? 'bg-gray-100 text-gray-900' : 'text-gray-700'
                    }`}
                    onClick={(e) => handleItemClick(item, e)}
                  >
                    {item.icon}
                    <span className="ml-2">{item.label}</span>
                    {item.subItems && (
                      <ChevronDown className={`w-5 h-5 ml-1 transform transition-transform ${
                        expandedItem === item.label ? 'rotate-180' : ''
                      }`} />
                    )}
                  </Link>
                  {item.subItems && expandedItem === item.label && (
                    <div 
                      className="absolute left-0 mt-1 w-64 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-50"
                    >
                      <div className="py-1">
                        {item.subItems.map((subItem) => (
                          <Link
                            key={subItem.href}
                            to={subItem.href}
                            className={`block px-4 py-3 text-lg font-semibold ${
                              isActive(subItem.href)
                                ? 'bg-gray-100 text-gray-900'
                                : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                            }`}
                            onClick={() => setExpandedItem(null)}
                          >
                            {subItem.label}
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
}; 