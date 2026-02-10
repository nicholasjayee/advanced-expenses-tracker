import React, { useMemo } from 'react';
import { Card } from '../../../components/ui/Card.tsx';
import { Expense } from '../types/index.ts';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  PieChart, Pie, Cell, Legend
} from 'recharts';
import { calculateCategoryStats } from '../core/expenseStatistics.ts';

interface ExpenseChartsProps {
  expenses: Expense[];
}

export const ExpenseCharts: React.FC<ExpenseChartsProps> = ({ expenses }) => {
  // 1. Prepare Daily Data for Area Chart
  const dailyData = useMemo(() => {
    const map: Record<string, number> = {};
    expenses.forEach(e => {
        const date = e.date; // YYYY-MM-DD
        map[date] = (map[date] || 0) + e.amount;
    });
    // Sort by date and take last 30 days (or all if less)
    return Object.entries(map)
      .map(([date, amount]) => ({ date, amount }))
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
      .slice(-30);
  }, [expenses]);

  // 2. Prepare Category Data for Pie Chart
  const categoryData = useMemo(() => {
      const stats = calculateCategoryStats(expenses);
      return stats.map(s => ({
          name: s.name,
          value: s.value
      }));
  }, [expenses]);

  // 3. Top Expenses
  const topExpenses = useMemo(() => {
      return [...expenses].sort((a, b) => b.amount - a.amount).slice(0, 5);
  }, [expenses]);

  const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899', '#06b6d4', '#6366f1'];

  if (expenses.length === 0) {
      return (
          <div className="text-center py-20 text-muted border-2 border-dashed border-border rounded-xl">
              <p>No expense data available to visualize.</p>
          </div>
      );
  }

  return (
    <div className="space-y-6 gsap-fade-in">
      {/* Trend Chart */}
      <Card title="Daily Spending Trend">
        <div className="h-[300px] w-full">
           <ResponsiveContainer width="100%" height="100%">
             <AreaChart data={dailyData}>
                <defs>
                    <linearGradient id="colorAmount" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                    </linearGradient>
                </defs>
               <CartesianGrid strokeDasharray="3 3" stroke="#27272a" vertical={false} />
               <XAxis 
                  dataKey="date" 
                  stroke="#71717a" 
                  tick={{fill: '#71717a', fontSize: 12}} 
                  axisLine={false} 
                  tickLine={false} 
                  tickFormatter={(val) => val.slice(5)} // Show MM-DD
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
                  formatter={(value: number) => [`$${value.toFixed(2)}`, 'Spent']}
                  labelStyle={{ color: '#9ca3af' }}
               />
               <Area type="monotone" dataKey="amount" stroke="#3b82f6" strokeWidth={2} fillOpacity={1} fill="url(#colorAmount)" />
             </AreaChart>
           </ResponsiveContainer>
        </div>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Category Pie Chart */}
          <Card title="Category Breakdown">
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
          
          {/* Top Expenses List */}
          <Card title="Largest Transactions">
              <div className="space-y-4">
                  {topExpenses.map((exp, i) => (
                      <div key={exp.id} className="flex justify-between items-center p-3 rounded-lg hover:bg-muted/5 transition-colors border-b border-border last:border-0 last:pb-0">
                          <div className="flex items-center gap-3">
                              <span className="flex items-center justify-center w-6 h-6 rounded-full bg-primary/10 text-primary text-xs font-bold font-mono">
                                  {i+1}
                              </span>
                              <div>
                                  <p className="font-medium text-text text-sm">{exp.description}</p>
                                  <p className="text-xs text-muted">{exp.date} • {exp.category}</p>
                              </div>
                          </div>
                          <span className="font-bold text-text">${exp.amount.toFixed(2)}</span>
                      </div>
                  ))}
              </div>
          </Card>
      </div>
    </div>
  );
};