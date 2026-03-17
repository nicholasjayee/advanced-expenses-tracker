import React, { useMemo } from 'react';
import { Card } from '../../../components/ui/Card.tsx';
import { Income } from '../types/index.ts';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  PieChart, Pie, Cell, Legend
} from 'recharts';
import { calculateIncomeStats } from '../core/incomeStatistics.ts';

interface IncomeChartsProps {
  incomes: Income[];
}

export const IncomeCharts: React.FC<IncomeChartsProps> = ({ incomes }) => {
  // 1. Prepare Daily Data
  const dailyData = useMemo(() => {
    const map: Record<string, number> = {};
    incomes.forEach(inc => {
        const date = inc.date; 
        map[date] = (map[date] || 0) + inc.amount;
    });
    return Object.entries(map)
      .map(([date, amount]) => ({ date, amount }))
      .sort((a, b) => a.date.localeCompare(b.date))
      .slice(-30);
  }, [incomes]);

  // 2. Category Data
  const categoryData = useMemo(() => {
      const stats = calculateIncomeStats(incomes);
      return stats.map(s => ({
          name: s.name,
          value: s.value
      }));
  }, [incomes]);

  // 3. Top Incomes
  const topIncomes = useMemo(() => {
      // ⚡ Bolt: Performance Optimization
      // Replaced O(N log N) full array sort and clone with a single O(N) pass
      // maintaining a sorted array of the top 5 incomes.
      // Expected impact: Faster rendering for large income datasets by avoiding unnecessary array allocation and sorting overhead.
      const top: Income[] = [];
      for (const income of incomes) {
          if (top.length < 5) {
              top.push(income);
              top.sort((a, b) => b.amount - a.amount);
          } else if (income.amount > top[4].amount) {
              top[4] = income;
              top.sort((a, b) => b.amount - a.amount);
          }
      }
      return top;
  }, [incomes]);

  const COLORS = ['#10b981', '#3b82f6', '#8b5cf6', '#f59e0b', '#ec4899', '#06b6d4'];

  if (incomes.length === 0) {
      return (
          <div className="text-center py-20 text-muted border-2 border-dashed border-border rounded-xl">
              <p>No income data available to visualize.</p>
          </div>
      );
  }

  return (
    <div className="space-y-6 gsap-fade-in">
      <Card title="Income Trend">
        <div className="h-[300px] w-full">
           <ResponsiveContainer width="100%" height="100%">
             <AreaChart data={dailyData}>
                <defs>
                    <linearGradient id="colorIncome" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                    </linearGradient>
                </defs>
               <CartesianGrid strokeDasharray="3 3" stroke="#27272a" vertical={false} />
               <XAxis 
                  dataKey="date" 
                  stroke="#71717a" 
                  tick={{fill: '#71717a', fontSize: 12}} 
                  axisLine={false} 
                  tickLine={false} 
                  tickFormatter={(val) => val.slice(5)}
               />
               <YAxis 
                  stroke="#71717a" 
                  tick={{fill: '#71717a', fontSize: 12}} 
                  axisLine={false} 
                  tickLine={false} 
                  tickFormatter={(value) => `$${value}`} 
               />
               <Tooltip 
                  contentStyle={{ backgroundColor: '#18181b', border: '1px solid #27272a', borderRadius: '8px', color: '#f4f4f5' }}
                  formatter={(value: number) => [`$${value.toFixed(2)}`, 'Received']}
                  labelStyle={{ color: '#9ca3af' }}
               />
               <Area type="monotone" dataKey="amount" stroke="#10b981" strokeWidth={2} fillOpacity={1} fill="url(#colorIncome)" />
             </AreaChart>
           </ResponsiveContainer>
        </div>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card title="Source Breakdown">
             <div className="h-[300px] w-full">
               <ResponsiveContainer width="100%" height="100%">
                 <PieChart>
                    <Pie
                        data={categoryData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={90}
                        paddingAngle={4}
                        dataKey="value"
                    >
                        {categoryData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} stroke="var(--surface)" strokeWidth={2} />
                        ))}
                    </Pie>
                    <Tooltip 
                        contentStyle={{ backgroundColor: '#18181b', border: '1px solid #27272a', borderRadius: '8px', color: '#f4f4f5' }}
                        formatter={(value: number) => [`$${value.toFixed(2)}`, 'Total']}
                    />
                    <Legend 
                        verticalAlign="bottom" 
                        height={36} 
                        formatter={(value) => <span style={{ color: 'var(--text)' }}>{value}</span>}
                    />
                 </PieChart>
               </ResponsiveContainer>
             </div>
          </Card>
          
          <Card title="Top Income Entries">
              <div className="space-y-4">
                  {topIncomes.map((inc, i) => (
                      <div key={inc.id} className="flex justify-between items-center p-3 rounded-lg hover:bg-muted/5 transition-colors border-b border-border last:border-0 last:pb-0">
                          <div className="flex items-center gap-3">
                              <span className="flex items-center justify-center w-6 h-6 rounded-full bg-secondary/10 text-secondary text-xs font-bold font-mono">
                                  {i+1}
                              </span>
                              <div>
                                  <p className="font-medium text-text text-sm">{inc.description}</p>
                                  <p className="text-xs text-muted">{inc.date} • {inc.category}</p>
                              </div>
                          </div>
                          <span className="font-bold text-secondary">+${inc.amount.toFixed(2)}</span>
                      </div>
                  ))}
              </div>
          </Card>
      </div>
    </div>
  );
};