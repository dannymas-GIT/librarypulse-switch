import { SwitchMetrics } from '../types/switch';

// Generate time series data for the last 24 hours
const generateTimeSeriesData = () => {
  const data = [];
  const now = new Date();
  for (let i = 23; i >= 0; i--) {
    const timestamp = new Date(now.getTime() - i * 3600000).toISOString();
    // Simulate daily traffic patterns with peaks during business hours
    const hourOfDay = new Date(timestamp).getHours();
    const baseTraffic = hourOfDay >= 9 && hourOfDay <= 17 ? 800 : 300;
    const variation = Math.random() * 200;
    
    data.push({
      timestamp,
      ingressTraffic: Math.round(baseTraffic + variation),
      egressTraffic: Math.round((baseTraffic + variation) * 0.8),
    });
  }
  return data;
};

// Generate realistic port data
const generatePortData = () => {
  const speeds = ['1 Gbps', '10 Gbps', '25 Gbps', '100 Gbps'];
  const ports = [];
  
  for (let i = 1; i <= 48; i++) {
    const isHighSpeed = i <= 8; // First 8 ports are high speed
    const speed = speeds[isHighSpeed ? Math.min(3, Math.floor(i/2)) : 0];
    const isUp = Math.random() > 0.1; // 90% ports are up
    const hasErrors = Math.random() > 0.8; // 20% ports have some errors
    
    ports.push({
      portId: `${i}`,
      status: isUp ? 'Up' : 'Down',
      bandwidth: isUp ? speed : '0 Gbps',
      packetsPerSecond: isUp ? Math.round(Math.random() * (isHighSpeed ? 1000000 : 100000)) : 0,
      errors: hasErrors ? Math.round(Math.random() * 50) : 0,
    });
  }
  return ports;
};

// Mock data for development
const mockMetrics: SwitchMetrics = {
  portUtilization: generatePortData(),
  trafficStats: generateTimeSeriesData(),
  systemHealth: {
    cpuUsage: 45 + Math.round(Math.random() * 20), // CPU usage between 45-65%
    memoryUsage: 60 + Math.round(Math.random() * 15), // Memory usage between 60-75%
  }
};

export const fetchSwitchMetrics = async (): Promise<SwitchMetrics> => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // Return new random data each time to simulate real-time updates
  return {
    ...mockMetrics,
    portUtilization: generatePortData(),
    trafficStats: generateTimeSeriesData(),
    systemHealth: {
      cpuUsage: 45 + Math.round(Math.random() * 20),
      memoryUsage: 60 + Math.round(Math.random() * 15),
    }
  };
}; 