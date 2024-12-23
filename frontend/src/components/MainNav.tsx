import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';

interface MainNavProps {
  className?: string;
}

export function MainNav({ className }: MainNavProps) {
  const [openMenus, setOpenMenus] = useState<Record<string, boolean>>({});
  const timeoutRefs = useRef<Record<string, number>>({});

  const handleMouseEnter = (menuId: string) => {
    if (timeoutRefs.current[menuId]) {
      clearTimeout(timeoutRefs.current[menuId]);
    }
    setOpenMenus(prev => ({ ...prev, [menuId]: true }));
  };

  const handleMouseLeave = (menuId: string) => {
    timeoutRefs.current[menuId] = window.setTimeout(() => {
      setOpenMenus(prev => ({ ...prev, [menuId]: false }));
    }, 300);
  };

  useEffect(() => {
    return () => {
      Object.values(timeoutRefs.current).forEach(timeout => clearTimeout(timeout));
    };
  }, []);

  return (
    <nav className={cn("flex items-center space-x-4 lg:space-x-6", className)}>
      <div
        className="relative"
        onMouseEnter={() => handleMouseEnter('browse')}
        onMouseLeave={() => handleMouseLeave('browse')}
      >
        <button className="flex h-10 items-center space-x-1 text-sm font-medium transition-colors hover:text-primary">
          <span>Browse</span>
          <ChevronDown className="h-4 w-4" />
        </button>
        
        {openMenus['browse'] && (
          <div className="absolute left-0 top-full mt-2 w-48 rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5">
            <Link
              to="/books"
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
              Books
            </Link>
            <Link
              to="/authors"
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
              Authors
            </Link>
          </div>
        )}
      </div>

      <div
        className="relative"
        onMouseEnter={() => handleMouseEnter('resources')}
        onMouseLeave={() => handleMouseLeave('resources')}
      >
        <button className="flex h-10 items-center space-x-1 text-sm font-medium transition-colors hover:text-primary">
          <span>Resources</span>
          <ChevronDown className="h-4 w-4" />
        </button>
        
        {openMenus['resources'] && (
          <div className="absolute left-0 top-full mt-2 w-48 rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5">
            <Link
              to="/articles"
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
              Articles
            </Link>
            <Link
              to="/guides"
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
              Guides
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
} 