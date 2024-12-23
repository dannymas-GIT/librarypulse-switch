import { useState, useRef, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';
import { Link } from 'react-router-dom';

interface NavigationProps {
  className?: string;
}

type TimeoutRef = ReturnType<typeof setTimeout>;

export function Navigation({ className = '' }: NavigationProps) {
  const [openMenus, setOpenMenus] = useState<Record<string, boolean>>({});
  const timeoutRef = useRef<Record<string, TimeoutRef>>({});

  const handleMouseEnter = (menuId: string) => {
    if (timeoutRef.current[menuId]) {
      clearTimeout(timeoutRef.current[menuId]);
    }
    setOpenMenus(prev => ({ ...prev, [menuId]: true }));
  };

  const handleMouseLeave = (menuId: string) => {
    timeoutRef.current[menuId] = setTimeout(() => {
      setOpenMenus(prev => ({ ...prev, [menuId]: false }));
    }, 300);
  };

  useEffect(() => {
    return () => {
      Object.values(timeoutRef.current).forEach(timeout => clearTimeout(timeout));
    };
  }, []);

  return (
    <nav className={`flex items-center space-x-6 ${className}`}>
      <div
        className="relative"
        onMouseEnter={() => handleMouseEnter('resources')}
        onMouseLeave={() => handleMouseLeave('resources')}
      >
        <button className="flex items-center space-x-1 px-4 py-2 hover:bg-accent hover:text-accent-foreground rounded-md">
          <span>Resources</span>
          <ChevronDown className="h-4 w-4" />
        </button>
        
        {openMenus['resources'] && (
          <div className="absolute left-0 mt-2 w-48 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 py-1">
            <Link 
              to="/resources/books" 
              className="block px-4 py-2 text-sm hover:bg-gray-100"
            >
              Books
            </Link>
            <Link 
              to="/resources/articles" 
              className="block px-4 py-2 text-sm hover:bg-gray-100"
            >
              Articles
            </Link>
            {/* Add more menu items as needed */}
          </div>
        )}
      </div>
      
      {/* Add more navigation items here */}
    </nav>
  );
} 