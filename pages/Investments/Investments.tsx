import React, { useState } from 'react';
import { Briefcase } from 'lucide-react';
import { useInvestments } from './core/useInvestments.ts';
import { InvestmentHeader } from './components/InvestmentHeader.tsx';
import { PortfolioAllocation } from './components/PortfolioAllocation.tsx';
import { AssetList } from './components/AssetList.tsx';
import { AddInvestmentForm } from './components/AddInvestmentForm.tsx';
import { StrategyModal } from './components/StrategyModal.tsx';
import { Card } from '../../components/ui/Card.tsx';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Cell } from 'recharts';
import { getFinancialAdvice } from '../../services/geminiService.ts';

const Investments: React.FC = () => {
  const { investments, performance, allocationData, plData, addInvestment, accounts } = useInvestments();
  
  const [showStrategy, setShowStrategy] = useState(false);
  const [strategyContent, setStrategyContent] = useState('');
  const [loadingStrategy, setLoadingStrategy] = useState(false);

  const handleStrategyClick = async () => {
    setShowStrategy(true);
    // Only fetch if we haven't fetched yet or if we want to refresh (here we just fetch if empty for now)
    // In a real app, you might want a "Refresh" button inside the modal.
    if (!strategyContent) {
        setLoadingStrategy(true);
        
        const context = {
            portfolioSummary: performance,
            allocation: allocationData,
            holdings: investments.map(inv => ({
                name: inv.name,
                type: inv.type,
                value: inv.value,
                profit: inv.value - inv.costBasis
            }))
        };

        const prompt = "Act as a senior portfolio manager. Analyze this portfolio structure. 1) Comment on the asset allocation diversity (Crypto vs Equity vs others). 2) Identify potential risks. 3) Suggest 3 concrete moves to balance the portfolio or hedge against volatility. Keep it concise.";
        
        const advice = await getFinancialAdvice(context, prompt);
        setStrategyContent(advice);
        setLoadingStrategy(false);
    }
  };

  return (
    <div className="space-y-6">
       <div className="flex justify-between items-center gsap-fade-in">
        <h2 className="text-3xl font-bold text-text">Investments</h2>
        <div className="flex gap-3">
          <button 
            onClick={handleStrategyClick}
            className="bg-surface hover:bg-muted/10 text-text border border-border px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2"
          >
            <Briefcase size={16} /> Strategy
          </button>
        </div>
      </div>

      {/* Summary Statistics */}
      <InvestmentHeader performance={performance} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column: Form & Stats */}
        <div className="lg:col-span-1 space-y-6">
          <AddInvestmentForm onAdd={addInvestment} accounts={accounts} />
          
          <Card title="Profit/Loss by Asset Class">
            <div className="h-[200px]">
               <ResponsiveContainer width="100%" height="100%">
                 <BarChart data={plData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#27272a" vertical={false} />
                    <XAxis dataKey="name" hide />
                    <Tooltip 
                      cursor={{fill: '#27272a', opacity: 0.4}}
                      contentStyle={{ backgroundColor: '#18181b', border: '1px solid #27272a', borderRadius: '8px', color: '#f4f4f5' }}
                    />
                    <Bar dataKey="profit" radius={[4, 4, 4, 4]}>
                       {plData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.profit >= 0 ? '#10b981' : '#ef4444'} />
                       ))}
                    </Bar>
                 </BarChart>
               </ResponsiveContainer>
            </div>
            <div className="grid grid-cols-2 gap-2 mt-4">
              {plData.map(d => (
                <div key={d.name} className="flex justify-between text-xs">
                  <span className="text-muted">{d.name}</span>
                  <span className={d.profit >= 0 ? 'text-secondary' : 'text-danger'}>
                    {d.profit > 0 ? '+' : ''}{d.profit.toLocaleString()}
                  </span>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Right Column: Charts & List */}
        <div className="lg:col-span-2 space-y-6">
           <PortfolioAllocation data={allocationData} />
           <AssetList assets={investments} />
        </div>
      </div>

      <StrategyModal 
        isOpen={showStrategy} 
        onClose={() => setShowStrategy(false)} 
        loading={loadingStrategy}
        content={strategyContent}
      />
    </div>
  );
};

export default Investments;