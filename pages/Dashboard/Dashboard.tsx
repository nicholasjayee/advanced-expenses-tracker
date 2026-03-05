import React, { useState, useEffect, useMemo } from 'react';
import { Card } from '../../components/ui/Card';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { ArrowUpRight, ArrowDownRight, Zap, BrainCircuit, TrendingUp, DollarSign } from 'lucide-react';
import { getFinancialAdvice } from '../../services/geminiService';
import { useAccounts } from '../../context/AccountContext';
import { useExpensesContext } from '../../context/ExpenseContext';
import { useIncomeContext } from '../../context/IncomeContext';
import { useInvestmentContext } from '../../context/InvestmentContext';
import { useLiabilitiesContext } from '../../context/LiabilityContext';
import { ExpenseCategory } from '../Expenses/types';

const Dashboard: React.FC = () => {
  const { accounts } = useAccounts();
  const { expenses } = useExpensesContext();
  const { incomes } = useIncomeContext();
  const { investments } = useInvestmentContext();
  const { liabilities } = useLiabilitiesContext();
  
  const [aiInsight, setAiInsight] = useState<string>('Connecting to financial core...');
  const [loadingAi, setLoadingAi] = useState(false);

  // --- Statistics Calculation ---
  
  // 1. Total Balance
  const totalBalance = useMemo(() => accounts.reduce((acc, curr) => acc + curr.balance, 0), [accounts]);
  
  // 2. Statistics & Chart Data (Optimized single-pass calculation)
  const { chartData, monthlyIncome, monthlyExpense, prevMonthIncome, prevMonthExpense } = useMemo(() => {
    const today = new Date();

    // Initialize 6 months buckets
    // Map key: "YYYY-MM" -> { name, income: 0, expense: 0 }
    const monthsMap = new Map<string, { name: string; income: number; expense: number }>();
    const monthKeys: string[] = [];

    // Pre-fill map with last 6 months to ensure zero values for empty months
    for (let i = 5; i >= 0; i--) {
      const d = new Date(today.getFullYear(), today.getMonth() - i, 1);
      const y = d.getFullYear();
      const m = d.getMonth();
      const key = `${y}-${(m + 1).toString().padStart(2, '0')}`;
      const name = d.toLocaleString('default', { month: 'short' });
      monthsMap.set(key, { name, income: 0, expense: 0 });
      monthKeys.push(key);
    }

    // Helper to add transaction
    const addTransaction = (t: { date: string, amount: number }, type: 'income' | 'expense') => {
        // Parse date directly from string "YYYY-MM-DD"
        // t.date format is YYYY-MM-DD. Substring(0, 7) gives YYYY-MM
        const key = t.date.substring(0, 7);
        if (monthsMap.has(key)) {
            const entry = monthsMap.get(key)!;
            entry[type] += t.amount;
        }
    };

    // Single pass over incomes and expenses (O(N + M))
    incomes.forEach(i => addTransaction(i, 'income'));
    expenses.forEach(e => addTransaction(e, 'expense'));

    const data = monthKeys.map(key => monthsMap.get(key)!);

    // Extract current and prev month stats
    const currentKey = monthKeys[monthKeys.length - 1]; // Last element is current month
    const prevKey = monthKeys[monthKeys.length - 2];    // Second to last is previous month

    const currentStats = monthsMap.get(currentKey) || { income: 0, expense: 0 };
    const prevStats = monthsMap.get(prevKey) || { income: 0, expense: 0 };

    return {
        chartData: data,
        monthlyIncome: currentStats.income,
        monthlyExpense: currentStats.expense,
        prevMonthIncome: prevStats.income,
        prevMonthExpense: prevStats.expense
    };
  }, [incomes, expenses]);

  // 3. Investments Value
  const totalInvestmentValue = useMemo(() => investments.reduce((acc, curr) => acc + curr.value, 0), [investments]);
  
  // 4. Liabilities
  const totalLiabilities = useMemo(() => liabilities.reduce((acc, curr) => acc + curr.remainingAmount, 0), [liabilities]);

  // 5. Net Worth
  const netWorth = totalBalance + totalInvestmentValue - totalLiabilities;

  // 7. Electricity Data
  const { electricityData, peakKwh } = useMemo(() => {
    // ⚡ Bolt: Performance Optimization
    // Replaced chained array methods (filter, map, slice, sort, Math.max(map))
    // with a single O(N) pass and single sort to minimize allocations and redundant iterations.
    // Expected impact: Faster Dashboard rendering on high-volume expense data by reducing O(4N) to O(N + M log M).
    const filteredAndMapped = [];

    for (const e of expenses) {
      if (e.category === ExpenseCategory.ELECTRICITY && e.electricityUnits) {
        filteredAndMapped.push({
          dateStr: e.date,
          // Parse day directly from string to avoid Date object allocation
          date: parseInt(e.date.split('-')[2], 10),
          kwh: e.electricityUnits
        });
      }
    }

    // Sort by original date string, slice last 7
    filteredAndMapped.sort((a, b) => a.dateStr.localeCompare(b.dateStr));
    const recentData = filteredAndMapped.slice(-7);

    let maxKwh = 0;
    // Map to final format and calculate peak in one pass over the small subset (max 7 items)
    const finalData = [];
    for (const d of recentData) {
      if (d.kwh > maxKwh) maxKwh = d.kwh;
      finalData.push({ date: d.date, kwh: d.kwh });
    }

    return { electricityData: finalData, peakKwh: maxKwh };
  }, [expenses]);

  // --- AI Insight ---
  useEffect(() => {
    const fetchInsight = async () => {
      if (incomes.length === 0 && expenses.length === 0) {
          setAiInsight("Start adding income and expenses to receive AI-powered financial advice.");
          return;
      }
      
      setLoadingAi(true);
      const context = {
        totalBalance,
        netWorth,
        monthlyIncome,
        monthlyExpense,
        totalDebt: totalLiabilities,
        investmentCount: investments.length,
        savingsRate: monthlyIncome > 0 ? ((monthlyIncome - monthlyExpense) / monthlyIncome) * 100 : 0
      };

      const advice = await getFinancialAdvice(
        context,
        "Analyze my current financial standing based on these metrics. Provide a brief 2-sentence summary with a key recommendation."
      );
      setAiInsight(advice);
      setLoadingAi(false);
    };

    // Debounce or just run once on mount (with deps)
    const timeout = setTimeout(fetchInsight, 1000);
    return () => clearTimeout(timeout);
  }, [totalBalance, netWorth, monthlyIncome, monthlyExpense, totalLiabilities]);


  const calcChange = (current: number, prev: number) => {
    if (prev === 0) return current > 0 ? 100 : 0;
    return ((current - prev) / prev) * 100;
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-end gsap-fade-in">
        <div>
          <h2 className="text-3xl font-bold text-text">Dashboard</h2>
          <p className="text-muted">Overview of your Enterprise Wealth OS.</p>
        </div>
        <div className="flex gap-2">
           <button className="bg-primary hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2">
             <DollarSign size={16} /> Report
           </button>
        </div>
      </div>

      {/* AI Insight Widget */}
      <div className="gsap-fade-in">
        <div className="bg-gradient-to-r from-indigo-900/50 to-purple-900/50 border border-indigo-500/30 rounded-xl p-6 flex items-start gap-4">
          <div className="p-3 bg-indigo-500/20 rounded-lg shrink-0">
            <BrainCircuit className="text-indigo-400" size={24} />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-indigo-100 mb-1">AI Financial Advisor</h3>
            <p className="text-indigo-200/80 text-sm leading-relaxed">
              {loadingAi ? "Analyzing real-time market data & spending patterns..." : aiInsight}
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 gsap-fade-in">
        <StatCard 
          title="Total Balance" 
          value={`$${totalBalance.toLocaleString(undefined, {minimumFractionDigits: 2})}`} 
          change={`${totalBalance > 0 ? '+' : ''}Active`} 
          isPositive={totalBalance >= 0} 
          icon={<DollarSign size={20} />}
        />
        <StatCard 
          title="Monthly Expenses" 
          value={`$${monthlyExpense.toLocaleString()}`} 
          change={`${calcChange(monthlyExpense, prevMonthExpense).toFixed(1)}%`} 
          isPositive={monthlyExpense < prevMonthExpense} 
          icon={<ArrowDownRight size={20} />}
          footer="vs last month"
        />
        <StatCard 
          title="Investments" 
          value={`$${totalInvestmentValue.toLocaleString()}`} 
          change={`${investments.length} Assets`} 
          isPositive={true} 
          icon={<TrendingUp size={20} />}
        />
        <StatCard 
          title="Net Worth" 
          value={`$${netWorth.toLocaleString()}`} 
          change={`Debt: $${totalLiabilities.toLocaleString()}`} 
          isPositive={netWorth > 0} 
          icon={<BrainCircuit size={20} />} // Reusing icon as placeholder
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 gsap-fade-in">
        <Card className="lg:col-span-2" title="Cash Flow Analysis (6 Months)">
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData}>
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

        <Card title="Recent Energy Usage">
           {electricityData.length > 0 ? (
             <>
               <div className="h-[300px] w-full flex items-end justify-between gap-2 px-2">
                  {electricityData.map((data, i) => {
                    const height = peakKwh > 0 ? (data.kwh / peakKwh) * 100 : 0;
                    return (
                      <div key={i} className="w-full bg-surface relative group flex flex-col justify-end h-full">
                        <div 
                          className="w-full bg-accent/80 rounded-t-sm transition-all duration-500 hover:bg-accent min-h-[4px]"
                          style={{ height: `${height}%` }}
                        >
                           <div className="opacity-0 group-hover:opacity-100 absolute -top-8 left-1/2 -translate-x-1/2 bg-surface border border-border px-2 py-1 rounded text-xs whitespace-nowrap z-10 pointer-events-none text-text">
                              {data.kwh} kWh
                           </div>
                        </div>
                        <div className="text-center mt-2 text-xs text-muted">
                          {data.date}
                        </div>
                      </div>
                    );
                  })}
               </div>
               <div className="mt-4 flex items-center justify-between text-sm border-t border-border pt-3">
                 <span className="text-muted flex items-center gap-2"><Zap size={14}/> Peak in Period</span>
                 <span className="font-semibold text-accent">{peakKwh} kWh</span>
               </div>
             </>
           ) : (
             <div className="h-[300px] flex items-center justify-center text-muted text-center p-4">
                <div className="flex flex-col items-center gap-2">
                   <Zap size={32} className="text-muted/20" />
                   <p>No recent electricity logs found.</p>
                   <p className="text-xs">Add records in the Electricity page.</p>
                </div>
             </div>
           )}
        </Card>
      </div>
    </div>
  );
};

const StatCard = ({ title, value, change, isPositive, icon, footer }: { title: string, value: string, change: string, isPositive: boolean, icon: React.ReactNode, footer?: string }) => (
  <Card>
    <div className="flex justify-between items-start">
      <div>
        <p className="text-muted text-sm font-medium">{title}</p>
        <h3 className="text-2xl font-bold text-text mt-2">{value}</h3>
      </div>
      <div className={`p-2 rounded-lg ${isPositive ? 'bg-secondary/10 text-secondary' : 'bg-danger/10 text-danger'}`}>
        {icon}
      </div>
    </div>
    <div className={`flex items-center gap-1 mt-3 text-sm ${isPositive ? 'text-secondary' : 'text-danger'}`}>
      {isPositive ? <ArrowUpRight size={16} /> : <ArrowDownRight size={16} />}
      <span>{change}</span>
      {footer && <span className="text-muted ml-1">{footer}</span>}
    </div>
  </Card>
);

export default Dashboard;