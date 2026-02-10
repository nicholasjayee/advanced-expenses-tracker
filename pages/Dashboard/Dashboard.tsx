import React, { useState, useEffect } from 'react';
import { Card } from '../../components/ui/Card';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { ArrowUpRight, ArrowDownRight, Zap, BrainCircuit } from 'lucide-react';
import { getFinancialAdvice } from '../../services/geminiService';
import { Transaction, Asset, Liability, TransactionType, AssetClass } from '../../types';

// Mock Data
const data = [
  { name: 'Jan', income: 4000, expense: 2400 },
  { name: 'Feb', income: 3000, expense: 1398 },
  { name: 'Mar', income: 2000, expense: 9800 },
  { name: 'Apr', income: 2780, expense: 3908 },
  { name: 'May', income: 1890, expense: 4800 },
  { name: 'Jun', income: 2390, expense: 3800 },
  { name: 'Jul', income: 3490, expense: 4300 },
];

const mockTransactions: Transaction[] = [
  { id: '1', date: '2023-10-01', amount: 120, description: 'Groceries', category: 'Food', type: TransactionType.EXPENSE },
  { id: '2', date: '2023-10-02', amount: 50, description: 'Uber', category: 'Transport', type: TransactionType.EXPENSE },
];
const mockAssets: Asset[] = [
  { id: '1', name: 'AAPL', value: 15000, type: AssetClass.EQUITY, change24h: 1.2 },
];
const mockLiabilities: Liability[] = [
  { id: '1', name: 'Mortgage', totalAmount: 300000, remainingAmount: 250000, interestRate: 3.5, dueDate: '2040-01-01' }
];

const Dashboard: React.FC = () => {
  const [aiInsight, setAiInsight] = useState<string>('Analyzing your financial health...');
  const [loadingAi, setLoadingAi] = useState(false);

  useEffect(() => {
    // Simulate AI fetch on mount
    const fetchInsight = async () => {
      setLoadingAi(true);
      const advice = await getFinancialAdvice(
        { expenses: mockTransactions, assets: mockAssets, liabilities: mockLiabilities },
        "Give me a 1-sentence summary of my current financial status based on this data."
      );
      setAiInsight(advice);
      setLoadingAi(false);
    };
    fetchInsight();
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-end gsap-fade-in">
        <div>
          <h2 className="text-3xl font-bold text-white">Dashboard</h2>
          <p className="text-muted">Welcome back, Alex. Here's your financial overview.</p>
        </div>
        <div className="flex gap-2">
           <button className="bg-primary hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
             Download Report
           </button>
        </div>
      </div>

      {/* AI Insight Widget */}
      <div className="gsap-fade-in">
        <div className="bg-gradient-to-r from-indigo-900/50 to-purple-900/50 border border-indigo-500/30 rounded-xl p-6 flex items-start gap-4">
          <div className="p-3 bg-indigo-500/20 rounded-lg">
            <BrainCircuit className="text-indigo-400" size={24} />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-indigo-100 mb-1">AI Financial Advisor</h3>
            <p className="text-indigo-200/80 text-sm leading-relaxed">
              {loadingAi ? "Thinking..." : aiInsight}
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 gsap-fade-in">
        <StatCard title="Total Balance" value="$124,592.00" change="+12.5%" isPositive={true} />
        <StatCard title="Monthly Expenses" value="$4,250.00" change="-2.4%" isPositive={true} />
        <StatCard title="Investments" value="$85,200.00" change="+5.2%" isPositive={true} />
        <StatCard title="Net Worth" value="$540,100.00" change="+8.1%" isPositive={true} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 gsap-fade-in">
        <Card className="lg:col-span-2" title="Cash Flow">
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="colorIncome" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorExpense" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#ef4444" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#ef4444" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#27272a" vertical={false} />
                <XAxis dataKey="name" stroke="#71717a" tick={{fill: '#71717a'}} axisLine={false} tickLine={false} />
                <YAxis stroke="#71717a" tick={{fill: '#71717a'}} axisLine={false} tickLine={false} tickFormatter={(value) => `$${value}`} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#18181b', border: '1px solid #27272a', borderRadius: '8px' }}
                  itemStyle={{ color: '#f4f4f5' }}
                />
                <Area type="monotone" dataKey="income" stroke="#10b981" fillOpacity={1} fill="url(#colorIncome)" strokeWidth={2} />
                <Area type="monotone" dataKey="expense" stroke="#ef4444" fillOpacity={1} fill="url(#colorExpense)" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card title="Electricity Usage (Last 7 Days)">
           <div className="h-[300px] w-full flex items-end justify-between gap-2">
              {[45, 32, 55, 48, 38, 62, 40].map((h, i) => (
                <div key={i} className="w-full bg-surface relative group">
                  <div 
                    className="absolute bottom-0 w-full bg-accent/80 rounded-t-sm transition-all duration-500 hover:bg-accent"
                    style={{ height: `${h}%` }}
                  >
                     <div className="opacity-0 group-hover:opacity-100 absolute -top-8 left-1/2 -translate-x-1/2 bg-surface border border-border px-2 py-1 rounded text-xs whitespace-nowrap z-10">
                        {h} kWh
                     </div>
                  </div>
                  <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-xs text-muted">
                    {['M','T','W','T','F','S','S'][i]}
                  </div>
                </div>
              ))}
           </div>
           <div className="mt-8 flex items-center justify-between text-sm">
             <span className="text-muted flex items-center gap-2"><Zap size={14}/> Peak Usage</span>
             <span className="font-semibold text-accent">62 kWh</span>
           </div>
        </Card>
      </div>
    </div>
  );
};

const StatCard = ({ title, value, change, isPositive }: { title: string, value: string, change: string, isPositive: boolean }) => (
  <Card>
    <p className="text-muted text-sm font-medium">{title}</p>
    <h3 className="text-2xl font-bold text-white mt-2">{value}</h3>
    <div className={`flex items-center gap-1 mt-2 text-sm ${isPositive ? 'text-secondary' : 'text-danger'}`}>
      {isPositive ? <ArrowUpRight size={16} /> : <ArrowDownRight size={16} />}
      <span>{change}</span>
      <span className="text-muted ml-1">vs last month</span>
    </div>
  </Card>
);

export default Dashboard;