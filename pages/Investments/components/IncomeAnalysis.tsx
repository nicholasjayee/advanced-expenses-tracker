import React from 'react';
import { Card } from '../../../components/ui/Card.tsx';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';

interface IncomeAnalysisProps {
  data: { month: string; amount: number }[];
}

export const IncomeAnalysis: React.FC<IncomeAnalysisProps> = ({ data }) => {
  return (
    <Card title="Investment Income History" className="gsap-fade-in h-full flex flex-col">
      {data.length > 0 ? (
        <div className="flex-1 min-h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke="#27272a" vertical={false} />
              <XAxis dataKey="month" stroke="#71717a" tick={{fill: '#71717a'}} axisLine={false} tickLine={false} />
              <YAxis stroke="#71717a" tick={{fill: '#71717a'}} axisLine={false} tickLine={false} tickFormatter={(value) => `$${value}`} />
              <Tooltip 
                cursor={{fill: '#27272a', opacity: 0.4}}
                contentStyle={{ backgroundColor: '#18181b', border: '1px solid #27272a', borderRadius: '8px', color: '#f4f4f5' }}
                formatter={(value: number) => [`$${value}`, 'Income']}
              />
              <Bar dataKey="amount" fill="#10b981" radius={[4, 4, 0, 0]} barSize={40} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      ) : (
        <div className="flex-1 flex items-center justify-center text-muted min-h-[300px]">
           No investment income recorded yet.
        </div>
      )}
    </Card>
  );
};