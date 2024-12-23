import React, { useState } from 'react';
import { Bell, User, ChevronDown } from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
}

interface NavItem {
  label: string;
  items?: { label: string; href: string }[];
}

const navItems: NavItem[] = [
  {
    label: 'Ports',
    items: [
      { label: 'Overview', href: '/ports' },
      { label: 'Status', href: '/ports/status' },
      { label: 'Traffic Analysis', href: '/ports/traffic' },
      { label: 'Error Statistics', href: '/ports/errors' },
      { label: 'Configuration', href: '/ports/config' },
    ],
  },
  {
    label: 'Performance',
    items: [
      { label: 'Bandwidth', href: '/performance/bandwidth' },
      { label: 'Latency', href: '/performance/latency' },
      { label: 'QoS', href: '/performance/qos' },
      { label: 'Throughput', href: '/performance/throughput' },
    ],
  },
  {
    label: 'System',
    items: [
      { label: 'Resources', href: '/system/resources' },
      { label: 'Temperature', href: '/system/temperature' },
      { label: 'Power Supply', href: '/system/power' },
      { label: 'Firmware', href: '/system/firmware' },
    ],
  },
  {
    label: 'Logs',
    items: [
      { label: 'System Logs', href: '/logs/system' },
      { label: 'Port Logs', href: '/logs/ports' },
      { label: 'Error Logs', href: '/logs/errors' },
      { label: 'Audit Logs', href: '/logs/audit' },
    ],
  },
];

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        {/* Top Bar */}
        <div className="px-4 py-3 flex items-center justify-between">
          <div className="flex items-center">
            <h1 className="text-xl font-bold text-gray-900 mr-8">LibraryPulse</h1>
            {/* Navigation */}
            <nav className="hidden md:flex space-x-4">
              {navItems.map((item) => (
                <div
                  key={item.label}
                  className="relative"
                  onMouseEnter={() => setActiveDropdown(item.label)}
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  <button className="flex items-center px-3 py-2 text-sm font-medium text-gray-900 hover:text-blue-600">
                    {item.label}
                    <ChevronDown className="w-4 h-4 ml-1" />
                  </button>
                  {activeDropdown === item.label && item.items && (
                    <div className="absolute left-0 mt-1 w-56 bg-white border border-gray-200 rounded-md shadow-lg z-50">
                      {item.items.map((subItem) => (
                        <a
                          key={subItem.label}
                          href={subItem.href}
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600"
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
          <div className="flex items-center space-x-4">
            <button className="text-gray-500 hover:text-gray-700">
              <Bell className="w-5 h-5" />
            </button>
            <button className="flex items-center text-gray-500 hover:text-gray-700">
              <User className="w-5 h-5" />
              <span className="ml-2 text-sm font-medium">Admin</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="p-6">
        {children}
      </div>
    </div>
  );
}; 