import React from 'react';
import { Card } from '../../components/ui/Card';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import { Zap, AlertTriangle, Lightbulb } from 'lucide-react';

const usageData = [
  { day: 'Mon', kwh: 34, cost: 5.10 },
  { day: 'Tue', kwh: 28, cost: 4.20 },
  { day: 'Wed', kwh: 45, cost: 6.75 },
  { day: 'Thu', kwh: 32, cost: 4.80 },
  { day: 'Fri', kwh: 38, cost: 5.70 },
  { day: 'Sat', kwh: 52, cost: 7.80 },
  { day: 'Sun', kwh: 48, cost: 7.20 },
];

const Electricity: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center gsap-fade-in">
        <h2 className="text-3xl font-bold text-white">Electricity Usage</h2>
        <div className="flex gap-2">
           <span className="px-3 py-1 bg-secondary/10 text-secondary border border-secondary/20 rounded-full text-sm font-medium flex items-center gap-2">
             <Zap size={14} fill="currentColor"/> Grid Status: Stable
           </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 gsap-fade-in">
        <Card className="lg:col-span-2" title="Weekly Consumption (kWh)">
           <div className="h-[350px]">
              <ResponsiveContainer width="100%" height="100%">
                 <BarChart data={usageData} barSize={40}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#27272a" vertical={false} />
                    <XAxis dataKey="day" stroke="#71717a" tick={{fill: '#71717a'}} axisLine={false} tickLine={false} />
                    <YAxis stroke="#71717a" tick={{fill: '#71717a'}} axisLine={false} tickLine={false} />
                    <Tooltip 
                      cursor={{fill: '#27272a', opacity: 0.4}}
                      contentStyle={{ backgroundColor: '#18181b', border: '1px solid #27272a', borderRadius: '8px', color: '#f4f4f5' }}
                    />
                    <Bar dataKey="kwh" fill="#eab308" radius={[4, 4, 0, 0]} />
                 </BarChart>
              </ResponsiveContainer>
           </div>
        </Card>

        <div className="space-y-6">
           <Card title="Current Usage">
              <div className="flex items-center justify-center py-8">
                 <div className="relative w-48 h-48 rounded-full border-8 border-border flex items-center justify-center">
                    <div className="absolute inset-0 rounded-full border-8 border-accent border-t-transparent animate-spin-slow" style={{ animationDuration: '3s' }}></div>
                    <div className="text-center">
                       <span className="block text-4xl font-bold text-white">2.4</span>
                       <span className="text-sm text-muted">kWh / hour</span>
                    </div>
                 </div>
              </div>
              <div className="grid grid-cols-2 gap-4 mt-4">
                 <div className="bg-background rounded-lg p-3 border border-border">
                    <p className="text-xs text-muted">Projected Cost</p>
                    <p className="text-lg font-semibold text-white">$145.20</p>
                 </div>
                 <div className="bg-background rounded-lg p-3 border border-border">
                    <p className="text-xs text-muted">Efficiency Score</p>
                    <p className="text-lg font-semibold text-secondary">A-</p>
                 </div>
              </div>
           </Card>
           
           <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-xl p-4 flex gap-3">
              <Lightbulb className="text-yellow-500 shrink-0" size={24} />
              <div>
                 <h4 className="font-medium text-yellow-500">Saving Tip</h4>
                 <p className="text-sm text-yellow-200/80 mt-1">Your consumption peaks on weekends. Try scheduling heavy appliances for off-peak hours (10PM - 6AM).</p>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default Electricity;