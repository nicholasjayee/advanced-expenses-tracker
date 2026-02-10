import React from 'react';
import { Card } from '../../../components/ui/Card.tsx';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip as RechartsTooltip, Legend } from 'recharts';
import { AllocationStat } from '../core/investmentStatistics.ts';

interface PortfolioAllocationProps {
  data: AllocationStat[];
}

export const PortfolioAllocation: React.FC<PortfolioAllocationProps> = ({ data }) => {
  return (
    <Card title="Asset Allocation" className="gsap-fade-in h-full flex flex-col">
      <div className="flex-1 min-h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={90}
              paddingAngle={5}
              dataKey="value"
              stroke="none"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <RechartsTooltip 
                contentStyle={{ backgroundColor: '#18181b', border: '1px solid #27272a', borderRadius: '8px' }}
                itemStyle={{ color: '#f4f4f5' }}
                formatter={(value: number) => `$${value.toLocaleString()}`}
            />
            <Legend verticalAlign="bottom" height={36}/>
          </PieChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
};