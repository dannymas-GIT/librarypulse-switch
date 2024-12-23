import React from 'react';
import { 
  LayoutDashboard, 
  Network, 
  AlertCircle, 
  Activity, 
  Settings, 
  FileText
} from 'lucide-react';

interface NavItem {
  label: string;
  icon: React.ReactNode;
  active?: boolean;
}

const navItems: NavItem[] = [
  { label: 'Dashboard', icon: <LayoutDashboard className="w-5 h-5" />, active: true },
  { label: 'Ports', icon: <Network className="w-5 h-5" /> },
  { label: 'Errors', icon: <AlertCircle className="w-5 h-5" /> },
  { label: 'Performance', icon: <Activity className="w-5 h-5" /> },
  { label: 'Logs', icon: <FileText className="w-5 h-5" /> },
  { label: 'Settings', icon: <Settings className="w-5 h-5" /> },
];

export const Sidebar: React.FC = () => {
  return (
    <div className="w-64 bg-white border-r border-gray-200 px-3 py-4 flex flex-col">
      <div className="mb-8">
        <h1 className="text-xl font-bold text-gray-900">LibraryPulse</h1>
        <p className="text-sm text-gray-500">Switch Management</p>
      </div>
      
      <nav className="space-y-1">
        {navItems.map((item) => (
          <a
            key={item.label}
            href="#"
            className={`flex items-center px-3 py-2 text-sm font-medium rounded-md ${
              item.active
                ? 'bg-blue-50 text-blue-700'
                : 'text-gray-900 hover:bg-gray-50'
            }`}
          >
            {item.icon}
            <span className="ml-3">{item.label}</span>
          </a>
        ))}
      </nav>
    </div>
  );
}; 