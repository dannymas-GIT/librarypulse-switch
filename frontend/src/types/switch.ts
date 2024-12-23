export interface PortUtilization {
  portId: string;
  status: string;
  bandwidth: string;
  packetsPerSecond: number;
  errors: number;
}

export interface TrafficStat {
  timestamp: string;
  ingressTraffic: number;
  egressTraffic: number;
}

export interface SystemHealth {
  cpuUsage: number;
  memoryUsage: number;
}

export interface SwitchMetrics {
  portUtilization: PortUtilization[];
  trafficStats: TrafficStat[];
  systemHealth: SystemHealth;
} 