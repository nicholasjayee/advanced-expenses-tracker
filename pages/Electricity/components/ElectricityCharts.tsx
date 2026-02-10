
import React from 'react';
import { Card } from '../../../components/ui/Card.tsx';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, AreaChart, Area } from 'recharts';

interface ChartProps {
  data: { date: string; kwh: number; cost: number }[];
}

export const ElectricityCharts: React.FC<ChartProps> = ({ data }) => {
  return (
    <div className="grid grid-cols-1 gap-6 gsap-fade-in">
      <Card title="Consumption History (kWh)">
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data}>
              <defs>
                <linearGradient id="colorKwh" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#eab308" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#eab308" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#27272a" vertical={false} />
              <XAxis dataKey="date" stroke="#71717a" tick={{fill: '#71717a'}} axisLine={false} tickLine={false} />
              <YAxis stroke="#71717a" tick={{fill: '#71717a'}} axisLine={false} tickLine={false} />
              <Tooltip 
                contentStyle={{ backgroundColor: '#18181b', border: '1px solid #27272a', borderRadius: '8px', color: '#f4f4f5' }}
              />
              <Area type="monotone" dataKey="kwh" stroke="#eab308" fillOpacity={1} fill="url(#colorKwh)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </Card>

      <Card title="Cost Analysis vs Usage">
        <div className="h-[250px] w-full">
           <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" stroke="#27272a" vertical={false} />
                <XAxis dataKey="date" hide />
                <Tooltip 
                  cursor={{fill: '#27272a', opacity: 0.4}}
                  contentStyle={{ backgroundColor: '#18181b', border: '1px solid #27272a', borderRadius: '8px', color: '#f4f4f5' }}
                />
                <Bar dataKey="cost" name="Cost ($)" fill="#ef4444" radius={[4, 4, 0, 0]} />
                <Bar dataKey="kwh" name="Usage (kWh)" fill="#eab308" radius={[4, 4, 0, 0]} opacity={0.5} />
              </BarChart>
           </ResponsiveContainer>
        </div>
        <p className="text-xs text-muted text-center mt-2">Comparison of Cost vs Units Consumed per entry</p>
      </Card>
    </div>
  );
};
