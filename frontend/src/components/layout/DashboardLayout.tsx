import React from 'react';
import { Layout } from './Layout';
import { TopNav } from './TopNav';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  return (
    <Layout>
      <div className="flex flex-col h-screen">
        <TopNav />
        <main className="flex-1 overflow-auto bg-gray-50">
          <div className="container mx-auto px-4 py-6">
            {children}
          </div>
        </main>
      </div>
    </Layout>
  );
}; 