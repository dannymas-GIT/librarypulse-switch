import { useQuery } from '@tanstack/react-query';
import { fetchSwitchMetrics } from '../../services/api';

export default function PowerSupply() {
  const { isLoading } = useQuery({
    queryKey: ['powerSupply'],
    queryFn: fetchSwitchMetrics
  });

  if (isLoading) {
    return <div className="p-4">Loading...</div>;
  }

  const mockPowerSupplies = [
    {
      status: 'OK',
      inputVoltage: 220,
      outputPower: 450,
      temperature: 35
    },
    {
      status: 'OK',
      inputVoltage: 220,
      outputPower: 425,
      temperature: 37
    }
  ];

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-6">Power Supply Status</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {mockPowerSupplies.map((psu, index) => (
          <div key={index} className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-lg font-semibold mb-4">PSU {index + 1}</h2>
            <div className="space-y-4">
              <div className="flex justify-between">
                <span>Status:</span>
                <span className={psu.status === 'OK' ? 'text-green-500' : 'text-red-500'}>
                  {psu.status}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Input Voltage:</span>
                <span>{psu.inputVoltage}V</span>
              </div>
              <div className="flex justify-between">
                <span>Output Power:</span>
                <span>{psu.outputPower}W</span>
              </div>
              <div className="flex justify-between">
                <span>Temperature:</span>
                <span>{psu.temperature}°C</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 